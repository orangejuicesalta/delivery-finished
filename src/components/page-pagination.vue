<script setup>
import { ref} from "vue";
import { filtersStore } from "../stores/filterStore";

const store = filtersStore();
let amount = ref("")

defineProps({
  all: Number
})

function increment() {
  store.filters.page++;
}

function decrement() {
  if (store.filters.page !== 1) {
    store.filters.page--;
  }
};

</script>

<template>
  <div class="pagination">
    <div class="page-change">
      <button class="page-button" @click="decrement">
        <img src="../assets/Buttonprev.svg" alt="prev-btn" />
      </button>
      <button class="page-button" @click="increment">
        <img src="../assets/Button.svg" alt="next-btn" />
      </button>
    </div>
    <div >Всего: {{all}}</div>

    <div class="perpage-button">
      <select 
      name="perpage"
      v-model="store.filters.perPage">
     <option value="" default selected>10 заказов</option>
      <option value="25">25 заказов</option>
      <option value="50">50 заказов</option>
    </select>
    </div> 
  </div>
</template>

<style scoped>
.page-change {
  display: flex;
  gap: 10px;
}
.page-button {
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: center;
  border: none;
  cursor: pointer;
}
.pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 30px;
  height: 31px;
  position: relative
}
.perpage-button::after{
  content: url("../assets/Buttondown.svg");
  position: absolute;
  right: 5px;
  top: 5px;
  pointer-events: none;
}

select {
padding: 8px;
/* gap: 10px; */
width: 101px;
height: 31px;
border-radius: 5px;
border: none;
box-shadow: none;
}
</style>
