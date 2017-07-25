<template>
    <div>
        <Navigation></Navigation>
        <Tips></Tips>
        <div class="w3-container w3-padding-32 bgimg2">
            <router-view></router-view>
        </div>
        <Foot></Foot>
    </div>
</template>

<script>
    import Tips from './Tips';

    export default {
        mounted() {
            console.log('App mounted.')
        },
        components: {
            Tips
        }
    }
</script>
