"use client"

import type { DataSet } from "@/types"
import { motion } from "framer-motion"
import { Play, MoreVertical, Download, Share2, Music2 } from "lucide-react"
import { useState } from "react"

interface MusicCardProps {
  dataset: DataSet
  index: number
}

export function MusicCard({ dataset, index }: MusicCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Music2 className="w-8 h-8 text-primary" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg"
          >
            <Play className="w-6 h-6 text-white fill-white" />
          </motion.div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground truncate">
            Dataset #{dataset.pdpVerifierDataSetId.toString().slice(0, 8)}
          </h3>
          <p className="text-sm text-muted-foreground truncate">Provider: {dataset.provider?.id || "Unknown"}</p>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-xs text-muted-foreground">
              Size: {dataset.data?.size ? `${(Number(dataset.data.size) / 1024 / 1024).toFixed(2)} MB` : "N/A"}
            </span>
            <span className="text-xs text-muted-foreground">Files: {dataset.data?.files?.length || 0}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-hover text-muted-foreground hover:text-foreground transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-hover text-muted-foreground hover:text-foreground transition-colors"
          >
            <Download className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-hover text-muted-foreground hover:text-foreground transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {dataset.data?.files && dataset.data.files.length > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Files in this upload:</p>
            <div className="flex flex-wrap gap-2">
              {dataset.data.files.slice(0, 5).map((file, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                  {file.name}
                </span>
              ))}
              {dataset.data.files.length > 5 && (
                <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                  +{dataset.data.files.length - 5} more
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
