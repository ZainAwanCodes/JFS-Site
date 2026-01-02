# Installation Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install all required packages including:
   - Next.js 14
   - React 18
   - TypeScript
   - Tailwind CSS
   - Framer Motion
   - React Hook Form
   - Zod
   - Lucide React icons

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── about/
│   ├── services/
│   ├── contact/
│   ├── faq/
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── ServicesPreview.tsx
│   ├── Testimonials.tsx
│   ├── CTA.tsx
│   ├── ServicesDetail.tsx
│   ├── QuoteCalculator.tsx
│   ├── AboutContent.tsx
│   ├── ContactContent.tsx
│   ├── ContactForm.tsx
│   └── FAQContent.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Features Implemented

✅ Modern Next.js 14 with App Router  
✅ TypeScript for type safety  
✅ Tailwind CSS for styling  
✅ Responsive design (mobile-first)  
✅ Smooth animations with Framer Motion  
✅ Interactive quote calculator  
✅ Contact form with validation  
✅ FAQ page with accordion  
✅ SEO-optimized pages  
✅ Google Maps integration  
✅ Modern UI/UX design  

## Next Steps

1. **Backend Integration**: Connect the contact form to an API endpoint or email service
2. **Content Management**: Add a CMS for easy content updates
3. **Analytics**: Add Google Analytics or similar tracking
4. **Deployment**: Deploy to Vercel (recommended) or your preferred platform

## Environment Variables (Optional)

Create a `.env.local` file for any API keys or configuration:

```env
NEXT_PUBLIC_API_URL=your_api_url
EMAIL_SERVICE_API_KEY=your_email_key
```

