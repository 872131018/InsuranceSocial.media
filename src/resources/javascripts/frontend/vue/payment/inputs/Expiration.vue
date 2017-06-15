<template>
    <div class="w3-section eighty">
        <Month v-on:setMonth="(month) => { $emit('setMonth', month) }"></Month>
        <Year v-on:setYear="(year) => { $emit('setYear', year) }"></Year>
        <span>Expiration Month and Year</span>
    </div>
</template>

<script>
    import Month from './Month';
    import Year from './Year';

    export default {
        components: {
            Month,
            Year
        }
    }
</script>
