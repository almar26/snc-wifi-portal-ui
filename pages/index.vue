<script setup>
import { useRoute } from 'vue-router';

const submitUrl = ref('');
const username = ref('test'); // Pre-filled username
const password = ref('admin123'); // Pre-filled password

onMounted(() => {
  const route = useRoute();
  const sip = route.query.sip;
  if (sip) {
    submitUrl.value = `http://${sip}:9997/login`;
  } else {
    // Fallback or handle cases where 'sip' is not provided
    // For example, you might want to default to a known IP or display an error.
    console.warn('SIP parameter not found in URL. Using a placeholder URL.');
    submitUrl.value = 'http://localhost:9997/login'; // Example fallback
  }
});
</script>

<template>
  <div class="body-wrapper">
    <div class="container">
      <!-- <div class="logo-container">
        <img src="/images/snc_logo.png" alt="" class="logo" />
      </div> -->
      <img
        src="/images/snc_logo.png"
        alt="SNC Logo"
        width="120"
        style="display: block; margin: 0 auto 1rem"
      />
      <h2>Welcome SNC Free Wi-Fi</h2>
      <form method="POST" :action="submitUrl">
        <input hidden type="text" name="username" :value="username" />
        <input hidden type="password" name="password" :value="password" />
        <button type="submit">Connect</button>
      </form>
      <div class="footer">
        By connecting, you agree to our <a href="#">terms of use</a>.
        <div class="ver-number">Captive Portal v2.0.6</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
  The `scoped` attribute means these styles only apply to this component.
  For global styles, you would put them in `assets/css/main.css` or similar.
*/

.body-wrapper {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom right, #72df81ff, #03910aff);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Use min-height to ensure it covers full height */
}

.container {
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #03910aff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #026e08ff;
}

.footer {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #777;
}

.logo {
  width: 100px;
  height: 100px;
}
.logo-container {
  text-align: center;
}
.ver-number {
  margin-top: 25px;
  font-size: 13px;
}
img {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 3rem;
}
</style>