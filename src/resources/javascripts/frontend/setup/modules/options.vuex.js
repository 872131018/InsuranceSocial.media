const Module = {
    state: {
        titles: [],
        sizes: [],
        generations: [],
        frequencies: []

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
    }
}

export default Module;
