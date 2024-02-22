<template>
  <v-btn variant="text" class="signup-button" @click="openModal()">
    <v-icon class="signup-button-icon">mdi-clipboard-account-outline</v-icon>
    {{ loginOrRegister }}
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      width="400"
    >
      <v-card :elevation="3">
        <v-card-title class="headline">{{ accessMarketplace }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="loginForm.email"
              :rules="validationRules.email"
              :label="email"
              variant="solo"
            ></v-text-field>
            <v-text-field
              v-model="loginForm.password"
              :rules="validationRules.required"
              :label="password"
              type="password"
              variant="solo"
            ></v-text-field>
            <v-container class="button-container">
              <v-btn
                width="100%"
                color="primary"
                class="submit-button"
                type="submit"
                >{{ loginAccess }}</v-btn
              >
            </v-container>
          </v-form>
        </v-card-text>
        <p class="hint-register">Não tem uma conta ainda?</p>
        <RegisterForm @handlerRegister="handleRegister" />
      </v-card>
    </v-dialog>
    <AlertBus
      :title="alert.title"
      :text="alert.text"
      :type="alert.type"
      :alert="alert.show"
    />
  </v-btn>
</template>
<script>
import RegisterForm from "@/components/MainPage/Partials/RegisterForm/RegisterForm.vue";
import { userLogin } from "@/services/login/index.js";
export default {
  name: "LoginForms",
  components: {
    RegisterForm,
  },
  data() {
    return {
      dialog: false,
      alertEmit: {},
      alert: {
        show: false,
        type: "",
        title: "",
        text: "",
      },
      loginOrRegister: "Login/Cadastro",
      loginAccess: "Login",
      accessMarketplace: "Acessar Marketplace",
      password: "Insira sua senha",
      email: "Insira sua email",
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
      },
    };
  },
  methods: {
    openModal() {
      this.loginForm.email = "";
      this.loginForm.password = "";
      this.dialog = true;
    },
    handleRegister(alertContent) {
      this.alert = alertContent;
      setTimeout(() => {
        this.closeAlert();
      }, 2500);
    },
    closeAlert() {
      this.alert = false;
    },
    handlerLogin(success, error) {
      this.dialog = !success;
      this.alertEmit = {
        show: true,
        type: success ? "success" : "error",
        title: success ? "Login efetuado!" : "Erro ao registrar usuário!",
        text: success
          ? "Agora você pode negociar na nossa plataforma'"
          : error.response.data.message,
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
          this.handlerLogin(true);
          this.$emit("handlerLogin", this.alertEmit);
        } catch (error) {
          this.handlerLogin(false, error);
          this.$emit("handlerLogin", this.alertEmit);
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
