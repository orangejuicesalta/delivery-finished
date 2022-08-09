<script setup>
async function logout() {
  await fetch("http://delivery-testapi.evrika.com/api/logout", {
    method: "POST",
  });
  localStorage.clear();
  sessionStorage.clear();
  location.pathname = "/";
}
</script>

<template>
  <img src="../assets/logout-icon.svg" alt="logout" class="log-out-icon" @click="logout" />
</template>


<style scoped>
img {
    cursor: pointer;
}
</style>
