<template>
  <div class="container mx-auto">
    <div
      class="mx-2 flex items-center justify-between gap-3 h-[--header-height]"
    >
      <div class="lg:flex-1 flex items-center gap-1.5">
        <span class="font-semibold">Akif's Tool</span>
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
        <button class="px-2 lg:hidden hover:bg-zinc-100">
          <Icon name="material-symbols:list-rounded" size="25" />
        </button>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const pages = [
  {
    url: routes.HOME,
    title: "Home",
  },
  {
    url: routes.MANIFEST,
    title: "Manifest",
  },
];
useSeoMeta({
  title: "Awesome Tool",
  description: "the tool generate something you want",
  ogTitle: "Awesome Tool",
  ogDescription: "the tool generate something you want",
  ogImage: "/card.png",
  ogUrl: "/card.png",
  twitterTitle: "Awesome Tool",
  twitterDescription: "the tool generate something you want",
  twitterImage: "/card.png",
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
      href: "/favicon.ico",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
});
</script>
