<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header>
      <q-toolbar class="bg-blue-grey-1 text-blue-grey-7">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />
        <q-toolbar-title class="text-secondary">
          Prueba Técnica
        </q-toolbar-title>
        <q-input
          rounded
          dense
          standout
          label="Busqueda..."
          bg-color="grey-6"
          v-model="text"
          class="q-ml-md text-black"
        >
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon
              v-else
              name="search"
              class="cursor-pointer"
              @click="text = ''"
            />
          </template>
        </q-input>
        <q-chip class="q-mr-sm q-ml-md">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          John
        </q-chip>
        <q-btn
          flat
          round
          dense
          icon="build"
          class="q-mr-sm q-ml-sm"
          size="md"
        />
        <q-btn
          flat
          round
          dense
          icon="notifications"
          size="md"
          class="q-mr-sm"
        />
        <q-btn flat round dense icon="more_vert" size="md" />
      </q-toolbar>
    </q-header>
    <q-drawer
      class="bg-blue-grey-1"
      v-model="drawer"
      show-if-above
      :width="250"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <div class="relative-position text-center">
        <img
          alt="Quasar logo"
          src="~assets/quasar-logo-vertical.svg"
          sizes="(max-width: 100px) 100w,
              "
          style="height: 60px; max-width: 60px"
        />
      </div>
      <q-list dense padding>
        <q-item active clickable v-ripple>
          <q-btn
            to="/Login"
            active-class="q-item-no-link-highlighting"
            flat
            icon="dashboard"
            label=""
            no-caps
          ></q-btn>
        </q-item>

        <q-item>
          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="person"
            label="Definición"
            no-caps
          >
            <q-item-section side>
              <q-btn
                to="/Product"
                size="14px"
                flat
                icon="add"
                label="Productos"
                color="primary"
                no-caps
              ></q-btn>
            </q-item-section>
          </q-expansion-item>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-grey-1">
      <q-card-section class="col-12 text-right no-padding">
        <div class="text-body2 col-12 text-grey-8 text-weight-bold">
          © 2022 Prueba Técnica.
          <q-btn
            size="10px"
            :icon="fabInstagram"
            flat
            dense
            color="grey-8"
          ></q-btn>
          <q-btn
            size="10px"
            :icon="fabFacebook"
            flat
            dense
            color="grey-8"
          ></q-btn>
          <q-btn
            size="10px"
            :icon="fabGithub"
            flat
            dense
            color="grey-8"
          ></q-btn>
        </div>
      </q-card-section>
    </q-footer>
  </q-layout>
</template>

<script>
import {
  fabGithub,
  fabFacebook,
  fabInstagram,
} from "@quasar/extras/fontawesome-v6";
import EssentialLink from "components/EssentialLink.vue";

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  data() {
    return {
      drawer: false,
      miniState: true,
      text: "",
      fabGithub,
      fabFacebook,
      fabInstagram,
    };
  },
};
</script>
