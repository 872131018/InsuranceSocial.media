const Module = {
    state: {
        facebookPerformanceRange: 60,
        facebookInteractionRange: 60,
        facebookInteractionGraph: 'reach',
        twitterPerformanceRange: 50,
        twitterInteractionRange: 50,
        twitterInteractionGraph: 'retweets',
        marketingRegion: false,
        marketingState: false,
        personal: false,
        commercial: false,
        benefit: false,
        crop: false,
    },
    mutations: {
        setFacebookPerformanceRange(state, value) {
            state.facebookPerformanceRange = value;
        },
        setFacebookInteractionRange(state, value) {
            state.facebookInteractionRange = value;
        },
        setFacebookInteractionGraph(state, value) {
            state.facebookInteractionGraph = value;
        },
        setTwitterPerformanceRange(state, value) {
            state.twitterPerformanceRange = value;
        },
        setTwitterInteractionRange(state, value) {
            state.twitterInteractionRange = value;
        },
        setTwitterInteractionGraph(state, value) {
            state.twitterInteractionGraph = value;
        },
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
        }
    }
}

export default Module;
