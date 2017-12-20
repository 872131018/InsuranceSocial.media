const Module = {
    state: {
        apiLoginID: '',
        clientKey: ''
    },
    mutations: {
        setAuthorize(state, value) {
            state.apiLoginID = value.apiLoginID;
            state.clientKey = value.clientKey;
        }
    }
}

export default Module;
