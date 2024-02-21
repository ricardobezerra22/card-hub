<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        class="card-trade-container"
        v-for="trade in trades"
        :key="trade.id"
      >
        <div class="card-container">
          <v-card elevation="3">
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
              <v-btn
                v-if="trade.tradeCards[0].type === 'OFFERING'"
                class="action-buttons"
                color="primary"
                disabled
              >
                Carta oferecida <v-icon icon="mdi-account-arrow-right" />
              </v-btn>
            </div>
          </v-card>
        </div>
        <div class="infoRequested">
          <v-chip variant="outlined">
            Solicitada {{ dateText(trade.createdAt) }} por:
            {{ trade.user.name }}</v-chip
          >
          <v-btn color="error" @click="deleteTrade(trade.id)"
            ><v-icon icon="mdi-delete" />Excluir solicitação
            <v-dialog
              v-model="deleteModal"
              transition="dialog-bottom-transition"
              activator="parent"
              width="400"
            >
            </v-dialog
          ></v-btn>
        </div>
        <div class="card-container">
          <v-card elevation="3">
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
              <v-btn
                v-if="trade.tradeCards[1].type === 'RECEIVING'"
                class="action-buttons"
                color="green"
                disabled
              >
                <v-icon icon="mdi-account-arrow-left" />Carta solicitada
              </v-btn>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { calculateTimePassed } from "@/helpers/strings/date.js";
import { deleteRequest } from "@/services/login/index.js";
export default {
  name: "RequestedCards",
  props: {
    trades: Array,
  },
  data() {
    return {
      deleteModal: false,
    };
  },
  methods: {
    dateText(date) {
      const formattedDate = this.conversionToLocale(date);
      return `${calculateTimePassed(formattedDate)}`;
    },
    conversionToLocale(dateISO8601) {
      const date = new Date(dateISO8601);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    truncatedDescription(value) {
      const maxLength = 30;
      if (value.length > maxLength) {
        return value.substring(0, maxLength) + "...";
      } else return value;
    },
    truncatedTitle(value) {
      const maxLength = 20;
      if (value.length > maxLength) {
        return value.substring(0, maxLength) + "...";
      } else return value;
    },
    async deleteTrade(id) {
      await deleteRequest(id);
    },
  },
};
</script>

<style scoped src="./style.scss"></style>
