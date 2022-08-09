<script setup>
import { ref, onMounted} from "vue";
import { filtersStore } from "@/stores/filterStore.js";

const warehouses = ref([]);
const store = filtersStore();

async function getWarehouses() {
  const res = await fetch("http://delivery-testapi.evrika.com/api/dispatcher/warehouses", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access") || sessionStorage.getItem("access")}`,
    },
  });

  const data = (await res.json()).data;
  warehouses.value = await data;
}

onMounted(() => {
  getWarehouses();
});

</script>

<template>
  <div class="filter-container">
    <img class="icon-filter" src="../assets/Warehouseware.svg" alt="" />
    <select
      v-model="store.filters.warehouse"
      class="select-filter gray"
      name="warehouses"
      id="store-filter"
    >
      <option value="" default selected>Склад</option>
      <option v-for="warehouse in warehouses" :key="warehouse.name" :value="warehouse.name">
        {{ warehouse.name }}
      </option>
    </select>
  </div>
</template>
