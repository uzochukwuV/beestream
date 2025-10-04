"use client"

import { useBalances } from "@/hooks/useBalances"
import { useDatasets } from "@/hooks/useDatasets"
import { motion } from "framer-motion"
import { X, TrendingUp, Database, Clock, DollarSign } from "lucide-react"

interface RightSidebarProps {
  onClose: () => void
}

export function RightSidebar({ onClose }: RightSidebarProps) {
  const { data: balances, isLoading: isLoadingBalances } = useBalances()
  const { data: datasetsData, isLoading: isLoadingDatasets } = useDatasets()

  const metrics = [
    {
      icon: DollarSign,
      label: "USDFC Balance",
      value: isLoadingBalances ? "..." : `$${balances.usdfcBalanceFormatted.toFixed(2)}`,
      color: "text-primary",
    },
    {
      icon: Database,
      label: "Storage Used",
      value: isLoadingBalances ? "..." : `${balances.currentStorageGB.toFixed(2)} GB`,
      color: "text-accent",
    },
    {
      icon: Clock,
      label: "Days Remaining",
      value: isLoadingBalances ? "..." : `${Math.floor(balances.persistenceDaysLeft)} days`,
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      label: "Total Uploads",
      value: isLoadingDatasets ? "..." : `${datasetsData?.datasets?.length || 0}`,
      color: "text-accent",
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Your Metrics</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-hover text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-card border border-border"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`${metric.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-muted-foreground">{metric.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
            </motion.div>
          )
        })}

        <div className="p-4 rounded-lg bg-card border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Storage Allowance</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rate Sufficient</span>
              <span className={balances.isRateSufficient ? "text-primary" : "text-accent"}>
                {balances.isRateSufficient ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Lockup Sufficient</span>
              <span className={balances.isLockupSufficient ? "text-primary" : "text-accent"}>
                {balances.isLockupSufficient ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <h3 className="text-sm font-semibold text-foreground mb-2">Warm Storage Balance</h3>
          <p className="text-2xl font-bold text-primary">${balances.warmStorageBalanceFormatted.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">Available for storage payments</p>
        </div>
      </div>
    </div>
  )
}
