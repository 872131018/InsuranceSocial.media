<template>
    <div class="eighty">
        <Month v-on:setMonth="(month) => { $emit('setMonth', month) }"></Month>
        <Year v-on:setYear="(year) => { $emit('setYear', year) }"></Year>
        <p style="clear: both">Expiration Month and Year</p>
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
