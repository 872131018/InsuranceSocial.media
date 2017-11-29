const Module = {
    state: {
        loading: 0
    },
    mutations: {
        serviceLoading(state) {
            state.loading++;
        },
        serviceFinished(state) {
            state.loading--;
        }
    }
}

export default Module;
