<script setup>
import { useRoute } from 'vue-router';

// Reactive variables for the form action and hidden inputs
const submitUrl = ref('');
const username = ref('test'); // Pre-filled username
const password = ref('admin123'); // Pre-filled password
const loading = ref(false);

// On component mount, get the 'sip' query parameter from the URL
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

const handleConnect = async () => {
  if (!submitUrl.value) {
    console.log("Connecting...")
  }

  loading.value = true;
  try {
    const response = await fetch(submitUrl.value, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: username.value,
        password: password.value
      }).toString()
    });

    if (response.ok) {
      console.log("Connected:", response);
    } else {
      const errorData = await response.text();
      console.log('Connection failed', errorData);
    }
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    loading.value = false;
  }

}

</script>

<template>
  <!-- v-app is the root component for Vuetify applications -->

  <!-- v-container centers content and can be fluid -->
  <v-container fluid fill-height class="app-background-image d-flex align-center justify-center">
    <!-- v-card provides a Material Design card component -->
    <v-card class="pa-6 rounded-lg elevation-10 card-width">
      <!-- Logo container using Vuetify's flex utilities -->


      <img src="/images/snc_logo.png" alt="SNC Logo" width="120" style="display: block; margin: 0 auto 1rem" />

      <!-- Card title for the welcome message -->
      <v-card-title class="text-h5 text-center mb-4 font-weight-bold">
        Welcome SNC Free Wi-Fi
      </v-card-title>


      <!-- Form for submission -->
      <!-- <v-form :action="submitUrl" method="POST"> -->
        <v-form @submit.prevent="handleConnect">
        <!-- Hidden text fields for username and password -->
        <!-- While hidden, using v-text-field ensures consistency if they were to become visible -->
        <v-text-field v-model="username" name="username" type="text" label="Student ID or Username" hide-details
          class="mb-4" style="display: none;"></v-text-field>

        <v-text-field v-model="password" name="password" type="password" label="Password" hide-details class="mb-6"
          style="display: none;"></v-text-field>

        <!-- Connect button -->
        <v-btn
            @click="handleConnect"
            block
            size="large"
            color="#03910aff"
            class="text-white text-capitalize"
            :loading="loading"
            :disabled="loading"
          >
            Connect
          </v-btn>
        <!-- <v-btn @click="connect()" :loading="loading" :disabled="loading" block size="large" color="#03910aff"
          class="text-white text-capitalize">
          Connect
        </v-btn> -->
      </v-form>

      <!-- Footer section -->
      <v-card-text class="footer text-center mt-4">
        By connecting, you agree to our <a href="#" class="text-decoration-none text-blue">terms of use</a>.
        <div class="ver-number">Captive Portal v2.0.8</div>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<style scoped>
/* Custom background gradient for the entire app */
.app-background-image {
  /* margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom right, #72df81ff, #03910aff);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; 
   min-height: 100vh;
  background-color: #f0f8ff; */

  background-image: linear-gradient(to bottom right, rgba(114, 223, 129, 0.9), rgba(3, 145, 10, 0.9)),
    url('../public//images/snc_building.png');
  background-size: cover;
  /* Ensures the image covers the entire element */
  background-position: center;
  /* Centers the image */
  background-repeat: no-repeat;
  /* Prevents the image from repeating */
  background-attachment: fixed;
  /* Makes the background fixed while scrolling (if content overflows) */
  /* Optional: Add a subtle overlay to make text more readable, if needed */
  position: relative;
  min-height: 100vh;
  z-index: 0;
  /* Ensure it's behind the card */
}

/* Ensure the card has a max-width for responsiveness */
.card-width {
  max-width: 400px;
  width: 100%;
  /* Make it fill available width up to max-width */
}

/* Specific styling for the smaller logo */
.logo-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  /* Ensures the image scales correctly within its bounds */
}

/* Override Vuetify's default button hover if needed, though color prop handles it well */
.v-btn {
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: #026e08ff !important;
  /* Darker green on hover */
}

.footer {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #777;
}

.ver-number {
  margin-top: 25px;
  font-size: 13px;
}
</style>
