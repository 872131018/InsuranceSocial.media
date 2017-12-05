<template lang="pug">
    div
        div(class="w3-card w3-padding form")
            <div style="position:relative;height:0;padding-bottom:56.25%"><iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/489addb61c1ee6c3c0/b381ae020a9f6ae2?bigPlayButton=false' style='position:absolute;width:100%;height:100%;left:0;top:0' frameborder='0' allowfullscreen></iframe></div>
            h3 Who are you?
            h5 Please complete this information so we may provide you the best service.
            Field(
                :label="'Full Name'"
                :value="name"
                :valid="nameValid"
                @setValue="(value) => $store.commit('setName', value)")
            Field(
                :label="'Email'"
                :value="email"
                :valid="emailValid"
                @setValue="(value) => $store.commit('setEmail', value)")
            Field(
                :label="'Phone (e.g. 555-555-1234)'"
                :value="phone"
                :valid="phoneValid"
                @setValue="(value) => $store.commit('setPhone', value)")
            Dropdown(
                :label="'What is your title?'"
                :options="$store.state.options.titles"
                :selected="title"
                @setValue="(value) => $store.commit('setTitle', value.code)")
            div(v-if="title.code != 'OW'")
                Field(
                    :label="'Principal Name'"
                    :value="principalName"
                    :valid="principalNameValid"
                    @setValue="(value) => $store.commit('setPrincipalName', value)")
                Field(
                    :label="'Principal Email'"
                    :value="principalEmail"
                    :valid="principalEmailValid"
                    @setValue="(value) => $store.commit('setPrincipalEmail', value)")
            Field(
                :label="'Agency Name'"
                :value="agencyName"
                :valid="agencyNameValid"
                @setValue="(value) => $store.commit('setAgencyName', value)")
            Field(
                :label="'Website'"
                :value="website"
                :valid="websiteValid"
                @setValue="(value) => $store.commit('setWebsite', value)")
            Dropdown(
                :label="'What is the size of your staff?'"
                :options="$store.state.options.sizes"
                :selected="size"
                @setValue="(value) => $store.commit('setSize', value.code)")
            Field(
                :label="'Founding Year (e.g. 19XX)'"
                :value="established"
                :valid="establishedValid"
                @setValue="(value) => $store.commit('setEstablished', value)")
            Dropdown(
                :label="'Is this a multigenerational company?'"
                :options="$store.state.options.generations"
                :selected="generation"
                @setValue="(value) => $store.commit('setGeneration', value.code)")
            Dropdown(
                :label="'How often would you like us to communicate with you?'"
                :options="$store.state.options.frequencies"
                :selected="frequency"
                @setValue="(value) => $store.commit('setFrequency', value.code)")
            Notification(
                :notifyEmail="notifyEmail"
                :notifyText="notifyText"
                @setEmail="(value) => $store.commit('setNotifyEmail', value)"
                @setText="(value) => $store.commit('setNotifyText', value)")
            Field(
                v-if="notifyText"
                :label="'Cell Phone (e.g. 555-555-1234)'"
                :value="cellphone"
                :valid="cellphoneValid"
                @setValue="(value) => $store.commit('setCellphone', value)")
            Errors(
                v-if="errors.length"
                :errors="errors")
            h5 Please continue to fill out the geographic information for your profile.
            button(class="w3-button w3-text-white primary"
                @click="update('Location')") Continue
</template>

<script>
    import QuickNavigation from '../QuickNavigation';
    import Notification from './Notification';

    export default {
        computed: {
            name() {
                return this.$store.state.user.name;
            },
            nameValid() {
                return this.name != '';
            },
            email() {
                return this.$store.state.user.email;
            },
            emailValid() {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/.test(this.email);
            },
            phone() {
                return this.$store.state.user.phone;
            },
            phoneValid() {
                return this.phone != null && this.phone.length == 12;
            },
            title() {
                if(this.$store.state.user.title_code) {
                    for(let option of this.$store.state.options.titles) {
                        if(this.$store.state.user.title_code == option.code) {
                            return option;
                        }
                    }
                } else {
                    return { code: 'DE', desc:'Options' };
                }

            },
            principalName() {
                return this.$store.state.agency.principal_name;
            },
            principalNameValid() {
                return this.principalName != null && this.principalName != '';
            },
            principalEmail() {
                return this.$store.state.agency.principal_email;
            },
            principalEmailValid() {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/.test(this.principalEmail);
            },
            agencyName() {
                return this.$store.state.agency.name;
            },
            agencyNameValid() {
                return this.agencyName != null && this.agencyName != '';
            },
            website() {
                return this.$store.state.agency.website;
            },
            websiteValid() {
                return this.website != null && this.website != '';
            },
            size() {
                if(this.$store.state.agency.size) {
                    for(let option of this.$store.state.options.sizes) {
                        if(this.$store.state.agency.size == option.code) {
                            return option;
                        }
                    }
                } else {
                    return { code: 'DE', desc:'Options' };
                }

            },
            established() {
                return this.$store.state.agency.established;
            },
            establishedValid() {
                return this.established != null && this.established.length == 4;
            },
            generation() {
                if(this.$store.state.agency.multigenerational) {
                    for(let option of this.$store.state.options.generations) {
                        if(this.$store.state.agency.multigenerational == option.code) {
                            return option;
                        }
                    }
                } else {
                    return { code: 'DE', desc:'Options' };
                }

            },
            frequency() {
                if(this.$store.state.user.notify_frequency) {
                    for(let option of this.$store.state.options.frequencies) {
                        if(this.$store.state.user.notify_frequency == option.code) {
                            return option;
                        }
                    }
                } else {
                    return { code: 'DE', desc:'Options' };
                }

            },
            notifyEmail() {
                return this.$store.state.user.notify_email;
            },
            notifyText() {
                return this.$store.state.user.notify_text;
            },
            cellphone() {
                return this.$store.state.user.cell_phone;
            },
            cellphoneValid() {
                return this.cellphone != null && this.cellphone.length == 12;
            },
            errors() {
                return this.$store.state.errors.errors;
            }
        },
        methods: {
            update() {
                this.validate();
                if(this.errors.length == 0) {
                    this.$store.commit('serviceLoading');
                    axios.post('/profile', this.$store.state.user).then(response => {
                        this.$store.commit('serviceFinished');
                        if(this.$store.state.services.loading == 0) {
                            this.$router.push({ name: 'Location' });
                        }
                    }).catch(error => {
                        this.$store.commit('serviceFinished');
                        this.$store.commit('setError', 'An error has occured, please contact support.');
                    });
                    this.$store.commit('serviceLoading');
                    axios.post('/agency', this.$store.state.agency).then(response => {
                        this.$store.commit('serviceFinished');
                        if(this.$store.state.services.loading == 0) {
                            this.$router.push({ name: 'Location' });
                        }
                    }).catch(error => {
                        this.$store.commit('serviceFinished');
                        this.$store.commit('setError', 'An error has occured, please contact support.');
                    });
                }
            },
            validate() {
                this.$store.commit('clearErrors');
                if(!this.nameValid) {
                    this.$store.commit('setError', 'You must enter your full name.');
                }
                if(!this.emailValid) {
                    this.$store.commit('setError', 'You must enter your email.');
                }
                if(!this.phoneValid) {
                    this.$store.commit('setError', 'You must enter your phone number.');
                }
                if(this.title.code == 'DE') {
                    this.$store.commit('setError', 'You must enter your title.');
                }
                if(!this.agencyNameValid) {
                    this.$store.commit('setError', 'You must enter your agency name.');
                }
                if(this.size.code == 'DE') {
                    this.$store.commit('setError', 'You must enter your agency size.');
                }
                if(!this.establishedValid) {
                    this.$store.commit('setError', 'You must enter your agency\'s founding year.');
                }
                if(this.generation.code == 'DE') {
                    this.$store.commit('setError', 'You must declare if your agency is multigenerational.');
                }
                if(this.frequency.code == 'DE') {
                    this.$store.commit('setError', 'You must enter how often you would like to be contacted.');
                }
                if(!this.notifyEmail && !this.notifyText) {
                    this.$store.commit('setError', 'You must select a notification method.');
                }
            }
        },
        components: {
            QuickNavigation,
            Notification
        }
    }
</script>
