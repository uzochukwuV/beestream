"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileUploadSection } from "./FileUploadSection"
import { MetadataSection } from "./MetadataSection"
import { ColorGradientPicker } from "./ColorGradientPicker"
import { MusicPreviewCard } from "./MusicPreviewCard"
import { EncryptionOptions } from "./EncryptionOptions"
import { CostCalculator } from "./CostCalculator"
import { UploadProgress } from "./UploadProgress"
import { useMusicUpload } from "@/hooks/useMusicUpload"
import { Eye, Upload, Lock, ChevronRight, ChevronLeft } from "lucide-react"

export interface MusicFormData {
  // Files
  audioFile: File | null
  coverImage: File | null
  musicVideo: File | null
  lyricsFile: File | null

  // Metadata
  title: string
  artist: string
  album: string
  genre: string
  releaseDate: string
  description: string
  lyrics: string

  // Visual
  gradientColors: [string, string]
}

export function MusicUploadForm() {
  const [formData, setFormData] = useState<MusicFormData>({
    audioFile: null,
    coverImage: null,
    musicVideo: null,
    lyricsFile: null,
    title: "",
    artist: "",
    album: "",
    genre: "",
    releaseDate: "",
    description: "",
    lyrics: "",
    gradientColors: ["#00d9ff", "#ff006e"],
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [showPreview, setShowPreview] = useState(false)
  const [encryptionEnabled, setEncryptionEnabled] = useState(false)
  const [password, setPassword] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const { uploadMusicPackage, progress, status, uploadedInfo, error } = useMusicUpload()

  const updateFormData = (updates: Partial<MusicFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const getTotalFileSize = () => {
    let total = 0
    if (formData.audioFile) total += formData.audioFile.size
    if (formData.coverImage) total += formData.coverImage.size
    if (formData.musicVideo) total += formData.musicVideo.size
    if (formData.lyricsFile) total += formData.lyricsFile.size
    return total
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.audioFile !== null && formData.coverImage !== null
      case 2:
        return formData.title.trim() !== "" && formData.artist.trim() !== ""
      case 3:
        return true
      default:
        return false
    }
  }

  const handleUpload = async () => {
    if (!isStepValid(1) || !isStepValid(2)) return

    setIsUploading(true)
    await uploadMusicPackage(formData, encryptionEnabled ? password : undefined)
  }

  const handleReset = () => {
    setFormData({
      audioFile: null,
      coverImage: null,
      musicVideo: null,
      lyricsFile: null,
      title: "",
      artist: "",
      album: "",
      genre: "",
      releaseDate: "",
      description: "",
      lyrics: "",
      gradientColors: ["#00d9ff", "#ff006e"],
    })
    setCurrentStep(1)
    setShowPreview(false)
    setIsUploading(false)
    setPassword("")
  }

  if (isUploading) {
    return (<>
      <UploadProgress
        progress={progress}
        status={status}
        uploadedInfo={uploadedInfo}
        isComplete={progress === 100}
        onStartOver={handleReset}
      />
      <button onClick={()=> {
        setCurrentStep(1)
        setIsUploading(false)
      }}>
                Back
              </button>
      </>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep === step
                    ? "bg-primary text-primary-foreground scale-110"
                    : currentStep > step
                      ? "bg-primary/20 text-primary"
                      : "bg-card border border-border text-muted-foreground"
                }`}
              >
                {step}
              </button>
              {step < 3 && (
                <div
                  className={`w-16 h-1 mx-2 rounded-full transition-colors ${
                    currentStep > step ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <p className="text-sm font-medium text-foreground">
            {currentStep === 1 && "Upload Files"}
            {currentStep === 2 && "Add Metadata"}
            {currentStep === 3 && "Customize & Upload"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <FileUploadSection formData={formData} updateFormData={updateFormData} />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <MetadataSection formData={formData} updateFormData={updateFormData} />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <ColorGradientPicker
                  colors={formData.gradientColors}
                  onChange={(colors) => updateFormData({ gradientColors: colors })}
                />

                <EncryptionOptions
                  enabled={encryptionEnabled}
                  onToggle={setEncryptionEnabled}
                  password={password}
                  onPasswordChange={setPassword}
                />

                <CostCalculator fileSize={getTotalFileSize()} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-6 py-3 bg-card border border-border rounded-lg font-medium hover:bg-accent transition-colors flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
            )}

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                disabled={!isStepValid(currentStep)}
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleUpload}
                disabled={!isStepValid(1) || !isStepValid(2) || (encryptionEnabled && !password)}
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {encryptionEnabled ? (
                  <>
                    <Lock className="w-5 h-5" />
                    Upload with Encryption
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload to Filecoin
                  </>
                )}
              </button>
              
            )}
          </div>
          <button onClick={()=> setCurrentStep((prev)=> prev -1)}>
                Back
              </button>
        </div>

        {/* Preview Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>

            <AnimatePresence>
              {showPreview && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                  <MusicPreviewCard formData={formData} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
