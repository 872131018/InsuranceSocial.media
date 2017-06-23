<template>
    <div class="w3-section">
        <div class="w3-dropdown-hover">
            <button class="w3-button">{{ selected.title }}
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="w3-dropdown-content w3-bar-block w3-border">
                <div class="w3-bar-item w3-button"
                    v-for="title in titles"
                    v-on:click="setTitle(title)">{{ title.title }}
                </div>
            </div>
        </div>
        <div>What is your title?</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                titles: [
                    {
                        title: 'Owner'
                    },
                    {
                        title: 'Operations Manager'
                    },
                    {
                        title: 'Marketing Manager'
                    },
                    {
                        title: 'Principle'
                    },
                    {
                        title: 'Sales Manager'
                    },
                    {
                        title: 'Other'
                    }
                ],
                selected: {
                    title: 'Title'
                }
            }
        },
        methods: {
            setTitle(title) {
                this.selected = title;
                this.$emit('setTitle', title);
            }
        }
    }
</script>
