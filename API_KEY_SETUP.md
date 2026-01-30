# API Key Setup Guide

## ✅ Local Development

Your API key should be in a `.env` file in the project root:

```env
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Important:** The `.env` file is now in `.gitignore` so it won't be committed to GitHub.

## 🚀 Deployment Setup

When you deploy, you need to add the API key as an **Environment Variable** in your deployment platform:

### Vercel
1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add new variable:
   - **Name:** `VITE_OPENAI_API_KEY`
   - **Value:** `sk-your-actual-api-key-here`
   - **Environment:** Production, Preview, Development (select all)
4. Redeploy your project

### Cloudflare Pages
1. Go to your project on Cloudflare
2. Settings → Environment Variables
3. Add new variable:
   - **Variable name:** `VITE_OPENAI_API_KEY`
   - **Value:** `sk-your-actual-api-key-here`
4. Redeploy

## 🔒 Security Notes

- ✅ `.env` file is in `.gitignore` (won't be committed)
- ✅ API key is only used client-side for OpenAI calls
- ✅ App has fallback if API key is missing
- ⚠️ Never commit your `.env` file to Git
- ⚠️ Never share your API key publicly

## 🧪 Testing

To verify your API key works:

1. Make sure `.env` file exists with your key
2. Restart dev server: `npm run dev`
3. Go to dashboard and move the slider
4. Check if AI insights are generated (not fallback)

If you see fallback insights, check:
- API key is correct in `.env`
- Variable name is exactly `VITE_OPENAI_API_KEY`
- Dev server was restarted after adding the key
- You have OpenAI API credits

## 📝 Notes

- The app works perfectly **without** the API key (uses fallback)
- AI insights are optional - the core simulation works either way
- Environment variables must start with `VITE_` to be accessible in Vite apps
