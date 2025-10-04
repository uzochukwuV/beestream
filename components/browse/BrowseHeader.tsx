"use client"

import { motion } from "framer-motion"
import { Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"

export default function BrowseHeader() {
  const { isConnected } = useAccount()

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/browse">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
                <Music className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                BeeStream
              </span>
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/browse">
              <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                Browse
              </Button>
            </Link>
            {isConnected && (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/dashboard/upload">
                  <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                    Upload
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center gap-3">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  )
}
