<template lang="pug">
    div
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :to="{ name: 'Payment' }") Payment
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :to="{ name: 'Outreach' }") Outreach
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :to="{ name: 'Coverages' }") Coverages
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :to="{ name: 'Location' }") Location
        router-link(class="w3-bar-item w3-hover-white w3-right sub-header-link"
            :to="{ name: 'Agency' }") Agency
        div(class="w3-bar-item w3-right sub-header-link") Edit Profile:
</template>

<script>
    export default {
        //
    }
</script>
