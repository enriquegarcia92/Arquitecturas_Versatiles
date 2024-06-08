<template>
    <div
    class="h-screen w-full bg-signup-background bg-cover flex justify-center items-center"
  >
    <div
      class="relative bg-slate-50 p-8 rounded-lg shadow-md w-full max-w-md h-fit shadow-lg"
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
        :validation-schema="registerSchema"
        @submit="onSubmit"
        class="h-full w-full flex flex-col gap-2 items-center"
      >
      <div class="mb-4 w-full">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <Field
            name="name"
            class="mt-1 block w-full p-2 border border-gray-300 shadow-sm bg-mint  rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
          <ErrorMessage name="name" class="text-red-500 text-sm mt-1" />
        </div>
      <div class="mb-4 w-full">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <Field
            name="email"
            type="email"
            class="mt-1 block w-full p-2 border border-gray-300 shadow-sm bg-mint  rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="mb-4 w-full">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <Field
            name="password"
            type="password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-mint focus:outline-none focus:ring-primary focus:border-primary"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="mb-4 w-full">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm password</label>
          <Field
            name="confirmPassword"
            type="password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-mint focus:outline-none focus:ring-primary focus:border-primary"
          />
          <ErrorMessage name="confirmPassword" class="text-red-500 text-sm mt-1" />
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
import { registerUser } from "@/api/registerAPI";

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
    .oneOf([yup.ref('password'), null], "Passwords must match")
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
  },
  methods: {
    onSubmit(values) {
      console.log(values);
      registerUser
        .register(values)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  data() {
    return {
      registerSchema
    };
  },
};
</script>
