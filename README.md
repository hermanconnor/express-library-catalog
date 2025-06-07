# 📘 Express Local Library 📖

![Preview of Express Library](/public/images/dark-home.png)

## ✨ Overview

This project was originally one of my projects from the [Treehouse](https://teamtreehouse.com/) Full Stack JavaScript Techdegree Certificate. I repeated the project from scratch using prisma and typescript, and expanded upon it with the [MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) Web Docs guide on Server-Side Website Programming.

The project is an online catalog for a small local library, designed to manage and display information about books, authors, genres, and book instances. It provides users with the ability to browse and interact with a catalog of available books, including CRUD functionality for managing the following entities:

- **Genres**
- **Authors**
- **Books**
- **Book Instances**

The project was developed with modern technologies, including TypeScript, Prisma, SQLite, TailwindCSS, daisyUI, Zod, and Pug as the template engine.

## 🚀 Features

- **Browse Books**: View a list of books available in the library with details such as title, author, genre, and availability.
- **CRUD Operations**:
  - **Genres**: Create, read, update, and delete genres.
  - **Authors**: Create, read, update, and delete authors.
  - **Books**: Create, read, update, and delete books.
  - **Book Instances**: Create, read, update, and delete specific instances of books (i.e., copies available in the library).
- **User-friendly Interface**: The front-end is built using **TailwindCSS and daisyUI**, ensuring a responsive and modern design.
- **Pug Template Engine**: **Pug** is used to render dynamic HTML pages on the server-side, providing a clean, efficient way to generate HTML templates.

## 🛠️ Technologies Used

- Node.js
- Express.js
- TypeScript
- Prisma
- SQLite
- TailwindCSS & DaisyUI
- Pug
- Zod

## 📸 Preview

Here is a preview of the app:

![Preview of Express Library](/public/images/light-book-list.png)
![Preview of Express Library](/public/images/dark-bookinstance-list.png)
![Preview of Express Library](/public/images/dark-book-detail.png)
![Preview of Express Library](/public/images/dark-update-book.png)
![Preview of Express Library](/public/images/dark-delete-book.png)

## 📦 How to Run Locally

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/express-library-catalog.git
cd express-library-catalog
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

4. **Visit the app in your browser:**

```
http://localhost:5000
```

## 🔧 Available Scripts

- `npm run dev` – Start dev server with TypeScript watcher
- `npm run build` – Compile TypeScript
- `npm start` – Run the compiled app

## 👋 Acknowledgments

- Thanks to [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs) and the [Treehouse](https://teamtreehouse.com/techdegree/full-stack-javascript) coding community for providing invaluable resources and support.
