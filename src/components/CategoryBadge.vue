<template>
    <span 
        v-if="category"
        class="px-2 py-1 text-xs font-semibold rounded-md flex items-center gap-1 w-fit" 
        :style="{ backgroundColor: category.color + '20', color: category.color }"
    >
        <img v-if="category.icon_url" :src="category.icon_url" class="w-3 h-3" alt="" />
        {{ category.name }}
    </span>
</template>
<script setup>
defineProps({
    category: {
        type: Object,
        default: null
    }
})
</script>
    