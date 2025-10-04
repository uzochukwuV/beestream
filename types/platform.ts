// Platform database types
export interface MusicSubmission {
  id: string
  piece_cid: string // Main field: CID of uploaded ZIP file on Filecoin
  track_name: string // renamed from title to match schema
  artist_name: string
  artist_address: string // Wallet address for ownership
  duration: number // in seconds
  cover_photo_url: string // renamed from cover_image_url for display
  category: string // renamed from genre, used for filtering
  gradient_colors?: {
    from: string
    to: string
  }
  created_at: string
  updated_at: string
}

export interface MusicData {
  audio_url: string
  video_url?: string
  lyrics?: string
  metadata: {
    title: string
    artist: string
    album?: string
    genre?: string
    release_date?: string
    description?: string
  }
}

export interface PlayStat {
  id: string
  music_id: string
  listener_address?: string
  played_at: string
  play_duration?: number
  created_at: string
}

export interface LikeStat {
  id: string
  music_id: string
  liker_address: string
  created_at: string
}

export interface PlatformUser {
  id: string
  wallet_address: string
  username?: string
  avatar_url?: string
  first_seen: string
  last_active: string
  created_at: string
}

export interface MusicAnalytics extends MusicSubmission {
  total_plays: number
  total_likes: number
  unique_listeners: number
  plays_today: number
  plays_month: number
  plays_year: number
}

export interface PlatformStats {
  total_users: number
  total_music: number
  total_plays: number
  total_likes: number
  plays_today: number
  plays_week: number
  plays_month: number
  active_users_today: number
  active_users_week: number
  active_users_month: number
}

export interface ArtistStats {
  artist_address: string
  artist_name: string
  total_tracks: number
  total_plays: number
  total_likes: number
  unique_listeners: number
  tracks: MusicAnalytics[]
}
