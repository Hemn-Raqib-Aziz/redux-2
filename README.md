# 📝 Mini Redux Blog App

A modern, responsive blog application built using **React**, **Redux Toolkit**, and **React Router**. This mini blog platform allows users to create, read, and explore posts, navigate to user profiles, and access private routes through a simple simulated authentication state.

---

## 📌 Overview

This project demonstrates the core concepts of Redux Toolkit and client-side routing with React. It supports:

- Creating blog posts via a form
- Viewing all posts in a styled card format
- Navigating to post detail pages
- Viewing individual user profiles
- Route protection (Private Routes)
- State management using Redux
- Smooth animations using Framer Motion
- Toast feedback using `react-hot-toast`

---

## 🔐 Authentication Flow

The authentication is **simulated** using a `login` function. It toggles an `auth` boolean in Redux state. There is no real back-end or password — it mimics login for front-end learning.

### How it works:

1. `Login.jsx` includes a button that dispatches the `login()` action from `authSlice`.
2. Once logged in (`auth.auth === true`), the user gains access to protected routes.
3. `PrivateRoutes.jsx` checks the Redux auth state:
   - If `auth.auth === false`, the user is redirected to `/` and a toast is shown.
   - If `true`, it renders the child route (like post details or profile).

You can expand this later to use real JWT or cookie-based login.

---

## 📚 Features & Functionality

### 📝 AddPostForm

- A user-facing form that collects:
  - **Post Title**
  - **Post Author (from list of users)**
  - **Post Content**
- Dispatches `addPost()` from `postsSlice`
- Adds a new post with unique `id` to the Redux store
- Form is reset after successful post

### 📄 PostsList

- Fetches all posts using `selectAllPosts()` selector
- Uses `useSelector` to get post list from Redux
- Maps through posts and renders `PostCard` for each
- Shows a fallback if no posts exist

### 📦 PostCard

- A simple, animated card component showing:
  - Post title
  - Author name (fetched from `usersSlice`)
  - Link to full blog details `/post/:postId`
  - Link to profile of author `/profile/:userId`
- Uses `Framer Motion` for entry animation

### 📄 BlogDetails Page

- Route: `/post/:postId`
- Protected by `PrivateRoutes`
- Fetches single post using ID from URL params
- Also shows author name from `usersSlice`
- Shows full content of the selected blog

### 👤 Profile Page

- Route: `/profile/:userId`
- Protected by `PrivateRoutes`
- Shows:
  - Author name
  - Number of posts by that user
  - A list of all posts authored by them
- Styled with a clean layout and fade animation

---

## 🧠 State Management (Redux Toolkit)

### 📌 postsSlice

Manages all post-related state:
- `addPost`: Adds a new post with title, content, userId
- Selectors:
  - `selectAllPosts` – Get all posts
  - `selectPostById` – Get single post by ID
  - `selectPostsByUser` – Get posts by userId

### 📌 userSlice

Manages static list of users:
- Users are predefined in the slice (`id`, `name`)
- `selectAllUsers` – Get all users
- `selectUserById` – Get single user

### 📌 authSlice

Simulates authentication state:
- `auth: false` by default
- `authorization()` – sets `auth: true`
- `logout()` – sets `auth: false`

---

## 🛡️ PrivateRoutes Component

Wraps around any routes that require login. Example usage:

```jsx
<Route element={<PrivateRoutes />}>
  <Route path="/post/:postId" element={<BlogDetails />} />
  <Route path="/profile/:userId" element={<Profile />} />
</Route>
If the user is not authenticated, react-hot-toast shows a warning and they are redirected to home /.

🔧 Installation
npm install
🧪 Run Locally

npm run dev
Open: http://localhost:5173

🛠 Build for Production
npm run build
npm run preview

Home page
Post list
Add post form
Blog details page
Profile page

📦 Dependencies
react
@reduxjs/toolkit
react-redux
react-router-dom
framer-motion
react-hot-toast


## screenshots

### main page
![localhost_5173_](https://github.com/user-attachments/assets/788ef69e-4fa6-4085-b42b-64bf82af72c3)


### Authorization modal

<img width="960" alt="login" src="https://github.com/user-attachments/assets/ac6cd7ec-2f6d-40c9-a550-26b30ee2e087" />


### Login Modal
<img width="960" alt="login-2" src="https://github.com/user-attachments/assets/adb57c6c-5789-48af-a41b-6b1a04e589a5" />


### Add Post Modal

<img width="960" alt="login-2" src="https://github.com/user-attachments/assets/d3645afa-8d3a-4c28-98c5-757648172f61" />

### Post Page
![localhost_5173_post_92](https://github.com/user-attachments/assets/162d1e05-f805-4f0c-85bc-3ed652bf4ac8)

### authors profile with their posts
![localhost_5173_profile_10](https://github.com/user-attachments/assets/be92f60a-327a-4b53-9381-c05e412f0a38)





