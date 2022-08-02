<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    {{listproduct}}
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="listproduct"
           column-sort-order="ad"
          :columns="columns"
          :row-key="row => row.id"
          separator="none"
          dense
          :filter="filter"
          :pagination="initialPagination"
          class="text-center box-shadow"
        >
          <template v-slot:top-left>
            <q-input
              color="primary"
              class="text-secondary q-mb-lg q-mt-sm"
              standouts
              round
              bg-color="grey-3"
              dense
              debounce="300"
              v-model="filter"
              placeholder="Búsqueda"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
                <q-btn
                  flat
                  dense
                  icon="visibility"
                  size="xs"
                  class="q-ma-none"
                  color="primary"
                />
                <q-btn
                  flat
                  dense
                  icon="edit"
                  size="xs"
                  color="primary"
                  class="q-ma-none"
                />
                <q-btn
                  flat
                  dense
                  icon="delete"
                  size="xs"
                  color="primary"
                  class="q-ma-none"
                  @click="deleteCategoria(props.row.id)"
                />
              </q-td>
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
const mydata = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ]
const columns = [
  {
    name: 'nombre',
    required: true,
    label: 'Nombre Producto',
    align: 'center',
    field: row => row.nombre,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'referencia',
    align: 'center',
    label: 'Referencia Producto',
    field: 'referencia',
    sortable: true
  },
  {
    name: 'descripcion',
    align: 'center',
    label: 'Descripción Producto',
    field: 'descripcion',
    sortable: true
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones'
  }
]

const rows = []
export default {
  name: 'list',

  data () {
    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      columns,
      rows,
      filter: ''
    }
  },

  props: ['listproduct'],

  methods: {
    async deleteCategoria (req, res) {
      try {
        let list = await axios.delete(
          Global.url + 'categoria/delete/' + `${req}`,
          Headers
        )
        if (list.status === 200) {
          Notify.create({
            type:'positive',
            message: 'Usuario Eliminado!',
            color:'purple',
            //position:'center'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
            type:'warning',
            message: 'Error al intentar eliminar el Usuario!',
            color:'warning',
            position:'center'
          })
      }
    }
  },

}
</script>
