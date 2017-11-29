const Module = {
    state: {
        principal_name: '',
        principal_email: '',
        name: '',
        website: '',
        size: '',
        year: '',
        multigenerational: ''
    },
    mutations: {
        setAgency(state, value) {
            for(let property in state) {
                state[property] = value[property];
            }
        },
        setPrincipalName(state, value) {
            state.principal_name = value;
        },
        setPrincipalEmail(state, value) {
            state.principal_email = value;
        },
        setAgencyName(state, value) {
            state.name = value;
        },
        setWebsite(state, value) {
            state.website = value;
        },
        setSize(state, value) {
            state.size = value;
        },
        setYear(state, value) {
            state.year = value;
        },
        setGeneration(state, value) {
            state.multigenerational = value;
        },
    }
}

export default Module;
