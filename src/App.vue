<template>
  <div id="app">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
      :color="color"
      :width="150"
      :height="128"
    ></loading>
    <!--Main Navigation-->
    <header>
      <nav class="navbar fixed-top navbar-expand-lg navbar-dark pink scrolling-navbar">
        <a class="navbar-brand" href="https://nirab.dev" target="_blank">
          <strong>Nirab.dev</strong>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav nav-flex-icons">
            <li class="nav-item">
              <a href="https://facebook.com/istiaq.nirab.1" class="nav-link" target="_blank">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li class="nav-item">
              <a href="https://twitter.com/AhmmedNirab" class="nav-link" target="_blank">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li class="nav-item">
              <a href="https://github.com/IANirab" class="nav-link" target="_blank">
                <i class="fab fa-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!--Main Navigation-->

    <section>
      <div class="container">
        <div class="card">
          <div class="card card-body">
            <div style="margin-left:-5px;" class="row">
              <button
                type="button"
                class="btn btn-success"
                data-toggle="modal"
                data-target="#basicExampleModal"
                @click="model"
              >Create</button>
            </div>
            <table class="table">
              <thead class="black white-text">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Website</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user['.key']">
                  <th scope="row">{{ user.name }}</th>
                  <td>{{ user.age }}</td>
                  <td>{{ user.website }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      data-toggle="modal"
                      data-target="#baseEditModal"
                      @click="editForm(user)"
                    >Edit</button>
                    <button @click="remove(user)" type="button" class="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    <!-- Create Modal -->
    <div
      class="modal fade"
      id="basicExampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h4 class="modal-title w-100 font-weight-bold">Register Your Info</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body mx-3">
            <span class="badge badge-danger" role="alert">{{ this.error }}</span>
            <span class="badge badge-success" role="alert">{{ this.success }}</span>
            <br />
            <div class="mb-5">
              <label for="name">Your Name</label>
              <input type="text" id="name" class="form-control" v-model="name" />
            </div>

            <div class="mb-5">
              <label for="age">Your Age</label>
              <input type="number" id="age" class="form-control" v-model="age" />
            </div>

            <div class="mb-5">
              <label for="name">Your Website</label>
              <input type="text" id="website" class="form-control" v-model="website" />
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button @click="register" class="btn btn-default">Register</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      class="modal fade"
      id="baseEditModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h4 class="modal-title w-100 font-weight-bold">Update This Info</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body mx-3">
            <span class="badge badge-danger" role="alert">{{ this.error }}</span>
            <span class="badge badge-success" role="alert">{{ this.success }}</span>
            <br />
            <div class="mb-5">
              <label for="name">Your Name</label>
              <input type="text" id="name" class="form-control" v-model="name" />
            </div>

            <div class="mb-5">
              <label for="age">Your Age</label>
              <input type="number" id="age" class="form-control" v-model="age" />
            </div>

            <div class="mb-5">
              <label for="name">Your Website</label>
              <input type="text" id="website" class="form-control" v-model="website" />
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button @click="update()" class="btn btn-default">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { app, db } from "./firebase-config";
import VuejsDialogMixin from "vuejs-dialog/dist/vuejs-dialog-mixin.min.js";
var usersRef = db.ref("users");
export default {
  name: "app",
  data() {
    return {
      users: [],
      name: "",
      age: "",
      website: "",
      error: "",
      success: "",
      user: "",
      isLoading: true,
      fullPage: true,
      color: "#e91e63"
    };
  },
  firebase: {
    users: {
      source: usersRef
    }
  },
  components: {
    Loading
  },
  methods: {
    editForm(user) {
      this.name = user["name"];
      this.age = user["age"];
      this.website = user["website"];
      (this.user = user), (this.error = ""), (this.success = "");
    },
    update() {
      if (this.name == "") {
        this.error = "Name is Required";
        return;
      }
      if (this.age == "") {
        this.error = "Age is Required";
        return;
      }
      if (this.website == "") {
        this.error = "Website is Required";
        return;
      }
      usersRef.child(this.user[".key"]).update({
        name: this.name,
        age: this.age,
        website: this.website
      });
      this.success = "Information Updated SuccessFully !!";
    },
    remove(user) {
      this.$dialog
        .confirm("Are You Sure to Delete it ??")
        .then(function(dialog) {
          usersRef.child(user[".key"]).remove();
        })
        .catch(function() {
          console.log("Clicked on cancel");
        });
    },
    register() {
      if (this.name == "") {
        this.error = "Name is Required";
        return;
      }
      if (this.age == "") {
        this.error = "Age is Required";
        return;
      }
      if (this.website == "") {
        this.error = "Website is Required";
        return;
      }
      usersRef.push({
        name: this.name,
        age: this.age,
        website: this.website
      });
      (this.name = ""),
        (this.age = ""),
        (this.website = ""),
        (this.success = "Information Registered SuccessFully !!");
    },
    model() {
      this.success = "";
    }
  },
  created() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
};
</script>

<style>
</style>
