"use client"

import { useEffect, useState } from "react"
import { DollarSign, HardDrive, Calendar, TrendingUp } from "lucide-react"
import { useEthersSigner } from "@/hooks/useEthers"
import { Synapse } from "@filoz/synapse-sdk"
import { fetchWarmStorageBalanceData } from "@/utils/warmStorageUtils"
import { config } from "@/config"
import { formatUnits } from "ethers"

interface CostCalculatorProps {
  fileSize: number
}

export function CostCalculator({ fileSize }: CostCalculatorProps) {
  const [cost, setCost] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const signer = useEthersSigner()

  useEffect(() => {
    const calculateCost = async () => {
      if (!signer || !fileSize) return

      setLoading(true)
      try {
        const synapse = await Synapse.create({
          signer,
          disableNonceManager: false,
          withCDN: config.withCDN,
        })

        const balanceData = await fetchWarmStorageBalanceData(synapse, fileSize, config.persistencePeriod)

        const totalCost = balanceData.costs.perEpoch
        const formattedCost = formatUnits(totalCost, 18)
        setCost(formattedCost)
      } catch (error) {
        console.error("Failed to calculate cost:", error)
        setCost(null)
      } finally {
        setLoading(false)
      }
    }

    calculateCost()
  }, [fileSize, signer])

  const fileSizeInMB = (fileSize / (1024 * 1024)).toFixed(2)

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <DollarSign className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Storage Cost</h3>
          <p className="text-sm text-muted-foreground">Estimated cost for your upload</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-background rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HardDrive className="w-4 h-4" />
            File Size
          </div>
          <span className="font-medium text-foreground">{fileSizeInMB} MB</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-background rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Storage Period
          </div>
          <span className="font-medium text-foreground">{config.persistencePeriod} days</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <TrendingUp className="w-4 h-4 text-primary" />
            Total Cost
          </div>
          {loading ? (
            <div className="h-5 w-20 bg-muted animate-pulse rounded" />
          ) : cost ? (
            <span className="font-bold text-primary">{cost} USDFC</span>
          ) : (
            <span className="text-sm text-muted-foreground">Calculating...</span>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Cost includes storage on Filecoin network {config.withCDN ? "with CDN" : "without CDN"}. Actual cost may vary
        slightly based on network conditions.
      </p>
    </div>
  )
}
