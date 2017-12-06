const Module = {
    state: {
        marketingRegion: false,
        marketingState: false,
        personal: false,
        commercial: false,
        benefit: false,
        crop: false,
        post: '',
        redirect: ''
    },
    mutations: {
        setMarketingRegionType(state, value) {
            state.marketingRegion = value;
            state.marketingState = !value;
        },
        setMarketingStateType(state, value) {
            state.marketingState = value;
            state.marketingRegion = !value;
        },
        setPersonal(state, value) {
            state.personal = value;
        },
        setCommercial(state, value) {
            state.commercial = value;
        },
        setBenefit(state, value) {
            state.benefit = value;
        },
        setCrop(state, value) {
            state.crop = value;
        },
        setEndpoints(state, value) {
            state.post = value.post;
            state.redirect = value.redirect;
        }
    }
}

export default Module;
