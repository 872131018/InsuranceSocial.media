const Module = {
    state: {
        principal_name: '',
        principal_email: '',
        name: '',
        website: '',
        size: '',
        established: '',
        multigenerational: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        zip: ''
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
        setEstablished(state, value) {
            state.established = value;
        },
        setGeneration(state, value) {
            state.multigenerational = value;
        },
        setAddress1(state, value) {
            state.address_1 = value;
        },
        setAddress2(state, value) {
            state.address_2 = value;
        },
        setCity(state, value) {
            state.city = value;
        },
        setState(state, value) {
            state.state = value;
        },
        setZip(state, value) {
            state.zip = value;
        },
    }
}

export default Module;
