<template>
  <div id="Menu">
    <div class="my-2">
      <router-link id="link" to="/">
        <v-btn x-large>Home</v-btn>
      </router-link>
    </div>
    <div class="my-2">
      <v-btn  v-if="isAuthenticated" x-large v-on:click="logout()">Logout</v-btn>
      <router-link v-else id="link" to="/Login">
        <v-btn x-large>Login</v-btn>
      </router-link>
    </div>
    <div class="my-2">
      <router-link id="link" to="/Search">
        <v-btn x-large>Search</v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import store from '../../store/store.js';

export default {
  name: "Menu",

  computed: {
    isAuthenticated: function() {
      if(localStorage.accessToken) return true;
      else return false
    }
  },

  methods: {
    logout(){
      store.dispatch('LOGOUT');
      this.$router.go();
    }
  }
};
</script>

<style>
html {
  background-color: snow;
}
#Menu {
  height: 100%;
  overflow: hidden;
}
.my-2 {
  margin: 10em;
  text-decoration: none;
}
.link :visited {
  text-decoration: none;
}
router-link-active,
router-link-exact-active {
  cursor: pointer;
  text-decoration: none;
}
</style>
