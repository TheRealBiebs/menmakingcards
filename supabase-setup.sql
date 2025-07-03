-- Photo Gallery Database Setup Script
-- Run this in your Supabase SQL Editor

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    file_path TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_photos_created_at ON photos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_photos_title ON photos USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_photos_description ON photos USING gin(to_tsvector('english', description));

-- Enable Row Level Security (RLS)
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public photos are viewable by everyone" ON photos;
DROP POLICY IF EXISTS "Anyone can insert photos" ON photos;
DROP POLICY IF EXISTS "Anyone can update photos" ON photos;
DROP POLICY IF EXISTS "Anyone can delete photos" ON photos;

-- Create policies for public access (modify these for production use)
CREATE POLICY "Public photos are viewable by everyone" 
    ON photos FOR SELECT 
    USING (true);

CREATE POLICY "Anyone can insert photos" 
    ON photos FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Anyone can update photos" 
    ON photos FOR UPDATE 
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Anyone can delete photos" 
    ON photos FOR DELETE 
    USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_photos_updated_at ON photos;
CREATE TRIGGER update_photos_updated_at
    BEFORE UPDATE ON photos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for photo statistics
CREATE OR REPLACE VIEW photo_stats AS
SELECT 
    COUNT(*) as total_photos,
    DATE_TRUNC('day', MIN(created_at)) as first_photo_date,
    DATE_TRUNC('day', MAX(created_at)) as latest_photo_date,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as photos_this_week,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as photos_this_month
FROM photos;

-- Insert sample data (optional - remove if you don't want sample photos)
-- INSERT INTO photos (title, description, url, file_path) VALUES 
-- ('Sample Photo 1', 'This is a sample photo for testing', 'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Sample+1', 'samples/sample1.jpg'),
-- ('Sample Photo 2', 'Another sample photo with a longer description to test the layout', 'https://via.placeholder.com/400x300/50C878/FFFFFF?text=Sample+2', 'samples/sample2.jpg'),
-- ('Sample Photo 3', 'A third sample photo', 'https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Sample+3', 'samples/sample3.jpg');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON photos TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Show success message
DO $$
BEGIN
    RAISE NOTICE 'Photo Gallery database setup completed successfully!';
    RAISE NOTICE 'Table "photos" created with proper indexes and RLS policies.';
    RAISE NOTICE 'Remember to:';
    RAISE NOTICE '1. Create a storage bucket named "photos"';
    RAISE NOTICE '2. Set the bucket to public access';
    RAISE NOTICE '3. Update your JavaScript configuration with your Supabase URL and anon key';
END $$; 