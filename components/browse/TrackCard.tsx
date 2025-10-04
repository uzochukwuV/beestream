"use client"

import { motion } from "framer-motion"
import { Play, Pause, Heart } from "lucide-react"
import type { MusicSubmission } from "@/types/platform"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface TrackCardProps {
  track: MusicSubmission
  onPlay: () => void
  isPlaying: boolean
}

export default function TrackCard({ track, onPlay, isPlaying }: TrackCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const gradientStyle = track.gradient_colors
    ? { background: `linear-gradient(135deg, ${track.gradient_colors.from}, ${track.gradient_colors.to})` }
    : { background: "linear-gradient(135deg, #00d9ff, #ff006e)" }

  return (
    <motion.div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
    >
      {/* Cover Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
        <img
          src={track.cover_photo_url || "/placeholder.svg"}
          alt={track.track_name}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity" style={gradientStyle} />

        {/* Play Button Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            onClick={onPlay}
          >
            {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current ml-1" />}
          </Button>
        </motion.div>

        {/* Like Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-pink-500 text-pink-500" : "text-white"}`} />
        </Button>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-xs text-white">
          {formatDuration(track.duration)}
        </div>
      </div>

      {/* Track Info */}
      <div className="space-y-1">
        <h3 className="font-semibold text-sm line-clamp-1 text-foreground">{track.track_name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{track.artist_name}</p>
        <p className="text-xs text-muted-foreground/60 capitalize">{track.category}</p>
      </div>
    </motion.div>
  )
}
