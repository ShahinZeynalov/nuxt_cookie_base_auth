<template>
    <div>
        <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand >🤪 wonder world</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item v-if='this.$store.state.auth.user' to='/'>Wonder Page</b-nav-item>
            </b-navbar-nav>
            
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-if='!this.$auth.loggedIn' to='/login'>Login</b-nav-item>
                <b-nav-item v-if='!this.$auth.loggedIn' to='/register'>Register</b-nav-item>
                <b-nav-item v-if='this.$auth.loggedIn'>{{ this.$store.state.auth.authUser.username }}</b-nav-item>
                <b-nav-item v-if='this.$auth.loggedIn' @click="logoutAction()" >Logout</b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        </div>
    </div>
</template>
<script>

import { mapActions } from 'vuex';

export default {
    data() {
        return {

        }
    },
    computed: {
    },
    methods: {
        ...mapActions({
            // logout: 'auth/logout'
        }),
        async logoutAction() {
            const response = await this.$auth.logout()
            this.$router.push('/login')

        }
    }
}
</script>