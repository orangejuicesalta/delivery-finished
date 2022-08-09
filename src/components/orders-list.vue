<script setup>
import { ref, onMounted, watch } from "vue";
import CityFilter from "./city-filter.vue";
import PeriodFilter from "./period-filter.vue";
import StorehouseFilter from "./storehouse-filter.vue";
import OneOrder from "./one-order.vue";
import DateFilter from "./date-filter.vue";
import PagePagination from "./page-pagination.vue";
import { filtersStore } from "@/stores/filterStore.js";

const store = filtersStore();

function refreshFilters() {
  store.$patch((state)=> {
     store.reset();
  })
}

watch(store.filters, () => getData());
const amount = ref(0);
const orders = ref([]);

async function getData() {
  const paramsToStr = new URLSearchParams(store.filters).toString();
  const res = await fetch(
    `http://delivery-testapi.evrika.com/api/dispatcher/deliveries?${paramsToStr}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${
          localStorage.getItem("access") || sessionStorage.getItem("access")
        }`,
      },
    }
  );
  const datas = await res.json();
  const data = await datas.data;
  const meta = await datas.meta;
  amount.value = await meta?.total;
  orders.value = await data;
  return orders;
}

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="container">
    <div class="main-header">
      <div class="main-header-top">
        <div class="main-header-top-left">
          <h1>Список новых заявок</h1>
          <img src="../assets/refresh-icon.svg" class="refresh" alt="refresh" @click="refreshFilters"/>
        </div>
        <div class="search">
          <img src="../assets/search-icon.svg" alt="search" />
          <input @keypress.enter="getData" type="text" placeholder="Search..." class="input"  v-model="store.filters.search"/>
         
        </div>
      </div>

      <div class="main-header-bottom">
        <CityFilter />
        <DateFilter />
        <PeriodFilter />
        <StorehouseFilter />
      </div>
    </div>

    <div class="main-info-container">
      <h3>Список заказов</h3>
      <div class="titles">
        <div class="order-n">
          <input
            type="checkbox"
            name="checkbox"
            id="main-checkbox"
            value="value"
            class="checkbox"
          />
          Номер заказа
        </div>
        <div class="address">Адрес</div>
        <div class="reciever-period">Получатель</div>
        <div class="reciever-period">Дата / Период</div>
      </div>
      <OneOrder v-for="order in orders" :key="order.id" :order="order" />
    </div>
    <PagePagination :all="amount" />
  </div>
</template>

<style scoped>
.refresh {
  cursor: pointer;
}
.search {
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px 15px;
  background-color: white;
  border-radius: 5px;
}
.input {
  border: none;
}

input:focus {
  outline: none;
}
.container {
  padding: 30px 50px 30px 360px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.main-header {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.main-header-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.main-header-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.main-header-top-left {
  display: flex;
  flex-direction: row;
  gap: 30px;
}
.main-info-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* gap: 32px; */
}
.titles {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  color: #029aad;
  font-weight: 500;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 16px;
  padding-top: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
}
.checkbox {
  margin-right: 22px;
}
.order-n {
  flex: 1;
  display: flex;
}
.address {
  flex: 3;
}
.reciever-period {
  flex: 2;
}
</style>
