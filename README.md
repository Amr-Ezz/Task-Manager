Task Manager App

A small and straightforward task manager built with Vue 3 and Supabase.
Create tasks, group them into categories, set priorities, and track what’s done and what still needs attention.

Overview

This app helps you stay organized.
You can add tasks, edit them, mark them as completed, and filter them by category.
Everything is saved in a Supabase backend.

Features

Add, edit, and delete tasks

Category support (with colors/icons)

Optional priority and due dates

Mark tasks as completed or pending

Mobile-friendly layout

Simple dark UI

Getting Started
Requirements

Node.js

npm or yarn

A Supabase project

Setup

Clone the repo

git clone <your-repo-url>
cd task-manager



Install packages:

npm install


Add your Supabase credentials:

Create a .env file:

VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key


Run the app:

npm run dev


Visit:

http://localhost:5173

How It Works
Adding a Task

Click Add Task

Fill in the title, description, and category

Set priority, due date, or image if you want

Save it

Viewing & Editing

Click any task card to see the full details

From there, you can edit or delete the task

Completing Tasks

Use the toggle to mark a task as “Completed” or switch it back to “Pending”.

Tech Used

Vue 3

Vite

Pinia

Vue Router

Tailwind CSS

Supabase

Axios

Project Structure
src/
  api/           # API requests
  components/    # UI components
  pages/         # Main pages
  stores/        # Pinia stores
  router/        # Routes

Database (Supabase)
Tasks

id

title

description

category_id

priority

due_date

image_url

completed

created_at

Categories

id

name

color

icon_url

Common Issues

Tasks not loading
→ Check .env values

Can’t create tasks
→ Title, description, and category are required