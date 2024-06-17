<template>
  <div
    class="relative md:h-fit md:border md:rounded-md md:p-8 md:w-2/4 md:shadow-lg md:bg-white xl:w-1/3"
  >
    <h1 class="text-center font-bold text-lg">We sent you an email</h1>
    <h1 class="text-center text-sm">Submit the form to change your password</h1>
    <!-- Absolute positioned image -->
    <img
      src="@/assets/chincheta.png"
      class="invisible absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:visible"
      alt="Chincheta"
    />

    <Form
      :validation-schema="NewPasswordSchema"
      @submit="onSubmit"
      class="h-full w-full p-3 flex flex-col gap-2 items-center"
    >
      <div class="mb-4 w-full">
        <label for="newPassword" class="block text-sm font-medium text-gray-700"
          >New Password</label
        >
        <Field
          name="newPassword"
          type="password"
          class="mt-1 block w-full p-2 border border-gray-300 shadow-sm bg-mint rounded-md focus:outline-none focus:ring-primary focus:border-primary"
        />
        <ErrorMessage name="newPassword" class="text-red-500 text-sm mt-1" />
      </div>
      <div class="mb-4 w-full">
        <label
          for="passwordConfirmation"
          class="block text-sm font-medium text-gray-700"
          >Confirm New Password</label
        >
        <Field
          name="passwordConfirmation"
          type="password"
          class="mt-1 block w-full p-2 border border-gray-300 shadow-sm bg-mint rounded-md focus:outline-none focus:ring-primary focus:border-primary"
        />
        <ErrorMessage
          name="passwordConmfirmation"
          class="text-red-500 text-sm mt-1"
        />
      </div>
      <div class="mb-4 w-full">
        <label for="token" class="block text-sm font-medium text-gray-700"
          >Token</label
        >
        <Field
          name="token"
          as="textarea"
          class="mt-1 block w-full p-2 border border-gray-300 shadow-sm bg-mint rounded-md focus:outline-none focus:ring-primary focus:border-primary"
        />
        <ErrorMessage name="token" class="text-red-500 text-sm mt-1" />
      </div>
      <button
        type="submit"
        :disabled="isLoading"
        class="p-2 text-center bg-yellow rounded-md text-white w-full hover:bg-yellow-100"
      >
        <span v-if="isLoading" class="flex items-center justify-center">
          Changing...
        </span>
        <span v-else>Change Password</span>
      </button>
    </Form>
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
import { setNewPassword } from "@/api/newPasswordAPI";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    Notification,
  },
  data() {
    name: "NewPasswordForm";
    return {
      NewPasswordSchema: yup.object({
        newPassword: yup.string().min(8).required(),
        passwordConfirmation: yup
          .string()
          .oneOf([yup.ref("newPassword"), null], "Passwords must match")
          .required(),
        token: yup.string().required(),
      }),
      showNotification: false,
      notificationMessage: "",
      notificationColor: "bg-red-600",
      isLoading: false,
      showNewPasswordForm: false,
    };
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
      setNewPassword
        .setPassword(values)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.triggerNotification(
              "Password changed successfully!",
              "bg-green-500"
            );
            this.isLoading = false;
            window.location.href = "/login"
          }
        })
        .catch((error) => {
          console.log(error);
          this.triggerNotification(
            "An error has occurred, please try again",
            "bg-red-500"
          );
          this.isLoading = false;
        });
    },
  },
};
</script>
