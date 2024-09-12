import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Define public paths
    const isPublicPath = path === '/sign-in' || path === '/sign-up' || path === '/about' || path === '/contact' || path === '/products' || path === '/'

    // Get the token from cookies
    const token = request.cookies.get('token')?.value || ''

    // If the user is logged in (has a token), prevent access to sign-in and sign-up pages
    if (token && (path === '/sign-in' || path === '/sign-up')) {
        return NextResponse.redirect(new URL('/', request.nextUrl))  // Redirect to home page if logged in
    }

    // If the user is not logged in (no token) and tries to access a non-public path, redirect to sign-in
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl))  // Redirect to sign-in if no token and accessing a private route
    }

    // Allow the request to continue for all other cases
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/sign-in',
        '/sign-up',
        '/products',
        '/wishlist',
        '/cart',
        '/about',
        '/contact',
    ]
}
