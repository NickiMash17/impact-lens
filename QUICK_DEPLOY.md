# 🚀 Quick Deploy Guide

## Fastest Way: Deploy to Vercel (2 minutes)

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import `NickiMash17/impact-lens`
   - Click "Deploy" (no configuration needed!)

3. **Done!** Your app will be live in ~2 minutes

**Optional:** Add `VITE_OPENAI_API_KEY` in Vercel project settings if you want AI insights.

---

## What's Already Configured?

✅ `vercel.json` - Vercel deployment config  
✅ Build scripts in `package.json`  
✅ SPA routing configured (all routes work)  
✅ Environment variables documented  
✅ App works without API key (fallback enabled)

---

## After Deployment

1. Test your live site
2. Share the URL!
3. (Optional) Add custom domain in platform settings

**That's it!** 🎉
