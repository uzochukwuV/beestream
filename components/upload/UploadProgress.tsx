"use client"

import { CheckCircle, Loader2, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import type { UploadedInfo } from "@/hooks/useFileUpload"

interface UploadProgressProps {
  progress: number
  status: string
  uploadedInfo: UploadedInfo | null
  isComplete: boolean
  onStartOver: () => void
}

export function UploadProgress({ progress, status, uploadedInfo, isComplete, onStartOver }: UploadProgressProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-xl p-8">
        {/* Progress Circle */}
        <div className="flex flex-col items-center mb-8">
          {isComplete ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4"
            >
              <CheckCircle className="w-12 h-12 text-primary" />
            </motion.div>
          ) : (
            <div className="relative w-24 h-24 mb-4">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={276.46}
                  strokeDashoffset={276.46 - (276.46 * progress) / 100}
                  className="text-primary transition-all duration-300"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{progress}%</span>
              </div>
            </div>
          )}

          <h3 className="text-xl font-semibold mb-2">{isComplete ? "Upload Complete!" : "Uploading to Filecoin"}</h3>
          <p className="text-muted-foreground text-center">{status}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Upload Info */}
        {uploadedInfo && (
          <div className="space-y-3 mb-6">
            {uploadedInfo.fileName && (
              <div className="flex justify-between text-sm p-3 bg-background rounded-lg">
                <span className="text-muted-foreground">File Name</span>
                <span className="font-medium">{uploadedInfo.fileName}</span>
              </div>
            )}
            {uploadedInfo.fileSize && (
              <div className="flex justify-between text-sm p-3 bg-background rounded-lg">
                <span className="text-muted-foreground">File Size</span>
                <span className="font-medium">{(uploadedInfo.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
            )}
            {uploadedInfo.pieceCid && (
              <div className="flex justify-between text-sm p-3 bg-background rounded-lg">
                <span className="text-muted-foreground">Piece CID</span>
                <span className="font-mono text-xs">{uploadedInfo.pieceCid.slice(0, 20)}...</span>
              </div>
            )}
            {uploadedInfo.txHash && (
              <div className="flex justify-between items-center text-sm p-3 bg-background rounded-lg">
                <span className="text-muted-foreground">Transaction</span>
                <a
                  href={`https://calibration.filfox.info/en/message/${uploadedInfo.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  View on Explorer
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        {isComplete && (
          <div className="flex gap-4">
            <button
              onClick={onStartOver}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Upload Another
            </button>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="flex-1 px-6 py-3 bg-card border border-border rounded-lg font-medium hover:bg-accent transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {!isComplete && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Please wait while we upload your music to Filecoin...
          </div>
        )}
      </div>
    </div>
  )
}
