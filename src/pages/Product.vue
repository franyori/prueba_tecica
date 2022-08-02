<template>
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-lg q-pl-lg">
        Productos
      </p>
    </div>

    <div class="row">
      <list :listproduct="this.apiProduct" />
      <addProduct />
    </div>
  </div>
</template>

<script>
import list from '../components/Productos/list.vue'
import addProduct from '../components/Productos/addProduct.vue'
import { Headers } from '../../Headers'
import { Global } from '../Global'
import axios from 'axios'
export default {
  name: 'Product',
  components: {
    list,
    addProduct
  },
  data () {
    return {
      apiProduct: []
    }
  },
  mounted () {
    this.listProduct()
  },
  updated () {
    this.listProduct()
  },
  methods: {
    async listProduct (req, res) {
      try {
        let list = await axios.get(Global.url + 'product', Headers)
        this.apiProduct = list.data
        console.log(this.apiProduct)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
