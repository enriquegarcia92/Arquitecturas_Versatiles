<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white w-96 p-8 rounded-lg shadow-md relative">
      <header class="flex justify-between items-center p-4 border-b">
        <p class="font-bold">Move task</p>
        <button @click="closeModal" class="text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>
      <div class="mb-4">
        <label for="status" class="block text-sm font-medium text-gray-700">
          Where should this task go?
        </label>
        <select
          v-model="selectedStatus"
          id="status"
          name="status"
          class="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>Select status</option>
          <option
            v-for="(status, index) in statuses"
            :key="index"
            :value="status.value"
          >
            {{ status.label }}
          </option>
        </select>
      </div>
      <button
        @click="handleMoveTask"
        class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-green-500"
      >
        Move task
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { moveTask } from "@/api/moveTaskAPI";

const statuses = [
  { label: "Upcoming", value: "upcoming" },
  { label: "To Do", value: "todo" },
  { label: "Doing", value: "doing" },
  { label: "Done", value: "done" },
];

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
  components: {},
  setup(props) {
    const selectedStatus = ref("");

    const handleMoveTask = () => {
      console.log(selectedStatus.value);
      console.log(props.task.taskId);
      moveTask
        .moveTask(selectedStatus.value, props.task.taskId)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      selectedStatus,
      handleMoveTask,
      statuses,
    };
  },
};
</script>
