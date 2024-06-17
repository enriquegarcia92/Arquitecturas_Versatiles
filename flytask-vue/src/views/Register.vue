<template>
  <div
    class="flex flex-col justify-center items-center h-screen w-full md:bg-signup-background md:bg-cover"
  >
    <div
      class="relative md:h-fit md:border md:rounded-md md:p-8 md:w-2/4 md:shadow-lg md:bg-white xl:w-1/3"
    >
      <h1 class="text-center font-bold text-lg">Welcome</h1>
      <h1 class="text-center text-sm mb-2">
        FlyTask: where your productivity takes flight!
      </h1>
      <!-- Absolute positioned image -->
      <img
        src="@/assets/chincheta.png"
        class="invisible absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:visible"
        alt="Chincheta"
      />
      <Form
        :validation-schema="registerSchema"
        @submit="onSubmit"
        class="h-5/6 w-full flex flex-col gap-2 items-center"
      >
        <div class=" w-full">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <Field
            name="name"
            class="w-full p-2 border border-gray-300 shadow-sm bg-mint rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
          <ErrorMessage name="name" class="text-red-500 text-sm" />
        </div>
        <div class="w-full">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <Field
            name="email"
            type="email"
            class="block w-full p-2 border border-gray-300 shadow-sm bg-mint rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm" />
        </div>
        <div class="w-full">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <Field
            name="password"
            type="password"
            class="block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-mint focus:outline-none focus:ring-primary focus:border-primary"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm" />
        </div>
        <div class="w-full">
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700"
            >Confirm password</label
          >
          <Field
            name="confirmPassword"
            type="password"
            class="block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-mint focus:outline-none focus:ring-primary focus:border-primary"
          />
          <ErrorMessage name="confirmPassword" class="text-red-500 text-sm" />
        </div>
        <button
          :disabled="isLoading"
          class="p-2 text-center bg-yellow rounded-md text-white w-full hover:bg-yellow-100 mb-2"
        >
          <span v-if="isLoading">
            <p>Processing...</p>
          </span>
          <span v-if="!isLoading">
            <p>Register</p>
          </span>
        </button>
        <a href="/login">I already have an account!</a>
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
import { registerUser } from "@/api/registerAPI";
import Notification from "@/components/feedback/Notification.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const registerSchema = yup.object({
  name: yup
    .string()
    .required("Choose a user name")
    .min(4, "must be 4-16 characters"),
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
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export default {
  name: "Register",
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

      registerUser
        .register(values)
        .then((response) => {
          if (response.status === 200) {
            this.triggerNotification(
              "Your account has been registered successfully",
              "bg-green-500"
            );
            this.isLoading = false;
            window.location.href = "/login";
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
      registerSchema,
      showNotification: false,
      notificationMessage: "",
      notificationColor: "bg-red-600",
      isLoading: false
    };
  },
};
</script>
