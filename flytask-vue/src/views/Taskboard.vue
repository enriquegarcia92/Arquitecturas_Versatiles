<template>
  <div className="bg-slate-50 h-screen">
    <div
      className="flex justify-center md:justify-end items-center w-full shadow-lg h-[10vh]"
    >
      <ul className="flex w-fit bg-slate-50">
        <li className="">
          <button
            @click="listmode"
            class="text-gray-800 bg-slate-50 hover:bg-slate-100 p-5"
          >
            <BsListUl className="inline-block mr-2" />
            List
          </button>
        </li>
        <li className="">
          <button
            @click="kanbanmode"
            class="text-gray-800 bg-slate-50 hover:bg-slate-100 p-5"
          >
            <BsGrid3X3Gap className="inline-block mr-2" />
            Group by Stage
          </button>
        </li>
        <li className="">
          <button
            @click="handleLogout"
            class="text-gray-800 bg-slate-50 hover:bg-slate-100 p-5"
          >
            <BsGrid3X3Gap className="inline-block mr-2" />
            Log out
          </button>
        </li>
      </ul>
    </div>
    <div className="h-[90vh]">
      <div v-if="taskData.length > 0">
        <div v-if="list">
            <ListView :tasks="taskData"/>
        </div>
        <div v-else="kanban">
            <KanbanView :tasks="taskData"/>
        </div>
      </div>
      <div v-else="taskData.length = 0">
        <EmptyTaskboard/>
      </div>
    </div>
    <Notification
      :message="notificationMessage"
      :show="showNotification"
      :color="notificationColor"
    />
  </div>
</template>

<script>
import { getTasks } from "@/api/getTasksAPI";
import { ref } from "vue";
import EmptyTaskboard from "@/components/sections/EmptyTaskboard.vue"
import ListView from "@/components/sections/ListView.vue"
import KanbanView from "@/components/sections/KanbanView.vue"
import { whoami } from "@/api/whoamiAPI";
import Notification from "@/components/feedback/Notification.vue";

const taskData = ref([]);
const list = false;
const kanban = false;
const BASE_PATH = import.meta.env.VITE_BASE_ROUTES;

export default {
  data() {
    return {
      BASE_PATH,
      taskData,
      list,
      kanban,
      showNotification: false,
      notificationMessage: "",
      notificationColor: "bg-red-600",
      isLoading: false
    };
  },

  components: {
    EmptyTaskboard, 
    ListView,
    KanbanView, 
    Notification 
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

    listmode() {
      this.list = true;
      this.kanban = false;
    },

    kanbanmode() {
      this.list = false;
      this.kanban = true;
    },
    
    handleLogout() {
      localStorage.clear()
      this.triggerNotification("Session closed!", "bg-green-500")
      window.location.href = `${BASE_PATH}login`;
    },

    fetchTasks() {
      getTasks
      .getTasks()
      .then((response) => {
        let tasks = response.data.data;
        this.taskData = tasks;
      })
      .catch((error) => {
        if (error) {
          this.triggerNotification("An error ocurred, please reload or try again later", "bg-red-500");
        }
      });
    }

  },

  created() {

    whoami
      .whoami()
      .then((response) => {
        if (response.status === 200) {
          this.fetchTasks()
        }
      })
      .catch((error) => {
        localStorage.clear()
        window.location.href = `${BASE_PATH}login`;
      })
  },
};
</script>
