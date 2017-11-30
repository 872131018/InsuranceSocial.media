const Module = {
    state: {
        titles: [],
        sizes: [],
        generations: [],
        frequencies: [],
        states: [],
        regions: [],
        counties: []
    },
    mutations: {
        setTitles(state, value) {
            state.titles = value;
        },
        setSizes(state, value) {
            state.sizes = value;
        },
        setGenerations(state, value) {
            state.generations = value;
        },
        setFrequencies(state, value) {
            state.frequencies = value;
        },
        setStates(state, value) {
            for(let index of value) {
                index.desc = `${ index.desc } - ${ index.state_code }`;
            }
            state.states = value;
        },
        setRegions(state, value) {
            state.regions = value;
        },
        setCounties(state, value) {
            for(let index of value) {
                index.desc = `${ index.desc } - ${ index.state_code }`;
            }
            state.counties = value;
        },
    }
}

export default Module;
