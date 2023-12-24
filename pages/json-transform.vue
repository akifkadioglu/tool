<template>
  <div class="grid sm:grid-cols-2 grid-cols-1 mt-5 mb-16">
    <div class="px-2 text-start space-y-5">
      <div>
        <div class="font-bold">name</div>
        <input
          v-model="jsonTitle"
          class="border rounded-full px-3 py-1 focus:outline-none focus:border-zinc-300 bg-zinc-200 w-full"
        />
      </div>
      <div>
        <div class="font-bold">JSON</div>
        <textarea
          ref="textarea"
          v-model="input"
          class="resize-none overflow-hidden border px-3 py-1 focus:outline-none focus:border-zinc-300 bg-zinc-200 w-full"
        />
        <div v-if="!invalidJSON && json != ''" class="text-red-500">
          invalid JSON!
        </div>
      </div>
    </div>
    <div class="px-2 text-start">
      <div class="font-bold">output</div>
      <div class="bg-zinc-100 w-full min-h-36 p-3">
        <div>
          <div v-for="(value, key, index) in output" :key="index">
            <div :class="index != 0 ? 'mt-16' : ''">
              export interface <span class="text-blue-700">{{ key }}</span>
              {

              <div class="ml-10" v-for="(v, k, i) in value" :key="i">
                <span class="text-green-700">{{ k }}</span
                >: {{ v }}
              </div>

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const jsonTitle = ref("");
const { textarea, input } = useTextareaAutosize();

const output = ref({});
const invalidJSON = ref(false);

watch([input, jsonTitle], async ([newJSON, newJSONTitle]) => {
  output.value = {};
  invalidJSON.value = JsonChecker(newJSON);
  if (!invalidJSON.value) {
    return;
  }
  var JSONObj = JSON.parse(newJSON);
  SliceJSON(JSONObj, newJSONTitle == "" ? "Object" : newJSONTitle);
});

function SliceJSON(data, title) {
  let term = {};
  for (let index = 0; index < Object.keys(data).length; index++) {
    let isArray = Array.isArray(Object.values(data)[index]);
    if (isArray) {
      if (Object.values(data)[index].length > 0) {
        term[Object.keys(data)[index]] =
          makeUpperFirstLetter(Object.keys(data)[index]) + "[]";
        console.log(mergeArrayOfObjects(Object.values(data)[index]));

        SliceJSON(
          mergeArrayOfObjects(Object.values(data)[index]),
          Object.keys(data)[index]
        );
      } else {
        term[Object.keys(data)[index]] = "any[]";
      }
    } else {
      if (Object.values(data)[index] == theAny) {
        term[Object.keys(data)[index]] = "any";
      } else {
        term[Object.keys(data)[index]] = typeof Object.values(data)[index];
      }
    }
  }
  output.value[makeUpperFirstLetter(title)] = term;
}
function makeUpperFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace("?", "");
}
</script>
