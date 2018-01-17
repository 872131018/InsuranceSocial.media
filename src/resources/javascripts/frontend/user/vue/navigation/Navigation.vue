<template lang="pug">
    div
        nav(class="w3-bar w3-xlarge w3-text-white primary header")
            div(class="w3-hide-small")
                div(class="w3-right w3-medium" style="position:absolute;right:5%;top:10px")
                    a(href="/logout") Log out
                div(class="w3-right w3-medium" style="position:absolute;right:10%;top:10px") Welcome back {{ name }}
                Desktop(
                    :selected="selected"
                    @showMenu="(value) => $store.commit('setMenu', value)")
            div(class="w3-hide-medium w3-hide-large")
                Mobile
        nav(class="w3-bar w3-xlarge w3-text-white primary")
            SubReports(
                v-if="selected == 'reports'"
                :selected="route"
                @setRoute="(value) => $store.commit('setRoute', value)")
            SubSocialMedia(
                v-if="selected == 'socialMedia'"
                :selected="route"
                @setRoute="(value) => $store.commit('setRoute', value)"
                @showSubMenu="(value) => $store.commit('setSubMenu', value)")
            SubTools(
                v-if="selected == 'tools'"
                :selected="route"
                @setRoute="(value) => $store.commit('setRoute', value)")
            SubProfile(
                v-if="selected == 'profile'"
                :selected="route"
                @setRoute="(value) => $store.commit('setRoute', value)")
            SubAccount(
                v-if="selected == 'account'"
                :selected="route"
                @setRoute="(value) => $store.commit('setRoute', value)")
        nav(class="w3-bar w3-xlarge w3-text-white primary")
            LinkedInActions(
                v-if="selectedSub == 'linkedin'"
                :selected="route"
                @setRoute="(value) => $store.commit('setRoute', value)")
            TwitterActions(
                v-if="selectedSub == 'twitter'"
                :selected="route"
                @setRoute="(value) => $store.commit('setRoute', value)")
            FacebookActions(
                v-if="selectedSub == 'facebook'"
                :selected="route"
                @setRoute="(value) => $store.commit('setRoute', value)")
</template>

<script>
    import Desktop from './Desktop';
    import Mobile from './Mobile';
    import SubReports from './SubReports';
    import SubTools from './SubTools';
    import SubProfile from './SubProfile';
    import SubAccount from './SubAccount';
    import SubSocialMedia from './SubSocialMedia';
    import LinkedInActions from './LinkedInActions';
    import TwitterActions from './TwitterActions';
    import FacebookActions from './FacebookActions';

    export default {
        computed: {
            selected() {
                return this.$store.state.navigation.menu;
            },
            selectedSub() {
                return this.$store.state.navigation.subMenu;
            },
            route() {
                return this.$store.state.navigation.route;
            },
            name() {
                return this.$store.state.user.name;
            }
        },
        components: {
            Desktop,
            Mobile,
            SubReports,
            SubTools,
            SubProfile,
            SubAccount,
            SubSocialMedia,
            LinkedInActions,
            TwitterActions,
            FacebookActions
        }
    }
</script>
