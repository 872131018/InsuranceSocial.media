<template>
    <div class="w3-padding-32 w3-hide-small tips">
        <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/489addb61c1ee6c3c0/b381ae020a9f6ae2?playerTheme=dark&amp;playerColor=' width='315' height='172' frameborder='0' allowfullscreen
            v-if="$route.path =='/profile'">
        </iframe>
        <ul class="w3-ul w3-card-2 w3-white w3-center"
            v-if="$route.path =='/location'">
            <li class="w3-padding w3-text-white primary">
                <h6>The power of the profile</h6>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">Where you are matters!</div>
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
                <h6>Your profile determines your social media content!</h6>
            </li>
        </ul>
        <ul class="w3-ul w3-card-2 w3-white w3-center"
            v-if="$route.path =='/coverage'">
            <li class="w3-padding w3-text-white primary">
                <h6>The power of the profile</h6>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">This section is the heart of your profile.</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">The coverages you write will impact the social media content we post for you.</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">Do you write business lines? Our industry-focused content will show off your expertise to current and future clients.</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">Interested in seeing more carriers added to our system? Send your request to support@insurancesocial.media.</div>
            </li>
            <li class="w3-padding w3-text-white secondary">
                <h6>Your profile determines your social media content!</h6>
            </li>
        </ul>
        <ul class="w3-ul w3-card-2 w3-white w3-center"
            v-if="$route.path =='/outreach'">
            <li class="w3-padding w3-text-white primary">
                <h6>The power of the profile</h6>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">What tone do you want for your social media content?</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">Do you want to include insurance humor?</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">Do you want to recognize national holidays?</div>
            </li>
            <li class="w3-padding">
                <div class="w3-panel">Note any causes your agency supports—it will help your followers get to know you better!</div>
            </li>
            <li class="w3-padding w3-text-white secondary">
                <h6>Your profile determines your social media content!</h6>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        //
    }
</script>
