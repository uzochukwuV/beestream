"use client"

import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { MusicUploadForm } from "@/components/upload/MusicUploadForm"
import { Music } from "lucide-react"

export default function UploadPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Music className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Upload Music</h1>
          </div>
          <p className="text-muted-foreground">
            Share your music with the world. Upload your tracks to decentralized storage and start earning.
          </p>
        </div>

        <MusicUploadForm />
      </div>
    </DashboardLayout>
  )
}
