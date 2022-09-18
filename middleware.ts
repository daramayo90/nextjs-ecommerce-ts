import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

// TODO: Hacer snippet de middlewares
export async function middleware(req: NextRequest) {
   const token = req.cookies.get('token');
   const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET_SEED);

   try {
      await jose.jwtVerify(token || '', jwtSecret || '');
      return NextResponse.next();
   } catch (error) {
      console.error(`JWT Invalid or not signed in`, { error });
      const { protocol, host, pathname } = req.nextUrl;
      return NextResponse.redirect(`${protocol}//${host}/auth/login?page=${pathname}`);
   }
}

export const config = {
   matcher: ['/checkout/:path*'],
};
