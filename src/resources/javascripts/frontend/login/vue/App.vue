<template>
    <div>
        <Navigation></Navigation>
        <div class="w3-container w3-padding-32 bgimg2">
            <router-view></router-view>
        </div>
        <Foot></Foot>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('App mounted.')
        }
    }
</script>
