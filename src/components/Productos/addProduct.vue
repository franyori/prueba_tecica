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
                <q-icon color="primary" name="draw" />
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
                <q-icon color="primary" name="draw" />
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
                <q-icon color="primary" name="draw" />
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
                <q-icon color="primary" name="draw" />
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
                @input="openDialogVar()"
              />
              <q-radio
                dense
                v-model="shape"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="variable"
                label="Variable"
                @input="openDialogVar()" 
              />
            </div>
          </div>
        </div>
        <div class="q-pa-md q-ma-md">
           <q-list bordered separator v-show="shape == 'variable'">
            <q-item clickable v-ripple>
                <q-item-section class="text-primary text-bold">Descripción</q-item-section>
                <q-item-section class="text-primary text-bold">Precio</q-item-section>
                <q-item-section class="text-primary text-bold" side>
                  <q-btn icon="add" flat dense @click="openDialogVar()" color="primary"/>
                </q-item-section>
            </q-item>
             <q-item v-for="(variant, index) in variantsArray" :key="index" clickable v-ripple>
                <q-item-section> {{ variant.descripcion }}</q-item-section>
                <q-item-section> {{ variant.precio }}</q-item-section>
                <q-item-section class="text-primary text-bold" side>
                  <q-btn icon="delete" flat dense color="primary"/>
                </q-item-section>
            </q-item>
          </q-list>
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
    <modal-variaciones 
      v-show="shape == 'variable'"
      :dialogVariant="dialogVariant"
      @insertVariantArray="insertVariantArray"
    >
    </modal-variaciones>
  </div>
</template>

<script>
import modalVariaciones from './modalVariaciones'
import { Headers } from '../../../Headers'
import axios from 'axios'
import { Global } from '../../Global'
import { Notify } from 'quasar'

export default {
  name: 'addProduct',
  components: {
    modalVariaciones,
  },
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
      toolbar: false,
      dialogVariant: false,
      variantsArray: []
    }
  },
  methods: {
    insertVariantArray(params, params2){
      this.dialogVariant = params
      this.variantsArray = params2
    },
    openDialogVar(){
      this.dialogVariant = true
    },
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
        tipo_producto: this.shape,
        variant: this.variantsArray
      }
      try {
        const add = await axios.post(Global.url + 'product', params, Headers)
        if (add.status === 200) {
          this.$emit('listProduct')
          this.onReset()
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
