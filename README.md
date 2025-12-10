# Task Manager App

A small and straightforward task manager built with **Vue 3** and **Supabase**.  
Create tasks, group them into categories, set priorities, and track what's done and what still needs attention.

## Overview

This app helps you stay organized.  
You can add tasks, edit them, mark them as completed, and filter them by category.  
Everything is saved in a Supabase backend.

## Features

- Add, edit, and delete tasks
- Category support (with colors/icons)
- Optional priority and due dates
- Mark tasks as completed or pending
- Mobile-friendly layout
- Simple dark UI

## Getting Started

### Requirements

- Node.js
- npm or yarn
- A Supabase project

### Setup

1. **Clone the repo**

```bash
git clone <your-repo-url>
cd task-manager
```

2. **Install packages:**

```bash
npm install
```

3. **Add your Supabase credentials:**

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

4. **Run the app:**

```bash
npm run dev
```

5. **Visit:**

```
http://localhost:5173
```

## How It Works

### Adding a Task

1. Click **Add Task**
2. Fill in the title, description, and category
3. Set priority, due date, or image if you want
4. Save it

### Viewing & Editing

- Click any task card to see the full details
- From there, you can edit or delete the task

### Completing Tasks

- Use the toggle to mark a task as "Completed" or switch it back to "Pending".

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Fast build tool
- **Pinia** - State management
- **Vue Router** - Routing
- **Tailwind CSS** - Utility-first CSS
- **Supabase** - Backend as a Service
- **Axios** - HTTP client

## Project Structure

```
src/
  api/           # API requests
  components/    # UI components
  pages/         # Main pages
  stores/        # Pinia stores
  router/        # Routes
```

## Database (Supabase)

### Tasks Table

- `id`
- `title`
- `description`
- `category_id`
- `priority`
- `due_date`
- `image_url`
- `completed`
- `created_at`

### Categories Table

- `id`
- `name`
- `color`
- `icon_url`
