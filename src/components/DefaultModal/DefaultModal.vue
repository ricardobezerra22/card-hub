<template>
  <v-dialog transition="dialog-bottom-transition" width="400">
    <v-card :elevation="3">
      <v-card-title :class="`headline ${isDeleteModal}`">
        <v-icon v-if="icon" :icon="icon" />{{ title }}</v-card-title
      >
      <v-card-subtitle
        :class="`helper-text ${isDeleteModal}`"
        v-if="subtitle"
        >{{ subtitle }}</v-card-subtitle
      >
      <slot> </slot>
      <v-card-actions class="dialog-action-buttons">
        <v-btn :color="typeButton" type="submit" @click="submit">
          {{ submitText }}</v-btn
        >
        <v-btn
          :class="`cancel-dialog-button ${isDeleteModal}`"
          @click="closeModal"
          >{{ cancelText }}</v-btn
        >
      </v-card-actions></v-card
    >
  </v-dialog>
</template>
<script>
export default {
  name: "DefaultModal",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    subtitleExists: {
      type: Boolean,
    },
    submitText: {
      type: String,
      default: "Concluir",
    },
    cancelText: {
      type: String,
      default: "Cancelar",
    },
    icon: {
      type: String,
      default: null,
    },
    isDeleteModal: {
      type: String,
      default: "",
    },
    typeButton: {
      type: String,
      default: "primary",
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>
<style scoped src="./style.scss"></style>
