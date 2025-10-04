"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { DataSet } from "@/types"
import { Music, Calendar, HardDrive, Globe, Lock, MoreVertical, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ListMusicDialog } from "./ListMusicDialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ContentCardProps {
  dataset: DataSet
  index: number
  onUpdate: () => void
}

export function ContentCard({ dataset, index, onUpdate }: ContentCardProps) {
  const [showListDialog, setShowListDialog] = useState(false)
  const [isListed, setIsListed] = useState(false) // In production, check against DB

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatSize = (bytes: bigint) => {
    const gb = Number(bytes) / 1024 ** 3
    return `${gb.toFixed(2)} GB`
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
      >
        {/* Cover Image Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Music className="w-16 h-16 text-primary/40" />
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                isListed
                  ? "bg-green-500/20 text-green-500 border border-green-500/30"
                  : "bg-orange-500/20 text-orange-500 border border-orange-500/30"
              }`}
            >
              {isListed ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
              {isListed ? "Listed" : "Private"}
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button size="sm" variant="secondary">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-balance line-clamp-1">{dataset.data?.name || "Untitled"}</h3>
            <p className="text-sm text-muted-foreground">{dataset.data?.pieces?.length || 0} files</p>
          </div>

          {/* Metadata */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Uploaded {formatDate(Number(dataset.createdAt))}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <HardDrive className="w-4 h-4" />
              <span>{formatSize(dataset.currentSize)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            {isListed ? (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => {
                  // Unlist logic
                  setIsListed(false)
                  onUpdate()
                }}
              >
                <Lock className="w-4 h-4 mr-2" />
                Unlist
              </Button>
            ) : (
              <Button variant="default" size="sm" className="flex-1" onClick={() => setShowListDialog(true)}>
                <Globe className="w-4 h-4 mr-2" />
                List to Platform
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Download</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>

      <ListMusicDialog
        open={showListDialog}
        onOpenChange={setShowListDialog}
        dataset={dataset}
        onSuccess={() => {
          setIsListed(true)
          onUpdate()
        }}
      />
    </>
  )
}
