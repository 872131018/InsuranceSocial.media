<template>
    <div class="w3-section">
        <img v-bind:src="cardImage">
        <input class="w3-input w3-show-inline-block eighty" type="text"
            v-model="card"
            v-on:keyup="$emit('setCard', card)">
        <label class="w3-show-block">Card Number</label>
        <span class="w3-small">Accepted payment forms are Visa, Mastercard, Discover, and American Express</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                card: '',
                cardImage: `${ window.base_url }/images/credit-card-icon-set.png`
            }
        }
    }
</script>
