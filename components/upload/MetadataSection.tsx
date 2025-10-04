"use client"

import { motion } from "framer-motion"
import type { MusicFormData } from "./MusicUploadForm"

interface MetadataSectionProps {
  formData: MusicFormData
  updateFormData: (updates: Partial<MusicFormData>) => void
}

export function MetadataSection({ formData, updateFormData }: MetadataSectionProps) {
  const genres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "R&B",
    "Electronic",
    "Jazz",
    "Classical",
    "Country",
    "Reggae",
    "Blues",
    "Folk",
    "Metal",
    "Indie",
    "Soul",
    "Funk",
    "Other",
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6 space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold mb-2">Music Metadata</h3>
        <p className="text-sm text-muted-foreground">Add details about your music to help listeners discover it.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Track Title <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            placeholder="Enter track title"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Artist */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Artist Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={formData.artist}
            onChange={(e) => updateFormData({ artist: e.target.value })}
            placeholder="Your artist name"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Album */}
        <div>
          <label className="block text-sm font-medium mb-2">Album</label>
          <input
            type="text"
            value={formData.album}
            onChange={(e) => updateFormData({ album: e.target.value })}
            placeholder="Album name (optional)"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium mb-2">Genre</label>
          <select
            value={formData.genre}
            onChange={(e) => updateFormData({ genre: e.target.value })}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="">Select genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Release Date */}
        <div>
          <label className="block text-sm font-medium mb-2">Release Date</label>
          <input
            type="date"
            value={formData.releaseDate}
            onChange={(e) => updateFormData({ releaseDate: e.target.value })}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            placeholder="Tell listeners about this track..."
            rows={4}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
          />
        </div>

        {/* Lyrics */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Lyrics</label>
          <textarea
            value={formData.lyrics}
            onChange={(e) => updateFormData({ lyrics: e.target.value })}
            placeholder="Paste your lyrics here (optional)..."
            rows={8}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none font-mono text-sm"
          />
        </div>
      </div>
    </motion.div>
  )
}
