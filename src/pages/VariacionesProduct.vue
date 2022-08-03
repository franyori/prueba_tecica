<template>
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-lg q-pl-lg">
        Variaciones
      </p>
    </div>

    <div class="row col-12">
      <list :listproduct="apiProduct" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" />
    </div>
  </div>
</template>

<script>
import list from '../components/Productos/list.vue'
import { Headers } from '../../Headers'
import { Global } from '../Global'
import axios from 'axios'
export default {
  name: 'Product',
  components: {
    list
  },
  data () {
    return {
      apiProduct: []
    }
  },
  created () {
    this.listProduct()
  },
  updated () {
    this.listProduct()
  },
  methods: {
    async listProduct (req, res) {
      try {
        let list = await axios.get(Global.url + 'product', Headers)
        this.apiProduct = list.data.data
        console.log(this.apiProduct)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
