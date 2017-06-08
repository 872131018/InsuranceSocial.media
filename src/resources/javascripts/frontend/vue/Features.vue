<template>
    <ul class="w3-ul">
        <li class="w3-padding-16"
            v-for="feature in features">
            <i class="fa fa-check w3-margin-right w3-text-green"></i>{{ feature }}
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            features: {
                type: Array
            }
        }
    }
</script>
