"use client"

import { useDatasets } from "@/hooks/useDatasets"
import { MusicCard } from "./MusicCard"
import { motion } from "framer-motion"
import { Loader2, Music } from "lucide-react"

export function MusicFeed() {
  const { data: datasetsData, isLoading } = useDatasets()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const datasets = datasetsData?.datasets || []

  if (datasets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Music className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No music uploaded yet</h3>
            <p className="text-muted-foreground max-w-md">
              Start your journey by uploading your first track. Share your music with the world on the decentralized
              network.
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Your Music</h1>
        <p className="text-muted-foreground">Manage and share your uploaded tracks</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {datasets.map((dataset, index) => (
          <MusicCard key={dataset.pdpVerifierDataSetId} dataset={dataset} index={index} />
        ))}
      </div>
    </div>
  )
}
