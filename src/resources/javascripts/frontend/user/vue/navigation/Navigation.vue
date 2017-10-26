<template>
    <div>
        <nav class="w3-container w3-bar w3-card-2 w3-xlarge w3-text-white primary header">
            <div class="w3-hide-small">
                <Desktop
                    v-on:showReports="showReports()"
                    v-on:showSocialMedia="showSocialMedia()"
                    v-on:showTools="showTools()"
                    v-on:showHome="showHome()"
                    v-bind:selected="selected">
                </Desktop>
            </div>
            <div class="w3-hide-medium w3-hide-large">
                <Mobile></Mobile>
            </div>
        </nav>
        <nav class="w3-container w3-bar w3-xlarge w3-text-white primary">
            <SubReports
                v-if="reports">
            </SubReports>
            <SubSocialMedia
                v-if="socialMedia"
                v-on:showLinkedInActions="showLinkedInActions()"
                v-on:showTwitterActions="showTwitterActions()"
                v-on:showFacebookActions="showFacebookActions()">
            </SubSocialMedia>
            <SubTools
                v-if="tools">
            </SubTools>
        </nav>
        <nav class="w3-container w3-bar w3-xlarge w3-text-white primary">
            <LinkedInActions
                v-if="linkedInActions">
            </LinkedInActions>
            <TwitterActions
                v-if="twitterActions">
            </TwitterActions>
            <FacebookActions
                v-if="facebookActions">
            </FacebookActions>
        </nav>
    </div>
</template>

<script>
    import Desktop from './Desktop';
    import Mobile from './Mobile';
    import SubReports from './SubReports';
    import SubTools from './SubTools';
    import SubSocialMedia from './SubSocialMedia';
    import LinkedInActions from './LinkedInActions';
    import TwitterActions from './TwitterActions';
    import FacebookActions from './FacebookActions';

    export default {
        data() {
            return {
                reports: false,
                socialMedia: false,
                tools: false,
                linkedInActions: false,
                twitterActions: false,
                facebookActions: false,
                selected: 'home'
            }
        },
        methods: {
            showReports() {
                this.reports = !this.reports;
                this.socialMedia = false;
                this.tools = false;
                this.selected = 'reports';
            },
            showSocialMedia() {
                this.reports = false;
                this.socialMedia = !this.socialMedia;
                this.tools = false;
                this.selected = 'social';
            },
            showTools() {
                this.reports = false;
                this.socialMedia = false;
                this.tools = !this.tools;
                this.selected = 'tools';
            },
            showHome() {
                this.reports = false;
                this.socialMedia = false;
                this.tools = false;
                this.selected = 'home';
                this.$router.push({ name: 'Recent' });
            },
            showLinkedInActions() {
                this.linkedInActions = !this.linkedInActions;
                this.twitterActions = false;
                this.facebookActions = false;
            },
            showTwitterActions() {
                this.linkedInActions = false;
                this.twitterActions = !this.twitterActions;
                this.facebookActions = false;
            },
            showFacebookActions() {
                this.linkedInActions = false;
                this.twitterActions = false;
                this.facebookActions = !this.facebookActions;
            }
        },
        components: {
            Desktop,
            Mobile,
            SubReports,
            SubTools,
            SubSocialMedia,
            LinkedInActions,
            TwitterActions,
            FacebookActions
        }
    }
</script>
