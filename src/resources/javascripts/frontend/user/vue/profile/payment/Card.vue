<template lang="pug">
    div
        img(class="w3-show-block" src="/images/credit-card-icon-set.png")
        input(class="w3-input w3-show-inline-block" type="text"
            :value="value"
            @keyup="$emit('setValue', $event.target.value)")
        label(class="w3-show-block") Card Number
        span(class="w3-small") Accepted payment forms are Visa, Mastercard, Discover, and American Express
</template>

<script>
    export default {
        props: {
            value: {
                type: String
            }
        }
    }
</script>
