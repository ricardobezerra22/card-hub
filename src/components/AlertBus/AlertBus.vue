<template>
  <div class="alert-bus" v-show="alert">
    <v-alert :closable="closable" :type="type" :title="title" :text="text">
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "AlertBus",
  props: {
    alert: Boolean,
    closable: { Boolean, default: false },
    type: String,
    title: String,
    text: String,
  },
};
</script>

<style scoped src="./style.scss"></style>
