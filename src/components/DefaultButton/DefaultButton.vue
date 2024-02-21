<template>
  <v-btn
    :max-width="maxWidth"
    :color="color"
    :loading="loading"
    class="action-buttons-btn"
  >
    {{ buttonText }}
    <slot> </slot>
  </v-btn>
</template>
<script>
export default {
  name: "DefaultButton",
  props: {
    buttonText: {
      type: String,
    },
    maxWidth: {
      type: Number,
      default: 125,
    },
    color: {
      type: String,
      default: "primary",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped src="./style.scss"></style>
