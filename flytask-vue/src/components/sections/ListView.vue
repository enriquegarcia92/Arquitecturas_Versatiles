<template>
  <div class="h-[90vh] flex justify-center items-center">
    <div
      class="h-4/5 w-11/12 bg-glacierWhite rounded-lg shadow-lg flex flex-col"
    >
      <div class="h-fit flex justify-between p-3 gap-3">
        <input
          type="text"
          class="w-4/6 md:w-5/6 bg-mint rounded-md px-3 py-2"
          placeholder="Search..."
          v-model="searchText"
        />
        <div class="w-2/6 md:w-1/6 flex gap-2">
          <button
            class="bg-yellow px-3 rounded-md text-white w-full flex justify-center items-center gap-2"
            @click="openAddTaskModal"
          >
            Add Task
          </button>
        </div>
      </div>
      <div class="h-full p-3 overflow-y-auto flex flex-col gap-2">
        <div v-for="task in filterTasks" :key="task.taskId">
          <div
            class="w-full flex justify-between rounded-md py-1 shadow-md border border-mint"
          >
            <div
              class="flex justify-between m-1 items-center w-3/4 hover:bg-mint hover:rounded-md hover:border-r-2 hover:border-primary"
              @click="handleEditTask(task)"
            >
              <div
                class="flex flex-col w-2/3 p-2 gap-1 justify-start items-center"
              >
                <h3 class="text-lg font-medium text-center">
                  {{ task.title }}
                </h3>
                <p
                  class="text-md font-medium p-1 rounded-md w-fit text-center"
                  :class="numberToStatusColorConverter(task.status)"
                >
                  {{ numberToStatusConverter(task.status) }}
                </p>
              </div>
              <p class="text-md font-medium rounded-md p-1 w-full text-center">
                Due: {{ isoToYYYYMMDD(task.dueDate) }}
              </p>
            </div>
            <div class="flex flex-col w-1/4 items-end gap-1 p-2">
              <div class="flex flex-row w-full justify-end"></div>
              <button
                class="bg-primary text-white p-1 w-full rounded-md hover:bg-primaryDark flex gap-1 items-center justify-center"
                @click="handleMoveTask(task)"
              >
                Move
              </button>
              <button
                class="bg-red-500 text-white p-1 w-full rounded-md hover:bg-red-900 flex gap-1 items-center justify-center"
                @click="handleDeleteTask(task)"
              >
                <p>Delete</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditTaskModal
      :isOpen="editTaskModalIsOpen"
      :task="selectedTask"
      @close="closeEditTaskModal"
    />
    <AddTaskModal :isOpen="addTaskModalIsOpen" @close="closeAddTaskModal" />
    <MoveTaskModal
      :isOpen="moveTaskModalIsOpen"
      @close="closeMoveTaskModal"
      :task="selectedTask"
    />
    <Notification
      :message="notificationMessage"
      :show="showNotification"
      :color="notificationColor"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import AddTaskModal from "@/components/modals/AddTaskModal.vue";
import EditTaskModal from "@/components/modals/EditTaskModal.vue";
import MoveTaskModal from "@/components/modals/MoveTaskModal.vue";
import {
  isoToYYYYMMDD,
  numberToStatusColorConverter,
  numberToStatusConverter,
} from "@/utils/dataConversions";
import { deleteTask } from "@/api/deleteTaskAPI";
import Notification from "@/components/feedback/Notification.vue";

const searchText = ref("");
const selectedTask = ref(null);
const addTaskModalIsOpen = ref(false);
const editTaskModalIsOpen = ref(false);
const moveTaskModalIsOpen = ref(false);

const openAddTaskModal = () => {
  addTaskModalIsOpen.value = true;
};

const closeAddTaskModal = () => {
  addTaskModalIsOpen.value = false;
};

export default {
  components: {
    AddTaskModal,
    EditTaskModal,
    MoveTaskModal,
    Notification,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    triggerNotification(message, color) {
      this.notificationMessage = message;
      this.notificationColor = color;
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 3000); // Hide after 3 seconds
    },
    handleEditTask(task) {
      selectedTask.value = task;
      this.openEditTaskModal(task);
    },
    handleMoveTask(task) {
      selectedTask.value = task;
      this.openMoveTaskModal();
    },
    handleDeleteTask(task) {
      this.isLoading = true;
      deleteTask
        .deleteTask(task.taskId)
        .then((response) => {
          if (response.status === 200) {
            this.triggerNotification("Task deleted!", "bg-green-500");
            this.isLoading = false;
            window.location.reload();
          }
        })
        .catch((error) => {
          this.triggerNotification(
            "An error has ocurred, please try again",
            "bg-red-500"
          );
          this.isLoading = false;
        });
    },
    openEditTaskModal() {
      editTaskModalIsOpen.value = true;
    },
    closeEditTaskModal() {
      editTaskModalIsOpen.value = false;
    },
    openMoveTaskModal() {
      moveTaskModalIsOpen.value = true;
    },
    closeMoveTaskModal() {
      moveTaskModalIsOpen.value = false;
    },
  },

  computed: {
    filterTasks() {
      console.log(this.tasks);
      return this.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchText.value.toLowerCase())
      );
    },
  },
  data() {
    return {
      searchText,
      selectedTask,
      addTaskModalIsOpen,
      editTaskModalIsOpen,
      moveTaskModalIsOpen,
      openAddTaskModal,
      closeAddTaskModal,
      isoToYYYYMMDD,
      numberToStatusColorConverter,
      numberToStatusConverter,
      showNotification: false,
      notificationMessage: "",
      notificationColor: "bg-red-600",
      isLoading: false,
    };
  },
};
</script>
