<template lang="pug">
    nav(class="w3-bar w3-xlarge w3-text-white primary header")
        div(class="w3-hide-small")
            Desktop
        div(class="w3-hide-medium w3-hide-large")
            Mobile
</template>

<script>
    import Desktop from './Desktop';
    import Mobile from './Mobile';

    export default {
        components: {
            Desktop,
            Mobile
        }
    }
</script>
