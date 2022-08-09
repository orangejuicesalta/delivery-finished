<script setup>
import router from "@/router/index.js";
import { ref, reactive} from "vue";

let type = ref("password");
let firstName = ref('');
let lastName = ref('');
let checked = ref();
const user = reactive({
  username: ref(""),
  password: ref(""),
});

const apiUrl = "http://delivery-testapi.evrika.com/api";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

async function signIn() {
  if (!user.username || !user.password) {
    alert("Enter both login and password");
  }
  const res = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers,
    body: JSON.stringify(user),
  });

  const data = (await res.json()).data;
  const token = await data.token;
  localStorage.setItem('first_name', await data.user.first_name);
  localStorage.setItem('last_name', await data.user.last_name)


  if (res.ok) {
    router.push({ path: "/main" });
    if (checked.value) {
      localStorage.setItem("access", token);
    } else {
      sessionStorage.setItem("access", token);
    }
  } else {
    alert("Incorrect username or password");
  }
}
</script>

<template>
  <div class="body">
    <div class="container">
      <img src="../assets/main-logo.svg" alt="" class="logo" />
      <div class="greeting">Добро пожаловать в Сервис Доставки Товаров</div>

      <div class="form-container">
        <div class="login-area">
          <img src="../assets/login-icon.svg" alt="" class="icon" />
          <input
            type="text"
            class="input"
            name="Login"
            id="login"
            v-model="user.username"
            placeholder="Логин"
            required
          />
        </div>

        <div class="password-area">
          <div class="password-area-1">
            <img src="../assets/password-icon.svg" alt="" class="icon" />
            <input
              :type="type"
              class="input"
              id="password"
              v-model="user.password"
              placeholder="Пароль"
            />
          </div>

          <img
            src="../assets/eye-open-icon.svg"
            alt=""
            class="eye"
            @click="type === 'password' ? (type = 'text') : (type = 'password')"
          />
        </div>

        <div class="checkbox-area">
          <input
            type="checkbox"
            name="checkbox"
            id="remember_me"
            value="value"
            class="checkbox"
            v-model="checked"
          />
          <label for="remember_me" class="description">Запомнить меня</label>
        </div>

        <button class="login-btn" @click="signIn">Вход</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  background-color: #001529;
  color: white;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.greeting {
  font-size: 20px;
  margin-top: 50px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 40px;
  margin-top: 70px;
}

.login-area,
.password-area {
  display: flex;
  flex-direction: row;
  height: 60px;
  border-radius: 5px;
  padding: 20px;
  gap: 10px;
  background-color: white;
  width: 100%;
}

.password-area {
  justify-content: space-between;
  align-items: center;
}

.password-area-1 {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.eye {
  cursor: pointer;
}

.input {
  border: none;
}

.input:focus {
  outline: none;
  background-color: white;
}

.checkbox-area {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-bottom: 30px;
}

.description {
  font-size: smaller;
}

button {
  background-color: #029aad;
  padding: 16px 40px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: medium;
  font-weight: bolder;
  cursor: pointer;
}
</style>
