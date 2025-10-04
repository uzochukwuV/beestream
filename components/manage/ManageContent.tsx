"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDatasets } from "@/hooks/useDatasets"
import { useAccount } from "wagmi"
import { Loader2, Search, Filter, Grid3x3, List } from "lucide-react"
import { ContentCard } from "./ContentCard"
import { ContentListItem } from "./ContentListItem"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ManageContent() {
  const { address } = useAccount()
  const { data, isLoading, refetch } = useDatasets()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterStatus, setFilterStatus] = useState<"all" | "listed" | "unlisted">("all")

  const datasets = data?.datasets || []

  // Filter datasets based on search and status
  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch = dataset.data?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    // For now, we'll show all as unlisted until they list them
    // In production, you'd check against the music_submissions table
    return matchesSearch
  })

  if (!address) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <p className="text-muted-foreground">Connect your wallet to manage content</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-balance">Manage Your Content</h1>
        <p className="text-muted-foreground text-pretty">
          List your uploaded music to BeeStream platform or unlist content you want to keep private
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search your uploads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-card rounded-lg border border-border">
            {(["all", "listed", "unlisted"] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-card rounded-lg border border-border">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
        >
          <div className="text-sm text-muted-foreground mb-1">Total Uploads</div>
          <div className="text-3xl font-bold text-primary">{datasets.length}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20"
        >
          <div className="text-sm text-muted-foreground mb-1">Listed</div>
          <div className="text-3xl font-bold text-green-500">0</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20"
        >
          <div className="text-sm text-muted-foreground mb-1">Unlisted</div>
          <div className="text-3xl font-bold text-orange-500">{datasets.length}</div>
        </motion.div>
      </div>

      {/* Content Grid/List */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : filteredDatasets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Filter className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">No content found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? "Try adjusting your search" : "Upload some music to get started"}
            </p>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredDatasets.map((dataset, index) => (
                <ContentCard key={dataset.pdpVerifierDataSetId} dataset={dataset} index={index} onUpdate={refetch} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {filteredDatasets.map((dataset, index) => (
                <ContentListItem
                  key={dataset.pdpVerifierDataSetId}
                  dataset={dataset}
                  index={index}
                  onUpdate={refetch}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
