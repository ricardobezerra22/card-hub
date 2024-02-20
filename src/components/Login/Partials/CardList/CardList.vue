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
            <div v-if="isUserHavePerms" class="action-buttons">
              <v-btn
                :max-width="125"
                class="action-buttons-btn"
                color="primary"
                @click="addCard(card)"
                >Adicionar Carta</v-btn
              >
              <v-btn
                :max-width="125"
                color="primary"
                class="action-buttons-btn"
                @click="openRequestTradeModal(card)"
              >
                Solicitar troca
              </v-btn>
            </div>

            <div v-else-if="!isUserHavePerms && !isOwnedPage">
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
            <v-btn
              v-if="isOwnedPage"
              :disabled="true"
              class="action-buttons-btn"
              color="primary"
              >Adquirida</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="requestModal"
      transition="dialog-bottom-transition"
      width="400"
    >
      <v-card :elevation="3">
        <v-card-title class="headline text-center"
          >Solicitar troca</v-card-title
        >
        <v-card-subtitle
          >Ofereça uma carta da sua coleção para efetuar a
          troca</v-card-subtitle
        >
        <v-autocomplete
          v-model="selectedOffering"
          class="dialog-autocomplete"
          label="Selecione a carta que deseja oferecer"
          :items="cardOffering"
          chips
          closable-chips
          color="blue-grey-lighten-2"
          item-title="title"
          item-value="id"
          variant="solo"
        >
          <template v-slot:chip="{ props, item }">
            <v-chip
              v-bind="props"
              :prepend-avatar="item.raw.image"
              :text="item.raw.title"
            ></v-chip>
          </template>

          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :prepend-avatar="item.raw.image"
              :title="item.raw.title"
              :subtitle="truncatedDescription(item.raw.description)"
            ></v-list-item>
          </template>
          ></v-autocomplete
        >

        <v-card-actions class="dialog-action-buttons">
          <v-btn color="primary" type="submit" @click="requestCard"
            >Concluir</v-btn
          >
          <v-btn
            color="error"
            class="cancel-dialog-button"
            @click="closeRequestModal"
            >Cancelar</v-btn
          >
        </v-card-actions></v-card
      ></v-dialog
    >
  </v-container>
</template>
<script>
import {
  requestTrade,
  addCardToDeck,
  getMyCards,
} from "@/services/login/index.js";
export default {
  name: "CardList",
  props: {
    cards: Array,
    isUserHavePerms: Boolean,
    isOwnedPage: Boolean,
  },
  data() {
    return {
      selectedOffering: null,
      snackbar: false,
      requestModal: false,
      cardId: "",
      cardOffering: [],
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
    openRequestTradeModal(card) {
      this.cardId = card.id;
      this.requestModal = true;
    },
    closeRequestModal() {
      this.requestModal = false;
    },
    handlerRequest(success, error) {
      this.alert = {
        show: true,
        type: success ? "success" : "error",
        title: success ? "Troca solicitada!" : "Erro ao solicitar troca!",
        text: success
          ? "Agora vá em solicitações!'"
          : error.response.data.message,
      };
    },
    async requestCard() {
      const payload = {
        cards: [
          { cardId: this.selectedOffering, type: "OFFERING" },
          { cardId: this.cardId, type: "RECEIVING" },
        ],
      };
      try {
        await requestTrade(payload);
        this.handlerRequest(true);
        this.$emit("handlerRequest", this.alert);
        this.requestModal = false;
      } catch (error) {
        handlerRequest(false, error);
        this.$emit("handlerRequest", this.alert);
      }
    },
    handlerAddCard(success, error) {
      this.alert = {
        show: true,
        type: success ? "success" : "error",
        title: success ? "Carta adicionada!" : "Erro ao adicionar a carta!",
        text: success
          ? "Agora pode visualizar em 'Minhas cartas!'"
          : error.response.data.message,
      };
    },
    async addCard(card) {
      const payload = {
        cardIds: [card.id],
      };
      try {
        await addCardToDeck(payload);
        this.handlerAddCard(true);
        this.$emit("handlerAdition", this.alert);
      } catch (error) {
        this.handlerAddCard(false, error);
        this.$emit("handlerAdition", this.alert);
        console.log(error);
      }
    },
    async getMyCards() {
      const { data } = await getMyCards();
      this.cardOffering = data.cards.map((myCards) => {
        return {
          title: myCards.name,
          id: myCards.id,
          image: myCards.imageUrl,
          description: myCards.description,
        };
      });
    },
  },
  mounted() {
    this.getMyCards();
  },
};
</script>
<style scoped src="./style.scss"></style>
