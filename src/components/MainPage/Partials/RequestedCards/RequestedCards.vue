<template>
  <EmptyStage v-if="trades.length === 0" :title="emptyStageRequested" />

  <v-container v-else>
    <v-skeleton-loader
      v-if="_isLoading"
      type="list-item-two-line"
    ></v-skeleton-loader>
    <v-row v-else>
      <v-col
        cols="12"
        sm="12"
        class="card-trade-container"
        v-for="trade in trades"
        :key="trade.id"
      >
        <div class="card-container">
          <v-card :loading="loading">
            <div class="image">
              <v-img
                :src="trade.tradeCards[0].card.imageUrl"
                aspect-ratio="2"
              ></v-img>
            </div>

            <v-tooltip :text="trade.tradeCards[0].card.name">
              <template v-slot:activator="{ props }">
                <v-card-title v-bind="props">{{
                  truncatedTitle(trade.tradeCards[0].card.name)
                }}</v-card-title>
              </template>
            </v-tooltip>
            <v-tooltip :text="trade.tradeCards[0].card.description">
              <template v-slot:activator="{ props }">
                <v-card-subtitle v-bind="props" class="subtitle">{{
                  truncatedDescription(trade.tradeCards[0].card.description)
                }}</v-card-subtitle>
              </template>
            </v-tooltip>
            <div class="buttons-container">
              <DefaultButton
                v-if="trade.tradeCards[0].type === 'OFFERING'"
                :buttonText="offeredCard"
                :loading="loading"
                :maxWidth="175"
                disabled
                ><v-icon icon="mdi-account-arrow-right"
              /></DefaultButton>
            </div>
          </v-card>
        </div>
        <div class="infoRequested">
          <v-chip variant="elevated" color="primary" class="chip-requested">
            {{
              `${requested} ${dateText(trade.createdAt)} ${by} ${
                trade.user.name
              }`
            }}</v-chip
          >
          <div class="group-button-with-tooltip">
            <DefaultButton
              v-if="isUserHaverPerms"
              :buttonText="deleteRequest"
              :loading="loading"
              :maxWidth="255"
              :color="'error'"
              :disabled="isUserAuthorOfTrade(trade.userId)"
              @click="deleteTradeConfirm(trade.id)"
              ><v-icon icon="mdi-delete"
            /></DefaultButton>
            <v-tooltip
              class="tooltip"
              v-if="trade.userId !== _userId && isUserHaverPerms"
              :text="tooltipAuthor"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" color="grey lighten-1"
                  >mdi-information-outline</v-icon
                >
              </template>
            </v-tooltip>
          </div>
        </div>
        <div class="card-container" :loading="loading">
          <v-card>
            <div class="image">
              <v-img
                :src="trade.tradeCards[1].card.imageUrl"
                aspect-ratio="2"
              ></v-img>
            </div>
            <v-tooltip :text="trade.tradeCards[1].card.name">
              <template v-slot:activator="{ props }">
                <v-card-title v-bind="props">{{
                  truncatedTitle(trade.tradeCards[1].card.name)
                }}</v-card-title>
              </template>
            </v-tooltip>

            <v-tooltip :text="trade.tradeCards[1].card.description">
              <template v-slot:activator="{ props }">
                <v-card-subtitle v-bind="props" class="subtitle">{{
                  truncatedDescription(trade.tradeCards[1].card.description)
                }}</v-card-subtitle>
              </template>
            </v-tooltip>

            <div class="buttons-container">
              <DefaultButton
                v-if="trade.tradeCards[1].type === 'RECEIVING'"
                :buttonText="requestedCard"
                :loading="loading"
                :maxWidth="175"
                :color="'success'"
                disabled
                ><v-icon icon="mdi-account-arrow-left" />
              </DefaultButton>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <DefaultModal
      v-model="deleteModal"
      :isDeleteModal="'delete'"
      :icon="'mdi-delete'"
      :subtitle="deleteRequestSubtitle"
      :subtitleExists="true"
      :title="deleteRequestConfirm"
      :typeButton="'error'"
      :submitText="confirmDelete"
      @closeModal="cancelDelete"
      @submit="deleteTrade"
    >
    </DefaultModal>
  </v-container>
</template>
<script>
import { compareTime } from "@/helpers/strings/date.js";
import { deleteRequest } from "@/services/login/index.js";
import { useAuthStore } from "@/store/app.js";
import DefaultModal from "@/components/DefaultModal/DefaultModal.vue";
import DefaultButton from "@/components/DefaultButton/DefaultButton.vue";
import EmptyStage from "@/components/EmptyStage/EmptyStage.vue";
export default {
  name: "RequestedCards",
  components: {
    DefaultButton,
    DefaultModal,
    EmptyStage,
  },
  props: {
    trades: {
      type: Array,
      default: () => [],
    },
    isUserHaverPerms: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      deleteModal: false,
      loading: false,
      isUserAuthor: false,
      requested: "Solicitada",
      by: "por",
      emptyStageRequested: "Ainda não existem solcitações",
      tooltipAuthor: "Apenas o autor da solicitação pode exclui-la",
      tradeId: "",
      confirmDelete: "Excluir",
      deleteRequestConfirm: "Confirmar exclusão",
      deleteRequestSubtitle: "Tem certeza que deseja excluir esta solicitação?",
      offeredCard: "Carta Oferecida",
      requestedCard: "Carta Solicitada",
      deleteRequest: "Excluir solicitação",
    };
  },
  methods: {
    dateText(date) {
      return `${compareTime(date)}`;
    },
    truncatedDescription(value) {
      const maxLength = 30;
      if (value.length > maxLength) {
        return value.substring(0, maxLength) + "...";
      } else return value;
    },
    truncatedTitle(value, maxLength = 20) {
      if (value.length > maxLength) {
        return value.substring(0, maxLength) + "...";
      } else return value;
    },

    cancelDelete() {
      this.deleteModal = false;
    },
    deleteTradeConfirm(id) {
      this.tradeId = id;
      this.deleteModal = true;
    },
    handlerDeleteTrade(success, error) {
      this.alert = {
        show: true,
        type: success ? "success" : "error",
        title: success ? "Solicitação excluída!" : "Erro ao excluir dados!",
        text: success ? "" : error.response.data.message,
      };
      this.deleteModal = !success;
    },
    async deleteTrade() {
      this.loading = true;
      try {
        await deleteRequest(this.tradeId);
        this.handlerDeleteTrade(true);
        this.$emit("handlerDeleteTrade", this.alert);
      } catch (error) {
        this.handlerDeleteTrade(false, error);
        this.$emit("handlerDeleteTrade", this.alert);
      } finally {
        this.loading = false;
      }
    },
    isUserAuthorOfTrade(id) {
      return this._userId !== id;
    },
  },
  computed: {
    _userId() {
      const authStore = useAuthStore();
      return authStore.userId;
    },
    _isLoading() {
      return this.loading;
    },
  },
};
</script>

<style scoped src="./style.scss"></style>
