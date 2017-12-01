const Module = {
    state: {
        marketingRegion: false,
        marketingState: false,
        personal: false,
        commercial: false,
        benefit: false,
        crop: false
    },
    mutations: {
        setMarketingRegion(state, value) {
            state.marketingRegion = value;
            state.marketingState = !value;
        },
        setMarketingState(state, value) {
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
    }
}

export default Module;
