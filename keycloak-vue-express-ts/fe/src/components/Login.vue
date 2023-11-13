<template>
    <div class="login">
      <h2>Login {{ Login() }}</h2>
      <button @click="LogOut">Log Out</button>
      <pre>Roles: {{ UserRoles()?.join(" ") }}</pre>
      <pre>Access Token: {{ AccessToken() }}</pre>
      <pre>Email:{{ DecodeToken()?.email }}</pre>
      <pre>Protect API:{{protect}}</pre>
      <pre>Decode ID Token:{{ DecodeIdToken() }}</pre>
      <pre>Decode Access Token:{{ DecodeToken() }}</pre>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import KeyCloakService from "../services/KeycloakService";
  import HttpService from "../services/HttpService";

  export default defineComponent({
    name: "Login",
    data(){
      return{
        protect:"not protect yet",
        isAdmin:false
      }
    },async mounted(){
      try{
        const res = await HttpService.getAxiosClient().get("/api/profile")
        //console.log(res.data)
        this.protect = JSON.stringify(res.data,null,4)
      }catch(e){
        console.log(e)
        this.protect = "Can't get protected API "
      }

    },
    methods: {
      Login() {
        return KeyCloakService.GetUserName();
      },
      AccessToken() {
        return KeyCloakService.GetAccesToken();
      },
      DecodeToken(){
        return KeyCloakService.GetDecodeToken()
      },
      DecodeIdToken(){
        return KeyCloakService.GetDecodeIdToken()
      },
      LogOut() {
        return KeyCloakService.CallLogOut();
      },
      UserRoles() {
        return KeyCloakService.GetUserRoles();
      }
    },
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>