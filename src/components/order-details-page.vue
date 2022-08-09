<script setup>
import { onMounted, reactive, ref, defineProps } from "vue";
import SideMenu from "./side-menu.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const clientObj = reactive({});
const products = ref([]);
defineProps({
  product: Object,
});
const orderLoading = ref(false);

async function getOrderDetails() {
  orderLoading.value = true;
  const res = await fetch(
    `http://delivery-testapi.evrika.com/api/dispatcher/deliveries/${route.params.id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${
          localStorage.getItem("access") || sessionStorage.getItem("access")
        }`,
      },
    }
  );
  const data = (await res.json()).data;
  clientObj.value = await data;
  products.value = await data.products;
  orderLoading.value = false;
}

function getFullName(names) {
  const users = [];
  names.forEach(user => {
    users.push(`${user.first_name} ${user.last_name}`);
  });
  const result = users.join(", ");
  return result;
}

onMounted(() => {
  getOrderDetails();
  console.log(route.params.id);
});
</script>

<template>
  <main>
    <SideMenu />
    <div v-if="!orderLoading" class="order-container">
      <router-link to="/main/new_orders" class="back">
        <img src="../assets/Backback.svg" alt="back" />
        <div>Назад</div>
      </router-link>
      <div class="date-period">
        <h1>Заказ № <span class="green">{{ clientObj?.value?.number }}</span></h1>
        <div class="date">
          <img src="../assets/date-icon.svg" alt="date" />
          <div>{{ clientObj?.value?.deliver_at }}</div>
        </div>
        <div class="date">
          <img src="../assets/period-ico.svg" alt="period" />
          <div>{{ clientObj?.value?.period_begin_at.slice(0, -3) }} - {{ clientObj?.value?.period_end_at.slice(0,-3) }}</div>
        </div>
      </div>

      <div class="main-details">
        <div class="left">
          <div class="left-up">
            <h3>Список заказов</h3>
            <div class="details">
              <div>№</div>
              <div>Номер</div>
              <div>Цена за шт</div>
              <div>Склад</div>
              <div>Шт</div>
              <div>Качество</div>
            </div>
            <div class="client-orders" v-for="product in products" :key="product.id">
              <div>{{ products.indexOf(product) + 1 }}</div>
              <div>{{ product.name }}</div>
              <div>{{ product.details.price }}</div>
              <div>{{ product.details.warehouse_name }}</div>
              <div>{{ product.details.quantity }}</div>
              <div>{{ product.quality }}</div>
            </div>
          </div>
          <div class="left-bottom">
            <h3>Информация о доставке</h3>
            <div class="client-details">
              <p class="gray">Основание:</p>
              <p>Заявка - {{ clientObj?.value?.basis }}</p>
              <p class="gray">Отпущено со склада:</p>
              <p>{{ clientObj?.value?.warehouse }}</p>
              <p class="gray">Курьеры:</p>
              <p>
                {{
                  clientObj?.value?.group?.users
                    ? getFullName(clientObj.value.group.users)
                    : "Не назначен"
                }}
              </p>
              <p class="gray">Машина:</p>
              <p>
                {{
                  clientObj?.value?.group?.car.number
                    ? clientObj.value.group.car.number
                    : "Не назначен"
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="right">
          <h3>Информация о доставке</h3>
          <div class="client">
            <h3>Клиент</h3>
            <div class="client-details">
              <p class="gray">ФИО:</p>
              <p>
                {{ clientObj?.value?.client?.name ? clientObj.value.client.name : "Не указан" }}
              </p>
              <p class="gray">Телефон:</p>
              <p>
                {{
                  clientObj?.value?.client?.primary_phone
                    ? clientObj.value.client.primary_phone
                    : "Не указан"
                }}
              </p>
              <p class="gray">Доп. телефон:</p>
              <p>
                {{
                  clientObj?.value?.client?.secondaty_phone
                    ? clientObj.value.client.secondaty_phone
                    : "Не указан"
                }}
              </p>
            </div>
          </div>
          <div class="client">
            <h3>Адрес</h3>
            <div class="client-details">
              <p class="gray">Город:</p>
              <p>{{ clientObj?.value?.address?.city?.name }}</p>
              <p class="gray">Улица / микрорайон:</p>
              <p>{{ clientObj?.value?.address?.street || "Не указан" }}</p>
              <p class="gray">Дом:</p>
              <p>
                {{
                  clientObj?.value?.address?.building
                    ? "№ " + clientObj.value.address.building
                    : "Не указан"
                }}
              </p>
              <p class="gray">Квартира:</p>
              <p>
                {{
                  clientObj?.value?.address?.apartment
                    ? "№ " + clientObj.value.address.apartment
                    : "Отсутствует"
                }}
              </p>
              <p class="gray">Этаж:</p>
              <p>
                {{
                  clientObj?.value?.address?.floor
                    ? "№ " + clientObj.value.address.floor
                    : "Отсутствует"
                }}
              </p>
              <p class="gray">Лифт:</p>
              <p>
                {{
                  clientObj?.value?.address?.elevator
                    ? "№ " + clientObj.value.address.elevator
                    : "Отсутствует"
                }}
              </p>
            </div>
          </div>
          <div class="client">
            <h3>Координаты</h3>
            <div class="client-details">
              <p class="gray">Широта:</p>
              <p>{{ clientObj?.value?.address?.lat || "Не указан" }}</p>
              <p class="gray">Долгота:</p>
              <p>{{ clientObj?.value?.address?.lng || "Не указан" }}</p>
            </div>
          </div>
          <div class="client">
            <h3>Комментарий</h3>
            <p>{{ clientObj?.value?.comment || "Oтсутствует" }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </main>
</template>



<style scoped>
.green{
  color: #029aad;
}
.gray {
  color: #7f7f7f;
  font-weight: 400;
  font-size: 15px;
}

.client-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 12px;
}

p {
  font-weight: 400;
  font-size: 15px;
  line-height: 15px;
}

.client {
  display: flex;
  flex-direction: column;
}

h3 {
  margin-bottom: 12px;
  font-weight: 600;
  line-height: 20px;
}
.details {
  display: grid;
  grid-template-columns: 0.4fr 1.7fr 1fr 1.5fr 0.4fr 1.5fr;
  padding: 20px 16px 20px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #029aad;
}
.client-orders {
  display: grid;
  grid-template-columns: 0.4fr 1.7fr 1fr 1.5fr 0.4fr 1.5fr;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 16px 20px 0;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 65%;
}
.left-up,
.left-bottom,
.right {
  display: flex;
  background-color: white;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  border-radius: 10px;
}
.right {
  width: 35%;
}
.main-details {
  display: flex;
  flex-direction: row;
  gap: 40px;
}
main {
  background-color: #f0f0f0;
  height: 100vh;
}
.order-container {
  padding: 30px 50px 30px 360px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.date-period {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 80px;
  padding-bottom: 40px;
  margin-top: 8px;
}
.back {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  background-color: transparent;
  border: none;
  text-decoration: none;
  color: #001529;

}
.date {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>
