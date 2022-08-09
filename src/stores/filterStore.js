import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";

export const filtersStore = defineStore("filters", () => {
  let filters = ref({
    status: 0,
    perPage: "",
    page: 1,
    city: "",
    warehouse: "",
    periodFrom: "",
    periodTo: "",
    search: "",
  });

  let period = ref('')

  function formatPeriod(event) {
    const ret = event.target.value.split(" - ");
    filters.value.periodFrom = ret[0];
    filters.value.periodTo = ret[1];
  }

  function reset(){
    filters.value.city = "";
    filters.value.warehouse ="";
    filters.value.periodFrom ="";
    filters.value.periodTo ="";
    filters.value.search = "";
    period.value = '';
  }

  return {
    filters,
    period,
    formatPeriod,
    reset,
  };
});
