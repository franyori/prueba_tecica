<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pt-md q-pr-lg"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar Productos
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>

      <q-form id="form" @submit.prevent="addProduct()"  @reset="onReset">
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md"
          >
            <q-input
              dense
              filled
              v-model="name"
              standout
              bg-color="grey-3"
              label="Nombre del Producto"
              hint="Nombre Identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba el Nombre']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-md"
          >
            <q-input
              dense
              filled
              v-model="referencia"
              standout
              bg-color="grey-3"
              label="Referencia de Producto"
              hint="Referencia"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba la Referencia'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
              q-pr-md q-pt-md
            "
          >
            <q-input
              dense
              standout
              bg-color="grey-3"
              filled
              v-model="descripcion"
              label="Descripción del  Producto"
              hint="Descripción Producto"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba la Descripción'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
              q-pr-md q-pt-md
            "
          >
            <q-input
              dense
              standout
              bg-color="grey-3"
              filled
              v-model="precio"
              label="Precio del  Producto"
              hint="Precio del  Producto"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba El Precio ']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-left q-pt-md">
            <p class="text-subtitle2">Tipo de Producto</p>
          </div>
        </div>
        <div class="row">
          <div class="col q-pt-none q-pr-md q-pl-lg">
            <div class="q-gutter-lg ">
              <q-radio
                dense
                v-model="shape"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="simple"
                label="Simple" 
              />
              <q-radio
                dense
                v-model="shape"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="variable"
                label="Variable" 
              />
            </div>
          </div>
        </div>
        <div class="q-pa-md q-gutter-sm">
          
          <q-dialog v-model="toolbar">
            <q-card>
              <q-toolbar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
                </q-avatar>

                <q-toolbar-title
                  ><span class="text-weight-bold">Quasar</span>
                  Framework</q-toolbar-title
                >

                <q-btn flat round dense icon="close" v-close-popup />
              </q-toolbar>

              <q-card-section>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                repellendus sit voluptate voluptas eveniet porro. Rerum
                blanditiis perferendis totam, ea at omnis vel numquam
                exercitationem aut, natus minima, porro labore.
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
        <div class="col-12 q-pt-md">
          <q-btn label="Enviar" type="submit" color="primary" />
          <q-btn
            label="Limpiar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { Headers } from '../../../Headers'
import axios from 'axios'
import { Global } from '../../Global'
import { Notify } from 'quasar'

export default {
  name: 'addProduct',
  data () {
    return {
      shape: 'simple',
      name: null,
      referencia: null,
      precio: null,
      descripcion: null,
      accept: false,
      model: null,
      theModel2: '',
      toolbar: false
    }
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.name = null
      this.referencia = null
      this.descripcion = null
      this.precio = null
      this.accept = false
      this.theModel2 = ''
    },

    formodal(){
      if (this.shape === 'simple') {
        this.toolbar = false;
      }else{
         this.toolbar = true;
      }
    },
      async addProduct (req, res) {
      let params = {
        nombre: this.name,
        referencia: this.referencia,
        descripcion: this.descripcion,
        precio: this.precio,
        tipo_producto: this.shape
      }
      try {
        const add = await axios.post(Global.url + 'product', params, Headers)
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Producto Agregado',
            color: 'positive'
          })
        }
      } catch (error) {
       // console.log(params)
        Notify.create({
          type: 'warning',
          message: 'Error con el Servidor!',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
}
</script>
