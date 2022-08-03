<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table
          title="Productos"
          :data="listproduct"
          :columns="columns"
          row-key="id"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
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
        { name: 'descripcion', 
          label: 'Descripción', 
          field: row => row.referencia, 
          sortable: true 
          },
        { name: 'precio', 
          label: 'Precio', 
          field: row => row.precio, 
          },  
        {
          name: 'tipo_producto',
          label: 'Tipo de producto',
          field: row => row.tipo_producto, 
          sortable: true,
        }
      ],
    }
  }
}
</script>
