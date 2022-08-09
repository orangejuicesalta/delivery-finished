<script setup>
import { filtersStore } from "@/stores/filterStore.js";

const store = filtersStore();
</script>

<template>
  <div class="filter-container">
    <img class="icon-filter" src="../assets/period-ico.svg" alt="period" />
    <select
      v-model="store.period"
      @change="store.formatPeriod"
      class="select-filter gray"
      name="periods"
      id="period-filter"
    >
      <option value="" default selected>Период</option>
      <option value="">Все периоды</option>
      <option value="11:00 - 17:00">11:00 - 17:00</option>
      <option value="17:00 - 21:00">17:00 - 21:00</option>
    </select>
  </div>
</template>
