<template>
    <div>
        <div class="w3-card-2 dashboard">
            <div class="w3-container w3-content w3-padding">
                <div class="w3-content">
                    <div class="w3-padding w3-margin w3-text-white primary">
                        <i class="fa fa-facebook-official" style="font-size:24px"></i>
                        <span>Create post for {{ facebook_page }}</span>
                    </div>
                    <div class="w3-half">
                        <div class="w3-padding">
                            <Field
                                v-bind:label="'Link'"
                                v-on:setValue="(value) => link = value">
                            </Field>
                        </div>
                        <div class="w3-padding">
                            <File
                                v-bind:label="'Upload File'"
                                v-on:setFile="(value) => file = value">
                            </File>
                        </div>
                    </div>
                    <div class="w3-half">
                        <div class="w3-padding">
                            <Message
                                v-bind:label="'Message'"
                                v-on:setValue="(value) => message = value">
                            </Message>
                        </div>
                        <div class="w3-padding">
                            <button class="w3-button w3-text-white secondary"
                                v-on:click="post()">
                                <div style="height: 22px; width: 127px">Post</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Field from './inputs/Field';
    import Message from './inputs/Message';
    import File from './inputs/File';

    export default {
        data() {
            return {
                facebook_page: store.getState().RecentStore.facebook_page,
                message: '',
                link: '',
                file: ''
            }
        },
        methods: {
            post() {
                let form = new FormData();
                form.append('message', this.message);
                form.append('link', this.link);
                form.append('file', this.file);
                axios.post('/api/facebook/post', form);
            }
        },
        components: {
            Field,
            Message,
            File
        }
    }
</script>
