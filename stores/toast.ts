export const useToastStore = defineStore("store", {
  state: () => ({
    toasts: [] as Toast[],
  }),
  getters: {},
  actions: {
    addToast(
      title: string,
      description: string,
      { bg = "bg-white", text = "text-black", icon = "text-black" }
    ) {
      const newToast = new Toast(
        Date.now(),
        title,
        description,
        bg,
        text,
        icon
      );
      this.toasts.push(newToast);
      const timer = setTimeout(() => {
        this.closeToast(newToast.id);
      }, 5000);
      newToast.timer = timer;
    },
    removeToast(id: number) {
      const index = this.toasts.findIndex((toast) => toast.id === id);
      if (index !== -1) {
        this.toasts.splice(index, 1);
      }
    },
    closeToast(id: number) {
      const index = this.toasts.findIndex((toast) => toast.id === id);
      if (index !== -1) {
        clearTimeout(this.toasts[index].timer);
        this.toasts.splice(index, 1);
      }
    },
  },
});
class Toast {
  id: number;
  title: string;
  description: string;
  bg: string;
  text: string;
  icon: string;
  timer: NodeJS.Timeout | undefined;
  constructor(
    id: number,
    title: string,
    description: string,
    bg: string,
    text: string,
    icon: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.bg = bg;
    this.text = text;
    this.icon = icon;
  }
}
