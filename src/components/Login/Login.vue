<template>
  <v-container class="main-container">
    <div>
      <v-toolbar dark density="comfortable" elevation="3" class="toolbar">
        <v-icon icon="mdi-shopping pl-3" />
        <v-toolbar-title>Marketplace</v-toolbar-title>
        <v-toolbar-title v-if="havePermissions"
          >Bem-vindo(a) {{ username }} <v-icon icon="mdi-human-greeting"
        /></v-toolbar-title>
        <LoginForms v-if="!havePermissions" @handlerLogin="successRegister" />

        <v-btn v-else @click="logout()">
          <v-icon icon="mdi-logout" /> Logout
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-tabs class="tabs" v-model="tab" background-color="primary">
          <v-tab value="all-cards"
            ><v-icon icon="mdi-cards" />Todas as Cartas</v-tab
          >
          <v-tab v-if="havePermissions" value="my-cards"
            ><v-icon icon="mdi-account-card" />Minhas Cartas</v-tab
          >
          <v-tab v-if="havePermissions" value="request-cards"
            ><v-icon icon="mdi-card-account-mail " /> Solicitações</v-tab
          >
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="all-cards">
              <CardList
                :isUserHavePerms="havePermissions"
                :cards="allCards"
                @handlerRequest="resultOfRequest"
                @handlerAdition="resultOfAdition"
              />
            </v-window-item>

            <v-window-item value="my-cards">
              <CardList :isOwnedPage="true" :cards="myCards" />
            </v-window-item>

            <v-window-item value="request-cards">
              <RequestedCards :trades="tradeCards" />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
  <AlertBus
    :title="alert.title"
    :text="alert.text"
    :type="alert.type"
    :alert="alert.show"
  />
  <v-pagination v-model="page" :length="rpp" rounded="circle"></v-pagination>
</template>

<script>
import LoginForms from "./Partials/LoginForms/LoginForms.vue";

import CardList from "@/components/Login/Partials/CardList/CardList.vue";
import RequestedCards from "@/components/Login/Partials/RequestedCards/RequestedCards.vue";
import {
  getAllCards,
  getMyCards,
  userLogout,
  getRequestedCards,
} from "@/services/login/index.js";
export default {
  components: {
    LoginForms,
    CardList,
    RequestedCards,
  },
  data() {
    return {
      allCards: [],
      myCards: [],
      tradeCards: [],
      page: 0,
      rpp: 10,
      alert: {
        show: false,
        type: "",
        title: "",
        text: "",
      },
      username: "",
      havePermissions: false,
      tab: null,
      dialog: false,
    };
  },
  methods: {
    closeAlert() {
      setTimeout(() => {
        this.alert = false;
      }, 2500);
    },
    async logout() {
      await userLogout();
      this.tab = "all-cards";
      this.havePermissions = false;
      this.getCards();
    },
    async successRegister(alertObj) {
      this.alert = alertObj;
      this.havePermissions = true;
      this.closeAlert();
      this.getMyCards();
    },
    async getCards() {
      const payload = {
        rpp: 10,
        page: 1,
      };
      const { data } = await getAllCards(payload);
      this.allCards = data.list.map((card) => {
        return {
          ...card,
        };
      });
    },
    async getMyCards() {
      try {
        const { data } = await getMyCards();
        this.username = data.name;
        this.rpp = data.rpp;
        this.page = data.page;

        this.myCards = data.cards.map((myCards) => {
          return {
            ...myCards,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getRequestedCards() {
      const payload = {
        rpp: 10,
        page: 1,
      };
      const { data } = await getRequestedCards(payload);
      this.tradeCards = data.list.map((trade) => {
        console.log(trade);
        return {
          ...trade,
        };
      });
    },
    resultOfRequest(alert) {
      this.alert = {
        ...alert,
      };
      this.closeAlert();
    },
    resultOfAdition(alert) {
      this.alert = {
        ...alert,
      };
      this.closeAlert();
    },
  },
  mounted() {
    const storedJwtToken = localStorage.getItem("token");
    if (storedJwtToken) {
      this.havePermissions = true;
    }
    this.getCards();
    this.getMyCards();
    this.getRequestedCards();
  },
};
</script>

<style scoped src="./style.scss"></style>
