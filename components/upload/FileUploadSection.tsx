"use client"

import type React from "react"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Music, ImageIcon, Video, FileText, Upload, X } from "lucide-react"
import type { MusicFormData } from "./MusicUploadForm"

interface FileUploadSectionProps {
  formData: MusicFormData
  updateFormData: (updates: Partial<MusicFormData>) => void
}

export function FileUploadSection({ formData, updateFormData }: FileUploadSectionProps) {
  const audioRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)
  const lyricsRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (type: keyof MusicFormData, file: File | null) => {
    updateFormData({ [type]: file })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const FileUploadCard = ({
    icon: Icon,
    title,
    description,
    file,
    accept,
    required,
    inputRef,
    onFileChange,
  }: {
    icon: any
    title: string
    description: string
    file: File | null
    accept: string
    required?: boolean
    inputRef: React.RefObject<HTMLInputElement>
    onFileChange: (file: File | null) => void
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 bg-card border-2 rounded-xl transition-all ${
        file ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        className="hidden"
      />

      {file ? (
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={() => onFileChange(null)}
              className="p-1 hover:bg-destructive/10 rounded transition-colors"
            >
              <X className="w-5 h-5 text-destructive" />
            </button>
          </div>

          {file.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(file) || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-32 object-cover rounded-lg"
            />
          )}

          {file.type.startsWith("audio/") && (
            <audio controls className="w-full">
              <source src={URL.createObjectURL(file)} />
            </audio>
          )}

          {file.type.startsWith("video/") && (
            <video controls className="w-full rounded-lg">
              <source src={URL.createObjectURL(file)} />
            </video>
          )}
        </div>
      ) : (
        <button onClick={() => inputRef.current?.click()} className="w-full text-left space-y-3 group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
              <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{title}</p>
                {required && <span className="text-xs text-destructive">*</span>}
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </button>
      )}
    </motion.div>
  )

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Upload Your Files</h3>
        <p className="text-sm text-muted-foreground">Upload your music files. Audio and cover image are required.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileUploadCard
          icon={Music}
          title="Audio File"
          description="MP3, WAV, FLAC (Max 100MB)"
          file={formData.audioFile}
          accept="audio/*"
          required
          inputRef={audioRef}
          onFileChange={(file) => handleFileSelect("audioFile", file)}
        />

        <FileUploadCard
          icon={ImageIcon}
          title="Cover Image"
          description="JPG, PNG (Min 1000x1000px)"
          file={formData.coverImage}
          accept="image/*"
          required
          inputRef={imageRef}
          onFileChange={(file) => handleFileSelect("coverImage", file)}
        />

        <FileUploadCard
          icon={Video}
          title="Music Video"
          description="MP4, MOV (Optional)"
          file={formData.musicVideo}
          accept="video/*"
          inputRef={videoRef}
          onFileChange={(file) => handleFileSelect("musicVideo", file)}
        />

        <FileUploadCard
          icon={FileText}
          title="Lyrics File"
          description="TXT, LRC (Optional)"
          file={formData.lyricsFile}
          accept=".txt,.lrc"
          inputRef={lyricsRef}
          onFileChange={(file) => handleFileSelect("lyricsFile", file)}
        />
      </div>
    </div>
  )
}
