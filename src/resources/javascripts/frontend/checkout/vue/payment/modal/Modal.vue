<template>
    <div class="w3-modal w3-show"
        v-on:click="$emit('setModal')">
        <div class="w3-modal-content w3-card-4">
            <header class="w3-container w3-center primary">
                <h2 class="w3-text-white">Payment Success</h2>
            </header>
            <div class="w3-container">
                <div class="w3-content w3-center">
                    <p>Plan Cost: ${{ response.planCost }}</p>
                    <p v-if="response.coupon_code == 'ISMFreeTrial'">Discount: ${{ response.planCost }}</p>
                    <p v-if="response.amount_charged != 1">Total Charged: ${{ response.amount_charged }}<p>
                        <p v-if="response.amount_charged == 1">Total Charged: $0.00<p>
                    <p v-if="response.coupon_code == 'ISMFreeTrial'">Total: $0.00</p>
                    <p>Transaction ID: {{ response.transactionId }}</p>
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
