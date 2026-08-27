import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// In-memory store for failed login attempts (resets on server restart)
// Key: IP address, Value: { count, firstAttemptAt }
const failedAttempts = new Map<string, { count: number; firstAttemptAt: number }>()

const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000 // 15 minutes
const SESSION_TIMEOUT_MS = 30 * 60 * 1000 // 30 minutes

export function checkRateLimit(ip: string): { blocked: boolean; remainingMs?: number } {
  const now = Date.now()
  const record = failedAttempts.get(ip)

  if (!record) return { blocked: false }

  // Reset if lockout period has passed
  if (now - record.firstAttemptAt > LOCKOUT_MS) {
    failedAttempts.delete(ip)
    return { blocked: false }
  }

  if (record.count >= MAX_ATTEMPTS) {
    const remainingMs = LOCKOUT_MS - (now - record.firstAttemptAt)
    return { blocked: true, remainingMs }
  }

  return { blocked: false }
}

export function recordFailedAttempt(ip: string) {
  const now = Date.now()
  const record = failedAttempts.get(ip)

  if (!record || now - record.firstAttemptAt > LOCKOUT_MS) {
    failedAttempts.set(ip, { count: 1, firstAttemptAt: now })
  } else {
    failedAttempts.set(ip, { count: record.count + 1, firstAttemptAt: record.firstAttemptAt })
  }
}

export function clearFailedAttempts(ip: string) {
  failedAttempts.delete(ip)
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase environment variables in middleware')
      return supabaseResponse
    }

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
    const isLoginPage = request.nextUrl.pathname === '/admin/login'

    if (!user && isAdminRoute && !isLoginPage) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }

    // Server-side activity timeout check using last-active cookie
    if (user && isAdminRoute && !isLoginPage) {
      const lastActive = request.cookies.get('admin_last_active')?.value
      const now = Date.now()

      if (!lastActive) {
        await supabase.auth.signOut()
        const url = request.nextUrl.clone()
        url.pathname = '/admin/login'
        url.searchParams.set('message', 'Please log in to continue.')
        return NextResponse.redirect(url)
      }

      const elapsed = now - parseInt(lastActive, 10)
      if (elapsed > SESSION_TIMEOUT_MS) {
        await supabase.auth.signOut()
        const url = request.nextUrl.clone()
        url.pathname = '/admin/login'
        url.searchParams.set('message', 'Session expired due to inactivity. Please log in again.')
        const redirectResponse = NextResponse.redirect(url)
        redirectResponse.cookies.delete('admin_last_active')
        return redirectResponse
      }

      supabaseResponse.cookies.set('admin_last_active', String(now), {
        httpOnly: true,
        sameSite: 'lax',
        path: '/admin',
        maxAge: 60 * 60,
      })
    }
  } catch (error) {
    console.error('Middleware error:', error)
    // On error, just allow the request to proceed instead of crashing the site
    return NextResponse.next({ request })
  }

  return supabaseResponse
}
