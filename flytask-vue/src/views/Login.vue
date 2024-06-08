<template>
  <div
    class="h-screen w-full bg-signup-background bg-cover flex justify-center items-center"
  >
    <div
      class="relative bg-slate-50 p-8 rounded-lg shadow-md w-full max-w-md h-3/5 shadow-lg"
    >
      <h1 class="text-center font-bold text-lg">Welcome</h1>
      <h1 class="text-center text-sm">
        FlyTask: where your productivity takes flight!
      </h1>
      <!-- Absolute positioned image -->
      <img
        src="@/assets/chincheta.png"
        class="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24"
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
          class="p-2 text-center bg-yellow rounded-md text-white w-full hover:bg-yellow-100"
        >
          Sign in
        </button>
      </Form>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { loginUser } from "@/api/loginAPI";

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
  },
  methods: {
    onSubmit(values) {
      console.log(values);
      loginUser
        .login(values)
        .then((response) => {
          console.log(response);
          let token = response.data.token;
          if (token) {
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("token", token);
            localStorage.setItem("id", response.data.id);
            window.location.href = "/board";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  data() {
    return {
      loginSchema,
    };
  },
};
</script>
