import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req }) // ইউজারের টোকেন বের করা

  // যদি লগইন না করা থাকে, তাহলে login পেজে পাঠিয়ে দেবে
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // **Admin Panel এর জন্য Authorization চেক**
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (token.role !== "admin") { 
      return NextResponse.redirect(new URL("/unauthorized", req.url)) // Unauthorized পেজে পাঠাবে
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // Dashboard & Admin পেজ প্রটেক্ট করা হবে
}
