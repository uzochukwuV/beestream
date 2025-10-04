"use client"

import { motion } from "framer-motion"
import { Home, Upload, Music, Wallet, Settings, TrendingUp, BarChart3, FolderOpen } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Music, label: "My Music", href: "/dashboard/music" },
  { icon: Upload, label: "Upload", href: "/dashboard/upload" },
  { icon: FolderOpen, label: "Manage", href: "/dashboard/manage" },
  { icon: TrendingUp, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Wallet, label: "Earnings", href: "/dashboard/earnings" },
  { icon: BarChart3, label: "Platform", href: "/platform" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function LeftSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex-shrink-0 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-hover hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 mt-8">
        <div className="p-4 rounded-lg bg-card border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-2">Creator Tip</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Upload your music as ZIP files containing audio, artwork, and metadata for the best experience.
          </p>
        </div>
      </div>
    </aside>
  )
}
