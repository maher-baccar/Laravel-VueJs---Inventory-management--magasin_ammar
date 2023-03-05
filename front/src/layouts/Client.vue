<template>
  <v-app>
    <v-app-bar app flat absolute color="transparent">
      <div class="boxed-container w-full">
        <div class="d-flex align-center mx-6">
          <!-- Left Content -->
          <v-app-bar-nav-icon class="d-block d-lg-none me-2" @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>

          <v-spacer></v-spacer>

          <!-- Right Content -->
          <theme-switcher></theme-switcher>
          <notification-menu></notification-menu>
          <app-bar-user-menu></app-bar-user-menu>
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>

<style></style>
