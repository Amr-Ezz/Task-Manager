<template>
   <div class="flex flex-col lg:flex-row min-h-screen">
    <!-- Mobile/Tablet Header (top) -->
    <header class="lg:hidden bg-gray-900 text-white p-4 flex justify-between items-center sticky top-0 z-10">
      <span class="font-bold text-white">Task Manager</span>
    </header>

    <!-- Desktop Sidebar (only on large screens) -->
    <aside class="w-64 bg-gray-900 text-white p-5 hidden lg:block">
        <h2 class="text-xl font-bold mb-6">Task Manager</h2>
        <nav class="flex flex-col gap-3">
            <RouterLink to="/tasks" class="text-white hover:text-gray-300 transition">Tasks</RouterLink>
            <RouterLink to="/tasks/add" class="text-white hover:text-gray-300 transition">Add Task</RouterLink>
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 bg-gray-900 pb-16 lg:pb-0">
        <RouterView />
    </main>

    <!-- Mobile/Tablet Bottom Navigation -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white border-t border-gray-700 z-10">
      <div class="flex justify-around items-center h-16">
        <RouterLink 
          to="/tasks" 
          class="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-800 transition"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span class="text-xs">Tasks</span>
        </RouterLink>
        <RouterLink 
          to="/tasks/add" 
          class="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-800 transition"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="text-xs">Add Task</span>
        </RouterLink>
      </div>
    </nav>
   </div>
</template>