<template>
  <div>
    <h2 class="text-center mt-3">Register</h2>
    <hr />
      <div class="row d-flex justify-content-center">
      <div class="col-4 col-sm-12 col-md-4">
        <b-alert v-if="errorMessage" show variant="danger">
          {{ errorMessage }}
        </b-alert>
      </div>
    </div>

    <b-row align-h="center" class="pt-4 m-0">
      <b-col md="4">
        <b-card bg-variant="light">
          <!-- <busy-overlay /> -->
          <form @keydown.enter="login">
            <b-form-group label="username">
              <b-input
                ref="username"
                v-model="formUsername"
                placeholder="username"
              />
            </b-form-group>

            <b-form-group label="Password">
              <b-input v-model="formPassword" type="password" placeholder="123" />
            </b-form-group>
            <b-form-group label="Confirm Password">
              <b-input v-model="formPassword" type="password" placeholder="123" />
            </b-form-group>

            <div class="text-center">
              <b-btn variant="primary" block @click='register()' > Register </b-btn>
            </div>
          </form>
          <br>
          Do you have an account? <NuxtLink to="/login">Login</NuxtLink>
        </b-card>
      </b-col>


    </b-row>
  </div>
</template>

<script>
export default {
  middleware: ['notAuth'],
  data() {
    return {
      formUsername: 'username',
      formPassword: 'string',
      error: null
    }
  },
  computed: {

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

    async register() {
      try {
        await this.$store.dispatch('auth/register', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.error = null
        this.$router.push('login')
      } catch (e) {
        console.log('login error', e.message);
        this.error = e.message
      }
    },
  }
}
</script>

<style scoped>
.login-button {
  border: 0;
}
</style>