<template>
    <div class="w3-section">
        <input class="v-align" type="checkbox" id="terms"
            v-model="checked"
            v-on:change="$emit('setTerms', checked)">
        <label class="v-align check-box" for="terms"></label>
        <span class="w3-large w3-margin-left">By clicking sign up below, you agree to the
            <b>Insurance Social Media</b>
        </span>
        <button class="w3-button w3-text-white secondary"
            v-on:click="setModal()">Terms of Service
        </button>
        <Modal v-if="modal"
            v-on:setModal="setModal()">
        </Modal>
    </div>
</template>

<script>
    import Modal from '../modal/Modal';

    export default {
        data() {
            return {
                checked: false,
                modal: false
            }
        },
        methods: {
            setModal() {
                this.modal = !this.modal;
            }
        },
        components: {
            Modal
        }
    }
</script>
