<template>
  <div className="bg-slate-50 h-screen">
    <div
      className="flex justify-between items-center w-full shadow-lg h-[10vh]"
    >
      <ul className="flex w-full bg-slate-50">
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
      </ul>
    </div>
    <div className="h-[90vh]">
      <div v-if="taskData.length > 0">
        <div v-if="list">
            <ListView :tasks="taskData"/>
        </div>
        <div v-else="kanban">
            <KanbanView/>
        </div>
      </div>
      <div v-else="taskData.length = 0">
        <EmptyTaskboard/>
      </div>
    </div>
  </div>
</template>

<script>
import { getTasks } from "@/api/getTasksAPI";
import { ref } from "vue";
import EmptyTaskboard from "@/components/sections/EmptyTaskboard.vue"
import ListView from "@/components/sections/ListView.vue"
import KanbanView from "@/components/sections/KanbanView.vue"

const taskData = ref([]);
const list = false;
const kanban = false;

export default {
  data() {
    return {
      taskData,
      list,
      kanban,
    };
  },

  components: {
    EmptyTaskboard, 
    ListView,
    KanbanView 
  },

  methods: {
    listmode() {
      this.list = true;
      this.kanban = false;
      console.log(this.list);
      console.log(this.kanban);
    },

    kanbanmode() {
      this.list = false;
      this.kanban = true;
      console.log(this.list);
      console.log(this.kanban);
    },
  },

  created() {
    getTasks
      .getTasks()
      .then((response) => {
        console.log(response);
        let tasks = response.data.data;
        console.log(tasks);
        this.taskData = tasks;
      })
      .catch((error) => {
        if (error) {
           window.location.href = "/login";
        }
      });
  },
};
</script>
