# Quick Setup Guide

Follow these steps to get your photo gallery up and running quickly:

## 🚀 Quick Start (5 minutes)

### 1. Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to SQL Editor and run the contents of `supabase-setup.sql`
4. Go to Storage and create a bucket named `photos` (make it public)
5. Go to Settings → API and copy your URL and anon key

### 2. Configure Your Site
1. Open `script.js` in your code editor
2. Replace these lines with your actual Supabase credentials:
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```

### 3. Deploy to GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" and choose `main` branch
4. Your site will be live at `https://yourusername.github.io/repository-name/`

## ✅ Test Your Setup

1. Visit your GitHub Pages URL
2. Try uploading a photo
3. Check if the photo appears in your gallery
4. Test the search functionality

## 🆘 Need Help?

- Check the main README.md for detailed instructions
- Look at the browser console (F12) for error messages
- Verify your Supabase credentials are correct
- Make sure your storage bucket is public and named "photos"

## 🔧 Common Issues

**Photos not showing up?**
- Check browser developer tools for errors
- Verify Supabase URL and key are correct
- Ensure storage bucket exists and is public

**Upload not working?**
- Check file size (must be under 5MB by default)
- Verify file type is supported (jpg, png, gif, webp)
- Check browser console for error messages

**GitHub Pages not working?**
- Wait 5-10 minutes after enabling Pages
- Check that the repository is public
- Verify the correct branch is selected

## 🎉 You're Done!

Your photo gallery should now be live and ready to use. Happy photo sharing! 