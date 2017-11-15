<template>
    <div class="w3-section">
        <div>Ratio of Commercial to Personal Business</div>
        <div class="w3-section">
            <label class="w3-show-block">% Commercial</label>
            <input class="w3-input w3-show-inline-block eighty" type="text"
                v-model="commercial"
                v-on:blur="setCommercialMix()">
            <Check v-if="isValid"></Check>
            <Cross v-else></Cross>
        </div>
        <div class="w3-section">
            <label class="w3-show-block">% Personal</label>
            <input class="w3-input w3-show-inline-block eighty" type="text"
                v-model="personal"
                v-on:blur="setPersonalMix()">
            <Check v-if="isValid"></Check>
            <Cross v-else></Cross>
        </div>
    </div>
</template>

<script>
    import Check from './inputs/Check';
    import Cross from './inputs/Cross';

    export default {
        props: {
            personal_mix: {
                type: String
            },
            commercial_mix: {
                type: String
            },
        },
        data() {
            return {
                commercial: '',
                personal: '',
                isValid: false
            }
        },
        mounted() {
            if(this.commercial_mix) {
                this.commercial = this.commercial_mix;
                this.isValid = true;
            }
            if(this.personal_mix) {
                this.personal = this.personal_mix;
                this.isValid = true;
            }
        },
        methods: {
            setCommercialMix() {
                let result = 100 - parseInt(this.commercial);
                this.personal = result.toString();
                if(this.commercial != '' && this.personal != '') {
                    this.isValid = true;
                    this.$emit('setRatio', {
                        commercial: this.commercial,
                        personal: this.personal
                    });
                }
            },
            setPersonalMix() {
                let result = 100 - parseInt(this.personal);
                this.commercial = result.toString();
                if(this.commercial != '' && this.personal != '') {
                    this.isValid = true;
                    this.$emit('setRatio', {
                        commercial: this.commercial,
                        personal: this.personal
                    });
                }
            }
        },
        components: {
            Check,
            Cross
        }
    }
</script>
