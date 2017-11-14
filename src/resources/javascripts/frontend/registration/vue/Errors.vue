<template lang="pug">
    ul(class="w3-ul w3-text-red")
        li(
            v-for="error in errors") {{ error }}
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
