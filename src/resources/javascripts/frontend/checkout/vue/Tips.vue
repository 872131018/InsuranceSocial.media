<template>
    <div class="w3-padding-32 w3-hide-small tips">
        <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/a09addb61c1ee6c128/b95fa49412ad6163?playerTheme=dark&amp;playerColor=' width='315' height='172' frameborder='0' allowfullscreen
            v-if="$route.path =='/plans'">
        </iframe>
        <ul class="w3-ul w3-card-2 w3-white w3-center"
            v-if="$route.path =='/payment'">
            <li class="w3-padding w3-text-white primary">
                <h6>We care about your security!</h6>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">We don’t store your credit card information.</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">We don’t store your social media account log-in information.</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">Our system is secure, and so is your account!</div>
            </li>
            <li class="w3-padding w3-text-white secondary">
                <h6>Next step: connect your social media platforms!</h6>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        //
    }
</script>
