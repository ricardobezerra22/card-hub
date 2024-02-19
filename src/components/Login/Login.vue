<template>
  <v-container class="main-container">
    <div>
      <v-toolbar dark density="comfortable" elevation="3" class="toolbar">
        <v-icon icon="mdi-shopping pl-3" />
        <v-toolbar-title>Marketplace</v-toolbar-title>
        <LoginForms
          v-if="!havePermissions"
          @handlerRegister="successRegister()"
        />
        <v-btn v-else @click="userLogout()">
          <v-icon icon="mdi-logout" /> Logout
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="all-cards">Todas as Cartas</v-tab>
          <v-tab v-if="havePermissions" value="my-cards">Minhas Cartas</v-tab>
          <v-tab v-if="havePermissions" value="request-cards"
            >Solicitações</v-tab
          >
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="all-cards">
              <CardList :cards="allCards" />
            </v-window-item>

            <v-window-item value="my-cards">
              <CardList :cards="myCards" />
            </v-window-item>

            <v-window-item value="request-cards"> Solicitações </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import LoginForms from "./Partials/LoginForms/LoginForms.vue";
import CardList from "@/components/Login/Partials/CardList/CardList.vue";
import { getAllCards, getMyCards, userLogout } from "@/services/login/index.js";
export default {
  components: {
    LoginForms,
    CardList,
  },
  data() {
    return {
      allCards: [],
      myCards: [],
      havePermissions: false,
      jwtToken: null,
      tab: null,
    };
  },
  methods: {
    async userLogout() {
      await userLogout();
      this.tab = "all-cards";
      this.getCards();
      this.lostPermissions();
      this.havePermissions = false;
    },
    successRegister() {
      this.tab = "my-cards";
      this.havePermissions = true;
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
      const { data } = await getMyCards();
      this.jwtToken = data.id;
      this.myCards = data.cards.map((myCards) => {
        return {
          ...myCards,
        };
      });
    },
  },
  computed: {
    _havePermissions() {
      if (this.jwtToken) {
        this.havePermissions = true;
      } else this.havePermissions = false;
    },
  },
  mounted() {
    this.getCards();
    this.getMyCards();
  },
};
</script>

<style scoped src="./style.scss"></style>
