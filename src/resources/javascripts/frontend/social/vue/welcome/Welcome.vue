<template>
    <div>
        <ProgressBar
            v-bind:progress="33">
        </ProgressBar>
        <div class="w3-container w3-card-2 form">
            <div class="w3-panel">
                <h3>Welcome to Insurance Social Media.</h3>
                <h5>We have prepared a video to help you understand the benefits of your subscription.</h5>
            </div>
            <div class="w3-panel">
                <Introduction></Introduction>
            </div>
            <div class="w3-panel">
                <h5>Click continue to complete setup.</h5>
                <button class="w3-button w3-text-white primary"
                    v-on:click="update()">Continue
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import ProgressBar from '../Progress';
    import Introduction from './Introduction';

    export default {
        methods: {
            update() {
                this.$router.push({ name: 'Facebook' });
            }
        },
        components: {
            ProgressBar,
            Introduction
        }
    }
</script>
