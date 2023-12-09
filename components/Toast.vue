<template>
  <div class="fixed bottom-10 left-0 right-0 space-y-5 mx-10">
    <TransitionGroup name="toast">
      <div v-for="(item, index) in toast.toasts" :key="index">
        <div
          :class="item.bg"
          class="border flex max-w-sm justify-between items-center space-x-5 rounded p-3"
        >
          <div>
            <div
              v-if="item.title"
              :class="item.text"
              class="font-bold flex items-center justify-between"
            >
              {{ item.title }}
            </div>
            <div v-if="item.description" :class="item.text">
              {{ item.description }}
            </div>
          </div>
          <button
            class="rounded-full"
            @click="toast.closeToast(item.id)"
            :class="item.icon"
          >
            <Icon name="material-symbols:close-small" size="25" />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
<script setup>
const toast = useToastStore();
</script>
