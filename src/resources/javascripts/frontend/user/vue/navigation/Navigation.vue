<template lang="pug">
    div
        nav(class="w3-bar w3-xlarge w3-text-white primary header")
            div(class="w3-hide-small")
                Desktop(
                    :selected="selected"
                    @showMenu="(value) => $store.commit('setMenu', value)")
            div(class="w3-hide-medium w3-hide-large")
                Mobile
        nav(class="w3-bar w3-xlarge w3-text-white primary")
            SubReports(
                v-if="selected == 'reports'")
            SubSocialMedia(
                v-if="selected == 'socialMedia'"
                @showSubMenu="(value) => $store.commit('setSubMenu', value)")
            SubTools(
                v-if="selected == 'tools'")
            SubProfile(
                v-if="selected == 'profile'")
        nav(class="w3-bar w3-xlarge w3-text-white primary")
            LinkedInActions(
                v-if="selectedSub == 'linkedin'")
            TwitterActions(
                v-if="selectedSub == 'twitter'")
            FacebookActions(
                v-if="selectedSub == 'facebook'")
</template>

<script>
    import Desktop from './Desktop';
    import Mobile from './Mobile';
    import SubReports from './SubReports';
    import SubTools from './SubTools';
    import SubProfile from './SubProfile';
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
            }
        },
        components: {
            Desktop,
            Mobile,
            SubReports,
            SubTools,
            SubProfile,
            SubSocialMedia,
            LinkedInActions,
            TwitterActions,
            FacebookActions
        }
    }
</script>
