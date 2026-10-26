-- D1 Database schema (optional, if using D1 instead of KV)
CREATE TABLE IF NOT EXISTS content (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  body TEXT,
  category TEXT,
  tags TEXT, -- JSON array
  hash TEXT NOT NULL, -- SHA-256 for dedup
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_content_type ON content(type);
CREATE INDEX IF NOT EXISTS idx_content_slug ON content(slug);
CREATE INDEX IF NOT EXISTS idx_content_hash ON content(hash);
CREATE INDEX IF NOT EXISTS idx_content_category ON content(category);

CREATE TABLE IF NOT EXISTS dedup_index (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  slug TEXT NOT NULL,
  hash TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_dedup_hash ON dedup_index(hash);
CREATE INDEX IF NOT EXISTS idx_dedup_slug ON dedup_index(slug);
CREATE INDEX IF NOT EXISTS idx_dedup_title ON dedup_index(type, title);