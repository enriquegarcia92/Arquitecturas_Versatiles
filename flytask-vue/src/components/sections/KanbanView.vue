<template>
  <div className="h-[90vh] flex flex-col justify-center items-center ">
    <div
      className="h-5/6  w-11/12 bg-glacierWhite rounded-lg shadow-lg flex flex-col p-2 gap-2"
    >
      <button
        className="p-2 bg-yellow text-white rounded-md w-fit hover:bg-yellow-200 flex items-center justify-center gap-2 self-end"
        @click="openAddTaskModal"
      >
        Add task
      </button>
      <div
        class="h-5/6 w-full p-2 flex flex-col gap-2 items-center overflow-y-auto"
      >
        <TaskAccordion
          :title="todoTitle"
          :tasks="todoTasks"
          statusColor="bg-toDo"
        />
        <TaskAccordion
          :title="doingTitle"
          :tasks="doingTasks"
          statusColor="bg-doing"
        />
        <TaskAccordion
          :title="doneTitle"
          :tasks="doneTasks"
          statusColor="bg-done"
        />
        <TaskAccordion
          :title="upcomingTitle"
          :tasks="upcomingTasks"
          statusColor="bg-upcoming"
        />
      </div>
    </div>
    <AddTaskModal :isOpen="addTaskModalIsOpen" @close="closeAddTaskModal" />
  </div>
</template>

<script>
import TaskAccordion from "@/components/TaskAccordion.vue";
import { filterTasksById } from "@/utils/dataConversions";
import AddTaskModal from "@/components/modals/AddTaskModal.vue";
import { ref } from "vue";

const addTaskModalIsOpen = ref(false);

const openAddTaskModal = () => {
  console.log('test');
  addTaskModalIsOpen.value = true;
};

const closeAddTaskModal = () => {
  addTaskModalIsOpen.value = false;
};

export default {
  data() {
    return {
      doingTitle: "Doing",
      doingStatus: 1,
      doneTitle: "Done",
      doneStatus: 2,
      upcomingTitle: "Upcoming",
      upcomingStatus: 3,
      todoTitle: "To do",
      todoStatus: 0,
      openAddTaskModal,
      closeAddTaskModal,
      addTaskModalIsOpen
    };
  },
  props: {
    tasks: Array,
  },
  components: {
    TaskAccordion,
    AddTaskModal,
  },
  methods: {
    todoTaskList() {
      return filterTasksById(this.tasks, this.todoStatus);
    },
    doingTaskList() {
      return filterTasksById(this.tasks, this.doingStatus);
    },
    doneTaskList() {
      return filterTasksById(this.tasks, this.doneStatus);
    },
    upcomingTaskList() {
      return filterTasksById(this.tasks, this.upcomingStatus);
    },
  },
  computed: {
    upcomingTasks() {
      return this.upcomingTaskList();
    },
    todoTasks() {
      return this.todoTaskList();
    },
    doneTasks() {
      return this.doneTaskList();
    },
    doingTasks() {
      return this.doingTaskList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
