<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table :data="listproduct" :columns="columns" row-key="id">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="nombre" :props="props">
                {{ props.row.nombre }}
              </q-td>
              <q-td key="referencia" :props="props">
                {{ props.row.referencia }}
              </q-td>
              <q-td key="descripcion" :props="props">
                {{ props.row.descripcion }}
              </q-td>
              <q-td key="precio" :props="props">
                {{ props.row.precio }}
              </q-td>
              <q-td key="tipo_producto" :props="props">
                {{ props.row.tipo_producto }}
              </q-td>
              <q-td key="acciones" :props="props">
                <q-btn
                  flat
                  dense
                  icon="edit"
                  size="sm"
                  color="primary"
                  class="q-ma-none"
                  @click="editProduct(props.row.id)"
                />
                <q-btn
                  flat
                  dense
                  icon="delete"
                  size="sm"
                  color="primary"
                  class="q-ma-none"
                  @click="deleteProduct(props.row.id)"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { Headers } from '../../../Headers'
import axios from 'axios'
import { Global } from '../../Global'
import { Notify } from 'quasar'

export default {
  name: 'list',
  props: {
    listproduct: Array
  },

  data () {
    return {
      columns: [
        {
          name: 'nombre',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.nombre,
          sortable: true
        },
        {
          name: 'referencia',
          align: 'center',
          label: 'Referencia',
          field: row => row.referencia,
          sortable: true
        },
        {
          name: 'descripcion',
          label: 'Descripci??n',
          field: row => row.descripcion,
          sortable: true
        },
        { name: 'precio', label: 'Precio', field: row => row.precio },
        {
          name: 'tipo_producto',
          label: 'Tipo de producto',
          field: row => row.tipo_producto,
          sortable: true
        },
        {
          name: 'acciones',
          label: 'Acciones',
          sortable: true
        }
      ]
    }

  },
  methods: {
    async deleteProduct (req, res) {
      try {
        let list = await axios.delete(
          Global.url + 'product/' + `${req}`,
          Headers
        )
        if (list.status === 200) {
          this.$emit('listProduct')
          Notify.create({
            type:'positive',
            message: 'Producto Eliminado!',
            color:'purple',
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
            type:'warning',
            message: 'Error al intentar eliminar el Producto!',
            color:'warning',
            position:'center'
          })
      }
    },
    async editProduct (req, res) {
      try {
        let list = await axios.put(
          Global.url + 'product/' + `${req}`,
          Headers
        )
        if (list.status === 200) {
          this.$emit('listProduct')
          Notify.create({
            type:'positive',
            message: 'Producto Eliminado!',
            color:'purple',
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
            type:'warning',
            message: 'Error al intentar eliminar el Producto!',
            color:'warning',
            position:'center'
          })
      }
    }
  },
}

</script>