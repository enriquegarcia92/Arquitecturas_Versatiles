<template>
    <div v-if="show" :class="`fixed bottom-4 right-4 p-4 rounded text-white shadow-lg transition-opacity duration-300 ${color}`">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        required: true,
      },
      show: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: 'bg-red-600',
      },
    },
    data() {
      return {
        visible: false,
      };
    },
    watch: {
      show(newVal) {
        if (newVal) {
          this.visible = true;
          setTimeout(() => {
            this.visible = false;
          }, 10000); // Hide after 3 seconds
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>
  