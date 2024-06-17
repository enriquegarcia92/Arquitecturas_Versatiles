<template>
  <transition name="modal">
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      v-if="isOpen"
    >
      <div
        class="bg-white rounded-lg shadow-lg overflow-hidden h-fit p-8 w-5/6 md:w-2/3 lg:w-1/3"
      >
        <header class="flex justify-between items-center mb-3">
          <p class="font-bold">Add Task</p>
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
        <div class="h-fit w-full flex flex-col justify-center items-center">
          <Form
            :validation-schema="AddTaskSchema"
            @submit="onSubmit"
            class="w-4/5 flex flex-col justify-evenly items-center"
          >
            <div class="mb-4 w-full">
              <label for="title" class="block text-sm font-medium text-gray-700"
                >title</label
              >
              <Field
                name="title"
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
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-mint focus:outline-none focus:ring-primary focus:border-primary"
              />
              <ErrorMessage name="dueDate" class="text-red-500 text-sm mt-1" />
            </div>
            <button
              :disabled="isLoading"
              type="submit"
              class="p-2 text-center bg-yellow rounded-md text-white w-full hover:bg-yellow-100 mt-2"
            >
              <span v-if="isLoading">
                <p>Processing...</p>
              </span>
              <span v-if="!isLoading">
                <p>Add</p>
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
import { createTask } from "@/api/createTaskAPI";
import Notification from "@/components/feedback/Notification.vue";

const AddTaskSchema = yup.object().shape({
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
      let userId = localStorage.getItem("id");
      createTask
        .createTask(values, userId)
        .then((response) => {
          if (response.status === 200) {
            this.triggerNotification("Task created!", "bg-green-500");
            this.isLoading = false;
            window.location.reload()
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
  },
  data() {
    return {
      AddTaskSchema,
      showNotification: false,
      notificationMessage: "",
      notificationColor: "bg-red-600",
      isLoading: false,
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
    Notification,
  },
};
</script>
