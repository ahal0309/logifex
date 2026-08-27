'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000 // 30 minutes
const WARNING_BEFORE_MS = 2 * 60 * 1000      // warn 2 min before logout

const ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click']

export default function SessionGuard() {
  const router = useRouter()
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null)
  const warningToastRef = useRef<HTMLDivElement | null>(null)

  const logout = useCallback(async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login?message=Session expired due to inactivity')
  }, [router])

  const showWarning = useCallback(() => {
    // Show a visible countdown warning
    if (!warningToastRef.current) {
      const el = document.createElement('div')
      el.id = 'session-warning'
      el.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 99999;
        background: #b91c1c; color: white; padding: 16px 24px;
        border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        font-size: 14px; font-weight: 600; max-width: 320px;
        display: flex; flex-direction: column; gap: 8px;
      `
      el.innerHTML = `
        <div>⚠️ Session Expiring Soon</div>
        <div style="font-weight:400;opacity:0.9">You will be logged out in 2 minutes due to inactivity. Move your mouse to stay logged in.</div>
      `
      document.body.appendChild(el)
      warningToastRef.current = el
    }
  }, [])

  const hideWarning = useCallback(() => {
    if (warningToastRef.current) {
      warningToastRef.current.remove()
      warningToastRef.current = null
    }
  }, [])

  const resetTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current)
    hideWarning()

    // Set warning timer
    warningTimerRef.current = setTimeout(() => {
      showWarning()
    }, INACTIVITY_TIMEOUT_MS - WARNING_BEFORE_MS)

    // Set logout timer
    timerRef.current = setTimeout(() => {
      logout()
    }, INACTIVITY_TIMEOUT_MS)
  }, [logout, showWarning, hideWarning])

  useEffect(() => {
    // Start timers immediately
    resetTimers()

    // Listen for any user activity
    const handleActivity = () => resetTimers()
    ACTIVITY_EVENTS.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true })
    })

    // Also logout on page visibility change (e.g. closing laptop)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Re-validate session when user comes back
        resetTimers()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current)
      hideWarning()
      ACTIVITY_EVENTS.forEach(event => {
        document.removeEventListener(event, handleActivity)
      })
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [resetTimers, hideWarning])

  return null
}
