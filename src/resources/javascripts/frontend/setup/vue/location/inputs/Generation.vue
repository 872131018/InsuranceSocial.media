<template>
    <div class="w3-section">
        <div class="w3-dropdown-hover">
            <button class="w3-button">{{ selected.generation }}
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="w3-dropdown-content w3-bar-block w3-border">
                <div class="w3-bar-item w3-button"
                    v-for="generation in generations"
                    v-on:click="setGeneration(generation)">{{ generation.generation }}
                </div>
            </div>
        </div>
        <div>Is this a multigenerational company?</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                generations: [
                    {
                        generation: '1st'
                    },
                    {
                        generation: '2nd'
                    },
                    {
                        generation: '3rd'
                    },
                    {
                        generation: '4th'
                    },
                    {
                        generation: '5th'
                    }
                ],
                selected: {
                    generation: 'Generation'
                }
            }
        },
        methods: {
            setGeneration(generation) {
                this.selected = generation;
                this.$emit('setGeneration', generation);
            }
        }
    }
</script>
