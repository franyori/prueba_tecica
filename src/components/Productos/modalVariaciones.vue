<template>
  <div class="q-pa-md q-gutter-sm">

    <q-dialog v-model="dialogVariant" persistent transition-show="scale" transition-hide="scale">
      <q-card class="" style="width: 700px">
        <q-card-section>
            <div class="row">
                <div class="col">
                    Agregar variaciones
                </div>
                <div class="col text-right">
                    <q-btn icon="close" flat round dense @click="addVariantProducto()" />
                </div>
            </div>
        </q-card-section>
        <q-form id="form" @submit.prevent="addVari()"  @reset="onReset">
            <q-card-section class="q-pt-none q-ma-md">
                <div class="row">
                    <div class="col">
                        <q-input
                            dense
                            standout
                            bg-color="grey-3"
                            filled
                            v-model="descripcion"
                            label="Descripción"
                            hint="Descripción"
                            lazy-rules
                            :rules="[val => (val && val.length > 0) || 'Escriba Descripción']"
                            >
                            </q-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <q-input
                            dense
                            standout
                            bg-color="grey-3"
                            filled
                            mask="########"
                            v-model="precio"
                            label="Precio"
                            hint="Precio"
                            lazy-rules
                            :rules="[val => (val && val.length > 0) || 'Escriba El Precio ']"
                            >
                            </q-input>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions align="right" class="q-ml-md q-mr-md q-pt-none q-pb-none">
                <q-btn dense label="Agregar" no-caps color="primary" type="submit" />
            </q-card-actions>
         </q-form>
         <q-card-section class="q-ma-md">
            <q-list dense bordered separator>
            <q-item clickable v-ripple>
                <q-item-section class="text-primary text-bold">Descripción</q-item-section>
                <q-item-section class="text-primary text-bold">Precio</q-item-section>
            </q-item>   
            <q-item v-for="(variant, index) in variantsArray" :key="index" clickable v-ripple>
                <q-item-section> {{ variant.descripcion }}</q-item-section>
                <q-item-section> {{ variant.precio }}</q-item-section>
            </q-item>
            </q-list>
         </q-card-section>
         <q-card-actions align="right" class="q-ml-md q-mr-md">
                <q-btn dense label="Listo" no-caps color="primary" @click="addVariantProducto()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVariant: Boolean
  },
  data () {
    return {
      persistent: false,
      referencia: '',
      descripcion: '',
      precio: null,
      variantsArray: []
    }
  },
  methods: {
    addVariantProducto(){
        let dialog = false
        let variantsArray = this.variantsArray
        this.$emit('insertVariantArray', dialog, variantsArray)
    },
    addVari(){
        let variant = {
            id: this.variantsArray.length+1,
            descripcion: this.descripcion,
            precio: this.precio,
        }
        this.variantsArray.push(variant)
        this.onReset()
    },
    onReset () {
      this.referencia = ''
      this.descripcion = ''
      this.precio = null
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
