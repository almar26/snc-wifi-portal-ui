<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Reactive variables for the form action and hidden inputs
const submitUrl = ref('');
const username = ref('test'); // Pre-filled username
const password = ref('admin123'); // Pre-filled password

// On component mount, get the 'sip' query parameter from the URL
onMounted(() => {
  const route = useRoute();
  const sip = route.query.sip;
  if (sip) {
    submitUrl.value = `http://${sip}:9997/login`;
  } else {
    // Fallback URL if 'sip' parameter is not provided
    console.warn('SIP parameter not found in URL. Using a placeholder URL.');
    submitUrl.value = 'http://localhost:9997/login'; // Example fallback
  }
});
</script>

<template>
  <!-- v-app is the root component for Vuetify applications -->

    <!-- v-container centers content and can be fluid -->
    <v-container fluid fill-height class="d-flex align-center justify-center">
      <!-- v-card provides a Material Design card component -->
      <v-card class="pa-6 rounded-lg elevation-10 card-width">
        <!-- Logo container using Vuetify's flex utilities -->
        

       <img
        src="/images/snc_logo.png"
        alt="SNC Logo"
        width="120"
        style="display: block; margin: 0 auto 1rem"
      />

        <!-- Card title for the welcome message -->
        <v-card-title class="text-h5 text-center mb-4">
          Welcome SNC Free Wi-Fi
        </v-card-title>

        <!-- Form for submission -->
        <v-form :action="submitUrl" method="POST">
          <!-- Hidden text fields for username and password -->
          <!-- While hidden, using v-text-field ensures consistency if they were to become visible -->
          <v-text-field
            v-model="username"
            name="username"
            type="text"
            label="Student ID or Username"
            hide-details
            class="mb-4"
            style="display: none;"
          ></v-text-field>

          <v-text-field
            v-model="password"
            name="password"
            type="password"
            label="Password"
            hide-details
            class="mb-6"
            style="display: none;"
          ></v-text-field>

          <!-- Connect button -->
          <v-btn
            type="submit"
            block
            size="large"
            color="#03910aff"
            class="text-white text-capitalize"
          >
            Connect
          </v-btn>
        </v-form>

        <!-- Footer section -->
        <v-card-text class="footer text-center mt-4">
          By connecting, you agree to our <a href="#" class="text-decoration-none text-blue">terms of use</a>.
          <div class="ver-number">Captive Portal v1.0.7</div>
        </v-card-text>
      </v-card>
    </v-container>

</template>

<style scoped>
/* Custom background gradient for the entire app */
.app-background {
  background: linear-gradient(to bottom right, #72df81ff, #03910aff) !important;
}

/* Ensure the card has a max-width for responsiveness */
.card-width {
  max-width: 400px;
  width: 100%; /* Make it fill available width up to max-width */
}

/* Specific styling for the smaller logo */
.logo-image {
  width: 100px;
  height: 100px;
  object-fit: contain; /* Ensures the image scales correctly within its bounds */
}

/* Override Vuetify's default button hover if needed, though color prop handles it well */
.v-btn {
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: #026e08ff !important; /* Darker green on hover */
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
