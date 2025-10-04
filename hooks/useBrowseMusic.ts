"use client"

import { useState, useEffect } from "react"
import type { MusicSubmission } from "@/types/platform"

// Mock data for development - replace with actual API calls
const mockTracks: MusicSubmission[] = [
  {
    id: "1",
    piece_cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    track_name: "Midnight Vibes",
    artist_name: "DJ Afrobeat",
    artist_address: "0x1234567890123456789012345678901234567890",
    duration: 245,
    cover_photo_url: "/abstract-music-cover.png",
    category: "Afrobeats",
    gradient_colors: { from: "#00d9ff", to: "#ff006e" },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    piece_cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    track_name: "Summer Breeze",
    artist_name: "Smooth Sounds",
    artist_address: "0x2345678901234567890123456789012345678901",
    duration: 198,
    cover_photo_url: "/electronic-music-cover.png",
    category: "R&B",
    gradient_colors: { from: "#ff006e", to: "#ffbe0b" },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

interface UseBrowseMusicProps {
  searchQuery?: string
  category?: string | null
  sortBy?: string
}

export function useBrowseMusic({ searchQuery, category, sortBy }: UseBrowseMusicProps) {
  const [tracks, setTracks] = useState<MusicSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentTrack, setCurrentTrack] = useState<MusicSubmission | null>(null)

  useEffect(() => {
    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      let filteredTracks = [...mockTracks]

      // Filter by search query
      if (searchQuery) {
        filteredTracks = filteredTracks.filter(
          (track) =>
            track.track_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            track.artist_name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      // Filter by category
      if (category) {
        filteredTracks = filteredTracks.filter((track) => track.category === category)
      }

      // Sort by criteria
      // In production, this would be handled by the API

      setTracks(filteredTracks)
      setIsLoading(false)
    }, 500)
  }, [searchQuery, category, sortBy])

  return {
    tracks,
    isLoading,
    currentTrack,
    setCurrentTrack,
  }
}
