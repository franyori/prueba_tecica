<template>
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-lg q-pl-lg">
        Variaciones
      </p>
    </div>

    <div class="row">
      <list :listproduct="apiProduct" />
      <add />
    </div>
  </div>
</template>

<script>
import list from '../components/Variaciones/list.vue'
import add from '../components/Variaciones/add.vue'
import { Headers } from '../../Headers'
import { Global } from '../Global'
import axios from 'axios'
export default {
  name: 'VariacionesProduct',
  components: {
    list,
    add
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
