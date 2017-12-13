const Module = {
    state: {
        companies: [],
        id: '',
        name: ''
    },
    mutations: {
        setCompany(state, value) {
            state.id = value.id;
            state.name = value.name;
        },
        setCompanies(state, value) {
            state.companies = value;
        }
    }
}

export default Module;
