<template>
    <div id="body">
      
      <h3>유저 데이터 정보</h3>
<!-- 
      <div v-for="user in users" :key="user">
      </div> -->

      <vue-table-dynamic :params="params"></vue-table-dynamic>

      <div id="search_user_button">
        <v-btn v-on:click="fetchUserData()">유저 전체 데이터 조회</v-btn>
      </div>

      <v-divider id=divider></v-divider>
      <div id="create">

        <h3>유저 데이터 추가</h3>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="userId"
              filled
              v-model="createData['userId']"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="userName"
              filled
              v-model="createData['userName']"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="corpId"
              filled
              v-model="createData['corpId']"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="password"
              filled
              v-model="createData['password']"
            ></v-text-field>
          </v-col>

        </v-row>
        <v-row>
          <v-col>
            <div id="create_user_button">
              <v-btn v-on:click="createUserData()">유저 데이터 생성</v-btn>
            </div>
          </v-col>
        </v-row>
      </div>


      <v-divider id=divider></v-divider>

      <div id="update">

        <h3>유저 데이터 업데이트</h3>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="no"
              filled
              v-model="updateData['no']"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="userId"
              filled
              v-model="updateData['userId']"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="userName"
              filled
              v-model="updateData['userName']"
            ></v-text-field>
          </v-col>     

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="corpId"
              filled
              v-model="updateData['corpId']"
            ></v-text-field>
          </v-col>

        </v-row>

        <v-row>
          <v-col>
            <div id="update_user_button">
              <v-btn v-on:click="updateUserData()">유저 데이터 업데이트</v-btn>
            </div>
          </v-col>
        </v-row>

      </div>

      <v-divider id=divider></v-divider>

      <div id="delete">

        <h3>유저 데이터 삭제</h3>

        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              label="userId"
              filled
              v-model="deleteUserId"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div id="delete_user_button">
              <v-btn v-on:click="deleteUserData()">유저 데이터 삭제</v-btn>
            </div>
          </v-col>
        </v-row>

      </div>


    </div>
</template>

<script>
import axios from 'axios';
import VueTableDynamic from 'vue-table-dynamic';

export default {
  name: 'Body', 

  data() {
    return{
      users: [],
      params: {
        data: [
          ['NO','유저아이디','닉네임','회사아이디','회사이름','회사연락처']
        ],
        header: 'row',
      },
      createData: {
        "userId": null,
        "userName": null,
        "corpId": null,
        "password": null,
      },
      updateData: {
        "no": null,
        "userId": null,
        "userName": null,
        "corpId": null,   
      },
      deleteUserId: null,
    };
  },

  created() {
    this.fetchUserData();
  },

  updated () {
    // this.fetchUserData();
  },
  components: { VueTableDynamic },
  
  methods: {
    async getUserData(){
      this.params.data= [['NO','유저아이디','닉네임','회사아이디','회사이름','회사연락처'],];
        for (let i = 0; i< this.users.length; ++i) {
          //console.log(this.users[i]);
          this.params.data.push([this.users[i].no,this.users[i].userId,this.users[i].userName,this.users[i].corpId.corpId,this.users[i].corpId.corpName,this.users[i].corpId.corpContactNumber]);
        }
    },

    async updateUserData() {
      try {
        //console.log(this.updateData['no'] + "  " + this.updateData['userId'] + "  " + this.updateData['userName'] + "  " + this.updateData['corpId']);
        if(this.updateData['no'] === null || this.updateData['userId'] === null|| this.updateData['userName'] === null|| this.updateData['corpId'] === null){
          alert("fill every data");
          return;
        }
        console.log(`
           mutation{
            updateUserInfo(
              no: "${this.updateData['no']}"
              userId: "${this.updateData['userId']}"
              userName: "${this.updateData['userName']}"
              corpId: "${this.updateData['corpId']}"
            ){
               resultCount
            }
          }`);
        axios.defaults.headers.common['Authorization'] = `${localStorage.accessToken}`;
        await axios.post(
         'http://localhost:5556/graphql',{
           query: `
           mutation{
            updateUserInfo(
              no: ${this.updateData['no']}
              userId: "${this.updateData['userId']}"
              userName: "${this.updateData['userName']}"
              corpId: "${this.updateData['corpId']}"
            ){
               resultCount
            }
          }`
         },
        );
        alert(`user updated! userId: ${this.updateData['userId']} and name: ${this.updateData['userName']}`);
      } catch (error) {
        alert(`updateUserData Funtion error : ${error}`);
        console.log(`updateUserData Funtion error : ${error}`);
        throw error;       
      }
      finally{
        this.fetchUserData();
      }
    },

    async deleteUserData() {
      try {
        if (this.deleteUserId === null) {
          alert("fill user data");
          return;
        }
        axios.defaults.headers.common['Authorization'] = `${localStorage.accessToken}`;
        await axios.post(
          'http://localhost:5556/graphql',{
           query: `
           mutation{
            deleteUser(
              userId: "${this.deleteUserId}"
            ){
               resultCount
            }
          }`
         },
        );
        alert(`${this.deleteUserId} deleted`);
      } catch (error) {
        alert(`deleteUserData Funtion error : ${error}`);
        console.log(`deleteUserData Funtion error : ${error}`);
        throw error;       
      }
      finally{
        this.fetchUserData();
      }
    },

    async createUserData() {
      try {
        if(this.createData['userId'] === null || this.createData['userName'] === null|| this.createData['corpId'] === null|| this.createData['password'] === null){
          alert("fill every data");
          return;
        }
        axios.defaults.headers.common['Authorization'] = `${localStorage.accessToken}`;
        await axios.post(
         'http://localhost:5556/graphql',{
           query: `
           mutation{
            createUser(
              userId: "${this.createData['userId']}"
              userName: "${this.createData['userName']}"
              corpId: "${this.createData['corpId']}"
              password: "${this.createData['password']}"
            ){
               resultCount
            }
          }`
         },
        );
        alert(`user created! userId: ${this.createData['userId']} and name: ${this.createData['userName']}`);
      } catch (error) {
        alert(`createUserData Funtion error : ${error}`);
        console.log(`createUserData Funtion error : ${error}`);
        throw error;
      }
      finally{
        this.fetchUserData();
      }
    },

    async fetchUserData() {
      try {
        axios.defaults.headers.common['Authorization'] = `${localStorage.accessToken}`;
        const res = await axios.post(
         'http://localhost:5556/graphql',{
           query: `{
             getUsers{
                  no
                  userId
                  userName
                  corpId{
                    corpId
                    corpName
                    corpContactNumber
                  }
                }
              }`,
         }
       );
      this.users = res.data.data.getUsers; 
      } catch (error) {
        alert(`fetchUserData Funtion error : ${error}`);
        console.log(`fetchUserData Funtion error : ${error}`);
        throw error;
      }
      finally{
        this.getUserData();
      }
    }
  },
}
</script>
<style>
#divider{
  margin :3em;
}
#create_user_button{
  text-align: center;
}
</style>