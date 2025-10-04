"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Music, Users, TrendingUp } from "lucide-react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import PlatformOverview from "@/components/platform/PlatformOverview"
import ArtistAnalytics from "@/components/platform/ArtistAnalytics"
import MusicAnalytics from "@/components/platform/MusicAnalytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PlatformDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background p-6 lg:p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Platform Analytics</h1>
          <p className="text-muted-foreground text-lg">Track music performance, user engagement, and platform growth</p>
        </motion.div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-8 bg-card border border-border">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="artists"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Users className="w-4 h-4 mr-2" />
              Artists
            </TabsTrigger>
            <TabsTrigger
              value="music"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Music className="w-4 h-4 mr-2" />
              Music
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <PlatformOverview />
          </TabsContent>

          <TabsContent value="artists" className="mt-0">
            <ArtistAnalytics />
          </TabsContent>

          <TabsContent value="music" className="mt-0">
            <MusicAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
