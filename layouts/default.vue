<template>
  <div class="container mx-auto">
    <div class="mr-5 flex items-center justify-between gap-3">
      <div class="lg:flex-1 flex items-center gap-1.5">
        <img src="/logo.webp" alt="logo" height="75" width="75" />
      </div>
      <ul class="items-center gap-x-8 hidden lg:flex">
        <li v-for="(item, index) in pages" :key="index">
          <NuxtLink
            :to="item.url"
            class="font-bold hover:text-sky-600"
            :class="route.path == item.url ? 'text-sky-600' : ''"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <button class="px-2 hover:bg-zinc-100">
          <NuxtLink to="https://github.com/akifkadioglu/tool" target="_blank">
            <Icon name="carbon:logo-github" size="25" />
          </NuxtLink>
        </button>
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="px-2 lg:hidden hover:bg-zinc-100 z-10"
        >
          <Icon name="material-symbols:list-rounded" size="25" />
        </button>
      </div>
    </div>
    <div class="mx-2">
      <slot />
    </div>
  </div>
  <transition name="slide-up" mode="out-in">
    <AppMenu
      :pages="pages"
      v-if="isMenuOpen"
      @close-menu="() => (isMenuOpen = false)"
    />
  </transition>
</template>

<script lang="ts" setup>
const route = useRoute();
const isMenuOpen = ref(false);
const pages = [
  {
    icon: "ph:house-light",
    url: routes.HOME,
    title: "Home",
  },
  {
    icon: "ic:round-horizontal-rule",
    url: routes.MANIFEST,
    title: "Manifest",
  },
  {
    icon: "ic:round-horizontal-rule",
    url: routes.JSON_TRANSFORM,
    title: "JSON Transform",
  },
];

useSeoMeta({
  title: "Awesome Tool",
  description: "the tool generate something you want",
  ogTitle: "Awesome Tool",
  ogDescription: "the tool generate something you want",
  ogImage:
    "https://raw.githubusercontent.com/akifkadioglu/images/main/card.png",
  ogUrl: "https://raw.githubusercontent.com/akifkadioglu/images/main/card.png",
  twitterTitle: "Awesome Tool",
  twitterDescription: "the tool generate something you want",
  twitterImage:
    "https://raw.githubusercontent.com/akifkadioglu/images/main/card.png",
  twitterCard: "summary",
});
useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "https://raw.githubusercontent.com/akifkadioglu/images/main/img/favicon.ico",
    },
    {
      rel: "manifest",
      href: "https://raw.githubusercontent.com/akifkadioglu/tool/main/public/manifest.json",
    },
  ],
});
</script>
