"use client"

import { Lock, Unlock, Eye, EyeOff, Shield } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface EncryptionOptionsProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
  password: string
  onPasswordChange: (password: string) => void
}

export function EncryptionOptions({ enabled, onToggle, password, onPasswordChange }: EncryptionOptionsProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${enabled ? "bg-primary/10" : "bg-muted"}`}>
            {enabled ? <Lock className="w-5 h-5 text-primary" /> : <Unlock className="w-5 h-5 text-muted-foreground" />}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Encryption</h3>
            <p className="text-sm text-muted-foreground">Secure your music with encryption</p>
          </div>
        </div>

        <button
          onClick={() => onToggle(!enabled)}
          className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? "bg-primary" : "bg-muted"}`}
        >
          <motion.div
            className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
            animate={{ x: enabled ? 24 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg flex items-start gap-2">
              <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Your files will be encrypted using your wallet address and password before upload. Keep your password
                safe - you'll need it to decrypt your files.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Encryption Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  placeholder="Enter a strong password"
                  className="w-full px-4 py-3 pr-12 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {password && password.length < 8 && (
                <p className="text-xs text-destructive mt-1">Password should be at least 8 characters</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
