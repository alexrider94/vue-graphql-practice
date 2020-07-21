<template>
  <div class="card">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs4></v-flex>

        <v-flex xs4>
          <v-card height="600px">
            <div id="card_header">
              <span>LOGIN USER</span>
            </div>

            <v-divider></v-divider>
            <div id="card_id">
              <input placeholder="Enter your ID" v-model="uid" />
            </div>
            <v-divider></v-divider>
            <div id="card_pw">
              <input placeholder="Enter your password" v-model="password" />
            </div>
            <v-divider></v-divider>

            <div id="card_back">
              <v-card-actions>
                <v-btn v-on:click="back()">Back</v-btn>
              </v-card-actions>
            </div>
            <div id="card_login">
              <v-card-actions>
                <v-btn v-on:click="login()">Login</v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-flex>

        <v-flex xs4></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data: () => ({
    uid: "",
    password: "",
    token: ""
  }),
  methods: {
    back() {
      history.back();
    },
    async login() {
      this.token = undefined;
      try {
        const res = await axios.post("http://localhost:5556/graphql", {
          query: `
            mutation{
              login(userId:"${this.uid}",password:"${this.password}"){
                token
              }
            }
          `
        });
        this.token = res.data.data.login.token;
        //console.log(this.token);
        this.$store.dispatch('LOGIN', this.token);
        history.back();
      } catch (error) {
        alert("wrong login : " + error);
        return;
      }
    }
  }
};
</script>

<style>
#card_header {
  padding-top: 2em;
  margin: 2.5em;
}
#card_login {
  float: right;
}
#card_back {
  float: left;
}
#card_id {
  margin: 0.5em;
}
#card_pw {
  margin: 0.5em;
}
</style>