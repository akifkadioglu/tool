<template>
  <div class="fixed top-20 w-full h-full bg-white lg:hidden border-t p-5">
    <ul class="container mx-auto font-semibold">
      <li v-for="(item, index) in pages" :key="index">
        <div
          v-if="route.path == item.url"
          class="flex text-sky-600 items-center space-x-3 mx-2"
        >
          <Icon :name="item.icon" size="20" />
          <span>{{ item.title }}</span>
        </div>
        <button v-else @click="$emit('closeMenu')">
          <NuxtLink
            :to="item.url"
            class="flex hover:text-sky-600 items-center space-x-3 mx-2"
          >
            <Icon :name="item.icon" size="20" />
            <span>{{ item.title }}</span>
          </NuxtLink>
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup>
const route = useRoute();
window.scrollTo(0, 0);
defineProps({
  pages: Array,
});
</script>
