<template>
    <nav class="w3-container w3-bar w3-card-2 w3-xlarge w3-text-white w3-padding-32 primary header-logo">
        <div class="w3-hide-small">
            <Desktop></Desktop>
        </div>
        <div class="w3-hide-medium w3-hide-large">
            <Mobile></Mobile>
        </div>
    </nav>
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
