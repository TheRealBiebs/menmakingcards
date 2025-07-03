// Configuration file for Photo Gallery
// Copy this file to config.js and update with your actual Supabase credentials

// Supabase Configuration
// Get these values from your Supabase project dashboard
const CONFIG = {
    // Your Supabase project URL
    // Found in: Supabase Dashboard → Settings → API → Project URL
    SUPABASE_URL: 'https://your-project-ref.supabase.co',
    
    // Your Supabase anon/public key
    // Found in: Supabase Dashboard → Settings → API → anon/public key
    SUPABASE_ANON_KEY: 'your-anon-key-here',
    
    // Storage bucket name (must match the bucket you created in Supabase)
    STORAGE_BUCKET: 'photos',
    
    // Upload settings
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB in bytes
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    
    // UI settings
    PHOTOS_PER_PAGE: 20, // For future pagination feature
    DEFAULT_PHOTO_TITLE: 'Untitled Photo',
    
    // Feature flags
    ENABLE_SEARCH: true,
    ENABLE_UPLOAD: true,
    ENABLE_DELETE: false, // Set to true if you want to enable photo deletion
    ENABLE_EDIT: false,   // Set to true if you want to enable photo editing
};

// Export for use in other files
// Uncomment the line below if using ES6 modules
// export default CONFIG;

// For vanilla JS, the config will be available as a global variable 