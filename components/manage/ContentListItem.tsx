"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { DataSet } from "@/types"
import { Music, Calendar, HardDrive, Globe, Lock, MoreVertical, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ListMusicDialog } from "./ListMusicDialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ContentListItemProps {
  dataset: DataSet
  index: number
  onUpdate: () => void
}

export function ContentListItem({ dataset, index, onUpdate }: ContentListItemProps) {
  const [showListDialog, setShowListDialog] = useState(false)
  const [isListed, setIsListed] = useState(false)

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
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.03 }}
        className="group bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
            <Music className="w-8 h-8 text-primary" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-lg line-clamp-1">{dataset.data?.name || "Untitled"}</h3>
                <p className="text-sm text-muted-foreground">{dataset.data?.pieces?.length || 0} files</p>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 flex-shrink-0 ${
                  isListed
                    ? "bg-green-500/20 text-green-500 border border-green-500/30"
                    : "bg-orange-500/20 text-orange-500 border border-orange-500/30"
                }`}
              >
                {isListed ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                {isListed ? "Listed" : "Private"}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(Number(dataset.createdAt))}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HardDrive className="w-4 h-4" />
                <span>{formatSize(dataset.currentSize)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>

            {isListed ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsListed(false)
                  onUpdate()
                }}
              >
                <Lock className="w-4 h-4 mr-2" />
                Unlist
              </Button>
            ) : (
              <Button variant="default" size="sm" onClick={() => setShowListDialog(true)}>
                <Globe className="w-4 h-4 mr-2" />
                List
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
