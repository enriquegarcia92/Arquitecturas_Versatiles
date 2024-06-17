<template>
  <div
    class="flex flex-col justify-center items-center h-screen w-full md:bg-signup-background md:bg-cover"
  >
    <div
      class="relative md:h-fit md:border md:rounded-md md:p-8 md:w-2/4 md:shadow-lg md:bg-white xl:w-1/3"
    >
      <h1 class="text-center font-bold text-lg">Welcome</h1>
      <h1 class="text-center text-sm">
        FlyTask: where your productivity takes flight!
      </h1>
      <!-- Absolute positioned image -->
      <img
        src="@/assets/chincheta.png"
        class="invisible absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:visible"
        alt="Chincheta"
      />
      <Form
        :validation-schema="loginSchema"
        @submit="onSubmit"
        class="h-full w-full flex flex-col gap-2 items-center"
      >
        <div class="mb-4 w-full">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <Field
            name="email"
            type="email"
            class="mt-1 block w-full p-2 border border-gray-300 shadow-sm bg-mint rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="mb-4 w-full">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <Field
            name="password"
            type="password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-mint focus:outline-none focus:ring-primary focus:border-primary"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
        </div>
        <button
          :disabled="isLoading"
          class="p-2 text-center mb-2 bg-yellow rounded-md text-white w-full hover:bg-yellow-100"
        >
          <span v-if="isLoading">
            <p>Processing...</p>
          </span>
          <span v-if="!isLoading">
            <p>Sign in</p>
          </span>
        </button>
        <a v-bind:href="BASE_PATH + 'passwordRecovery'">Forgot your password?</a>
        <a v-bind:href="BASE_PATH + 'register'">New to Flytask? create an account</a>
      </Form>
    </div>
    <Notification
      :message="notificationMessage"
      :show="showNotification"
      :color="notificationColor"
    />
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { loginUser } from "@/api/loginAPI";
import Notification from "@/components/feedback/Notification.vue";
import { whoami } from "@/api/whoamiAPI";

const BASE_PATH = import.meta.env.VITE_BASE_ROUTES;

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
    Notification,
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

    onSubmit(values) {
      this.isLoading = true;
      loginUser
        .login(values)
        .then((response) => {
          console.log(response);
          let token = response.data.token;
          if (response.status === 200 && token) {
            this.triggerNotification("Sign in successful", "bg-green-500");
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("token", token);
            localStorage.setItem("id", response.data.id);
            this.isLoading = false;
            window.location.href = `${BASE_PATH}board`;
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

  created() {
    whoami
      .whoami()
      .then((response) => {
        if (response.status === 200) {
          this.triggerNotification("Session restored!", "bg-green-500");
          window.location.href = `${BASE_PATH}board`;
        }
      })
      .catch((error) => {
        
      });
  },
  data() {
    return {
      BASE_PATH,
      loginSchema,
      showNotification: false,
      notificationMessage: "",
      notificationColor: "bg-red-600",
      isLoading: false,
    };
  },
};
</script>
