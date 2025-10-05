"use client"
import { motion } from "framer-motion"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"
import {
  Music,
  Wallet,
  Shield,
  TrendingUp,
  Users,
  Zap,
  Globe,
  Lock,
  Play,
  Upload,
  DollarSign,
  BarChart3,
  Headphones,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export default function Home() {
  const { isConnected } = useAccount()
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="w-full bg-gradient-to-b from-background via-background to-background/95">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-6xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by Filecoin Storage</span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight"
          >
            BeeStream
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            The decentralized music platform where artists{" "}
            <span className="text-primary font-semibold">own their content</span>,{" "}
            <span className="text-accent font-semibold">control their earnings</span>, and{" "}
            <span className="text-primary font-semibold">connect directly with fans</span>
          </motion.p>

          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
            Built on Filecoin&apos;s decentralized storage network, BeeStream ensures your music is永久 stored,
            censorship-resistant, and truly yours. No middlemen. No takedowns. Just pure creative freedom.
          </motion.p>

          {/* Unique Wallet Connect Button */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center gap-6">
            {!isConnected ? (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
                <div className="relative px-8 py-4 bg-background rounded-2xl leading-none flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-primary" />
                  <ConnectButton />
                  <Zap className="w-5 h-5 text-accent" />
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/browse">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-background font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-primary/50"
                  >
                    <Headphones className="w-5 h-5" />
                    Browse Music
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-accent text-background font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-accent/50"
                  >
                    <Upload className="w-5 h-5" />
                    Creator Dashboard
                  </motion.button>
                </Link>
              </div>
            )}

            <p className="text-sm text-muted-foreground">Connect your wallet to start streaming or uploading music</p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {[
              { label: "Artists", value: "10K+", icon: Users },
              { label: "Tracks", value: "50K+", icon: Music },
              { label: "Streams", value: "5M+", icon: Play },
              { label: "Earnings Paid", value: "$2M+", icon: DollarSign },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* For Creators Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-background to-muted/20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Music className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">For Creators</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Your Music. Your Rules. Your Revenue.</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Take control of your music career with true ownership and transparent earnings
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "True Ownership",
                description:
                  "Your music is stored on Filecoin's decentralized network. No platform can delete, censor, or control your content. You own it forever.",
                color: "from-primary to-primary/50",
              },
              {
                icon: DollarSign,
                title: "Direct Earnings",
                description:
                  "Keep 95% of your revenue. No hidden fees, no middlemen. Get paid instantly in USDFC stablecoin directly to your wallet.",
                color: "from-accent to-accent/50",
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                description:
                  "Track plays, likes, and earnings in real-time. Understand your audience with detailed analytics and insights.",
                color: "from-primary to-accent",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredFeature(i)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />
                <div className="relative p-8 bg-card border border-border rounded-3xl h-full">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                  >
                    <feature.icon className="w-8 h-8 text-background" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-16 text-center">
            <Link href="/dashboard/upload">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-primary to-accent text-background font-bold text-lg rounded-2xl flex items-center gap-3 mx-auto shadow-2xl shadow-primary/50"
              >
                <Upload className="w-6 h-6" />
                Start Uploading Your Music
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* For Listeners Section */}
      <section className="py-32 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
              <Headphones className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">For Listeners</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Discover Music That Matters</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Support artists directly while enjoying unlimited, high-quality music streaming
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp} className="space-y-8">
              {[
                {
                  icon: Globe,
                  title: "Unlimited Streaming",
                  description:
                    "Access millions of tracks from independent artists worldwide. No ads, no interruptions.",
                },
                {
                  icon: Zap,
                  title: "Support Artists Directly",
                  description: "Your streams directly support artists. 95% of revenue goes straight to creators.",
                },
                {
                  icon: Lock,
                  title: "Privacy First",
                  description: "No tracking, no data selling. Your listening habits are yours alone.",
                },
                {
                  icon: Sparkles,
                  title: "Discover New Talent",
                  description: "Find emerging artists before they hit mainstream. Be part of their journey.",
                },
              ].map((feature, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <div className="relative p-8 bg-card border border-border rounded-3xl">
                <Image
                  src="/modern-music-streaming-interface-with-colorful-wav.jpg"
                  alt="Music Streaming Interface"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="mt-16 text-center">
            <Link href="/browse">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-accent to-accent/80 text-background font-bold text-lg rounded-2xl flex items-center gap-3 mx-auto shadow-2xl shadow-accent/50"
              >
                <Play className="w-6 h-6" />
                Start Listening Now
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* For Investors Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-background to-muted/20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">For Investors</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Invest in the Future of Music</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Be part of the decentralized music revolution with transparent, blockchain-based opportunities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Transparent Economics",
                description: "All transactions on-chain. Full visibility into platform revenue and growth metrics.",
                icon: BarChart3,
              },
              {
                title: "Growing Market",
                description: "$2M+ in creator earnings. 5M+ streams monthly. Exponential growth trajectory.",
                icon: TrendingUp,
              },
              {
                title: "Decentralized Infrastructure",
                description: "Built on Filecoin. No single point of failure. Censorship-resistant and permanent.",
                icon: Globe,
              },
              {
                title: "Token Economics",
                description: "Stake, earn, and govern. Participate in platform decisions and revenue sharing.",
                icon: DollarSign,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-card border border-border rounded-2xl"
              >
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeInUp}
            className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-3xl"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
                <div className="text-muted-foreground">Total Value Locked</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">300%</div>
                <div className="text-muted-foreground">YoY Growth Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Active Creators</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">How BeeStream Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple, transparent, and decentralized from start to finish
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Connect Wallet",
                description: "Connect your Web3 wallet to get started. No email, no password, just your wallet.",
                icon: Wallet,
                color: "from-primary to-primary/50",
              },
              {
                step: "02",
                title: "Upload or Stream",
                description: "Artists upload music to Filecoin storage. Listeners browse and stream unlimited tracks.",
                icon: Upload,
                color: "from-accent to-accent/50",
              },
              {
                step: "03",
                title: "Earn & Enjoy",
                description: "Artists earn USDFC from streams. Listeners support creators directly with every play.",
                icon: DollarSign,
                color: "from-primary to-accent",
              },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative">
                <div className="text-8xl font-bold text-muted/10 absolute -top-8 -left-4">{step.step}</div>
                <div className="relative">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6`}
                  >
                    <step.icon className="w-10 h-10 text-background" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Technology Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-background to-muted/20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Built on Cutting-Edge Technology</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powered by Filecoin&apos;s decentralized storage network and blockchain technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Filecoin Storage",
                description:
                  "Your music is stored permanently on Filecoin's decentralized network. No servers to go down, no companies to shut down. Your content lives forever.",
                features: ["Permanent storage", "Censorship-resistant", "Cryptographically verified"],
              },
              {
                title: "USDFC Payments",
                description:
                  "All payments in USDFC stablecoin. No volatility, instant settlements, transparent transactions. Artists get paid what they earn, when they earn it.",
                features: ["Instant payments", "No fees", "Transparent on-chain"],
              },
              {
                title: "Smart Contracts",
                description:
                  "Automated royalty distribution through smart contracts. No manual processing, no delays. Revenue splits happen automatically and transparently.",
                features: ["Automated splits", "Trustless execution", "Auditable code"],
              },
              {
                title: "Web3 Identity",
                description:
                  "Your wallet is your identity. No accounts to create, no passwords to remember. One wallet for all your music, earnings, and identity.",
                features: ["Self-sovereign identity", "Privacy-first", "Cross-platform"],
              },
            ].map((tech, i) => (
              <motion.div key={i} variants={fadeInUp} className="p-8 bg-card border border-border rounded-3xl">
                <h3 className="text-2xl font-bold mb-4">{tech.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{tech.description}</p>
                <ul className="space-y-3">
                  {tech.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-balance">Ready to Join the Revolution?</h2>
            <p className="text-2xl text-muted-foreground mb-12 text-balance">
              Whether you&apos;re an artist, listener, or investor, BeeStream has a place for you
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              {!isConnected ? (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse" />
                  <div className="relative px-10 py-5 bg-background rounded-2xl leading-none flex items-center gap-3">
                    <Wallet className="w-6 h-6 text-primary" />
                    <ConnectButton />
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/dashboard/upload">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-5 bg-gradient-to-r from-primary to-accent text-background font-bold text-lg rounded-2xl flex items-center gap-3 shadow-2xl shadow-primary/50"
                    >
                      <Upload className="w-6 h-6" />
                      Upload Your Music
                    </motion.button>
                  </Link>
                  <Link href="/browse">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-5 bg-card border-2 border-primary text-foreground font-bold text-lg rounded-2xl flex items-center gap-3"
                    >
                      <Headphones className="w-6 h-6" />
                      Start Listening
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
