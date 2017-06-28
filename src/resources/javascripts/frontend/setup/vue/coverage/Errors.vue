<template>
    <div class="w3-panel">
        <ul class="w3-ul"
            v-if="errors.length">
            <li class="w3-text-red"
                v-for="error in errors">{{ error }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            errors: {
                type: Array
            }
        }
    }
</script>
