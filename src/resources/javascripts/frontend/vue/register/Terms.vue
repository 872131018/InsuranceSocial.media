<template>
    <div class="w3-section">
        <input type="checkbox" id="terms"  v-model:checked="checked">
        <label for="terms" class="check-box"></label>
        <span class="w3-large w3-margin-left">Terms of Service</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                checked: false,
                copy: 'I Don\'t Agree'
            }
        },
        methods: {
            //
        }
    }
</script>
