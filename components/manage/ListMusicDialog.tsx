"use client"

import type React from "react"

import { useState } from "react"
import type { DataSet } from "@/types"
import { useAccount } from "wagmi"
import { Loader2, Music, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ListMusicDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dataset: DataSet
  onSuccess: () => void
}

const categories = [
  "Afrobeats",
  "Hip Hop",
  "R&B",
  "Pop",
  "Electronic",
  "Rock",
  "Jazz",
  "Classical",
  "Country",
  "Reggae",
  "Other",
]

export function ListMusicDialog({ open, onOpenChange, dataset, onSuccess }: ListMusicDialogProps) {
  const { address } = useAccount()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    trackName: dataset.data?.name || "",
    artistName: "",
    category: "",
    duration: "",
    coverPhotoUrl: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In production, this would call your API to insert into music_submissions table
      const submission = {
        piece_cid: dataset.data?.pieces?.[0]?.cid || "", // Use first piece CID
        track_name: formData.trackName,
        artist_name: formData.artistName,
        artist_address: address,
        category: formData.category,
        duration: Number.parseInt(formData.duration),
        cover_photo_url: formData.coverPhotoUrl,
      }

      console.log("[v0] Submitting music to platform:", submission)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error("[v0] Error listing music:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>List Music to BeeStream</DialogTitle>
          <DialogDescription>Fill in the details to make your music discoverable on the platform</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Dataset Info */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Music className="w-4 h-4 text-primary" />
              <span className="font-medium">Dataset:</span>
              <span className="text-muted-foreground">{dataset.data?.name || "Untitled"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-medium">Files:</span>
              <span className="text-muted-foreground">{dataset.data?.pieces?.length || 0} pieces</span>
            </div>
          </div>

          {/* Track Name */}
          <div className="space-y-2">
            <Label htmlFor="trackName">Track Name *</Label>
            <Input
              id="trackName"
              value={formData.trackName}
              onChange={(e) => setFormData({ ...formData, trackName: e.target.value })}
              placeholder="Enter track name"
              required
            />
          </div>

          {/* Artist Name */}
          <div className="space-y-2">
            <Label htmlFor="artistName">Artist Name *</Label>
            <Input
              id="artistName"
              value={formData.artistName}
              onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
              placeholder="Enter artist name"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (seconds) *</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., 180"
              required
            />
          </div>

          {/* Cover Photo URL */}
          <div className="space-y-2">
            <Label htmlFor="coverPhotoUrl">Cover Photo URL *</Label>
            <Input
              id="coverPhotoUrl"
              type="url"
              value={formData.coverPhotoUrl}
              onChange={(e) => setFormData({ ...formData, coverPhotoUrl: e.target.value })}
              placeholder="https://example.com/cover.jpg"
              required
            />
            <p className="text-xs text-muted-foreground">Provide a direct link to your cover art image</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Listing...
                </>
              ) : (
                "List to Platform"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
