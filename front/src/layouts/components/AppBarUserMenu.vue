<template>
  <v-menu offset-y left nudge-bottom="14" min-width="230" content-class="user-profile-menu-content">
    <template v-slot:activator="{ on, attrs }">
      <v-badge bottom color="success" overlap offset-x="12" offset-y="12" class="ms-4" dot>
        <v-avatar size="40px" v-bind="attrs" v-on="on" color='primary'>

               <span class="white--text text-h5"> {{user.role_id  == 1  ? 'A' : user.name}}</span>

        </v-avatar>
      </v-badge>
    </template>
    <v-list>
      <div class="pb-3 pt-2">
        <v-badge bottom color="success" overlap offset-x="12" offset-y="12" class="ms-4" dot>
          <v-avatar size="40px">
            <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
          </v-avatar>
        </v-badge>
        <div class="d-inline-flex flex-column justify-center ms-3" style="vertical-align: middle">
          <span class="text--primary font-weight-semibold mb-n1">{{
            user.role_id == 1 ? user.email : user.name
          }}</span>
          <small class="text--disabled text-capitalize">{{ role }}</small>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Profile
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiAccountOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title @click="goToProfile"> Profile </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- Logout -->
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiLogoutVariant }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title @click="logout">Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {
  mdiAccountOutline,
  mdiEmailOutline,
  mdiCheckboxMarkedOutline,
  mdiChatOutline,
  mdiCogOutline,
  mdiCurrencyUsd,
  mdiHelpCircleOutline,
  mdiLogoutVariant,
} from '@mdi/js'
import {mapGetters,mapActions,mapMutaions} from 'vuex'

export default {
  setup() {
    return {
      icons: {
        mdiAccountOutline,
        mdiEmailOutline,
        mdiCheckboxMarkedOutline,
        mdiChatOutline,
        mdiCogOutline,
        mdiCurrencyUsd,
        mdiHelpCircleOutline,
        mdiLogoutVariant,
      },
    }
  },
  computed:{
    ...mapGetters('auth',{user:'GET_USER_DATA'}),
    role()
    { 
      return this.user.role.name;

      }
    },
  methods: {
    ...mapActions('auth',['LOGOUT']),
    goToProfile() {
      this.$router.push({ name: 'pages-account-settings' })
    },
    logout()
    {
      this.LOGOUT().then(()=>{
        window.location.reload(true)
      })
    }
  },
  mounted()
  {
    console.log(this.user);
  }
}
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
