import Link from 'next/link'
import { logout } from '../actions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import SessionGuard from './SessionGuard'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <Toaster position="top-right" />
      <SessionGuard />
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <Link href="/admin/dashboard" className="text-xl font-bold text-gray-900 tracking-tight">
            Logifex <span className="text-red-600">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <Link href="/admin/dashboard" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
            Dashboard
          </Link>
          
          <div className="pt-4 pb-2">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Media Management</h3>
          </div>
          <Link href="/admin/media" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
            Page Hero Media
          </Link>

          <div className="pt-4 pb-2">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tools</h3>
          </div>

          <Link href="/admin/careers" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
            Careers
          </Link>
          <Link href="/admin/insights" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
            Insights
          </Link>
          <Link href="/admin/gallery" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
            Gallery
          </Link>
          <Link href="/admin/images" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
            Images
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <form action={logout}>
            <button type="submit" className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors">
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
          <div className="text-sm text-gray-500">{user.email}</div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
