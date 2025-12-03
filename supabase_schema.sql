-- OBJAVUJ-AI Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- ================================================
-- 1. USER PROFILES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    preferred_language TEXT DEFAULT 'sk',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ================================================
-- 2. COURSES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT,
    difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    duration TEXT,
    lessons_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Policies for courses (public read for published courses)
CREATE POLICY "Anyone can view published courses" ON courses
    FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage courses" ON courses
    FOR ALL USING (auth.role() IN ('anon', 'service_role', 'authenticated'));

-- ================================================
-- 3. MODULES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    is_free BOOLEAN DEFAULT false,
    is_locked BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

-- Policies for modules
CREATE POLICY "Anyone can view modules" ON modules
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage modules" ON modules
    FOR ALL USING (auth.role() IN ('anon', 'service_role', 'authenticated'));

-- ================================================
-- 4. LESSONS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    type TEXT DEFAULT 'text' CHECK (type IN ('video', 'text', 'quiz', 'interactive', 'project')),
    duration TEXT,
    order_index INTEGER NOT NULL,
    audio_url TEXT,
    video_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Policies for lessons
CREATE POLICY "Anyone can view lessons" ON lessons
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage lessons" ON lessons
    FOR ALL USING (auth.role() IN ('anon', 'service_role', 'authenticated'));

-- ================================================
-- 5. LESSON FILES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS lesson_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE lesson_files ENABLE ROW LEVEL SECURITY;

-- Policies for lesson files
CREATE POLICY "Anyone can view lesson files" ON lesson_files
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage lesson files" ON lesson_files
    FOR ALL USING (auth.role() IN ('anon', 'service_role', 'authenticated'));

-- ================================================
-- 6. USER PROGRESS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    course_id UUID NOT NULL,
    lesson_id UUID NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    progress_percent INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

-- Enable RLS
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policies for user progress
CREATE POLICY "Users can view own progress" ON user_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.role() IN ('anon', 'service_role'));

CREATE POLICY "Users can update own progress" ON user_progress
    FOR UPDATE USING (auth.uid() = user_id OR auth.role() IN ('anon', 'service_role'));

-- ================================================
-- 7. CHAT MESSAGES TABLE (for AI Assistant)
-- ================================================
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    lesson_id UUID,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies for chat messages
CREATE POLICY "Users can view own messages" ON chat_messages
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages" ON chat_messages
    FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.role() IN ('anon', 'service_role'));

-- ================================================
-- 8. INDEXES FOR PERFORMANCE
-- ================================================
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published);
CREATE INDEX IF NOT EXISTS idx_modules_course_id ON modules(course_id);
CREATE INDEX IF NOT EXISTS idx_modules_order ON modules(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(module_id, order_index);
CREATE INDEX IF NOT EXISTS idx_lesson_files_lesson_id ON lesson_files(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course ON user_progress(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_lesson ON chat_messages(lesson_id);

-- ================================================
-- 9. TRIGGER FOR UPDATED_AT
-- ================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
    BEFORE UPDATE ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- 10. SAMPLE DATA (Optional - for testing)
-- ================================================

-- Sample Course
INSERT INTO courses (slug, title, description, image_url, category, difficulty, duration, lessons_count, is_published)
VALUES 
    ('ai-fundamentals', 'Zaklady Umelej Inteligencie', 'Kompletny kurz pre pochopenie zakladov AI, strojoveho ucenia a neuronových sieti.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop', 'AI Fundamentals', 'beginner', '8 hodin', 24, true),
    ('prompt-engineering', 'Prompt Engineering Masterclass', 'Naucte sa pist efektivne prompty pre ChatGPT, Claude a dalsie AI nastroje.', 'https://images.unsplash.com/photo-1675557009875-436f7a3d9c3b?w=600&h=400&fit=crop', 'Practical AI', 'intermediate', '6 hodin', 18, true)
ON CONFLICT (slug) DO NOTHING;

-- Sample Modules
INSERT INTO modules (id, course_id, title, description, order_index, is_free, is_locked)
SELECT 
    gen_random_uuid(),
    c.id,
    'Uvod do Umelej Inteligencie',
    'Zakladne koncepty a historia AI',
    1,
    true,
    false
FROM courses c WHERE c.slug = 'ai-fundamentals'
ON CONFLICT DO NOTHING;

-- ================================================
-- SETUP COMPLETE
-- ================================================
-- After running this schema:
-- 1. Enable Email Auth in Supabase Dashboard > Authentication > Providers
-- 2. Configure your .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
-- 3. Set VITE_DATA_SOURCE=supabase to use real data


-- ================================================
-- NEW TABLES FOR PLATFORM ENHANCEMENT
-- ================================================

-- ================================================
-- PODCAST EPISODES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS podcast_episodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    duration TEXT,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    audio_url TEXT,
    spotify_url TEXT,
    youtube_url TEXT,
    thumbnail_url TEXT,
    category TEXT,
    guests TEXT[], -- Array of guest names
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view podcast episodes" ON podcast_episodes
    FOR SELECT USING (true);

-- Admin-only write access
CREATE POLICY "Admins can manage podcast episodes" ON podcast_episodes
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM profiles WHERE email LIKE '%@objavuj.ai'));

-- ================================================
-- COMMUNITY POSTS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT CHECK (category IN ('discussion', 'question', 'showcase', 'resource')),
    tags TEXT[],
    likes INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    is_resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can view posts
CREATE POLICY "Anyone can view community posts" ON community_posts
    FOR SELECT USING (true);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts" ON community_posts
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Users can update their own posts
CREATE POLICY "Users can update own posts" ON community_posts
    FOR UPDATE USING (auth.uid() = author_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete own posts" ON community_posts
    FOR DELETE USING (auth.uid() = author_id);

-- ================================================
-- NEWS ARTICLES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS news_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    category TEXT,
    author TEXT,
    read_time TEXT,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view news articles" ON news_articles
    FOR SELECT USING (true);

-- Admin-only write access
CREATE POLICY "Admins can manage news articles" ON news_articles
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM profiles WHERE email LIKE '%@objavuj.ai'));

-- ================================================
-- USE CASES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS use_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    industry TEXT,
    description TEXT,
    challenge TEXT,
    solution TEXT,
    results TEXT[], -- Array of result strings
    image_url TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE use_cases ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view use cases" ON use_cases
    FOR SELECT USING (true);

-- Admin-only write access
CREATE POLICY "Admins can manage use cases" ON use_cases
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM profiles WHERE email LIKE '%@objavuj.ai'));

-- ================================================
-- USER SUBSCRIPTIONS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    tier_id TEXT NOT NULL, -- 'tier-free', 'tier-pro', 'tier-enterprise'
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    auto_renew BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can view their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON user_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own subscriptions
CREATE POLICY "Users can create own subscriptions" ON user_subscriptions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own subscriptions
CREATE POLICY "Users can update own subscriptions" ON user_subscriptions
    FOR UPDATE USING (auth.uid() = user_id);

-- ================================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    unsubscribed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- Admins can view all subscribers
CREATE POLICY "Admins can view newsletter subscribers" ON newsletter_subscribers
    FOR SELECT USING (auth.uid() IN (SELECT user_id FROM profiles WHERE email LIKE '%@objavuj.ai'));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_published ON podcast_episodes(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_posts_created ON community_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_posts_author ON community_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_news_articles_published ON news_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_use_cases_company ON use_cases(company);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
