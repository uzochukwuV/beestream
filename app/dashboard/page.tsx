"use client"

import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { MusicFeed } from "@/components/dashboard/MusicFeed"
import { useAccount } from "wagmi"
import { motion } from "framer-motion"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function DashboardPage() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 p-8 rounded-lg border border-border bg-card"
        >
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold text-primary">BeeStream</h1>
            <p className="text-muted-foreground text-center max-w-md">
              Connect your wallet to access your creator dashboard and start sharing your music on the decentralized
              network
            </p>
          </div>
          <ConnectButton />
        </motion.div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <MusicFeed />
    </DashboardLayout>
  )
}
