<template>
    <div class="w3-modal w3-show"
        v-on:click="$emit('setModal')">
        <div class="w3-modal-content w3-card-4">
            <header class="w3-container w3-center primary">
                <h2 class="w3-text-white">Attention</h2>
            </header>
            <div class="w3-container">
                <div class="w3-content w3-center"
                    v-if="personal_coverage">
                    <p>You haven't selected any personal coverages, would you like to use our core coverages?</p>
                    <p>The core coverages are as follows:</p>
                    <p>Condo Insurance</p>
                    <p>Homeowners Insurance</p>
                    <p>Renters Insurance</p>
                </div>
                <div class="w3-content w3-center"
                    v-if="commercial_coverage">
                    <p>You haven't selected any commercial coverages, would you like to use our core coverages?</p>
                    <p>The core coverages are as follows:</p>
                    <p>Business Owner's Policy</p>
                    <p>General Liability Insurance</p>
                    <p>Commercial Property Insurance</p>
                </div>
                <div class="w3-content w3-center"
                    v-if="benefit_coverage">
                    <p>You haven't selected any benefits, would you like to use our core coverages?</p>
                    <p>The core coverages are as follows:</p>
                </div>
            </div>
            <footer class="w3-container w3-text-white primary">
                <p class="w3-center">By continuing you accept these coverages. They can be changed at a later time.</p>
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            personal_coverage: {
                type: String
            },
            commercial_coverage: {
                type: String
            },
            benefit_coverage: {
                type: String
            }
        }
    }
</script>
