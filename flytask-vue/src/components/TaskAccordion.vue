<template>
  <div class="w-full bg-glacierWhite border border-primary rounded-md">
    <Disclosure >
      <template #default="open" >
        <DisclosureButton
          class="flex justify-between items-center border-b-2 border-primary w-full px-4 py-2 text-sm font-medium text-left text-black bg-glacierWhite rounded-lg hover:bg-mint"
        >
          <span :class="`${statusColor} p-2 rounded-md w-1/6 text-center`">{{
            title
          }}</span>
        </DisclosureButton>
        <DisclosurePanel class="text-sm text-gray-500 rounded-md w-full">
          <div
            v-for="task in tasks"
            :key="task.taskId"
            class="cursor-pointer p-2 w-full hover:bg-mint"
          >
            <div class="flex justify-between items-center">
              <div class="flex flex-col justify-center">
                <div class="font-medium">{{ task.title }}</div>
                <div>{{ task.description }}</div>
              </div>
              <div class="flex justify-evenly items-center">
                <button
                  class="flex items-center gap-2 text-white bg-primary p-2 rounded-md hover:bg-green-500"
                  @click="handleMoveTask(task)"
                >
                  Move
                </button>
                <button
                  class="flex items-center gap-2 text-white bg-primary p-2 rounded-md hover:bg-green-"
                  @click="handleEditTask(task)"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </DisclosurePanel>
      </template>
    </Disclosure>
    <EditTaskModal
      :task="selectedTask"
      :isOpen="editTaskModalIsOpen"
      @close="closeEditTaskModal"
    />
    <MoveTaskModal :isOpen="moveTaskModalIsOpen" @close="closeMoveTaskModal" :task="selectedTask"/>
  </div>
</template>

<script>
import { ref } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import EditTaskModal from "./modals/EditTaskModal.vue";
import MoveTaskModal from "./modals/MoveTaskModal.vue";

export default {
  name: "TaskAccordion",
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    EditTaskModal,
    MoveTaskModal,
  },
  props: {
    title: String,
    tasks: Array,
    statusColor: String,
  },
  setup() {
    const selectedTask = ref(null);
    const editTaskModalIsOpen = ref(false);
    const moveTaskModalIsOpen = ref(false);

    const openEditTaskModal = () => {
      editTaskModalIsOpen.value = true;
    };

    const closeEditTaskModal = () => {
      editTaskModalIsOpen.value = false;
    };
    const openMoveTaskModal = () => {
      moveTaskModalIsOpen.value = true;
    };
    const closeMoveTaskModal = () => {
      moveTaskModalIsOpen.value = false;
    };

    const handleEditTask = (task) => {
      selectedTask.value = task;
      openEditTaskModal(task);
    };

    const handleMoveTask = (task) => {
      selectedTask.value = task;
      openMoveTaskModal()
    }

    return {
      selectedTask,
      editTaskModalIsOpen,
      openEditTaskModal,
      closeEditTaskModal,
      closeMoveTaskModal,
      handleEditTask,
      moveTaskModalIsOpen,
      handleMoveTask, 
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
