# Deployment Guide

This guide covers deploying Impact Lens to free hosting platforms.

## Quick Deploy Options

### 🚀 Vercel (Recommended - Easiest)

**Why Vercel?**
- Zero configuration needed
- Automatic deployments from GitHub
- Free SSL, CDN, and custom domains
- Perfect for React/Vite apps

**Steps:**
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" → Import your repository
4. Vercel auto-detects Vite - no configuration needed!
5. (Optional) Add `VITE_OPENAI_API_KEY` in Environment Variables
6. Click "Deploy"

**Deploy via CLI:**
```bash
npm i -g vercel
vercel
```

---

### 🌐 Netlify

**Why Netlify?**
- Great free tier
- Easy GitHub integration
- Built-in form handling and serverless functions

**Steps:**
1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. (Optional) Add `VITE_OPENAI_API_KEY` in Environment Variables
7. Click "Deploy site"

**Deploy via CLI:**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

---

### ⚡ Cloudflare Pages

**Why Cloudflare Pages?**
- Fast global CDN
- Unlimited bandwidth on free tier
- Great performance

**Steps:**
1. Push code to GitHub
2. Visit [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
3. Click "Create a project" → "Connect to Git"
4. Select repository
5. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
6. (Optional) Add `VITE_OPENAI_API_KEY` in Environment Variables
7. Click "Save and Deploy"

---

### 📦 GitHub Pages

**Why GitHub Pages?**
- Free hosting for public repos
- Direct integration with GitHub

**Steps:**
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Update `vite.config.ts`:
   ```ts
   export default defineConfig({
     base: '/impact-lens/', // Your repo name
     // ... rest of config
   })
   ```
4. Deploy: `npm run deploy`

---

## Environment Variables

### Optional: OpenAI API Key

The app works perfectly without an API key (uses fallback insights). To enable AI insights:

1. Get an OpenAI API key from [platform.openai.com](https://platform.openai.com)
2. Add to your deployment platform's environment variables:
   - **Variable name:** `VITE_OPENAI_API_KEY`
   - **Value:** `sk-...` (your API key)

**Where to add:**
- **Vercel:** Project Settings → Environment Variables
- **Netlify:** Site Settings → Environment Variables
- **Cloudflare:** Pages → Your Project → Settings → Environment Variables

---

## Build Verification

Before deploying, test the build locally:

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` folder.

---

## Post-Deployment Checklist

- [ ] Test the deployed site on mobile and desktop
- [ ] Verify all routes work (landing page, dashboard)
- [ ] Check that animations and interactions work
- [ ] Test theme toggle (light/dark mode)
- [ ] Verify AI insights work (if API key is set)
- [ ] Check console for any errors
- [ ] Test on different browsers

---

## Troubleshooting

### Build Fails
- Ensure Node.js 18+ is installed
- Run `npm install` to ensure dependencies are installed
- Check for TypeScript errors: `npm run lint`

### Routes Not Working (404 errors)
- Ensure SPA routing is configured (rewrites/redirects)
- Check that `index.html` is served for all routes
- Verify deployment platform supports client-side routing

### Environment Variables Not Working
- Ensure variable name starts with `VITE_` for Vite apps
- Redeploy after adding environment variables
- Check variable is set in production environment (not just preview)

### Large Bundle Size Warning
- This is normal for a feature-rich React app
- The app is optimized and will load fine
- Consider code-splitting if needed (future optimization)

---

## Custom Domain

All platforms support custom domains on free tier:

- **Vercel:** Project Settings → Domains
- **Netlify:** Site Settings → Domain Management
- **Cloudflare:** Pages → Your Project → Custom Domains

---

## Need Help?

- Check platform-specific documentation
- Review build logs in deployment dashboard
- Test build locally first: `npm run build && npm run preview`