"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Heart, Users, Calendar, MusicIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { MusicAnalytics as MusicAnalyticsType } from "@/types/platform"

// Mock data
const mockMusicList: MusicAnalyticsType[] = [
  {
    id: "1",
    piece_cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    title: "Blockchain Beats",
    artist_name: "DJ Crypto",
    artist_address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    duration: 245,
    cover_image_url: "/electronic-music-cover.png",
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
  {
    id: "2",
    piece_cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    title: "Afro Vibes",
    artist_name: "Kofi Beats",
    artist_address: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    duration: 198,
    cover_image_url: "/afrobeats-music-cover.jpg",
    audio_url: "",
    genre: "Afrobeats",
    created_at: "2024-02-10",
    updated_at: "2024-02-10",
    total_plays: 18932,
    total_likes: 3421,
    unique_listeners: 2341,
    plays_today: 432,
    plays_month: 12341,
    plays_year: 18932,
  },
]

const mockDailyPlays = [
  { date: "Jan 1", plays: 120 },
  { date: "Jan 2", plays: 145 },
  { date: "Jan 3", plays: 168 },
  { date: "Jan 4", plays: 192 },
  { date: "Jan 5", plays: 234 },
  { date: "Jan 6", plays: 289 },
  { date: "Jan 7", plays: 265 },
]

export default function MusicAnalytics() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMusic, setSelectedMusic] = useState<MusicAnalyticsType | null>(null)
  const [sortBy, setSortBy] = useState("plays")

  const handleSelectMusic = (music: MusicAnalyticsType) => {
    setSelectedMusic(music)
  }

  const filteredMusic = mockMusicList.filter(
    (music) =>
      music.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      music.artist_name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by title or artist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-background border-border">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plays">Most Plays</SelectItem>
                <SelectItem value="likes">Most Likes</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Music List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">All Music</h3>
          {filteredMusic.map((music) => (
            <motion.div
              key={music.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleSelectMusic(music)}
              className={`cursor-pointer p-4 rounded-lg border transition-all ${
                selectedMusic?.id === music.id
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={music.cover_image_url || "/placeholder.svg"}
                  alt={music.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{music.title}</h4>
                  <p className="text-sm text-muted-foreground">{music.artist_name}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      {music.total_plays.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {music.total_likes.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Analytics */}
        {selectedMusic ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Track Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <img
                    src={selectedMusic.cover_image_url || "/placeholder.svg"}
                    alt={selectedMusic.title}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-1">{selectedMusic.title}</h3>
                    <p className="text-muted-foreground mb-2">{selectedMusic.artist_name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary">{selectedMusic.genre}</span>
                      <span>
                        {Math.floor(selectedMusic.duration / 60)}:
                        {(selectedMusic.duration % 60).toString().padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Total Plays</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{selectedMusic.total_plays.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">Total Likes</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{selectedMusic.total_likes.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Unique Listeners</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {selectedMusic.unique_listeners.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Plays Today</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{selectedMusic.plays_today.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>7-Day Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={mockDailyPlays}>
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
                    <Line
                      type="monotone"
                      dataKey="plays"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <Card className="bg-card border-border">
            <CardContent className="p-12 text-center">
              <MusicIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Select a Track</h3>
              <p className="text-muted-foreground">Click on any music track to view detailed analytics</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
