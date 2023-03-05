<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
   
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="accountDataLocale.first_name"
              label="first_name"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="accountDataLocale.last_name"
              label="last_name"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="accountDataLocale.email"
              label="E-mail"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="accountDataLocale.phone"
              label="phone"
              dense
              outlined
            ></v-text-field>
          </v-col>
             <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="accountDataLocale.address"
              label="address"
              dense
              outlined
            ></v-text-field>
          </v-col>
            <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="accountDataLocale.city"
              label="city"
              dense
              outlined
            ></v-text-field>
          </v-col>
          

          <v-col cols="12">
            <v-btn
              color="primary"
              class="me-3 mt-4"
             @click="update_profile"
            >
              Save changes
            </v-btn>
            <v-btn
              color="secondary"
              outlined
              class="mt-4"
              type="reset"
              @click.prevent="resetForm"
            >
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

  </v-card>
</template>

<script>
import { mdiAlertOutline, mdiCloudUploadOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { mapActions } from 'vuex'

export default {
  props: {
    accountData: {
      type: Object,
      default: () => {},
    },
  },
  methods:
  {

    ...mapActions('auth',['UPDATE_PROFILE']),
    update_profile()
    {
      this.UPDATE_PROFILE(this.accountDataLocale).then(res=>{
        console.log(res);
      }).catch(e=>{
        console.log(e);
      })
    }
  },
  setup(props) {
    const status = ['Active', 'Inactive', 'Pending', 'Closed']

    const accountDataLocale = ref(JSON.parse(JSON.stringify(props.accountData)))

    const resetForm = () => {
      accountDataLocale.value = JSON.parse(JSON.stringify(props.accountData))
    }

    return {
      status,
      accountDataLocale,
      resetForm,
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
      },
    }
  },
}
</script>
