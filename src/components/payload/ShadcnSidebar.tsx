'use client'

import React from 'react'
import Link from 'next/link'
import { useConfig } from '@payloadcms/ui'
import { LayoutDashboard, Users, FileText, Settings, KeySquare, HelpCircle } from 'lucide-react'

export const ShadcnSidebar = () => {
  const { config } = useConfig()

  return (
    <aside className="w-[260px] border-r border-slate-200 bg-white h-screen flex flex-col shrink-0 sticky top-0 hidden md:flex">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-slate-900 leading-tight">Shadcn Admin</span>
            <span className="text-xs text-slate-500 leading-tight">Vite + ShadcnUI</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* General Group */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 mb-2 px-2">General</h4>
          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center gap-3 px-2 py-2 bg-slate-100 text-slate-900 rounded-md font-medium text-sm">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </nav>
        </div>

        {/* Collections Group */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 mb-2 px-2">Collections</h4>
          <nav className="space-y-1">
            <Link href="/admin/collections/pages" className="flex items-center gap-3 px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md font-medium text-sm transition-colors">
              <FileText className="w-4 h-4" />
              Pages
            </Link>
            <Link href="/admin/collections/users" className="flex items-center gap-3 px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md font-medium text-sm transition-colors">
              <Users className="w-4 h-4" />
              Users
            </Link>
          </nav>
        </div>

        {/* Globals Group */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 mb-2 px-2">Globals</h4>
          <nav className="space-y-1">
            <Link href="/admin/globals/home-page" className="flex items-center gap-3 px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md font-medium text-sm transition-colors">
              <Settings className="w-4 h-4" />
              Home Page
            </Link>
          </nav>
        </div>
        
        {/* Pages (Static Links for Demo) */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 mb-2 px-2">Pages</h4>
          <nav className="space-y-1">
            <Link href="#" className="flex items-center gap-3 px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md font-medium text-sm transition-colors">
              <KeySquare className="w-4 h-4" />
              Auth
            </Link>
          </nav>
        </div>

        {/* Other */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 mb-2 px-2">Other</h4>
          <nav className="space-y-1">
            <Link href="#" className="flex items-center gap-3 px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md font-medium text-sm transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <Link href="#" className="flex items-center gap-3 px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md font-medium text-sm transition-colors">
              <HelpCircle className="w-4 h-4" />
              Help Center
            </Link>
          </nav>
        </div>

      </div>
      
      {/* Profile Footer */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
            <span className="text-slate-600 font-medium text-xs">SN</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-slate-900">satnaing</span>
            <span className="text-xs text-slate-500 truncate w-32">satnaingdev@gmail.com</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
