<template>
  <v-container class="main-container fill-height">
    <v-row justify="center">
      <v-col class="card-box" cols="12" sm="8" md="4">
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
              <v-container class="container-buttons">
                <v-btn color="primary" class="submit-button" type="submit"
                  >Login</v-btn
                ><v-card-actions class="justify-center"> </v-card-actions>
              </v-container>
            </v-form>
            <div class="alert-bus" v-show="alert">
              <v-alert
                closable
                type="success"
                title="Sucesso ao cadastrar"
                text="Seja bem-vindo!"
              ></v-alert>
            </div>

            <v-btn variant="text" color="primary" class="signup-button">
              Criar conta<v-dialog
                v-model="dialog"
                transition="dialog-bottom-transition"
                activator="parent"
                width="400"
              >
                <v-card elevation="3">
                  <v-card-title class="headline text-center"
                    >Cadastro</v-card-title
                  >
                  <v-card-text>
                    <v-form @submit.prevent="register">
                      <v-text-field
                        v-model="registerForm.name"
                        label="Nome"
                        :rules="validationRules.required"
                        variant="solo"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="registerForm.email"
                        label="Email"
                        type="email"
                        :rules="validationRules.email"
                        variant="solo"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="registerForm.password"
                        label="Senha"
                        type="password"
                        :rules="validationRules.required"
                        variant="solo"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="registerForm.confirmPassword"
                        label="Confirme a senha"
                        type="password"
                        :rules="validationRules.confirmPassword"
                        variant="solo"
                        required
                      ></v-text-field>
                      <v-card-actions class="dialog-action-buttons">
                        <v-btn color="primary" type="submit">Enviar</v-btn>
                        <v-btn
                          color="error"
                          class="cancel-dialog-button"
                          @click="resetRegister"
                          >Cancelar</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      alert: false,
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
    closeRegister() {},
    login() {},
    isRegisterFormValid() {
      return (
        this.registerForm.name &&
        this.registerForm.email &&
        this.registerForm.password &&
        this.registerForm.confirmPassword
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
    register() {
      if (this.isRegisterFormValid()) {
        console.log(this.registerForm);
        this.dialog = false;
        this.alert = true;
        this.resetRegister();
      } else return (this.dialog = true);
    },
  },
  watch: {
    alert() {
      console.log(this.alert);
    },
  },
};
</script>

<style scoped src="./style.scss"></style>
