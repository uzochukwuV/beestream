"use client"

import { motion } from "framer-motion"
import { Play, Heart, Share2, MoreHorizontal } from "lucide-react"
import type { MusicFormData } from "./MusicUploadForm"

interface MusicPreviewCardProps {
  formData: MusicFormData
}

export function MusicPreviewCard({ formData }: MusicPreviewCardProps) {
  const coverUrl = formData.coverImage
    ? URL.createObjectURL(formData.coverImage)
    : "/placeholder.svg?height=400&width=400"

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <p className="text-sm font-medium text-muted-foreground">Platform Preview</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Cover Art with Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
        >
          <img
            src={coverUrl || "/placeholder.svg"}
            alt={formData.title || "Cover art"}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: `linear-gradient(135deg, ${formData.gradientColors[0]}CC, ${formData.gradientColors[1]}CC)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Track Info */}
        <div className="space-y-2">
          <h4 className="font-semibold text-lg line-clamp-1">{formData.title || "Untitled Track"}</h4>
          <p className="text-sm text-muted-foreground line-clamp-1">{formData.artist || "Unknown Artist"}</p>
          {formData.genre && (
            <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {formData.genre}
            </span>
          )}
        </div>

        {/* Description */}
        {formData.description && <p className="text-sm text-muted-foreground line-clamp-3">{formData.description}</p>}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <Play className="w-4 h-4" />
            Play
          </button>
          <button className="p-2 bg-background border border-border rounded-lg hover:bg-accent transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 bg-background border border-border rounded-lg hover:bg-accent transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 bg-background border border-border rounded-lg hover:bg-accent transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-lg font-semibold">0</p>
            <p className="text-xs text-muted-foreground">Plays</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">0</p>
            <p className="text-xs text-muted-foreground">Likes</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">0</p>
            <p className="text-xs text-muted-foreground">Shares</p>
          </div>
        </div>
      </div>
    </div>
  )
}
