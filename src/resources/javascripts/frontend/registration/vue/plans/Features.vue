<template>
    <div class="w3-panel">
        <ul class="w3-ul">
            <li v-for="feature in features">
                <i class="fa fa-check w3-text-green"></i>
                <span>{{ feature }}</span>
            </li>
        </ul>
    </div>
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
