<template>
  <div class="flex justify-center items-center h-[90vh]">
    <div
      class="bg-white w-8/12 h-4/5 max-w-lg p-8 rounded-lg shadow-md flex flex-col justify-between align-center"
    >
      <h2 class="text-2xl font-bold">It looks a little empty in here...</h2>
      <div class="flex justify-center">
        <img
          src="@/assets/emptyBox.png"
          alt="Card Image"
          class="w-2/5 h-full object-cover"
        />
      </div>
      <button
        class="w-full bg-yellow hover:bg-yellow-500 text-white py-2 px-4 rounded-md shadow-md"
        @click="openModal"
      >
        Create task
      </button>
    </div>

    <!-- AddTaskModal component -->
    <AddTaskModal :isOpen="isModalOpen" @close="closeModal"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import AddTaskModal from '@/components/modals/AddTaskModal.vue';

export default {
  components: {
    AddTaskModal,
  },
  setup() {
    const isModalOpen = ref(false);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    return {
      isModalOpen,
      openModal,
      closeModal,
    };
  },
};
</script>