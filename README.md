# Task Manager App 📝

A simple and clean task management application built with Vue.js and Supabase. Keep track of your tasks, organize them by categories, and never miss a deadline!

## What's This?

This is a web app that helps you manage your daily tasks. You can create tasks, set priorities, add due dates, and organize everything with categories. It works great on your phone, tablet, or computer.

## Features ✨

- **Create & Edit Tasks** - Add new tasks with titles, descriptions, and images
- **Categories** - Organize tasks with colorful categories
- **Priority Levels** - Set tasks as low, medium, or high priority
- **Due Dates** - Keep track of deadlines
- **Mark Complete** - Toggle tasks between pending and completed
- **Filter by Category** - View tasks from specific categories
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Theme** - Easy on the eyes with a dark blue interface

## Getting Started 🚀

### What You Need

- Node.js (version 14 or higher)
- npm or yarn
- A Supabase account (for the database)

### Installation

1. **Clone the project**
   ```bash
   git clone <your-repo-url>
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the app**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Go to `http://localhost:5173`

## How to Use 📖

### Adding a Task

1. Click the **"+ Add Task"** button
2. Fill in the task details:
   - Title (required)
   - Description (required)
   - Category (required)
   - Priority (optional)
   - Due Date (optional)
   - Image URL (optional)
3. Click **"Create Task"**

### Viewing Tasks

- All your tasks appear as cards on the main page
- Each card shows the title, description, category, and status
- Click on any task card to see full details

### Editing a Task

1. Click on a task to open the details
2. Click the **"Edit Task"** button
3. Make your changes
4. Click **"Update Task"**

### Marking Tasks Complete

- Open any task detail page
- Click the **"Mark as Complete"** button
- The button changes to **"Mark as Pending"** if you want to undo

### Filtering Tasks

Use the category dropdown at the top to filter tasks by category or view all tasks.

## Tech Stack 🛠️

- **Vue 3** - JavaScript framework
- **Vite** - Build tool
- **Vue Router** - Navigation
- **Pinia** - State management
- **Supabase** - Backend database
- **Tailwind CSS** - Styling
- **Axios** - API requests

## Project Structure 📁

```
src/
├── api/              # API calls to Supabase
├── components/       # Reusable Vue components
│   ├── layout/      # Layout components (sidebar, navigation)
│   ├── TaskCard.vue
│   ├── TaskForm.vue
│   └── Toast.vue
├── pages/           # Page components
│   ├── TaskList.vue
│   ├── TaskDetail.vue
│   ├── TaskAdd.vue
│   └── TaskEdit.vue
├── stores/          # Pinia stores
│   ├── taskStore.js
│   └── categoryStore.js
└── router/          # Vue Router configuration
```

## Database Setup 🗄️

You'll need two tables in Supabase:

### Tasks Table
- `id` (uuid, primary key)
- `title` (text)
- `description` (text)
- `category_id` (integer, foreign key)
- `priority` (text) - must be: 'low', 'medium', or 'high'
- `due_date` (date)
- `image_url` (text)
- `completed` (boolean)
- `created_at` (timestamp)

### Categories Table
- `id` (integer, primary key)
- `name` (text)
- `color` (text) - hex color code
- `icon_url` (text)

## Browser Support 🌐

Works on all modern browsers:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari 14+

## Tips 💡

- Leave priority and due date empty if you don't need them
- Use the category colors to quickly identify task types
- The app saves everything automatically to the cloud
- Works offline? Not yet, but it's on the roadmap!

## Troubleshooting 🔧

**Tasks not loading?**
- Check your internet connection
- Make sure your Supabase credentials are correct in the `.env` file

**Can't create tasks?**
- Make sure all required fields are filled (title, description, category)
- Check that priority is set to 'low', 'medium', or 'high' (lowercase)

**Button looks different in Firefox?**
- This is normal, we've added cross-browser compatibility fixes

## What's Next? 🎯

Some ideas for future improvements:
- Offline support
- Task search functionality
- Keyboard shortcuts
- Drag and drop to reorder tasks
- Task reminders/notifications

## License 📄

This project is open source and available for educational purposes.

---

Made with ❤️ using Vue.js and Supabase
