const Module = {
    state: {
        marketingRegion: false,
        marketingState: false
    },
    mutations: {
        setMarketingRegion(state, value) {
            state.marketingRegion = value;
            state.marketingState = !value;
        },
        setMarketingState(state, value) {
            state.marketingState = value;
            state.marketingRegion = !value;
        }
    }
}

export default Module;
