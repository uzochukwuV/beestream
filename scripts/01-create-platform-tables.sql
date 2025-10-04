-- BeeStream Platform Database Schema
-- Run this script after connecting your database integration

-- Music submissions table (simplified - most data in ZIP on Filecoin)
CREATE TABLE IF NOT EXISTS music_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  piece_cid TEXT NOT NULL UNIQUE, -- Main field: CID of uploaded ZIP file
  track_name TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  artist_address TEXT NOT NULL, -- Wallet address for ownership
  duration INTEGER NOT NULL, -- in seconds
  cover_photo_url TEXT NOT NULL, -- For display in browse view
  category TEXT NOT NULL, -- Genre/category for filtering
  gradient_colors JSONB, -- stores the gradient color scheme
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Play statistics table
CREATE TABLE IF NOT EXISTS play_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  music_id UUID REFERENCES music_submissions(id) ON DELETE CASCADE,
  listener_address TEXT,
  played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  play_duration INTEGER, -- how long they listened in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Like statistics table
CREATE TABLE IF NOT EXISTS like_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  music_id UUID REFERENCES music_submissions(id) ON DELETE CASCADE,
  liker_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(music_id, liker_address) -- prevent duplicate likes
);

-- Platform users table (tracks unique listeners)
CREATE TABLE IF NOT EXISTS platform_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT NOT NULL UNIQUE,
  username TEXT,
  avatar_url TEXT,
  first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_music_artist_address ON music_submissions(artist_address);
CREATE INDEX IF NOT EXISTS idx_music_category ON music_submissions(category);
CREATE INDEX IF NOT EXISTS idx_music_created_at ON music_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_play_stats_music_id ON play_stats(music_id);
CREATE INDEX IF NOT EXISTS idx_play_stats_played_at ON play_stats(played_at);
CREATE INDEX IF NOT EXISTS idx_like_stats_music_id ON like_stats(music_id);
CREATE INDEX IF NOT EXISTS idx_platform_users_address ON platform_users(wallet_address);

-- Views for analytics
CREATE OR REPLACE VIEW music_analytics AS
SELECT 
  m.id,
  m.piece_cid,
  m.track_name,
  m.artist_name,
  m.artist_address,
  m.duration,
  m.cover_photo_url,
  m.category,
  m.gradient_colors,
  m.created_at,
  COUNT(DISTINCT p.id) as total_plays,
  COUNT(DISTINCT l.id) as total_likes,
  COUNT(DISTINCT p.listener_address) as unique_listeners,
  COUNT(DISTINCT CASE WHEN p.played_at >= NOW() - INTERVAL '1 day' THEN p.id END) as plays_today,
  COUNT(DISTINCT CASE WHEN p.played_at >= NOW() - INTERVAL '30 days' THEN p.id END) as plays_month,
  COUNT(DISTINCT CASE WHEN p.played_at >= NOW() - INTERVAL '365 days' THEN p.id END) as plays_year
FROM music_submissions m
LEFT JOIN play_stats p ON m.id = p.music_id
LEFT JOIN like_stats l ON m.id = l.music_id
GROUP BY m.id;

-- View for most played tracks
CREATE OR REPLACE VIEW most_played_tracks AS
SELECT * FROM music_analytics
ORDER BY total_plays DESC;

-- View for most liked tracks
CREATE OR REPLACE VIEW most_liked_tracks AS
SELECT * FROM music_analytics
ORDER BY total_likes DESC;
