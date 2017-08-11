<template>
    <div class="w3-padding-32 w3-hide-small tips">
        <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/a49ad8b41c1ce6c12c/ac167611861914e3?playerTheme=dark&amp;playerColor=' width='315' height='172' frameborder='0' allowfullscreen
            v-if="$route.path =='/profile'">
        </iframe>
        <ul class="w3-ul w3-card-2 w3-white w3-center"
            v-if="$route.path =='/location'">
            <li class="w3-padding w3-text-white primary">
                <h6><b>Why you'll <em>love</em> Insurance Social Media...</b></h6>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">Geography matters!</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">We will post about your local area, so your followers know that you’re an invested member of your community.</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">We will post about your target market areas so your current and potential customers know you understand their unique risks and challenges.</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">It’s our goal to show your followers that you’re a knowledgeable, trustworthy, invested member of the community. Choose one or more marketing regions so we can post just the right content for your followers in those areas.</div>
            </li>
            <li class="w3-padding w3-text-white secondary">
                <h6>Join Insurance Social Media and get started today!</h6>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        //
    }
</script>
