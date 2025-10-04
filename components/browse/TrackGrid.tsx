"use client"

import { motion } from "framer-motion"
import TrackCard from "./TrackCard"
import type { MusicSubmission } from "@/types/platform"
import { Loader2 } from "lucide-react"

interface TrackGridProps {
  tracks: MusicSubmission[]
  isLoading: boolean
  onPlayTrack: (track: MusicSubmission) => void
  currentTrack: MusicSubmission | null
}

export default function TrackGrid({ tracks, isLoading, onPlayTrack, currentTrack }: TrackGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (tracks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">No tracks found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {tracks.map((track, index) => (
        <motion.div
          key={track.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <TrackCard track={track} onPlay={() => onPlayTrack(track)} isPlaying={currentTrack?.id === track.id} />
        </motion.div>
      ))}
    </div>
  )
}
