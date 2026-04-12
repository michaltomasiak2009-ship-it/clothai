# ClothAI — Fashion Photo AI SaaS

Nowoczesna aplikacja SaaS do automatycznej obróbki zdjęć odzieży przy użyciu AI.

## 🚀 Szybki start

```bash
# Instalacja zależności
npm install

# Uruchomienie dev serwera
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## 📁 Struktura projektu

```
clothai/
├── app/
│   ├── api/
│   │   ├── upload/route.ts     # Endpoint uploadu zdjęcia
│   │   └── process/route.ts    # Endpoint przetwarzania AI
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── AppSection.tsx          # Główny interfejs aplikacji
│   ├── FeaturesSection.tsx
│   ├── PricingSection.tsx
│   └── Footer.tsx
├── vercel.json
└── README.md
```

## 🤖 Integracja AI

### Usuwanie tła
Zalecane serwisy:
- **Remove.bg API** — prosta integracja, ~$0.02/zdjęcie
- **Replicate** — modele open-source (REMBG, U2Net)
- **Cloudinary** — wbudowane narzędzia do obróbki

### Tryb Na Modelce
Zalecane serwisy:
- **Fashn.ai** — specjalizuje się w wirtualnym przymierzaniu
- **Replicate** — modele: IDM-VTON, CatVTON
- **Kaleido AI** — zaawansowany virtual try-on

### Przykład integracji (app/api/process/route.ts)

```typescript
// Remove.bg
const response = await fetch("https://api.remove.bg/v1.0/removebg", {
  method: "POST",
  headers: {
    "X-Api-Key": process.env.REMOVE_BG_API_KEY!,
  },
  body: formData,
});

// Replicate (VTON)
const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
const output = await replicate.run("cuuupid/idm-vton:...", {
  input: { human_img: garmentUrl, garm_img: garmentUrl }
});
```

## ☁️ Deploy na Vercel

```bash
# Instalacja Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy produkcyjny
vercel --prod
```

## 🔧 Zmienne środowiskowe

Utwórz plik `.env.local`:

```env
# AI Services
REMOVE_BG_API_KEY=your_key
REPLICATE_API_TOKEN=your_token
FASHN_API_KEY=your_key

# Storage (np. Cloudinary lub S3)
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📦 Tech Stack

- **Next.js 14** — App Router, API Routes
- **TypeScript** — pełne typowanie
- **Tailwind CSS** — stylowanie
- **react-dropzone** — drag & drop upload
- **Vercel** — hosting

## 📄 Licencja

MIT
