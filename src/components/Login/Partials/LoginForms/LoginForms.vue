<template>
  <v-btn variant="text" class="signup-button">
    <v-icon class="signup-button-icon">mdi-clipboard-account-outline</v-icon>
    Login/Cadastro
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      activator="parent"
      width="400"
    >
      <v-card :elevation="3">
        <v-card-title class="headline text-center"
          >Acessar Marketplace</v-card-title
        >
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="loginForm.email"
              :rules="validationRules.email"
              label="Insira seu e-mail"
              variant="solo"
            ></v-text-field>
            <v-text-field
              v-model="loginForm.password"
              :rules="validationRules.required"
              label="Insira sua senha"
              type="password"
              variant="solo"
            ></v-text-field>
            <v-container class="d-flex justify-center">
              <v-btn
                width="100%"
                color="primary"
                class="submit-button"
                type="submit"
                >{{ Login }}</v-btn
              >
            </v-container>
          </v-form>
        </v-card-text>
        <p class="hint-register">Não tem uma conta ainda?</p>
        <RegisterForm />
      </v-card>
      <AlertBus
        :title="alert.title"
        :text="alert.text"
        :type="alert.type"
        :alert="alert.show"
      />
    </v-dialog>
  </v-btn>
</template>
<script>
import AlertBus from "@/components/AlertBus/AlertBus.vue";
import RegisterForm from "@/components/Login/Partials/RegisterForm/RegisterForm.vue";
import { userLogin } from "@/services/login/index.js";
export default {
  name: "LoginForms",
  components: {
    AlertBus,
    RegisterForm,
  },
  data() {
    return {
      dialog: false,
      alert: {
        show: false,
        type: "",
        title: "",
        text: "",
      },

      Login: "Login",
      loginForm: {
        email: "",
        password: "",
      },
      validationRules: {
        email: [
          (value) => !!value || "Campo obrigatório!",
          (value) => {
            const pattern =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "E-mail inválido.";
          },
        ],
        required: [
          (value) => !!value || "Campo obrigatório!",
          (value) => (value && value.length >= 3) || "Mínimo de 3 caracteres!",
        ],
        confirmPassword: [
          (value) => !!value || "Campo obrigatório!",
          (value) =>
            value === this.registerForm.password ||
            "As senhas precisam ser iguais!",
        ],
      },
    };
  },
  methods: {
    closeAlert() {
      this.alert = false;
    },
    resetRegister() {
      this.registerForm = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
      this.dialog = false;
    },
    successRegister() {
      this.dialog = false;

      this.alert = {
        show: true,
        type: "success",
        title: "Bem-vindo ao nosso marketplace!",
        text: "",
      };
      setTimeout(() => {
        this.closeAlert();
      }, 2500);
      this.$emit("handlerRegister");
    },
    unsuccessRegister(error) {
      this.dialog = false;
      // Refactored code
      this.alert = {
        show: true,
        title: "Erro ao realizar o login!",
        text: error.response.data.message,
        type: "error",
      };
      setTimeout(() => {
        this.closeAlert();
      }, 2500);
    },
    async login() {
      const payload = {
        email: this.loginForm.email,
        password: this.loginForm.password,
      };
      if (this.isLoginFormValid()) {
        try {
          await userLogin(payload);
          this.successRegister();
        } catch (error) {
          this.unsuccessRegister(error);
        }
      }
    },
    isLoginFormValid() {
      return this.loginForm.email && this.loginForm.password;
    },
  },
};
</script>

<style scoped src="./style.scss"></style>
