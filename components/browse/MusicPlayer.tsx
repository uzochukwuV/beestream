"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, X, Loader2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { MusicSubmission } from "@/types/platform"
import { useMusicPlayer } from "@/hooks/useMusicPlayer"

interface MusicPlayerProps {
  track: MusicSubmission
  onClose: () => void
}

export default function MusicPlayer({ track, onClose }: MusicPlayerProps) {
  const {
    isLoading,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    musicData,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
  } = useMusicPlayer(track.piece_cid)

  const [isLiked, setIsLiked] = useState(false)
  const [showFullPlayer, setShowFullPlayer] = useState(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const gradientStyle = track.gradient_colors
    ? { background: `linear-gradient(135deg, ${track.gradient_colors.from}, ${track.gradient_colors.to})` }
    : { background: "linear-gradient(135deg, #00d9ff, #ff006e)" }

  return (
    <>
      {/* Mini Player */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-card/95 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Track Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={() => setShowFullPlayer(true)}
              >
                <img
                  src={track.cover_photo_url || "/placeholder.svg"}
                  alt={track.track_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-sm truncate">{track.track_name}</h4>
                <p className="text-xs text-muted-foreground truncate">{track.artist_name}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : (
                <>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 fill-current" />
                    ) : (
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    )}
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Progress */}
            <div className="hidden md:flex items-center gap-2 flex-1">
              <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={(value) => seek(value[0])}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-10">{formatTime(duration || 0)}</span>
            </div>

            {/* Volume & Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`h-4 w-4 ${isLiked ? "fill-pink-500 text-pink-500" : ""}`} />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
                className="w-24"
              />
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setShowFullPlayer(true)}>
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>

            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Full Player Modal */}
      <AnimatePresence>
        {showFullPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <h2 className="text-lg font-semibold">Now Playing</h2>
                <Button size="icon" variant="ghost" onClick={() => setShowFullPlayer(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-2xl mx-auto">
                  {/* Large Cover */}
                  <motion.div className="aspect-square rounded-2xl overflow-hidden mb-8 shadow-2xl" layoutId="cover">
                    <div className="relative w-full h-full">
                      <img
                        src={track.cover_photo_url || "/placeholder.svg"}
                        alt={track.track_name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 opacity-20" style={gradientStyle} />
                    </div>
                  </motion.div>

                  {/* Track Info */}
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">{track.track_name}</h1>
                    <p className="text-xl text-muted-foreground">{track.artist_name}</p>
                  </div>

                  {/* Lyrics */}
                  {musicData?.lyrics && (
                    <div className="mb-8 p-6 rounded-lg bg-card border border-border/50">
                      <h3 className="text-lg font-semibold mb-4">Lyrics</h3>
                      <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{musicData.lyrics}</p>
                    </div>
                  )}

                  {/* Video Player */}
                  {musicData?.video_url && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Music Video</h3>
                      <video src={musicData.video_url} controls className="w-full rounded-lg" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
