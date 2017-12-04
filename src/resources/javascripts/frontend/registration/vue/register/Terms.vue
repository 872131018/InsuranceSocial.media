<template lang="pug">
    div
        div(class="w3-padding-16 alt-checkbox sixty")
            input(class="v-align" type="checkbox" id="terms"
                v-model="checked"
                @change="$emit('setTerms', checked)")
            label(class="v-align check-box" for="terms")
            span(class="w3-large w3-margin-left") By clicking here, I agree to the #[b Insurance Social Media] Terms of Service.
        div(class="w3-section")
            button(class="w3-button w3-text-white secondary"
                @click="modal = !modal") Terms of Service
        Modal(
            v-if="modal"
            @setModal="modal = !modal")
</template>

<script>
    import Modal from './Modal';

    export default {
        data() {
            return {
                checked: false,
                modal: false
            }
        },
        components: {
            Modal
        }
    }
</script>
