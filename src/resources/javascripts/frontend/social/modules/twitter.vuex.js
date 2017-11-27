const Module = {
    state: {
        has: false
    },
    mutations: {
        setTwitter(state, value) {
            state.has = value;
        },
    }
}

export default Module;
