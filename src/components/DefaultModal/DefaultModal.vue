<template>
  <v-dialog
    v-model="openModal"
    transition="dialog-bottom-transition"
    width="400"
  >
    <v-slot> </v-slot
    ><v-card-actions class="dialog-action-buttons">
      <v-btn color="primary" type="submit" @click="submit">Concluir</v-btn>
      <v-btn color="error" class="cancel-dialog-button" @click="closeModal"
        >Cancelar</v-btn
      >
    </v-card-actions>
  </v-dialog>
</template>
<script>
export default {
  name: "DefaultModal",
  props: {
    openModal: {
      type: Boolean,
    },
    submitText: {
      type: String,
      default: "Concluir",
    },
    cancelText: {
      type: String,
      default: Cancelar,
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
