<script setup>
import { onMounted, ref } from "vue";
import { filtersStore } from "../stores/filterStore";

const store = filtersStore();
const cities = ref([]);

async function getCities() {
  const res = await fetch("http://delivery-testapi.evrika.com/api/dispatcher/cities", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access") || sessionStorage.getItem("access")}`,
    },
  });

  const data = (await res.json()).data;
  cities.value = await data;
}

onMounted(() => {
  getCities();
});
</script>

<template>
  <div class="filter-container">
    <img class="icon-filter" src="../assets/city-icon.svg" alt="city" />
    <select v-model="store.filters.city" class="select-filter gray">
      <option value="" default selected class="gray">Город</option>
      <option v-for="city in cities" :key="city.name" :value="city.name">
        {{ city.name }}
      </option>
    </select>
  </div>
</template>

<style>
.icon-filter {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 18px;
}
.filter-container {
  position: relative;
}
.filter-container::before {
  content: url("../assets/Buttondown.svg");
  position: absolute;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
  right: 18px;
}

select {
  appearance: none;
  align-items: center;
  padding: 10px 15px 10px 40px;
  gap: 10px;
  width: 300px;
  height: 45px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border: none;
}
.gray {
  color: #7f7f7f;
}
</style>
