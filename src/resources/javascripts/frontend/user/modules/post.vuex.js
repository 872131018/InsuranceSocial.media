const Module = {
    state: {
        link: '',
        message: '',
        file: ''
    },
    mutations: {
        setLink(state, value) {
            state.link = value;
        },
        setMessage(state, value) {
            state.message = value;
        },
        setFile(state, value) {
            state.file = value;
        }
    }
}

export default Module;
