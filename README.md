# Photo Gallery Website

A beautiful, responsive photo gallery website built with vanilla HTML, CSS, and JavaScript, powered by Supabase for backend storage and GitHub Pages for hosting.

## ✨ Features

- 📸 Upload and display photos with titles and descriptions
- 🔍 Search photos by title or description
- 📱 Fully responsive design that works on all devices
- 🖼️ Modal view for detailed photo viewing
- ☁️ Cloud storage with Supabase
- 🌐 Free hosting with GitHub Pages
- ⚡ Fast loading with lazy image loading
- 🎨 Modern, clean UI with smooth animations

## 🚀 Live Demo

Once deployed, your photo gallery will be available at:
`https://[your-username].github.io/[repository-name]/`

## 📋 Prerequisites

Before setting up this project, you'll need:

1. A GitHub account
2. A Supabase account (free tier available)
3. Basic knowledge of Git/GitHub

## 🛠️ Setup Instructions

### Step 1: Clone/Fork this Repository

1. Fork this repository to your GitHub account, or
2. Create a new repository and upload these files

### Step 2: Set up Supabase

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign in/Sign up
   - Click "New Project"
   - Choose your organization and create a new project
   - Wait for the project to be ready

2. **Create the Database Table**
   - In your Supabase dashboard, go to the SQL Editor
   - Run the following SQL to create the photos table:

   ```sql
   -- Create photos table
   CREATE TABLE photos (
     id BIGSERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     description TEXT,
     url TEXT NOT NULL,
     file_path TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security (RLS)
   ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

   -- Create policy to allow public access (you can modify this for authentication)
   CREATE POLICY "Public photos are viewable by everyone" 
   ON photos FOR SELECT 
   USING (true);

   CREATE POLICY "Anyone can insert photos" 
   ON photos FOR INSERT 
   WITH CHECK (true);
   ```

3. **Create Storage Bucket**
   - Go to Storage in your Supabase dashboard
   - Create a new bucket called `photos`
   - Make sure the bucket is public (for this demo)
   - You can set up more secure policies later

4. **Get your Supabase Keys**
   - Go to Settings → API
   - Copy your Project URL
   - Copy your `anon` `public` key

### Step 3: Configure the Website

1. **Update Configuration**
   - Open `script.js`
   - Replace `YOUR_SUPABASE_URL` with your Supabase project URL
   - Replace `YOUR_SUPABASE_ANON_KEY` with your Supabase anon key

   ```javascript
   const SUPABASE_URL = 'https://your-project-ref.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key-here';
   ```

### Step 4: Deploy to GitHub Pages

1. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
   - Click "Save"

2. **Your site will be available at:**
   `https://[your-username].github.io/[repository-name]/`

## 🎯 Usage

1. **Upload Photos**: Click the "Upload Photo" button to add new photos
2. **View Photos**: Click on any photo card to view it in full size
3. **Search**: Use the search bar to find photos by title or description
4. **Responsive**: The gallery works perfectly on desktop, tablet, and mobile devices

## 🔧 Customization

### Styling
- Edit `styles.css` to change colors, fonts, and layout
- CSS variables at the top of the file make it easy to change the color scheme

### Functionality
- Modify `script.js` to add new features like:
  - Photo editing
  - Categories/tags
  - User authentication
  - Photo deletion
  - Bulk upload

### Database
- Add new columns to the `photos` table for additional metadata
- Implement user authentication for private galleries
- Add photo categories or tags

## 🔐 Security Considerations

This demo uses public access for simplicity. For production use, consider:

1. **Authentication**: Implement user authentication
2. **RLS Policies**: Set up proper Row Level Security policies
3. **File Upload Limits**: Add file size and type restrictions
4. **Rate Limiting**: Implement upload rate limiting
5. **Content Moderation**: Add image content validation

## 🐛 Troubleshooting

### Common Issues:

1. **Photos not loading**: Check your Supabase URL and keys
2. **Upload failing**: Verify your storage bucket is created and accessible
3. **Site not accessible**: Ensure GitHub Pages is enabled and deployed
4. **CORS errors**: Check your Supabase project settings

### Debug Steps:

1. Open browser developer tools (F12)
2. Check the Console tab for error messages
3. Verify your Supabase configuration in `script.js`
4. Test your Supabase connection in the Supabase dashboard

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📧 Support

If you have questions or need help:
1. Check the Issues tab on GitHub
2. Create a new issue with your question
3. Include error messages and steps to reproduce any problems

---

**Happy photo sharing! 📸✨** 