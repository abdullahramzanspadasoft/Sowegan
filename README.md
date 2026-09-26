# Sowegan

Professional multi-asset trading frontend built with Next.js, TypeScript, and Tailwind CSS.

This is a production-quality UI for a trading platform named **Sowegan**. Market prices, balances, transactions, and charts use realistic mock data. There is no live brokerage, payment processing, or financial API integration.

## Login

Flow:

1. Landing → **Login** / **Register**
2. Select **country/region**
3. Sign in with **any** email and password (frontend only)
4. Choose **demo** or **real** trading (Deriv connect for real)
5. Open the dashboard

## Pages

- `/` Landing page
- `/login` Login
- `/signup` Sign up
- `/forgot-password` Password reset
- `/about` Company
- `/contact` Support
- `/dashboard` Trading workspace
- `/dashboard/markets` Market board
- `/dashboard/profile` Profile and settings

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```
