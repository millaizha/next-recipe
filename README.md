# 🍜 Recipe Application - Next.js Project

A modern recipe application built with **Next.js** that allows users to browse a variety of noodle and pasta recipes, view detailed recipe information, and enjoy a smooth, responsive user experience.

---

## 🌐 Overview

This project demonstrates a clean and interactive recipe browsing experience. Users can:

- Search and filter recipes by keyword or noodle type
- View ingredients and instructions
- Navigate between a responsive home page and dynamic recipe detail pages

---

## ✨ Features

- 🧠 **React Hooks** for client-side data fetching and UI updates
- 🔍 **Search & Filter** support with Autocomplete and multi-select dropdowns
- 📄 **REST API** built from local JSON file via `/api/recipes`
- 📱 **Fully Responsive** layout using **Tailwind CSS**
- 🎨 Smooth scroll and UI animations with **Framer Motion** and **Lenis**

---

## 🗂️ Project Structure

```

recipe-app/
├── app/
│   ├── api/
│   │   └── recipes/
│   │       └── route.ts      
│   ├── recipes/
│   │   └── \[id]/page.tsx   
│   ├── providers/
│   │   └── LenisProvider.tsx 
│   └── page.tsx       
├── data/
│   └── recipes.json 
├── components/
│   ├── RecipeCard.tsx    
│   └── RecipeDetail.tsx    
├── styles/
│   └── globals.css            
└── package.json

````

---

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://github.com/motiondivision/motion) – animations
- [Lenis](https://lenis.darkroom.engineering/) – smooth scrolling
- [@heroui/react](https://heroui.com) – UI components (Autocomplete, Select)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/millaizha/next-recipe.git
cd next-recipe
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to view the app.

---

## 🔧 Implementation Details

### ✅ API (`/api/recipes`)

* Returns recipe data from the local JSON file

### ✅ Home Page (`app/page.tsx`)

* Displays a grid of recipes
* Includes search (by name) and filter (by noodle type)

### ✅ Detail Page (`app/recipes/[id]/page.tsx`)

* Dynamic routing based on recipe ID
* Full display of ingredients, instructions, and metadata

### ✅ Styling

* Tailwind-based layout
* Scroll animation using Lenis
* Entry animations using Framer Motion

---

## 📄 License

This project is for a practice activity as an intern at Old.St Labs and not licensed for commercial use. Adapt freely for personal and academic use.

---