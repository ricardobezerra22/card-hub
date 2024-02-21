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
        <v-skeleton-loader
          v-if="_isLoading"
          type="list-item-two-line"
        ></v-skeleton-loader>
        <div v-else class="cards">
          <div class="timeStamp">
            <span>{{ dateText(card.createdAt) }}</span>
          </div>
          <v-card class="e-commerce-card" :loading="loading || externalLoading">
            <div class="image">
              <v-img :src="card.imageUrl" aspect-ratio="2"></v-img>
            </div>
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
                <DefaultButton
                  :buttonText="aditionButton"
                  :loading="loading"
                  @click="addCard(card)"
                />
                <DefaultButton
                  :buttonText="requestButton"
                  @click="openRequestTradeModal(card)"
                />
              </div>

              <div v-else-if="!isUserHavePerms && !isOwnedPage">
                <DefaultButton
                  :buttonText="negotiateButton"
                  :color="'yellow darken-1'"
                  @click="showSnackbar()"
                  ><v-icon left>mdi-alert</v-icon></DefaultButton
                >

                <v-snackbar v-model="snackbar" vertical>
                  <div class="text-subtitle-1 pb-2">Restrição</div>
                  <p>
                    {{ snackbarWarning }}
                  </p>
                  <template v-slot:actions>
                    <DefaultButton
                      :buttonText="closeNegotiateButton"
                      :color="'yellow darken-1'"
                      variant="text"
                      @click="closeSnackbar()"
                    />
                  </template>
                </v-snackbar>
              </div>
              <DefaultButton
                v-if="isOwnedPage"
                :disabled="true"
                :buttonText="ownedCard"
              />
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <DefaultModal
      v-model="requestModal"
      :title="requestModalTitle"
      :subtitle="requestModalSubtitle"
      @closeModal="closeRequestModal"
      @submit="requestCard"
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
        @focus="getMyCards"
        variant="solo"
      >
        <template v-slot:loader>
          <v-progress-linear
            v-if="loading"
            indeterminate
            color="primary"
          ></v-progress-linear>
        </template>
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
      </v-autocomplete>
    </DefaultModal>
  </v-container>
</template>
<script>
import {
  requestTrade,
  addCardToDeck,
  getMyCards,
} from "@/services/login/index.js";
import DefaultModal from "@/components/DefaultModal/DefaultModal.vue";
import DefaultButton from "@/components/DefaultButton/DefaultButton.vue";
import { compareTime } from "@/helpers/strings/date.js";
export default {
  name: "CardList",
  components: {
    DefaultModal,
    DefaultButton,
  },
  props: {
    cards: Array,
    isUserHavePerms: Boolean,
    isOwnedPage: Boolean,
    externalLoading: Boolean,
  },
  data() {
    return {
      selectedOffering: null,
      snackbar: false,
      requestModal: false,
      loading: false,
      cardId: "",
      cardOffering: [],
      ownedCard: "Adquirida",
      snackbarWarning:
        "Você não pode solicitar troca ou adicionar essa carta ao seudeck. Faça login ou cadastro para negocia-la.",
      negotiateButton: "Negociar",
      closeNegotiateButton: "Fechar",
      aditionButton: "Adicionar Carta",
      requestButton: "Solicitar troca",
      requestModalTitle: "Solicitar troca",
      requestModalSubtitle:
        "Ofereça uma carta da sua coleção para efetuar a troca.",
    };
  },
  methods: {
    truncatedDescription(value, maxLength = 30) {
      if (value.length > maxLength) {
        return value.substring(0, maxLength) + "...";
      } else return value;
    },
    dateText(date) {
      return `Criada ${compareTime(date)}`;
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
      this.loading = true;
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
        this.selectedOffering = null;
      } catch (error) {
        this.handlerRequest(false, error);
        this.$emit("handlerRequest", this.alert);
      } finally {
        this.loading = false;
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
      this.loading = true;
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
      } finally {
        this.loading = false;
      }
    },
    async getMyCards() {
      this.loading = true;
      try {
        const { data } = await getMyCards();
        this.cardOffering = data.cards.map((myCards) => {
          return {
            title: myCards.name,
            id: myCards.id,
            image: myCards.imageUrl,
            description: myCards.description,
          };
        });
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
  },
  computed: {
    _isLoading() {
      return this.loading || this.externalLoading;
    },
  },
};
</script>
<style scoped src="./style.scss"></style>
