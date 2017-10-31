<template>
    <div class="w3-modal w3-show"
        v-on:click="$emit('setModal')">
        <div class="w3-modal-content w3-card-4">
            <header class="w3-container w3-center w3-red">
                <h2 class="w3-text-white">This page has expired.</h2>
            </header>
            <div class="w3-container">
                <div class="w3-content w3-center">
                    <p>If you reached this page, your payment session has expired.</p>
                    <p>We believe that you have already completed this step of the registration process, if you used your browser's back function to get here, please go forward and continue the process.</p>
                    <p>If you are recieving this message and you do not believe your payment method is correct, please contact support</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            response: {
                type: Object
            }
        }
    }
</script>
