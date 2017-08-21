<template>
    <div class="w3-padding-32 w3-hide-small tips">
        <ul class="w3-ul w3-card-2 w3-white w3-center"
            v-if="$route.path =='/facebook'">
            <li class="w3-padding w3-text-white primary">
                <h6>Make Facebook work for you!</h6>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">Connecting your Facebook account is simplest if you’re already logged in to it.</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">We’ll need you to enter your password to connect your Facebook account to our system, but don’t worry: our platform is secure, and we don’t store that information!</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">We won’t post to your personal Facebook account, either. This is just a one-time step you need to take to allow us to post to your corporate Facebook page.</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">Don’t have a corporate Facebook page? We’ll set one up for you!</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">Need help? Click the chat box below!</div>
            </li>
            <li class="w3-padding w3-text-white secondary">
                <h6>Next step: connect your Twitter account!</h6>
            </li>
        </ul>
        <ul class="w3-ul w3-card-2 w3-white w3-center"
            v-if="$route.path =='/twitter'">
            <li class="w3-padding w3-text-white primary">
                <h6>The power of Twitter</h6>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">Why use Twitter? It has 320 million users—and the largest user group is millennials (36% of US internet users!).</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">66% of Twitter users have discovered a new small-to-medium-sized business on Twitter.</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">94% plan to purchase from an SMB they follow.</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">75% of Twitter users say they feel better about an SMB after reading its tweets.</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">Need help? Click the chat box below!</div>
            </li>
            <li class="w3-padding w3-text-white secondary">
                <h6>Social media connection complete!</h6>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        //
    }
</script>
