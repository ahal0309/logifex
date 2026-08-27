import { login } from '../actions'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000 // 15 minutes

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/admin/dashboard')
  }

  // Read attempt tracking from httpOnly cookie
  const cookieStore = cookies()
  const attemptCookie = cookieStore.get('login_attempts')?.value
  let attempts = 0
  let firstAttemptAt = 0
  if (attemptCookie) {
    try {
      const parsed = JSON.parse(attemptCookie)
      attempts = parsed.count || 0
      firstAttemptAt = parsed.firstAttemptAt || 0
    } catch {}
  }

  const now = Date.now()
  // Reset if lockout period passed
  if (firstAttemptAt && now - firstAttemptAt > LOCKOUT_MS) {
    attempts = 0
    firstAttemptAt = 0
  }

  const isLocked = attempts >= MAX_ATTEMPTS
  const remainingMs = isLocked ? LOCKOUT_MS - (now - firstAttemptAt) : 0
  const remainingMins = Math.ceil(remainingMs / 60000)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Logifex Admin</h1>
          <p className="text-gray-500 text-sm">Secure access only</p>
        </div>

        {isLocked ? (
          <div className="p-5 bg-red-50 border border-red-200 rounded-xl text-center">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-red-700 font-semibold mb-1">Account Temporarily Locked</p>
            <p className="text-red-600 text-sm">
              Too many failed attempts. Please try again in <strong>{remainingMins} minute{remainingMins !== 1 ? 's' : ''}</strong>.
            </p>
          </div>
        ) : (
          <form action={login} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                required
                autoComplete="username"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                placeholder="admin@logifex.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {searchParams?.message && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <span className="text-red-500 mt-0.5">⚠️</span>
                <div>
                  <p className="text-red-700 text-sm font-medium">{searchParams.message}</p>
                  {attempts > 0 && attempts < MAX_ATTEMPTS && (
                    <p className="text-red-500 text-xs mt-1">
                      {MAX_ATTEMPTS - attempts} attempt{MAX_ATTEMPTS - attempts !== 1 ? 's' : ''} remaining before lockout
                    </p>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Sign In Securely
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          Sessions automatically expire after 30 minutes of inactivity.
        </p>
      </div>
    </div>
  )
}
