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
    alert: {
      type: Boolean,
    },
    closable: { type: Boolean, default: false },
    type: { type: String },
    title: { type: String },
    text: { type: String },
  },
};
</script>

<style scoped src="./style.scss"></style>
