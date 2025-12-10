<template>
    <div class="text-center py-10 text-gray-300">
        <p>{{ message }}</p>
    </div>
</template>
<script setup>
defineProps({
    message: String
})
</script>
    