<template>
    <div class="w3-modal w3-show"
        v-on:click="$emit('setModal')">
        <div class="w3-modal-content w3-card-4">
            <header class="w3-container w3-center primary">
                <h2 class="w3-text-white">Payment Success</h2>
            </header>
            <div class="w3-container">
                <div class="w3-content">
                    Amount: {{ response.amount }}<br>
                    Transaction ID: {{ response.transactionId }}<br>
                    Authorization Code: {{ response.auth_code }}
                </div>
            </div>
            <footer class="w3-container w3-text-white primary">
                <p class="w3-center">Click anywhere to continue and configure your social media accounts</p>
            </footer>
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
