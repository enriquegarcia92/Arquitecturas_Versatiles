<template>
  <div
    class="flex flex-col justify-center items-center h-screen w-full md:bg-signup-background md:bg-cover"
  >
    <NewPasswordForm v-if="showNewPasswordForm" />
    <div
      v-else="!showNewPasswordForm"
      class="relative md:h-fit md:border md:rounded-md md:p-8 md:w-2/4 md:shadow-lg md:bg-white xl:w-1/3"
    >
      <h1 class="text-center font-bold text-lg">Forgot your password?</h1>
      <h1 class="text-center text-sm">
        Enter your email to receive a temporary access code and change your
        password
      </h1>
      <!-- Absolute positioned image -->
      <img
        src="@/assets/chincheta.png"
        class="invisible absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:visible"
        alt="Chincheta"
      />
      <Form
        :validation-schema="RecoverPasswordSchema"
        @submit="onSubmit"
        class="h-full w-full p-3 flex flex-col gap-2 items-center"
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
        <button
          class="p-2 text-center bg-yellow rounded-md text-white w-full hover:bg-yellow-100"
        >
          Send
        </button>
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
import Notification from "@/components/feedback/Notification.vue";
import { recoverPRequest } from "@/api/recoverPassword";
import NewPasswordForm from "@/components/NewPasswordForm.vue";

const RecoverPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default {
  name: "PasswordRecovery",
  components: {
    Form,
    Field,
    ErrorMessage,
    Notification,
    NewPasswordForm,
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
      console.log(values);
      this.isLoading = true;
      recoverPRequest
        .recoverPassword(values.email)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            (this.showNewPasswordForm = true),
              this.triggerNotification("Email sent!", "bg-green-500");
            this.isLoading = false;
          }
        })
        .catch((error) => {
          console.log(error);
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
      RecoverPasswordSchema,
      showNotification: false,
      notificationMessage: "",
      notificationColor: "bg-red-600",
      isLoading: false,
      showNewPasswordForm: false,
    };
  },
};
</script>
