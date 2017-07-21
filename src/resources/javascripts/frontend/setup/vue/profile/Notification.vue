<template>
    <div class="w3-section">
        <span class="w3-large">Notification Method: </span>
        <div class="w3-show-inline-block w3-margin-left">
            <input type="checkbox" id="check1"
                v-model="email"
                v-on:change="$emit('setEmail', email)">
            <label for="check1">
                <span class="w3-show-inline-block w3-margin-right v-align"></span>Email
            </label>
        </div>
        <div class="w3-show-inline-block w3-margin-left">
            <input type="checkbox" id="check2"
                v-model="text"
                v-on:change="$emit('setText', text)">
            <label for="check2">
                <span class="w3-show-inline-block w3-margin-right v-align"></span>Text
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            notify_email: {
                type: Number
            },
            notify_text: {
                type: Number
            }
        },
        data() {
            return {
                email: false,
                text: false
            }
        },
        mounted() {
            if(typeof(this.notify_email) != undefined) {
                this.email = this.notify_email;
            }
            if(typeof(this.notify_text) != undefined) {
                this.text = this.notify_text;
            }
        }
    }
</script>
