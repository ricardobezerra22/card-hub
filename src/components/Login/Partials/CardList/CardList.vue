<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(card, index) in cards"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card elevation="3" class="e-commerce-card">
          <!-- Conteúdo do cartão (item) -->

          <v-img :src="card.imageUrl" aspect-ratio="1.1"></v-img>
          <div class="card-container">
            <h3>{{ card.name }}</h3>

            <v-tooltip :text="card.description">
              <template v-slot:activator="{ props }">
                <v-card-subtitle v-bind="props" class="subtitle">{{
                  truncatedDescription(card.description)
                }}</v-card-subtitle>
              </template>
            </v-tooltip>

            <v-btn
              v-if="isUserHavePerms"
              color="primary"
              @click="addCardToDeck(card)"
            >
              Solicitar troca</v-btn
            >
            <div v-else>
              <v-btn color="yellow darken-1" @click="showSnackbar()">
                <v-icon left>mdi-alert</v-icon>
                Negociar
              </v-btn>
              <v-snackbar v-model="snackbar" vertical>
                <div class="text-subtitle-1 pb-2">Restrição</div>
                <p>
                  Você não pode solicitar troca ou adicionar essa carta ao seu
                  deck. Faça login ou cadastro para negocia-la.
                </p>
                <template v-slot:actions>
                  <v-btn
                    color="yellow darken-1"
                    variant="text"
                    @click="closeSnackbar()"
                  >
                    Fechar
                  </v-btn>
                </template>
              </v-snackbar>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { requestTrade } from "@/services/login/index.js";
export default {
  name: "CardList",
  props: {
    cards: Array,
    isUserHavePerms: Boolean,
  },
  data() {
    return {
      snackbar: false,
    };
  },
  methods: {
    truncatedDescription(value) {
      const maxLength = 30;
      if (value.length > maxLength) {
        return value.substring(0, maxLength) + "...";
      } else {
        return value;
      }
    },
    showSnackbar() {
      this.snackbar = true;
    },
    closeSnackbar() {
      this.snackbar = false;
    },
    async addCardToDeck(card) {
      const payload = {
        cards: [
          { cardId: "18853810-4a87-44e1-8e67-0e7355186ba5", type: "OFFERING" },
          { cardId: card.id, type: "RECEIVING" },
        ],
      };
      await requestTrade(payload);
      console.log(payload);
    },
  },
};
</script>
<style scoped src="./style.scss"></style>
