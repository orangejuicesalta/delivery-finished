<script setup>
import Logout from "./logout.vue";
import { onBeforeMount, ref } from "vue";

let firstName = ref("");
let lastName = ref("");
function getName() {
   firstName.value = localStorage.getItem("first_name");
  lastName.value = localStorage.getItem("last_name");
}

onBeforeMount(() => {
  getName();
});
</script>

<template>
  <div class="menu">
    <div class="menu-top">
      <img class="logo" src="../assets/main-logo.svg" alt="logo" />

      <div class="menu-element">
        <img src="../assets/sb-icon-1.svg" alt="newdeloveries" class="icon" />
        <div>Новые заявки</div>
      </div>

      <div class="menu-element">
        <img src="../assets/sb-icon-2.svg" alt="icon-2" class="icon" id="travel" />
        <div>Распределение</div>
      </div>

      <div class="menu-element">
        <img src="../assets/sb-icon-3.svg" alt="icon-3" class="icon" id="edit" />
        <div>Назначенные</div>
      </div>

      <div class="menu-element">
        <img src="../assets/sb-icon-4.svg" alt="icon-4" class="icon" id="report" />
        <div>На хранении</div>
      </div>

      <div class="menu-element">
        <img src="../assets/sb-icon-5.svg" alt="icon-5" class="icon" id="report" />
        <div>История</div>
      </div>

      <div class="menu-element">
        <img src="../assets/sb-icon-6.svg" alt="icon-6" class="icon" id="report" />
        <div>Товары КБТ</div>
      </div>

      <div class="menu-element">
        <img src="../assets/sb-icon-7.svg" alt="icon-7" class="icon" id="report" />
        <div>Бонусы</div>
      </div>

      <div class="menu-element">
        <img src="../assets/sb-icon-8.svg" alt="icon-8" class="icon" id="report" />
        <div>Группы</div>
      </div>

      <div class="menu-element">
        <img src="../assets/sb-icon-9.svg" alt="icon-9" class="icon" id="report" />
        <div>Справочник</div>
      </div>
    </div>

    <div class="menu-bottom">
      <div class="bottom-left">
        <div class="initials">{{`${firstName[0]}${lastName[0]}`}}</div>
        <p>{{ `${firstName} ${lastName}`  }} </p>
      </div>
      <Logout />
    </div>
  </div>
</template>

<style scoped>
.menu {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 310px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 50px;
  background-color: #001529;
  color: white;
  z-index: 100;
}
.menu-top {
  width: 100%;
  /* position: relative; */
}
.menu-bottom {
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 5%;
  margin-bottom: 15%;
  background: #ffffff1a;
  border-radius: 10px;
  padding: 12px;
}
.menu-element {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  padding: 15px 105px 15px 50px;
  font-weight: 500;
}
.menu-element:hover {
  background-color: #029aad;
}
.logo {
  width: 123px;
  padding-bottom: 30px;
  margin-left: 29%;
}
.bottom-left {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
}
.initials {
  background-color: #029aad;
  border-radius: 5px;
  padding: 8px;
}
</style>
