<template>
  <transition name="modal">
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      v-if="isOpen"
    >
      <div
        class="bg-white rounded-lg shadow-lg overflow-hidden h-fit p-8 w-5/6 md:w-2/3 lg:w-1/3"
      >
        <header class="flex justify-between items-center">
          <p class="font-bold">Edit task</p>
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
        <div class="p-4">
          <slot></slot>
        </div>
        <div class="h-fit w-full flex flex-col justify-center items-center">
          <Form
            :validation-schema="EditTaskSchema"
            @submit="onSubmit"
            class="h-fit w-full flex flex-col justify-evenly items-center"
            v-slot="{ errors }"
          >
            <div class="mb-4 w-full">
              <label for="title" class="block text-sm font-medium text-gray-700"
                >Title</label
              >
              <Field
                name="title"
                :value="task.title"
                class="mt-1 block w-full p-2 border border-gray-300 shadow-sm bg-mint rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
              <ErrorMessage name="title" class="text-red-500 text-sm mt-1" />
            </div>
            <div class="mb-4 w-full">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >Description</label
              >
              <Field
                name="description"
                :value="task.description"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-mint focus:outline-none focus:ring-primary focus:border-primary"
              />
              <ErrorMessage
                name="description"
                class="text-red-500 text-sm mt-1"
              />
            </div>
            <div class="mb-4 w-full">
              <label
                for="dueDate"
                class="block text-sm font-medium text-gray-700"
                >Due date</label
              >
              <Field
                name="dueDate"
                type="date"
                :value="formatDate()"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-mint focus:outline-none focus:ring-primary focus:border-primary"
              />
              <ErrorMessage name="dueDate" class="text-red-500 text-sm mt-1" />
            </div>
            <button
              :disabled="isLoading"
              type="submit"
              class="p-2 mt-2 text-center bg-yellow rounded-md text-white w-full hover:bg-yellow-100"
            >
              <span v-if="isLoading">
                <p>Processing...</p>
              </span>
              <span v-if="!isLoading">
                <p>Update</p>
              </span>
            </button>
          </Form>
        </div>
      </div>
      <Notification
        :message="notificationMessage"
        :show="showNotification"
        :color="notificationColor"
      />
    </div>
  </transition>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { editTask } from "@/api/editTaskAPI";
import { isoToYYYYMMDD } from "@/utils/dataConversions";
import Notification from "@/components/feedback/Notification.vue";

const EditTaskSchema = yup.object().shape({
  title: yup.string().required("Task Name is required"),
  description: yup.string().required("Description is required"),
  dueDate: yup
    .date()
    .min(new Date(), "Due Date cannot be earlier than today")
    .required("Due Date is required"),
});

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
  data() {
    return {
      EditTaskSchema,
      showNotification: false,
      notificationMessage: "",
      notificationColor: "bg-red-600",
      isLoading: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },

    triggerNotification(message, color) {
      this.notificationMessage = message;
      this.notificationColor = color;
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 3000); // Hide after 3 seconds
    },

    onSubmit(values) {
      this.isLoading = true;
      let taskId = this.task.taskId;
      editTask
        .editTask(values, taskId)
        .then((response) => {
          if (response.status === 200) {
            this.triggerNotification("Task updated!", "bg-green-500");
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
    formatDate() {
      console.log(this.task);
      return isoToYYYYMMDD(this.task.dueDate);
    },
  },

  components: {
    Form,
    Field,
    ErrorMessage,
    Notification,
  },
};
</script>
