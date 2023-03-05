<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs v-model="tab" show-arrows>
      <v-tab v-for="tab in tabs" :key="tab.icon">
   
          <v-icon size="20" class="me-3">
            {{ tab.icon }}
          </v-icon>
          <span>{{ tab.title }}</span>
     
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item v-if="user.user">
        <account-settings-account :account-data="accountSettingData"></account-settings-account>
      </v-tab-item>

      <v-tab-item>
        <account-settings-security></account-settings-security>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'

// demos
import AccountSettingsAccount from './AccountSettingsAccount.vue'
import AccountSettingsSecurity from './AccountSettingsSecurity.vue'
import AccountSettingsInfo from './AccountSettingsInfo.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    AccountSettingsAccount,
    AccountSettingsSecurity,
    AccountSettingsInfo,
  },
  computed: {
    ...mapGetters('auth', { user: 'GET_USER_DATA' }),
  },
  data() {
    return {
      tabs: [],
      tab: null,
      accountSettingData: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
      },
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
      },
    }
  },
  mounted() {
    if (this.user.user) {
      let { first_name, last_name, phone, address, city } = this.user
      this.accountSettingData = { first_name, last_name, phone, address, city }
      this.accountSettingData.email = this.user.user.email
      this.tabs=[
        { title: 'Compte', icon: mdiAccountOutline },
        { title: 'Sécurité', icon: mdiLockOpenOutline},
      ]
    } else {
      this.accountSettingData = this.user
      this.tabs=[
        { title: 'Sécurité', icon: mdiLockOpenOutline},
      ]
    }
  },
}
</script>
