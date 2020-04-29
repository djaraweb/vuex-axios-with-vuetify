import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: {
      status: false,
      color: "primary",
      title: ""
    }
  },
  getters: {
    getLoading: (state) => state.loading
  },
  mutations: {
    mostrarLoading(state, payload) {
      state.loading.title = payload.title;
      state.loading.color = payload.color;
      state.loading.status = true;
      //console.log("Mostrar:", state.loading.status);
    },
    ocultarLoading(state) {
      state.loading.status = false;
      //console.log("Ocultar:", state.loading.status);
    }
  },
  actions: {}
});
