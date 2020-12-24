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
                <b-nav-item v-if='!this.$store.state.auth.authUser' to='/login'>Login</b-nav-item>
                <b-nav-item v-if='!this.$store.state.auth.authUser' to='/register'>Register</b-nav-item>
                <b-nav-item  v-if='this.$store.state.auth.authUser'>{{ this.$store.state.auth.authUser.username }}</b-nav-item>
                <b-nav-item v-if='this.$store.state.auth.authUser' @click="logoutAction()" >Logout</b-nav-item>
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
            logout: 'auth/logout'
        }),
        async logoutAction() {
            const response = await this.logout()
            this.$router.push('/login')

        }
    }
}
</script>