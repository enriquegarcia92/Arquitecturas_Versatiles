<template>
  <div class="h-[90vh] flex justify-center items-center">
    <div
      class="h-4/5 w-11/12 bg-glacierWhite rounded-lg shadow-lg flex flex-col"
    >
      <div class="h-fit flex justify-between p-3 gap-3">
        <input
          type="text"
          class="w-5/6 bg-mint rounded-md px-3 py-2"
          placeholder="Search..."
          v-model="searchText"
        />
        <div class="w-1/6 flex gap-2">
          <button
            class="bg-yellow px-3 rounded-md text-white w-full flex justify-center items-center gap-2"
            @click="openAddTaskModal"
          >
            Add Task
          </button>
        </div>
      </div>
      <div class="h-4/5 p-3 overflow-y-auto flex flex-col gap-2">
        <div v-for="task in filteredTasks" :key="task.taskId">
          <div
            class="w-full flex justify-between rounded-md py-1 shadow-md border border-mint"
          >
            <div
              class="flex justify-between m-1 items-center w-1/2 hover:bg-mint hover:rounded-md hover:border-r-2 hover:border-primary"
              @click="handleSelectedTask(task)"
            >
              <div class="flex flex-col w-1/2 p-2 gap-1 justify-start">
                <h3 class="text-lg font-medium">{{ task.title }}</h3>
                <p class="text-gray-500">{{ task.description }}</p>
              </div>
              <p class="p-2 flex items-center gap-2 text-gray-500">Edit</p>
            </div>
            <div class="flex flex-col w-1/2 items-end gap-1 p-2">
              <div class="flex flex-row w-full justify-end">
                <p class="text-md font-medium rounded-md p-1 w-2/3 text-center">
                  Due: {{ isoToYYYYMMDD(task.dueDate) }}
                </p>
                <p
                  class="text-md font-medium p-1 rounded-md w-1/3 text-center"
                  :class="numberToStatusColorConverter(task.status)"
                >
                  {{ numberToStatusConverter(task.status) }}
                </p>
              </div>
              <button
                class="bg-primary text-white p-1 w-1/3 rounded-md hover:bg-gray-500 flex gap-1 items-center justify-center"
                @click="handleMoveTask(task)"
              >
                Move
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddTaskModal
      v-if="addTaskModalIsOpen"
      :closeAddTaskModal="closeAddTaskModal"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import AddTaskModal from "@/components/modals/AddTaskModal.vue";
import {
  isoToYYYYMMDD,
  numberToStatusColorConverter,
  numberToStatusConverter,
} from "@/utils/dataConversions";

const searchText = ref("");
const selectedTask = ref(null);
const addTaskModalIsOpen = ref(false);

const openAddTaskModal = () => {
  addTaskModalIsOpen.value = true;
};

const closeAddTaskModal = () => {
  addTaskModalIsOpen.value = false;
};

export default {
  components: {
    AddTaskModal,
  },
  props: {
    tasks: {
        type: Array, 
        required: true
    },
  },
  methods: {
    filteredTasks(tasks) {
        console.log(tasks);
      tasks.filter((task) =>
        task.title.toLowerCase().includes(searchText.value.toLowerCase())
      );
    },
  },
  data() {
    return {
      searchText,
      selectedTask,
      addTaskModalIsOpen,
      openAddTaskModal,
      closeAddTaskModal,
      isoToYYYYMMDD,
      numberToStatusColorConverter,
      numberToStatusConverter,
    };
  },
};
</script>
