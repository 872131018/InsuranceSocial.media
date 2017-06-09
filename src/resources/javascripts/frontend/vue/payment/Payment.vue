<template>
    <div class="w3-container w3-card-2 form">
        <div class="w3-container w3-margin">
            <h3>Payment Methods</h3>
            <h5>Enter a payment method as the last step in registration</h5>
        </div>
        <div class="w3-container w3-margin">
            <table class="w3-table">
                <tr>
                    <th>Plan Description</th>
                    <th>Price</th>
                </tr>
                <tr>
                    <td>{{ plan }}</td>
                    <td>{{ price }}</td>
                </tr>
                <tr>
                    <td>Discount</td>
                    <td>{{ discount }}</td>
                </tr>
            </table>
        </div>
        <div class="w3-container w3-margin">
            <input class="w3-input w3-show-inline-block" type="text" style="width:80%"
                v-model="code">
            <button class="w3-button w3-text-white secondary"
                v-on:click="discount()">Apply
            </button>
            <label class="w3-show-block">Apply discount code</label>
        </div>
        <div class="w3-container w3-margin">
            <h3>Payment Information</h3>
            <h5>Visa, Mastercard, American Express</h5>
            <input class="w3-input" type="text"
                v-model="number">
            <label>Card Number</label>
            <select class="w3-select"
                v-model="month">
                <option value="" disabled selected>Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <input class="w3-input" type="text"
                v-model="year">
             <label>Year</label>
             <input class="w3-input" type="text"
                 v-model="name">
              <label>Cardholder Name</label>
        </div>
        <div class="w3-container w3-margin">
            <h5 class="w3-large">We look forward to working with you. Please click register to finish setting up your account.</h5>
            <button class="w3-button w3-text-white primary"
                v-on:click="update()">Complete
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                plan: '',
                price: '',
                code: '',
                discount: '',
                number: '',
                month: '',
                year: '',
                name: ''
            }
        },
        mounted() {
            axios.get(window.location).then(response => {
                this.plan = store.getState().UserStore.plan;
                this.price = response.data[this.plan];
            });
        },
        methods: {
            update() {
                //
            },
            discount() {

            }
        },
        components: {
            //
        }
    }
</script>
