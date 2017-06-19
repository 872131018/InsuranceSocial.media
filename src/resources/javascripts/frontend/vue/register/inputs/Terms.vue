<template>
    <div class="w3-section">
        <div class="w3-panel">
            <input class="v-align" type="checkbox" id="terms"
                v-model="checked"
                v-on:change="$emit('setTerms', checked)">
            <label class="v-align check-box" for="terms"></label>
            <span class="w3-large w3-margin-left">By clicking sign up below, you agree to the
                <b>Insurance Social Media</b> Terms of Service.
            </span>
        </div>
        <div class="w3-panel">
            <button class="w3-button w3-text-white secondary"
                v-on:click="() => { modal = !modal }">Terms of Service
            </button>
        </div>
        <Modal
            v-if="modal"
            v-on:setModal="() => { modal = !modal }">
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
        components: {
            Modal
        }
    }
</script>
