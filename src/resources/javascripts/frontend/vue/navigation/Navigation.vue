<template>
    <div class="w3-top w3-bar w3-card-2 w3-xlarge w3-text-white primary">
        <div class="w3-hide-small">
            <Desktop></Desktop>
        </div>
        <div class="w3-hide-medium w3-hide-large">
            <Mobile></Mobile>
        </div>
    </div>
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
