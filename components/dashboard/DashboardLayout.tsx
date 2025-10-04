"use client"

import { type ReactNode, useState } from "react"
import { TopNavbar } from "./TopNavbar"
import { LeftSidebar } from "./LeftSidebar"
import { RightSidebar } from "./RightSidebar"
import { motion, AnimatePresence } from "framer-motion"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <TopNavbar
        onToggleMetrics={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
        isMetricsOpen={isRightSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>

        <AnimatePresence>
          {isRightSidebarOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-80 border-l border-border bg-sidebar"
            >
              <RightSidebar onClose={() => setIsRightSidebarOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DashboardLayout
