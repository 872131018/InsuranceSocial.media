const Module = {
    state: {
        logo: '',
        company: '',
        details: ''
    },
    mutations: {
        setCorporate(state, value) {
            state.logo = value.logo;
            state.company = value.company;
            state.details = value.details;
        }
    }
}

export default Module;
