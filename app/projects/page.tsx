'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Project {
  id: number
  name: string
  description: string
  status: 'active' | 'completed' | 'pending'
  progress: number
  team: number
  deadline: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'pending'>('all')

  useEffect(() => {
    setTimeout(() => {
      setProjects([
        {
          id: 1,
          name: 'Website Redesign',
          description: 'Complete overhaul of company website with modern design',
          status: 'active',
          progress: 65,
          team: 5,
          deadline: '2025-11-15'
        },
        {
          id: 2,
          name: 'Mobile App Development',
          description: 'iOS and Android app for customer portal',
          status: 'active',
          progress: 40,
          team: 8,
          deadline: '2025-12-01'
        },
        {
          id: 3,
          name: 'API Integration',
          description: 'Third-party payment gateway integration',
          status: 'completed',
          progress: 100,
          team: 3,
          deadline: '2025-10-20'
        },
        {
          id: 4,
          name: 'Database Migration',
          description: 'Migrate legacy database to cloud infrastructure',
          status: 'pending',
          progress: 10,
          team: 4,
          deadline: '2026-01-10'
        },
        {
          id: 5,
          name: 'Security Audit',
          description: 'Comprehensive security review and penetration testing',
          status: 'active',
          progress: 75,
          team: 6,
          deadline: '2025-10-31'
        },
        {
          id: 6,
          name: 'Marketing Campaign',
          description: 'Q4 digital marketing and social media campaign',
          status: 'completed',
          progress: 100,
          team: 7,
          deadline: '2025-10-15'
        }
      ])
      setLoading(false)
    }, 600)
  }, [])

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-secondary text-white'
      case 'completed': return 'bg-primary text-white'
      case 'pending': return 'bg-accent text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-light">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          <p className="mt-4 text-lg text-text-primary">Loading Projects...</p>
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
              <Link href="/" className="text-primary hover:underline text-sm mb-2 inline-block">← Back to Dashboard</Link>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary">Projects</h1>
              <p className="text-gray-600 mt-1">Manage and track all your projects</p>
            </div>
            <Link href="/projects/new" className="btn-accent text-sm sm:text-base">
              + New Project
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-responsive py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              filter === 'all'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Projects ({projects.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              filter === 'active'
                ? 'bg-secondary text-white shadow-lg'
                : 'bg-bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Active ({projects.filter(p => p.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              filter === 'completed'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Completed ({projects.filter(p => p.status === 'completed').length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              filter === 'pending'
                ? 'bg-accent text-white shadow-lg'
                : 'bg-bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Pending ({projects.filter(p => p.status === 'pending').length})
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card group hover:scale-[1.02] transition-transform">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{project.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-text-primary">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Project Details */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-gray-700 text-sm">{project.team} team members</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700 text-sm">{new Date(project.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Button */}
              <Link href={`/projects/${project.id}`} className="mt-4 block text-center py-2 bg-primary bg-opacity-10 text-primary font-semibold rounded-lg hover:bg-opacity-20 transition-all">
                View Details →
              </Link>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your filters or create a new project</p>
          </div>
        )}
      </main>
    </div>
  )
}
