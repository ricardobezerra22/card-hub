<template>
  <v-container class="main-container">
    <div>
      <v-toolbar dark density="comfortable" elevation="3" class="toolbar">
        <v-icon icon="mdi-shopping pl-3" />
        <v-toolbar-title>{{ marketPlace }}</v-toolbar-title>
        <v-toolbar-title v-if="havePermissions">
          {{ welcomeGreetings + " " + username }}
          <v-icon icon="mdi-human-greeting"
        /></v-toolbar-title>
        <LoginForms v-if="!havePermissions" @handlerLogin="userLoged" />

        <v-btn v-else @click="logout()">
          <v-icon icon="mdi-logout" /> {{ logoutText }}
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-tabs class="tabs" v-model="tab" background-color="primary">
          <v-tab value="all-cards"
            ><v-icon icon="mdi-cards" />{{ allCardsOfMarket }}</v-tab
          >
          <v-tab v-if="havePermissions" value="my-cards"
            ><v-icon icon="mdi-account-card" /> {{ ownCards }}</v-tab
          >
          <v-tab value="request-cards"
            ><v-icon icon="mdi-card-account-mail " />
            {{ openNegotiation }}</v-tab
          >
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="all-cards">
              <CardList
                :isUserHavePerms="havePermissions"
                :cards="allCards"
                :externalLoading="loading"
                @handlerRequest="resultOfRequest"
                @handlerAdition="resultOfAdition"
              />
            </v-window-item>

            <v-window-item value="my-cards">
              <CardList
                :isOwnedPage="true"
                :cards="myCards"
                :externalLoading="loading"
              />
            </v-window-item>

            <v-window-item value="request-cards">
              <RequestedCards
                :isUserHaverPerms="havePermissions"
                :trades="tradeCards"
                @handlerDeleteTrade="handlerDeleteTrade"
              />
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
</template>

<script>
import LoginForms from "./Partials/LoginForms/LoginForms.vue";
import { useAuthStore } from "@/store/app.js";
import CardList from "@/components/MainPage/Partials/CardList/CardList.vue";
import RequestedCards from "@/components/MainPage/Partials/RequestedCards/RequestedCards.vue";
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
      loading: false,
      alert: {
        show: false,
        type: "",
        title: "",
        text: "",
      },
      havePermissions: false,
      tab: null,
      dialog: false,
      marketPlace: "Marketplace",
      logoutText: "Logout",
      welcomeGreetings: "Bem-vindo(a)",
      allCardsOfMarket: "Todas as Cartas",
      openNegotiation: "Negociações abertas",
      ownCards: "Minhas Cartas",
      username: "",
      userID: "",
    };
  },
  methods: {
    closeAlert() {
      setTimeout(() => {
        this.alert = false;
      }, 2500);
    },
    fullGetCards() {
      this.getCards();
      this.getMyCards();
      this.getRequestedCards();
    },
    async logout() {
      this.loading = true;
      try {
        localStorage.removeItem("token");
        const authStore = useAuthStore();
        authStore.clearUserData();
        userLogout();
        this.fullGetCards();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
        this.tab = "all-cards";
        this.havePermissions = false;
      }
    },
    handlerDeleteTrade(deleteAlert) {
      this.alert = {
        ...deleteAlert,
      };
      this.closeAlert();
      this.getRequestedCards();
    },
    async userLoged(alertObj) {
      this.alert = alertObj;
      this.havePermissions = true;
      this.closeAlert();
      this.fullGetCards();
    },
    async getCards() {
      this.loading = true;
      const payload = {
        rpp: 10,
        page: 1,
      };
      try {
        const { data } = await getAllCards(payload);
        this.allCards = data.list.map((card) => {
          return {
            ...card,
          };
        });
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    async getMyCards() {
      try {
        const { data } = await getMyCards();
        this.userId = data.id;
        this.username = data.name;
        this.rpp = data.rpp;
        this.page = data.page;

        this.myCards = data.cards.map((myCards) => {
          return {
            ...myCards,
          };
        });
        const authStore = useAuthStore();
        authStore.setUserId(data.id);
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
        return {
          ...trade,
        };
      });
    },
    resultOfRequest(alert) {
      this.alert = {
        ...alert,
      };
      this.getRequestedCards();
      this.closeAlert();
    },
    resultOfAdition(alert) {
      this.alert = {
        ...alert,
      };
      this.getMyCards();
      this.closeAlert();
    },
  },
  mounted() {
    const storedJwtToken = localStorage.getItem("token");
    if (storedJwtToken) {
      this.havePermissions = true;
    }
    this.fullGetCards();
  },
};
</script>

<style scoped src="./style.scss"></style>
