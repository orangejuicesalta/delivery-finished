<script setup>
import { defineProps } from "vue";

defineProps({
  order: Object,
});
</script>

<template>
  <router-link :to="`/order/${order.id}`" class="request">
    <div class="order-n">
      <input type="checkbox" class="checkbox" />
      <span class="blue">{{ order.number }}</span>
      
    </div>
    <div class="address">
      {{ order.address.city.name }}{{ order.address.street ? ", " + order.address.street : ""
      }}{{ order.address.building == 0 ? "" : ", " + order.address.building
      }}{{ order.address.apartment ? ", квартира " + order.address.apartment : "" }}
    </div>
    <div class="reciever-period">{{ order.client.name }}</div>
    <div class="reciever-period">
      {{ order.deliver_at }}, {{ order.period_begin_at.slice(0, -3) }}-{{
        order.period_end_at.slice(0, -3)
      }}
    </div>
  </router-link>
</template>

<style scoped>
.request {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 400;
  text-decoration: none;
  color: #001529;
}
.blue{
  color: #0069FF;
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
  line-height: 20px;
}
.reciever-period {
  flex: 2;
}
</style>
