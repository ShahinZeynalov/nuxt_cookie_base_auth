<template>
  <div>
    <h2 class="text-center mt-3">Login</h2>
    <hr />
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
    <b-alert v-if="errorMessage" show variant="danger">
      {{ errorMessage }}
    </b-alert>
      </div>
    </div>
    <b-alert v-if="redirect" show>
      You have to login before accessing to
      <strong>{{ redirect }}</strong>
    </b-alert>
    <b-row align-h="center" class="pt-4 m-0">
      <b-col md="4">
        <b-card bg-variant="light">
          <!-- <busy-overlay /> -->
          <form @keydown.enter="login">
            <b-form-group label="Email">
              <b-input
                ref="email"
                v-model="formUsername"
                placeholder="email"
              />
            </b-form-group>

            <b-form-group label="Password">
              <b-input v-model="formPassword" type="password" placeholder="123" />
            </b-form-group>

            <div class="text-center">
              <b-btn variant="primary" block @click="login"> Login </b-btn>
            </div>
          </form>
          <br>
          Don't you registered? <NuxtLink to="/register">Register</NuxtLink>
        </b-card>
      </b-col>


    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  middleware: ['notAuth'],
  data() {
    return {
      formUsername: 'shahin',
      formPassword: 'password',
      error: null
    }
  },
  computed: {
    ...mapState({
      // authData: state => state.auth.authUser
    }),
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    errorMessage() {
      const { error } = this
      if (!error || typeof error === 'string') {
        return error
      }
      let msg = ''
      if (error.message) {
        msg += error.message
      }
      if (error.errors) {
        msg += `(${JSON.stringify(error.errors)
          .replace(/[{}"[\]]/g, '')
          .replace(/:/g, ': ')
          .replace(/,/g, ' ')})`
      }
      return msg
    }
  },
  methods: {
    // async login() {
    //   try {
    //     await this.$store.dispatch('authen/login', {
    //       username: this.formUsername,
    //       password: this.formPassword
    //     })
    //     this.formUsername = ''
    //     this.formPassword = ''
    //     this.error = null
    //     this.$router.push('/')
    //   } catch (e) {
    //     console.log('login error', e.message);
    //     this.error = e.message
    //   }
    // },

    login() {
      return this.$auth
        .loginWith('local', {
          credentials: 'same-orogin',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            username: this.formUsername,
            password: this.formPassword
          },
        })
        .catch((err) => {
          console.error(err)
          this.error = err.response?.data
        });
    },
  }
}
</script>

<style scoped>
.login-button {
  border: 0;
}
</style>