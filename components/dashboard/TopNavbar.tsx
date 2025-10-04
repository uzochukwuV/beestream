"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useBalances } from "@/hooks/useBalances"
import { motion } from "framer-motion"
import { Music2, BarChart3 } from "lucide-react"

interface TopNavbarProps {
  onToggleMetrics: () => void
  isMetricsOpen: boolean
}

export function TopNavbar({ onToggleMetrics, isMetricsOpen }: TopNavbarProps) {
  const { data: balances, isLoading } = useBalances()

  return (
    <nav className="h-16 border-b border-border bg-sidebar/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Music2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">BeeStream</span>
          </motion.div>
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border"
          >
            <span className="text-sm text-muted-foreground">Balance:</span>
            <span className="text-sm font-semibold text-primary">
              {isLoading ? "..." : `$${balances.usdfcBalanceFormatted.toFixed(2)}`}
            </span>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleMetrics}
            className={`p-2 rounded-lg transition-colors ${
              isMetricsOpen
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-hover"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
          </motion.button>

          <ConnectButton />
        </div>
      </div>
    </nav>
  )
}
