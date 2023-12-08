<template>
  <div class="space-y-5 mb-16 mt-5">
    <div>
      <input type="file" @input="take" />
    </div>
    <transition name="slide-up" mode="out-in">
      <img
        v-if="imageUrl"
        class="px-10 mx-auto border border-zinc-200 bg-zinc-200"
        :src="imageUrl"
        alt="selected file"
        width="350"
      />
    </transition>
    <div class="space-y-3">
      <div>
        <div class="font-bold">short_name</div>
        <input v-model="short_name" type="text" class="border" />
      </div>
      <div>
        <div class="font-bold">name</div>
        <input v-model="name" type="text" class="border" />
      </div>

      <div>
        <div class="font-bold">description</div>
        <input v-model="description" type="text" class="border" />
      </div>
      <div>
        <div class="font-bold">background_color</div>
        <input v-model="background_color" type="color" class="border" />
      </div>
      <div>
        <div class="font-bold">theme_color</div>
        <input v-model="theme_color" type="color" class="border" />
      </div>

      <div>
        <div class="font-bold">id</div>
        <input v-model="id" type="text" class="border" />
      </div>

      <div>
        <div class="font-bold">start_url</div>
        <input v-model="start_url" type="text" class="border" />
      </div>

      <div>
        <div class="font-bold">scope</div>
        <input v-model="scope" type="text" class="border" />
      </div>
      <div>
        <div class="font-bold">display</div>
        <select v-model="display" name="" id="">
          <option value="fullscreen">fullscreen</option>
          <option value="standalone">standalone</option>
          <option value="minimal-ui">minimal-ui</option>
          <option value="browser">browser</option>
        </select>
      </div>
    </div>
    <div class="space-x-10">
      <button
        @click="generate"
        class="border hover:bg-zinc-200 px-3 py-1 rounded"
      >
        Generate
      </button>
      <transition name="slide-up">
        <button
          v-if="imageUrl"
          @click="install"
          class="border hover:bg-zinc-200 px-3 py-1 rounded"
        >
          install img folder
        </button>
      </transition>
    </div>

    <transition mode="out-in" name="slide-up">
      <div class="bg-zinc-100 p-5" v-if="result">
        <div class="flex justify-end">
          <button @click="copy">
            <Icon
              name="material-symbols:content-copy-outline"
              class="hover:scale-125"
            />
          </button>
        </div>
        <pre v-html="result" />
      </div>
    </transition>
  </div>
</template>
<script setup>
const store = useToastStore();
const short_name = ref("");
const name = ref("");
const description = ref("");
const background_color = ref("#000000");
const theme_color = ref("#000000");
const display = ref("fullscreen");
const id = ref("/?source=pwa");
const start_url = ref("/?source=pwa");
const scope = ref("/");

const icons = ref([]);

const result = ref("");
const image = ref("");
const imageUrl = ref("");
function take($event) {
  image.value = $event.target.files[0];
  imageUrl.value = URL.createObjectURL($event.target.files[0]);
}
function copy() {
  navigator.clipboard.writeText(result.value);
  store.addToast("Copied 🥳", "", {
    bg: "bg-zinc-900",
    text: "text-white",
    icon: "text-green-500",
  });
}
function generate() {
  if (imageUrl.value != "") {
    icons.value = [
      {
        src: "/img/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/img/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/img/android-chrome-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/img/android-chrome-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/img/apple-touch-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        src: "/img/apple-touch-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        src: "/img/apple-touch-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        src: "/img/apple-touch-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "/img/apple-touch-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/img/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/img/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/img/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/img/msapplication-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/img/mstile-150x150.png",
        sizes: "150x150",
        type: "image/png",
      },
    ];
  }
  result.value = JSON.stringify(
    {
      short_name: short_name.value,
      name: name.value,
      description: description.value,
      background_color: background_color.value,
      theme_color: theme_color.value,
      display: display.value,
      id: id.value,
      start_url: start_url.value,
      scope: scope.value,
      icons: icons.value,
    },
    null,
    2
  );
}
async function install() {
  store.addToast(
    "Unavailable 😖",
    "Unfortunatelly you cant install for now",
    {}
  );
}
</script>
