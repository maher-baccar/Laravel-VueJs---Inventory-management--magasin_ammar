<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="id"
    class="elevation-1"
    :loading="loader"
    loading-text="Loading..."
    :search="search"

  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Mes Fournisseurs</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Filtrez vos résultats"
          single-line
          hide-details
        ></v-text-field>
       
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Ajouter Un Fournisseur</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Nom"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.adress" label="Adresse"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.phone" label="Téléphone"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Annuler </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Enrigsiter </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Voulez-vous vraiment supprimer cet élément ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"> Annuler  </v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    
  </v-data-table>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loader: false,
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Nom', value: 'name' },
      { text: 'Téléphone', value: 'phone' },
      { text: 'Email', value: 'email' },
      { text: 'Adresse', value: 'adress' },

      { text: 'Actions', value: 'actions', sortable: false },
    ],
    items: [],
    search: null,

    editedIndex: -1,
    editedItem: {
      name: '',
      adress: '',
      phone: '',
      email: '',
    },
    defaultItem: {
      name: '',
      adress: '',
      phone: '',
      email: '',
        },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nouveau Fournisseur' : 'Modifier Fournisseur'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    ...mapActions('admin', ['All_PROVIDERS', 'ADD_PROVIDER', 'UPDATE_PROVIDER','DELETE_PROVIDER']),
    initialize() {
      this.loader = true
      this.All_PROVIDERS()
        .then(res => {
          this.items = [...res]
          this.loader = false
        })
        .catch(e => {
          console.log(e)
          //console.log(JSON.stringify(e))

          let messages = ''
          if (e.response.data && e.response.data.errors) {
            messages = Object.values(e.response.data.errors)
              .map(el => {
                return el[0]
              })
              .join('\n')
          }
          this.$swal({
            icon: 'error',
            title: e.response.data.message,
            text: messages,
          })
        })
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.DELETE_PROVIDER(this.editedItem.id)
        .then(res => {
            console.log(res);
          this.initialize()
          this.$swal({
            icon: 'success',
            title: 'Success !',
            text: res.message,
          })
        })
         .catch(e => {
            console.log(e);
            //console.log(JSON.stringify(e))
            
            let messages=''
            if (e.response.data && e.response.data.errors) {
              messages=Object.values(e.response.data.errors).map(el=>{
             return el[0]
            }).join('\n')
            }
            this.$swal({
              icon: 'error',
              title: e.response.data.message,
               text:messages,
            })
      
        })
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        this.UPDATE_PROVIDER({ id: this.editedItem.id, payload: this.editedItem })
          .then(res => {
            this.initialize()
          })
          .catch(e => {
            console.log(e);
            //console.log(JSON.stringify(e))
            
            let messages=''
            if (e.response.data && e.response.data.errors) {
              messages=Object.values(e.response.data.errors).map(el=>{
             return el[0]
            }).join('\n')
            }
            this.$swal({
              icon: 'error',
              title: e.response.data.message,
               text:messages,
            })
      
        })
      } else {
        this.ADD_PROVIDER(this.editedItem)
          .then(res => {
            this.initialize()
          })
          .catch(e => {
            console.log(e)
            //console.log(JSON.stringify(e))

            let messages = ''
            if (e.response.data && e.response.data.errors) {
              messages = Object.values(e.response.data.errors)
                .map(el => {
                  return el[0]
                })
                .join('\n')
            }
            this.$swal({
              icon: 'error',
              title: e.response.data.message,
              text: messages,
            })
          })
      }
      this.close()
    },
  },
}
</script>