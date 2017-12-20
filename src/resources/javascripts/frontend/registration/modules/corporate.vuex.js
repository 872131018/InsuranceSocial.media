const Module = {
    state: {
        logo: '',
        company: '',
        expiration: ''
    },
    mutations: {
        setCorporate(state, value) {
            state.logo = value.logo;
            state.company = value.company;
            state.expiration = value.expiration;
        }
    }
}

export default Module;
