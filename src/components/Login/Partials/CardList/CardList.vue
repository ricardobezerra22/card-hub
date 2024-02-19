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

            <v-btn color="primary"> Solicitar troca</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "CardList",
  props: {
    cards: Array,
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
  },
};
</script>
<style scoped src="./style.scss"></style>
