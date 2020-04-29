<template>
  <v-app>
    <v-content>
      <router-view />
      <!-- Dialog (Start Loading) -->
      <v-dialog v-model="getLoading.status" hide-overlay persistent width="300">
        <v-card :color="getLoading.color" dark>
          <v-card-text>
            {{getLoading.title}}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Dialog (Start Loading) -->
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",

  data: () => ({
    dialog: true
  }),
  computed: {
    ...mapGetters(["getLoading"])
  }
};
</script>
