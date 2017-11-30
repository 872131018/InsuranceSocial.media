const Module = {
    state: {
        pages: [],
        id: '',
        name: '',
        access_token: ''
    },
    mutations: {
        setPage(state, value) {
            state.id = value.id;
            state.name = value.name;
            state.access_token = value.access_token;
        },
        setPages(state, value) {
            state.pages = value;
        }
    }
}

export default Module;
