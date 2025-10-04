"use client"

import { Music, FileText, Video, File } from "lucide-react"
import { motion } from "framer-motion"

export interface MusicData {
  audio?: { name: string; size: number; url: string }
  image?: { name: string; size: number; url: string }
  metadata?: { name: string; size: number; content: any }
  video?: { name: string; size: number; url: string }
  lyrics?: { name: string; size: number; content: string }
  otherFiles: { name: string; size: number }[]
}

interface MusicPreviewProps {
  musicData: MusicData
}

export function MusicPreview({ musicData }: MusicPreviewProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Preview Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-semibold mb-2">Music Package Preview</h3>
        <p className="text-sm text-muted-foreground">Review your music files before uploading to Filecoin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Left Column - Media Preview */}
        <div className="space-y-4">
          {/* Cover Art */}
          {musicData.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-square rounded-lg overflow-hidden bg-muted"
            >
              <img
                src={musicData.image.url || "/placeholder.svg"}
                alt="Cover art"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Audio Player */}
          {musicData.audio && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-background rounded-lg border border-border"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Music className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{musicData.audio.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(musicData.audio.size)}</p>
                </div>
              </div>
              <audio controls className="w-full">
                <source src={musicData.audio.url} />
              </audio>
            </motion.div>
          )}

          {/* Video Preview */}
          {musicData.video && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-lg overflow-hidden bg-muted"
            >
              <video controls className="w-full">
                <source src={musicData.video.url} />
              </video>
              <div className="p-3 bg-background border-t border-border">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-primary" />
                  <p className="text-sm font-medium truncate">{musicData.video.name}</p>
                  <span className="text-xs text-muted-foreground ml-auto">{formatFileSize(musicData.video.size)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column - Metadata & Files */}
        <div className="space-y-4">
          {/* Metadata */}
          {musicData.metadata && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-background rounded-lg border border-border"
            >
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Metadata</h4>
              </div>
              <div className="space-y-2 text-sm">
                {musicData.metadata.content.title && (
                  <div>
                    <span className="text-muted-foreground">Title:</span>
                    <span className="ml-2 font-medium">{musicData.metadata.content.title}</span>
                  </div>
                )}
                {musicData.metadata.content.artist && (
                  <div>
                    <span className="text-muted-foreground">Artist:</span>
                    <span className="ml-2 font-medium">{musicData.metadata.content.artist}</span>
                  </div>
                )}
                {musicData.metadata.content.album && (
                  <div>
                    <span className="text-muted-foreground">Album:</span>
                    <span className="ml-2 font-medium">{musicData.metadata.content.album}</span>
                  </div>
                )}
                {musicData.metadata.content.genre && (
                  <div>
                    <span className="text-muted-foreground">Genre:</span>
                    <span className="ml-2 font-medium">{musicData.metadata.content.genre}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Lyrics */}
          {musicData.lyrics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-background rounded-lg border border-border max-h-64 overflow-y-auto"
            >
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Lyrics</h4>
              </div>
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                {musicData.lyrics.content}
              </pre>
            </motion.div>
          )}

          {/* Other Files */}
          {musicData.otherFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-background rounded-lg border border-border"
            >
              <div className="flex items-center gap-2 mb-3">
                <File className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Additional Files</h4>
              </div>
              <div className="space-y-2">
                {musicData.otherFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between text-sm p-2 bg-card rounded">
                    <span className="truncate">{file.name}</span>
                    <span className="text-muted-foreground ml-2">{formatFileSize(file.size)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
