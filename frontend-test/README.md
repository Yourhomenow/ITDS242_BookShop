# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


project structure
src/
├── app/                  # Application configuration & entry points
│   ├── providers.tsx     # Global context providers (Theme, Auth, QueryClient)
│   ├── router.tsx        # Centralized route definitions
│   └── main.tsx          # React mount entry point
│
├── features/             # Self-contained business modules (The Core)
│   ├── auth/             # Example Feature: Authentication
│   │   ├── api/          # Feature-specific HTTP requests / React Query hooks
│   │   ├── components/   # UI components used only inside this feature
│   │   ├── hooks/        # Custom hooks specific to this feature's logic
│   │   ├── types/        # TypeScript declarations for this domain
│   │   └── index.ts      # Public API / Barrel file exporting allowed items
│   │
│   └── product-catalog/  # Example Feature: Products
│       ├── api/
│       ├── components/
│       │   ├── ProductCard.tsx
│       │   └── ProductList.tsx
│       ├── hooks/
│       └── index.ts
│
├── shared/               # Global reusable primitives (independent of domain)
│   ├── components/       # Design system elements (Button, Input, Modal)
│   ├── hooks/            # Global utilities (useDebounce, useLocalStorage)
│   ├── utils/            # Pure helper functions (formatCurrency, formatDate)
│   ├── types/            # Global/Generic TypeScript types
│   └── lib/              # Pre-configured third-party clients (axios, supabase)
│
└── assets/               # Static global files (images, global css, fonts)
