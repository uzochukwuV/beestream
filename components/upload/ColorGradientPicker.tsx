"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Palette, Sparkles } from "lucide-react"

interface ColorGradientPickerProps {
  colors: [string, string]
  onChange: (colors: [string, string]) => void
}

const presetGradients: [string, string][] = [
  ["#00d9ff", "#ff006e"],
  ["#667eea", "#764ba2"],
  ["#f093fb", "#f5576c"],
  ["#4facfe", "#00f2fe"],
  ["#43e97b", "#38f9d7"],
  ["#fa709a", "#fee140"],
  ["#30cfd0", "#330867"],
  ["#a8edea", "#fed6e3"],
  ["#ff9a56", "#ff6a88"],
  ["#ffecd2", "#fcb69f"],
  ["#ff6e7f", "#bfe9ff"],
  ["#e0c3fc", "#8ec5fc"],
]

export function ColorGradientPicker({ colors, onChange }: ColorGradientPickerProps) {
  const [customMode, setCustomMode] = useState(false)

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Visual Theme
          </h3>
          <p className="text-sm text-muted-foreground">Choose a gradient that matches your music&apos;s vibe</p>
        </div>
        <button
          onClick={() => setCustomMode(!customMode)}
          className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
        >
          {customMode ? "Presets" : "Custom"}
        </button>
      </div>

      {/* Preview */}
      <div
        className="h-32 rounded-lg relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white/80" />
        </div>
      </div>

      {customMode ? (
        /* Custom Color Pickers */
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={colors[0]}
                onChange={(e) => onChange([e.target.value, colors[1]])}
                className="w-12 h-12 rounded-lg cursor-pointer border border-border"
              />
              <input
                type="text"
                value={colors[0]}
                onChange={(e) => onChange([e.target.value, colors[1]])}
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={colors[1]}
                onChange={(e) => onChange([colors[0], e.target.value])}
                className="w-12 h-12 rounded-lg cursor-pointer border border-border"
              />
              <input
                type="text"
                value={colors[1]}
                onChange={(e) => onChange([colors[0], e.target.value])}
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Preset Gradients */
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {presetGradients.map((gradient, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(gradient)}
              className={`h-16 rounded-lg transition-all ${
                colors[0] === gradient[0] && colors[1] === gradient[1]
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                  : "hover:ring-2 hover:ring-border"
              }`}
              style={{
                background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
