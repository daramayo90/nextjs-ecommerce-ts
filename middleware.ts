import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import * as jose from 'jose';

// TODO: Hacer snippet de middlewares
export async function middleware(req: NextRequest) {
   const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

   const { protocol, host, pathname } = req.nextUrl;
   if (!session) {
      return NextResponse.redirect(`${protocol}//${host}/auth/login?page=${pathname}`);
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/checkout/:path*'],
};
