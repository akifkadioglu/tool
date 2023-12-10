<template>
  <div class="space-y-5 mb-16 mt-5">
    <div class="space-y-3 max-w-prose mx-auto text-center">
      <div class="text-start">
        <input type="file" accept="image/png, image/jpeg" @input="take" />
      </div>
      <transition name="slide-up" mode="out-in">
        <img
          v-if="imageUrl"
          class="px-10 mx-auto border border-zinc-100 bg-zinc-100"
          :src="imageUrl"
          alt="selected file"
          width="350"
        />
      </transition>

      <div class="grid sm:grid-cols-2 grid-cols-1">
        <div class="px-2">
          <div class="font-bold text-start text-start">short_name</div>
          <input
            v-model="short_name"
            type="text"
            class="border rounded-full px-3 py-1 focus:outline-none focus:border-zinc-300 bg-zinc-200 w-full"
          />
        </div>
        <div class="px-2">
          <div class="font-bold text-start">name</div>
          <input
            v-model="name"
            type="text"
            class="border rounded-full px-3 py-1 focus:outline-none focus:border-zinc-300 bg-zinc-200 w-full"
          />
        </div>
      </div>

      <div class="px-2">
        <div class="font-bold text-start">description</div>
        <textarea
          v-model="description"
          rows="4"
          class="border rounded px-3 py-1 focus:outline-none focus:border-zinc-300 bg-zinc-200 w-full"
        />
      </div>

      <div class="grid sm:grid-cols-2 grid-cols-1">
        <div class="px-2">
          <div class="font-bold text-start">id</div>
          <input
            v-model="id"
            type="text"
            class="border rounded-full px-3 py-1 focus:outline-none focus:border-zinc-300 bg-zinc-200 w-full"
          />
        </div>

        <div class="px-2">
          <div class="font-bold text-start">start_url</div>
          <input
            v-model="start_url"
            type="text"
            class="border rounded-full px-3 py-1 focus:outline-none focus:border-zinc-300 bg-zinc-200 w-full"
          />
        </div>
      </div>

      <div class="px-2">
        <div class="font-bold text-start">scope</div>
        <input
          v-model="scope"
          type="text"
          class="border rounded-full px-3 py-1 focus:outline-none focus:border-zinc-300 bg-zinc-200 w-full"
        />
      </div>
      <div class="grid sm:grid-cols-2 grid-cols-1">
        <div class="px-2 text-start">
          <div class="font-bold">background_color</div>
          <input v-model="background_color" type="color" />
        </div>
        <div class="px-2 text-start">
          <div class="font-bold">theme_color</div>
          <input v-model="theme_color" type="color" />
        </div>
      </div>

      <div class="px-2">
        <div class="font-bold text-start">display</div>
        <select
          v-model="display"
          class="border rounded-full px-3 py-1 focus:outline-none focus:border-zinc-300 bg-zinc-200 w-full"
        >
          <option value="fullscreen">fullscreen</option>
          <option value="standalone">standalone</option>
          <option value="minimal-ui">minimal-ui</option>
          <option value="browser">browser</option>
        </select>
      </div>

      <div class="space-x-10">
        <button
          @click="generate"
          class="border hover:bg-zinc-200 px-3 py-1 rounded"
        >
          Generate
        </button>
      </div>
    </div>
    <transition mode="out-in" name="slide-up">
      <div class="bg-zinc-100 p-5" v-if="result">
        <div class="flex justify-end">
          <button @click.prevent="copy">
            <Icon
              name="material-symbols:content-copy-outline"
              class="hover:scale-125"
            />
          </button>
        </div>
        <pre class="overflow-x-auto" v-html="result" />
      </div>
    </transition>
  </div>
</template>
<script setup>
import copyClipboard from "copy-to-clipboard";
import JSZip from "jszip";

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
  if (image.value != undefined && image.value != "") {
    imageUrl.value = URL.createObjectURL(image.value);
  } else {
    imageUrl.value = "";
  }
}
async function copy() {
  copyClipboard(result.value);
  store.addToast("Copied 🥳", "", {
    bg: "bg-zinc-900",
    text: "text-white",
    icon: "text-green-500",
  });
}
async function generate() {
  const zip = new JSZip();
  if (image.value != undefined && image.value != "") {
    const base64_1 = cleanBase64(await resizeFile(image.value, 192, "png"));
    const base64_2 = cleanBase64(await resizeFile(image.value, 512, "png"));

    addToZip(zip, base64_1, "icons-192.png");
    addToZip(zip, base64_2, "icons-512.png");

    icons.value = [
      {
        src: "/icons-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/icons-512.png",
        type: "image/png",
        sizes: "512x512",
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
  zip.file("manifest.json", JSON.stringify(JSON.parse(result.value)));
  const content = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(content);
  link.download = "public.zip";
  link.click();
  store.addToast("Generated 🎉🥳🎉", "Your public folder generated!!!", {});
}
</script>
