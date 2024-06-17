<template>
  <div class="w-full bg-glacierWhite border border-primary rounded-md">
    <Disclosure >
      <template #default="open" >
        <DisclosureButton
          class="flex justify-between items-center border-b-2 border-primary w-full px-4 py-2 text-sm font-medium text-left text-black bg-glacierWhite rounded-lg hover:bg-mint"
        >
          <span :class="`${statusColor} p-2 rounded-md fit text-center`">{{
            title
          }}</span>
        </DisclosureButton>
        <DisclosurePanel class="text-sm text-gray-500 rounded-md w-full">
          <div
            v-for="task in tasks"
            :key="task.taskId"
            class="p-2 w-full hover:bg-mint"
          >
            <div class="flex items-center justify-between">
              <div class="flex flex-col justify-start w-2/4">
                <div class="font-medium">{{ task.title }}</div>
                <div class="overflow-x-auto">{{ task.description }}</div>
              </div>
              <div class="flex justify-end items-center w-2/4 gap-2">
                <button
                  class="flex items-center gap-2 text-white bg-primary p-2 rounded-md hover:bg-primaryDark"
                  @click="handleMoveTask(task)"
                >
                  Move
                </button>
                <button
                  class="flex items-center gap-2 text-white bg-charcoal p-2 rounded-md hover:bg-gray-500"
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
