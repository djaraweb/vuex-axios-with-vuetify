<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="12" xs="12" md="4">
        <v-card class="mx-auto" max-width="300" tile>
          <v-list dense>
            <v-subheader>INDICADORES</v-subheader>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item v-for="(item, i) in items" :key="i" @click="getInfo(i)">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.nombre"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" md="8">
        <v-date-picker
          v-model="fecha"
          :full-width="true"
          :min="fechaMinima"
          :max="fechaMaxima"
          locale="es-cl"
          @change="getInfoIndicador(fecha)"
        />
        <v-card color="error" dark>
          <v-card-text class="display-1 text-md-center">[{{fechaDDMMYYYY}}] : {{valor}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "Indicador",
  data: () => ({
    fecha: new Date().toISOString().substring(0, 10),
    fechaDDMMYYYY: "",
    fechaMinima: "1984",
    fechaMaxima: new Date().toISOString().substring(0, 10),
    valor: "",
    item: 0,
    items: [
      { codigo: "dolar", nombre: "Dólar Observado", icon: "fa fa-dollar" },
      { codigo: "euro", nombre: "Euro", icon: "fa fa-cogs" },
      { codigo: "bitcoin", nombre: "Bitcoin", icon: "fa-cog" }
    ],
    codeIndicador: "dolar"
  }),
  methods: {
    ...mapMutations(["mostrarLoading", "ocultarLoading"]),
    getInfo(index) {
      let indicador = this.items[index].codigo;
      this.codeIndicador = indicador;
      this.getInfoIndicador(this.fecha);
    },
    async getInfoIndicador(dia) {
      let arrayFecha = dia.split(["-"]);
      this.fechaDDMMYYYY =
        arrayFecha[2] + "-" + arrayFecha[1] + "-" + arrayFecha[0];

      let urlApi = `https://mindicador.cl/api/${this.codeIndicador}/${this.fechaDDMMYYYY}`;
      try {
        this.mostrarLoading({
          title: "Accediendo a información",
          color: "secondary"
        });
        let rpta = await axios.get(urlApi);
        let { serie } = rpta.data;
        this.valor = serie.length > 0 ? serie[0].valor : "No hay Valores";
      } catch (error) {
        console.log(error);
      } finally {
        this.ocultarLoading();
      }
    }
  },
  created() {
    this.getInfoIndicador(this.fecha);
  }
};
</script>