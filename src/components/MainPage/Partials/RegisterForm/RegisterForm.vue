<template>
  <v-btn
    variant="text"
    color="primary"
    class="signup-button"
    @click="openModal()"
  >
    {{ actionButtons.createAccount }}

    <DefaultModal
      v-model="dialog"
      transition="dialog-bottom-transition"
      :title="registerAccount"
      :haveActions="false"
    >
      <v-card elevation="3">
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
              <v-btn color="primary" type="submit">{{
                actionButtons.submit
              }}</v-btn>
              <v-btn
                color="error"
                class="cancel-dialog-button"
                @click="resetRegister"
                >{{ actionButtons.cancel }}</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </DefaultModal>
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
      registerAccount: "Registro",
      actionButtons: {
        createAccount: "Criar Conta",
        submit: "Concluir",
        cancel: "Cancelar",
      },

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
    openModal() {
      this.dialog = true;
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
    handlerRegister(success, error) {
      this.alert = {
        show: true,
        type: success ? "success" : "error",
        title: success
          ? "Cadastro realizado com sucesso!"
          : "Erro ao registrar usuário!",
        text: success ? "Agora realize o login!'" : error.response.data.message,
      };
      if (success) {
        this.resetRegister();
      }
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
          this.handlerRegister(true);
          this.$emit("handlerRegister", this.alert);
        } catch (error) {
          this.handlerRegister(false, error);
          this.$emit("handlerRegister", this.alert);
        }
      } else {
        this.dialog = true;
      }
    },
  },
};
</script>
<style scoped src="./style.scss"></style>
