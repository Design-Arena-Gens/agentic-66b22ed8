'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface DashboardStats {
  totalUsers: number
  activeProjects: number
  pendingTasks: number
  completedTasks: number
}

interface RecentActivity {
  id: number
  user: string
  action: string
  timestamp: string
}

export default function Home() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activities, setActivities] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        activeProjects: 32,
        pendingTasks: 18,
        completedTasks: 156
      })

      setActivities([
        { id: 1, user: 'John Smith', action: 'Created new project "Website Redesign"', timestamp: '2 minutes ago' },
        { id: 2, user: 'Sarah Johnson', action: 'Completed task "Update API Documentation"', timestamp: '15 minutes ago' },
        { id: 3, user: 'Mike Chen', action: 'Uploaded design files', timestamp: '1 hour ago' },
        { id: 4, user: 'Emma Wilson', action: 'Added 5 new team members', timestamp: '2 hours ago' },
        { id: 5, user: 'David Brown', action: 'Published project milestone', timestamp: '3 hours ago' }
      ])

      setLoading(false)
    }, 800)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-light">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          <p className="mt-4 text-lg text-text-primary">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <header className="bg-bg-white shadow-md">
        <div className="container-responsive py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening</p>
            </div>
            <div className="flex gap-3">
              <Link href="/projects" className="btn-primary text-sm sm:text-base">
                View Projects
              </Link>
              <Link href="/tasks" className="btn-accent text-sm sm:text-base">
                New Task
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-responsive py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-primary to-blue-700 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total Users</p>
                <h3 className="text-4xl font-bold">{stats?.totalUsers.toLocaleString()}</h3>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <p className="text-blue-100 text-sm mt-4">↑ 12% from last month</p>
          </div>

          <div className="card bg-gradient-to-br from-secondary to-green-600 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Active Projects</p>
                <h3 className="text-4xl font-bold">{stats?.activeProjects}</h3>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-green-100 text-sm mt-4">↑ 8% from last month</p>
          </div>

          <div className="card bg-gradient-to-br from-accent to-orange-600 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium mb-1">Pending Tasks</p>
                <h3 className="text-4xl font-bold">{stats?.pendingTasks}</h3>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-orange-100 text-sm mt-4">3 due today</p>
          </div>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-700 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Completed</p>
                <h3 className="text-4xl font-bold">{stats?.completedTasks}</h3>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-purple-100 text-sm mt-4">This month</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
                <div className="flex-shrink-0 w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary font-medium">{activity.user}</p>
                  <p className="text-gray-600 text-sm mt-1">{activity.action}</p>
                  <p className="text-gray-400 text-xs mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Link href="/projects/new" className="card hover:border-2 hover:border-primary transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-primary bg-opacity-10 p-4 rounded-lg">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">New Project</h3>
                <p className="text-gray-600 text-sm mt-1">Create a new project</p>
              </div>
            </div>
          </Link>

          <Link href="/team" className="card hover:border-2 hover:border-secondary transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-secondary bg-opacity-10 p-4 rounded-lg">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Manage Team</h3>
                <p className="text-gray-600 text-sm mt-1">Add or edit team members</p>
              </div>
            </div>
          </Link>

          <Link href="/reports" className="card hover:border-2 hover:border-accent transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-accent bg-opacity-10 p-4 rounded-lg">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">View Reports</h3>
                <p className="text-gray-600 text-sm mt-1">Analytics and insights</p>
              </div>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-bg-white border-t border-gray-200 mt-16">
        <div className="container-responsive py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">© 2025 Professional Dashboard. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
