const Module = {
    state: {
        errors: []
    },
    mutations: {
        setError(state, value) {
            state.errors.push(value);
        },
        clearErrors(state) {
            state.errors = [];
        }
    }
}

export default Module;
