"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Music, Play, Heart, Users, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { ArtistStats } from "@/types/platform"
import Image from "next/image"

// Mock data
const mockArtistData: ArtistStats = {
  artist_address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  artist_name: "DJ Crypto",
  total_tracks: 12,
  total_plays: 45231,
  total_likes: 8932,
  unique_listeners: 3421,
  tracks: [
    {
      id: "1",
      piece_cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
      title: "Blockchain Beats",
      artist_name: "DJ Crypto",
      artist_address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      duration: 245,
      cover_image_url: "/abstract-music-cover.png",
      audio_url: "",
      genre: "Electronic",
      created_at: "2024-01-15",
      updated_at: "2024-01-15",
      total_plays: 12453,
      total_likes: 2341,
      unique_listeners: 1823,
      plays_today: 234,
      plays_month: 8932,
      plays_year: 12453,
    },
    // Add more mock tracks...
  ],
}

const mockPlaysTrend = [
  { date: "Mon", plays: 1200, likes: 230 },
  { date: "Tue", plays: 1450, likes: 280 },
  { date: "Wed", plays: 1680, likes: 310 },
  { date: "Thu", plays: 1920, likes: 350 },
  { date: "Fri", plays: 2340, likes: 420 },
  { date: "Sat", plays: 2890, likes: 510 },
  { date: "Sun", plays: 2650, likes: 480 },
]

export default function ArtistAnalytics() {
  const [searchAddress, setSearchAddress] = useState("")
  const [artistData, setArtistData] = useState<ArtistStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchAddress) return
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setArtistData(mockArtistData)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter artist wallet address (0x...)"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading} className="bg-primary hover:bg-primary/90">
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Artist Stats */}
      {artistData && (
        <>
          {/* Artist Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl">{artistData.artist_name}</CardTitle>
                <p className="text-sm text-muted-foreground font-mono">{artistData.artist_address}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Music className="w-4 h-4" />
                      <span className="text-sm">Total Tracks</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{artistData.total_tracks}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Total Plays</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{artistData.total_plays.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">Total Likes</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{artistData.total_likes.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Unique Listeners</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{artistData.unique_listeners.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Weekly Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockPlaysTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="plays"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="likes"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--accent))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tracks List */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>All Tracks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {artistData.tracks.map((track, index) => (
                    <div
                      key={track.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
                    >
                      <Image
                        src={track.cover_image_url || "/placeholder.svg"}
                        alt={track.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{track.title}</h4>
                        <p className="text-sm text-muted-foreground">{track.genre}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <p className="text-lg font-bold text-foreground">{track.total_plays.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Plays</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-foreground">{track.total_likes.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Likes</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-foreground">{track.unique_listeners.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Listeners</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}

      {/* Empty State */}
      {!artistData && !isLoading && (
        <Card className="bg-card border-border">
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Search for an Artist</h3>
            <p className="text-muted-foreground">Enter a wallet address to view detailed analytics for that artist</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
