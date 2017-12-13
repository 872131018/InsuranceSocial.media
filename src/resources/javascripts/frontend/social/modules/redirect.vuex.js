const Module = {
    state: {
        facebookUrl: '',
        twitterUrl: '',
        linkedInUrl: ''
    },
    mutations: {
        setFacebookUrl(state, value) {
            state.facebookUrl = value;
        },
        setTwitterUrl(state, value) {
            state.twitterUrl = value;
        },
        setLinkedInUrl(state, value) {
            state.linkedInUrl = value;
        }
    }
}

export default Module;
