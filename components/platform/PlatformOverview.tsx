"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Music, Play, Heart, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import type { PlatformStats } from "@/types/platform"

// Mock data - replace with actual API calls
const mockPlatformStats: PlatformStats = {
  total_users: 12847,
  total_music: 3421,
  total_plays: 284932,
  total_likes: 45821,
  plays_today: 8234,
  plays_week: 52341,
  plays_month: 198432,
  active_users_today: 2341,
  active_users_week: 8932,
  active_users_month: 11234,
}

const mockPlaysTrend = [
  { date: "Jan", plays: 45000, users: 3200, likes: 8900 },
  { date: "Feb", plays: 52000, users: 4100, likes: 10200 },
  { date: "Mar", plays: 61000, users: 5300, likes: 12100 },
  { date: "Apr", plays: 73000, users: 6800, likes: 14500 },
  { date: "May", plays: 89000, users: 8200, likes: 17800 },
  { date: "Jun", plays: 105000, users: 9900, likes: 21300 },
]

const mockGenreDistribution = [
  { genre: "Hip Hop", count: 892, plays: 45231 },
  { genre: "Afrobeats", count: 743, plays: 38921 },
  { genre: "R&B", count: 621, plays: 32145 },
  { genre: "Pop", count: 534, plays: 28934 },
  { genre: "Electronic", count: 421, plays: 21432 },
  { genre: "Other", count: 210, plays: 12389 },
]

export default function PlatformOverview() {
  const [stats, setStats] = useState<PlatformStats>(mockPlatformStats)

  const statCards = [
    {
      title: "Total Users",
      value: stats.total_users.toLocaleString(),
      icon: Users,
      change: "+12.5%",
      color: "text-primary",
    },
    {
      title: "Total Music",
      value: stats.total_music.toLocaleString(),
      icon: Music,
      change: "+8.2%",
      color: "text-accent",
    },
    {
      title: "Total Plays",
      value: stats.total_plays.toLocaleString(),
      icon: Play,
      change: "+23.1%",
      color: "text-primary",
    },
    {
      title: "Total Likes",
      value: stats.total_likes.toLocaleString(),
      icon: Heart,
      change: "+15.7%",
      color: "text-accent",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-sm font-medium text-green-500 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plays Trend Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Platform Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockPlaysTrend}>
                  <defs>
                    <linearGradient id="playsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area
                    type="monotone"
                    dataKey="plays"
                    stroke="hsl(var(--primary))"
                    fill="url(#playsGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(var(--accent))"
                    fill="url(#usersGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Genre Distribution Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5 text-accent" />
                Genre Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockGenreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="genre" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Activity Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold text-foreground">{stats.plays_today.toLocaleString()} plays</p>
                <p className="text-sm text-muted-foreground">
                  {stats.active_users_today.toLocaleString()} active users
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-foreground">{stats.plays_week.toLocaleString()} plays</p>
                <p className="text-sm text-muted-foreground">{stats.active_users_week.toLocaleString()} active users</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-foreground">{stats.plays_month.toLocaleString()} plays</p>
                <p className="text-sm text-muted-foreground">
                  {stats.active_users_month.toLocaleString()} active users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
