<template>
  <v-btn variant="text" color="primary" class="signup-button">
    Criar conta<v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      activator="parent"
      width="400"
    >
      <v-card elevation="3">
        <v-card-title class="headline text-center">Cadastro</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="register">
            <v-text-field
              v-model="registerForm.name"
              :label="registerFormLabels.name"
              :rules="validationRules.required"
              variant="solo"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.email"
              :label="registerFormLabels.email"
              type="email"
              :rules="validationRules.email"
              variant="solo"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.password"
              :label="registerFormLabels.password"
              type="password"
              :rules="validationRules.required"
              variant="solo"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.confirmPassword"
              :label="registerFormLabels.confirmPassword"
              type="password"
              :rules="validationRules.confirmPassword"
              variant="solo"
              required
            ></v-text-field>
            <v-card-actions class="dialog-action-buttons">
              <v-btn color="primary" type="submit">Concluir</v-btn>
              <v-btn
                color="error"
                class="cancel-dialog-button"
                @click="resetRegister"
                >Cancelar</v-btn
              >
            </v-card-actions>
          </v-form>
          <AlertBus
            class="alert-bus"
            :title="alertTitle"
            :text="alertText"
            :type="alertType"
            :alert="alert"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
<script>
import AlertBus from "@/components/AlertBus/AlertBus.vue";
import { userRegister } from "@/services/login/index.js";
export default {
  name: "RegisterForm",
  components: {
    AlertBus,
  },
  data() {
    return {
      dialog: false,
      alert: false,
      alertType: "",
      alertTitle: "",
      alertText: "",
      registerForm: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      registerFormLabels: {
        name: "Nome",
        email: "E-mail",
        password: "Senha",
        confirmPassword: "Confirme sua senha",
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
    isRegisterFormValid() {
      return (
        this.registerForm.name &&
        this.registerForm.email &&
        this.registerForm.password &&
        this.registerForm.confirmPassword &&
        this.registerForm.password === this.registerForm.confirmPassword
      );
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
      this.alert = true;
      this.alertType = "success";
      this.alertTitle = "Cadastro realizado com sucesso";
      this.alertText = "Agora realize o login!";
      setTimeout(() => {
        this.closeAlert();
      }, 2500);
      this.resetRegister();
    },
    unsuccessRegister(error) {
      this.alert = true;
      this.alertTitle = "Erro ao registrar usuário";
      this.alertText = error.response.data.message;
      this.alertType = "error";
      setTimeout(() => {
        this.closeAlert();
      }, 2500);
    },
    async register() {
      const payload = {
        name: this.registerForm.name,
        email: this.registerForm.email,
        password: this.registerForm.password,
      };

      if (this.isRegisterFormValid()) {
        try {
          await userRegister(payload);
          this.successRegister();
        } catch (error) {
          this.unsuccessRegister(error);
        }
      } else {
        this.dialog = true;
      }
    },
  },
};
</script>
<style scoped src="./style.scss"></style>
