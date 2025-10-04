"use client"

import { useState } from "react"
import { useFileUpload } from "./useFileUpload"
import JSZip from "jszip"
import type { MusicData } from "@/components/upload/MusicPreview"
import type { MusicFormData } from "@/components/upload/MusicUploadForm"
import { useAccount } from "wagmi"

export function useMusicUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [musicData, setMusicData] = useState<MusicData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { address } = useAccount()

  const { uploadFileMutation, progress, uploadedInfo, handleReset: resetUpload, status } = useFileUpload()

  const createMusicZip = async (formData: MusicFormData): Promise<File> => {
    const zip = new JSZip()

    // Add audio file (required)
    if (formData.audioFile) {
      zip.file(formData.audioFile.name, formData.audioFile)
    }

    // Add cover image (required)
    if (formData.coverImage) {
      zip.file(formData.coverImage.name, formData.coverImage)
    }

    // Add optional files
    if (formData.musicVideo) {
      zip.file(formData.musicVideo.name, formData.musicVideo)
    }

    if (formData.lyricsFile) {
      zip.file(formData.lyricsFile.name, formData.lyricsFile)
    }

    // Create metadata JSON
    const metadata = {
      title: formData.title,
      artist: formData.artist,
      album: formData.album,
      genre: formData.genre,
      releaseDate: formData.releaseDate,
      description: formData.description,
      lyrics: formData.lyrics || (formData.lyricsFile ? "See lyrics file" : ""),
      gradientColors: formData.gradientColors,
      uploadedAt: new Date().toISOString(),
    }

    zip.file("metadata.json", JSON.stringify(metadata, null, 2))

    // Generate ZIP file
    const blob = await zip.generateAsync({ type: "blob" })
    const fileName = `${formData.artist || "Unknown"} - ${formData.title || "Untitled"}.zip`
      .replace(/[^a-z0-9\s\-_.]/gi, "")
      .replace(/\s+/g, "_")

    return new File([blob], fileName, { type: "application/zip" })
  }

  // Extract music data from ZIP file
  const extractMusicData = async (zipFile: File) => {
    try {
      setError(null)
      const zip = await JSZip.loadAsync(zipFile)
      const data: MusicData = { otherFiles: [] }

      // Process each file in the ZIP
      for (const [filename, file] of Object.entries(zip.files)) {
        if (file.dir) continue

        const blob = await file.async("blob")
        const size = blob.size
        const url = URL.createObjectURL(blob)

        // Categorize files
        if (filename.match(/\.(mp3|wav|flac|m4a|aac)$/i)) {
          data.audio = { name: filename, size, url }
        } else if (filename.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          data.image = { name: filename, size, url }
        } else if (filename.match(/\.(mp4|mov|avi|webm)$/i)) {
          data.video = { name: filename, size, url }
        } else if (filename.match(/\.json$/i)) {
          const text = await file.async("text")
          try {
            const content = JSON.parse(text)
            data.metadata = { name: filename, size, content }
          } catch {
            data.otherFiles.push({ name: filename, size })
          }
        } else if (filename.match(/\.(txt|lrc)$/i)) {
          const content = await file.async("text")
          data.lyrics = { name: filename, size, content }
        } else {
          data.otherFiles.push({ name: filename, size })
        }
      }

      setMusicData(data)
    } catch (err) {
      console.error("Failed to extract music data:", err)
      setError("Failed to read ZIP file. Please ensure it's a valid ZIP archive.")
    }
  }

  // Encrypt file with password and address
  const encryptFile = async (file: File, password: string): Promise<File> => {
    if (!address) throw new Error("Wallet not connected")

    // Simple encryption using address + password as key
    // In production, use proper encryption library like crypto-js
    const arrayBuffer = await file.arrayBuffer()
    const bytes = new Uint8Array(arrayBuffer)

    // Create encryption key from address + password
    const key = `${address}-${password}`
    const encoder = new TextEncoder()
    const keyBytes = encoder.encode(key)

    // XOR encryption (simple, for demo - use proper encryption in production)
    const encrypted = new Uint8Array(bytes.length)
    for (let i = 0; i < bytes.length; i++) {
      encrypted[i] = bytes[i] ^ keyBytes[i % keyBytes.length]
    }

    // Create encrypted file
    const encryptedBlob = new Blob([encrypted], { type: file.type })
    return new File([encryptedBlob], `encrypted_${file.name}`, {
      type: file.type,
    })
  }

  const uploadMusicPackage = async (formData: MusicFormData, password?: string) => {
    try {
      setError(null)

      // Create ZIP from form data
      const zipFile = await createMusicZip(formData)

      // Upload with or without encryption
      if (password) {
        const encryptedFile = await encryptFile(zipFile, password)
        await uploadFileMutation.mutateAsync(encryptedFile)
      } else {
        await uploadFileMutation.mutateAsync(zipFile)
      }
    } catch (err: any) {
      setError(err.message || "Upload failed")
      throw err
    }
  }

  // Upload with encryption
  const uploadWithEncryption = async (file: File, password: string) => {
    try {
      setError(null)
      const encryptedFile = await encryptFile(file, password)
      await uploadFileMutation.mutateAsync(encryptedFile)
    } catch (err: any) {
      setError(err.message || "Upload failed")
      throw err
    }
  }

  // Upload without encryption
  const uploadWithoutEncryption = async (file: File) => {
    try {
      setError(null)
      await uploadFileMutation.mutateAsync(file)
    } catch (err: any) {
      setError(err.message || "Upload failed")
      throw err
    }
  }

  const handleReset = () => {
    resetUpload()
    setFile(null)
    setMusicData(null)
    setError(null)
  }

  return {
    file,
    setFile,
    musicData,
    extractMusicData,
    uploadMusicPackage, // Added new function to exports
    uploadWithEncryption,
    uploadWithoutEncryption,
    progress,
    status,
    uploadedInfo,
    isUploading: uploadFileMutation.isPending,
    error,
    handleReset,
  }
}
