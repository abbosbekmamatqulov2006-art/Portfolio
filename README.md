# 🚀 Abbosbek Mamatqulov — Portfolio Website

React + Vite portfolio with GitHub Pages deployment.

---

## ⚡ Quick Start (local)

```bash
npm install
npm run dev
```

Open: http://localhost:5173/portfolio/

---

## 📝 Content qanday o'zgartirish kerak

`src/App.jsx` faylining **tepasidagi `DATA` obyektini** tahrirlang:

- `email`, `github`, `linkedin`, `telegram` — o'zingiznikini yozing
- `about` — o'zingiz haqingizda
- `skills` — ko'nikmalar va foizlar
- `experience` — ish tajribasi
- `projects` — loyihalar
- `certificates` — sertifikatlar
- `blog` — maqolalar

Har bir o'zgarishdan keyin: `git add . && git commit -m "update content" && npm run deploy`

---

## 🌐 GitHub Pages ga Deploy qilish

### 1. GitHub da repo yarating
- GitHub.com → "New repository"
- Repo nomi: `portfolio` (yoki boshqa nom)
- Public qilib qo'ying

### 2. `vite.config.js` ni sozlang
```js
base: '/portfolio/',  // ← repo nomingizni yozing
```

### 3. `package.json` ga homepage qo'shing
```json
"homepage": "https://YOURUSERNAME.github.io/portfolio/"
```

### 4. Git bilan ulanish
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/portfolio.git
git push -u origin main
```

### 5. Deploy
```bash
npm run deploy
```

Bu komanda `gh-pages` branch yaratadi va sayt jonli bo'ladi!

---

## 🔁 Keyingi yangilanishlar

```bash
# Faylni o'zgartiring...
git add .
git commit -m "add new certificate"
npm run deploy
```

**Sayt manzili:** `https://YOURUSERNAME.github.io/portfolio/`

---

## 📦 Stack
- React 18
- Vite 5
- Recharts (charts)
- CSS Custom Properties (theming)
- GitHub Pages (hosting)
