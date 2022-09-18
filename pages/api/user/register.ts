import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt, validations } from '../../../utils';

type Data =
   | { message: string }
   | {
        token: string;
        user: {
           email: string;
           name: string;
           role: string;
        };
     };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return registerUser(req, res);

      default:
         res.status(400).json({ message: 'Bad request' });
   }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { email = '', password = '', name = '' } = req.body;

   if (password.length < 6) {
      return res.status(400).json({ message: 'The password should has at least 6 characteres' });
   }

   if (name.length < 2) {
      return res.status(400).json({ message: 'Name should has at least 2 characteres' });
   }

   if (!validations.isValidEmail(email)) {
      return res.status(400).json({ message: 'Is not a valid email' });
   }

   await db.connect();

   const user = await User.findOne({ email });

   if (user) {
      await db.disconnect();
      return res.status(400).json({ message: 'Mail already registerd' });
   }

   await db.disconnect();

   const newUser = new User({
      email: email.toLocaleLowerCase(),
      password: bcrypt.hashSync(password, 10),
      role: 'client',
      name,
   });

   try {
      await newUser.save({ validateBeforeSave: true });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Review server logs' });
   }

   const { _id, role } = newUser;

   const token = jwt.signToken(_id, email);

   return res.status(200).json({
      token,
      user: { email, role, name },
   });
};
