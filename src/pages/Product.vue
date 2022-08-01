<template>
<div class="row">
    <div class="col-12">
        <p class="text-bold text-primary text-h5 q-pt-lg q-pl-lg">
            Productos
        </p>
    </div>

<div class="row">
    <list />
    <addProduct />
</div>
</div>
</template>

<script>
import list from '../components/Productos/list.vue'
import addProduct from '../components/Productos/addProduct.vue'
export default {
    name: "Product",
    components: {
        list,
        addProduct,
    },
    data() {
        return {};
    },
};
</script>
