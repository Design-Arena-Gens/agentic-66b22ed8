'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Task {
  id: number
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'in_progress' | 'completed'
  assignee: string
  dueDate: string
  project: string
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    assignee: '',
    dueDate: '',
    project: ''
  })

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        {
          id: 1,
          title: 'Update homepage design',
          description: 'Implement new hero section with responsive layout',
          priority: 'high',
          status: 'in_progress',
          assignee: 'Sarah Johnson',
          dueDate: '2025-10-25',
          project: 'Website Redesign'
        },
        {
          id: 2,
          title: 'Fix authentication bug',
          description: 'Users unable to login with social accounts',
          priority: 'high',
          status: 'todo',
          assignee: 'Mike Chen',
          dueDate: '2025-10-23',
          project: 'Mobile App Development'
        },
        {
          id: 3,
          title: 'Write API documentation',
          description: 'Document all REST endpoints and examples',
          priority: 'medium',
          status: 'in_progress',
          assignee: 'David Brown',
          dueDate: '2025-10-28',
          project: 'API Integration'
        },
        {
          id: 4,
          title: 'Setup CI/CD pipeline',
          description: 'Configure automated testing and deployment',
          priority: 'medium',
          status: 'todo',
          assignee: 'Emma Wilson',
          dueDate: '2025-11-02',
          project: 'Database Migration'
        },
        {
          id: 5,
          title: 'Design email templates',
          description: 'Create responsive email templates for notifications',
          priority: 'low',
          status: 'completed',
          assignee: 'John Smith',
          dueDate: '2025-10-20',
          project: 'Marketing Campaign'
        }
      ])
      setLoading(false)
    }, 600)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setTimeout(() => {
      const newTask: Task = {
        id: tasks.length + 1,
        ...formData,
        status: 'todo'
      }

      setTasks([newTask, ...tasks])
      setShowNewTaskForm(false)
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        assignee: '',
        dueDate: '',
        project: ''
      })
    }, 500)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-error text-white'
      case 'medium': return 'bg-accent text-white'
      case 'low': return 'bg-secondary text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-secondary bg-opacity-10 text-secondary border-secondary'
      case 'in_progress': return 'bg-primary bg-opacity-10 text-primary border-primary'
      case 'todo': return 'bg-gray-100 text-gray-700 border-gray-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-light">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          <p className="mt-4 text-lg text-text-primary">Loading Tasks...</p>
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
              <h1 className="text-3xl sm:text-4xl font-bold text-primary">Tasks</h1>
              <p className="text-gray-600 mt-1">Manage your tasks and assignments</p>
            </div>
            <button
              onClick={() => setShowNewTaskForm(!showNewTaskForm)}
              className="btn-accent text-sm sm:text-base"
            >
              {showNewTaskForm ? 'Cancel' : '+ New Task'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-responsive py-8">
        {/* New Task Form */}
        {showNewTaskForm && (
          <div className="card mb-8 border-2 border-accent">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Create New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field h-24 resize-none"
                  placeholder="Enter task description"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'high' | 'medium' | 'low' })}
                    className="input-field"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                  <input
                    type="text"
                    required
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                    className="input-field"
                    placeholder="Assign to"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                  <input
                    type="text"
                    required
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="input-field"
                    placeholder="Project name"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Create Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewTaskForm(false)}
                  className="btn-secondary flex-1 bg-gray-500 hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="card hover:scale-[1.01] transition-transform">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-text-primary">{task.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{task.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-700">{task.assignee}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-gray-700">{task.project}</span>
                    </div>
                  </div>
                </div>

                <div className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm ${getStatusColor(task.status)}`}>
                  {task.status === 'in_progress' ? 'In Progress' : task.status === 'todo' ? 'To Do' : 'Completed'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No tasks yet</h3>
            <p className="text-gray-500">Create your first task to get started</p>
          </div>
        )}
      </main>
    </div>
  )
}
