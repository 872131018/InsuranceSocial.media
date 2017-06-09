<template>
    <ul class="w3-ul w3-section">
        <li v-for="feature in features">
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
