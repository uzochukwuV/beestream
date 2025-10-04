"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Upload, FileArchive, Music } from "lucide-react"
import { motion } from "framer-motion"

interface UploadZoneProps {
  onFileSelect: (file: File) => void
}

export function UploadZone({ onFileSelect }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      const zipFile = files.find((f) => f.name.endsWith(".zip"))

      if (zipFile) {
        onFileSelect(zipFile)
      }
    },
    [onFileSelect],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative border-2 border-dashed rounded-xl p-12 transition-all ${
        isDragging ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50 hover:bg-accent/50"
      }`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".zip"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        id="file-upload"
      />

      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="p-6 bg-primary/10 rounded-full">
            <FileArchive className="w-12 h-12 text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 p-2 bg-accent rounded-full border-2 border-background">
            <Music className="w-4 h-4 text-primary" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">{isDragging ? "Drop your music here" : "Upload Music Package"}</h3>
          <p className="text-muted-foreground mb-4">Drag and drop your ZIP file or click to browse</p>
          <label
            htmlFor="file-upload"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer"
          >
            <Upload className="w-5 h-5" />
            Choose File
          </label>
        </div>

        <div className="pt-4 border-t border-border w-full max-w-md">
          <p className="text-sm text-muted-foreground mb-2">Your ZIP should contain:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Audio file (.mp3, .wav)
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Cover art (.jpg, .png)
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Metadata (.json)
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Video (optional)
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
