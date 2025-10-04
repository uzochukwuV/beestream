"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, TrendingUp, Heart, Music2, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BrowseHeader from "@/components/browse/BrowseHeader"
import TrackGrid from "@/components/browse/TrackGrid"
import MusicPlayer from "@/components/browse/MusicPlayer"
import CategoryFilter from "@/components/browse/CategoryFilter"
import { useBrowseMusic } from "@/hooks/useBrowseMusic"

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("trending")
  const { tracks, isLoading, currentTrack, setCurrentTrack } = useBrowseMusic({
    searchQuery,
    category: selectedCategory,
    sortBy: activeTab,
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <BrowseHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pb-32">
        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for tracks, artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-card border-border/50 focus:border-primary"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

        {/* Tabs for sorting */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="trending" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="most-played" className="gap-2">
              <Music2 className="h-4 w-4" />
              Most Played
            </TabsTrigger>
            <TabsTrigger value="most-liked" className="gap-2">
              <Heart className="h-4 w-4" />
              Most Liked
            </TabsTrigger>
            <TabsTrigger value="new" className="gap-2">
              <Sparkles className="h-4 w-4" />
              New Releases
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            <TrackGrid
              tracks={tracks}
              isLoading={isLoading}
              onPlayTrack={setCurrentTrack}
              currentTrack={currentTrack}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Fixed Music Player */}
      {currentTrack && <MusicPlayer track={currentTrack} onClose={() => setCurrentTrack(null)} />}
    </div>
  )
}
