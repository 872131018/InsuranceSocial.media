<template>
    <div class="bgimg">
        <form class="w3-container w3-card-4 w3-light-grey login-form">
            <p>
                <input class="w3-input" type="text" style="width:90%" required>
                <label>Name</label>
            </p>
            <p>
                <input class="w3-input" type="password" style="width:90%" required>
                <label>Password</label>
            </p>
            <p>
                <input id="milk" class="w3-check" type="checkbox" checked="checked">
                <label>Stay logged in</label>
            </p>
            <p>
                <button class="w3-button w3-section w3-teal w3-ripple"> Log in </button>
            </p>
        </form>
    </div>
</template>

<script>
    export default {
        components: {
            //
        }
    }
</script>
