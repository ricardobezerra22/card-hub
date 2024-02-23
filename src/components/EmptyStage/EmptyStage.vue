<template>
  <v-container>
    <h3 class="display-text">{{ title }}</h3>
  </v-container>
</template>

<script>
export default {
  name: "EmptyStage",
  props: {
    title: {
      type: String,
      default: "Ainda não existem cartas",
    },
  },
};
</script>
<style scoped src="./style.scss"></style>
