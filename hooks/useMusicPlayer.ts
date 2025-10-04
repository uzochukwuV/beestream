"use client"

import { useState, useEffect, useRef } from "react"
import { useDownloadPiece } from "./useDownloadPiece"
import type { MusicData } from "@/types/platform"
import JSZip from "jszip"

export function useMusicPlayer(pieceCid: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [musicData, setMusicData] = useState<MusicData | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { downloadMutation } = useDownloadPiece(pieceCid, "music.zip")

  // Download and extract ZIP file
  useEffect(() => {
    const loadMusic = async () => {
      try {
        setIsLoading(true)

        // Download ZIP file from Filecoin
        const zipFile = await downloadMutation.mutateAsync()

        // Extract ZIP contents
        const zip = await JSZip.loadAsync(zipFile)

        // Extract audio file
        const audioFile = zip.file(/\.(mp3|wav|m4a)$/i)[0]
        if (audioFile) {
          const audioBlob = await audioFile.async("blob")
          const audioUrl = URL.createObjectURL(audioBlob)

          // Create audio element
          const audio = new Audio(audioUrl)
          audioRef.current = audio

          audio.addEventListener("loadedmetadata", () => {
            setDuration(audio.duration)
          })

          audio.addEventListener("timeupdate", () => {
            setCurrentTime(audio.currentTime)
          })

          audio.addEventListener("ended", () => {
            setIsPlaying(false)
          })
        }

        // Extract other files
        const videoFile = zip.file(/\.(mp4|webm)$/i)[0]
        const lyricsFile = zip.file("lyrics.txt")
        const metadataFile = zip.file("metadata.json")

        const data: MusicData = {
          audio_url: "",
          metadata: {
            title: "",
            artist: "",
          },
        }

        if (videoFile) {
          const videoBlob = await videoFile.async("blob")
          data.video_url = URL.createObjectURL(videoBlob)
        }

        if (lyricsFile) {
          data.lyrics = await lyricsFile.async("text")
        }

        if (metadataFile) {
          const metadataText = await metadataFile.async("text")
          data.metadata = JSON.parse(metadataText)
        }

        setMusicData(data)
        setIsLoading(false)
      } catch (error) {
        console.error("[v0] Error loading music:", error)
        setIsLoading(false)
      }
    }

    loadMusic()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [pieceCid])

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const seek = (time: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return {
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
  }
}
