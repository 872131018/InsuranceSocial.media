<template>
    <div class="w3-section">
        <table class="w3-table">
            <tr>
                <th>Plan Description</th>
                <th>Price</th>
            </tr>
            <tr>
                <td>{{ plan.name }}</td>
                <td>{{ plan.price }}</td>
            </tr>
            <tr>
                <td>Discount</td>
                <td>{{ reduction }}</td>
            </tr>
            <tr>
                <td>Total:</td>
                <td>{{ getTotal() }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: {
            plan: {
                type: Object
            },
            reduction: {
                type: String
            }
        },
        methods: {
            getTotal() {
                const total = parseInt(this.plan.price) - parseInt(this.reduction);
                return total.toFixed(2).toString();
            }
        }
    }
</script>
