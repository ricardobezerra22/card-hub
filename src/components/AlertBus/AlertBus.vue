<template>
  <div class="alert-bus" v-show="alert">
    <v-alert :type="type" :title="title" :text="text"></v-alert>
  </div>
</template>

<script>
export default {
  name: "AlertBus",
  props: {
    alert: Boolean,
    type: String,
    title: String,
    text: String,
  },
};
</script>

<style scoped src="./style.scss"></style>
