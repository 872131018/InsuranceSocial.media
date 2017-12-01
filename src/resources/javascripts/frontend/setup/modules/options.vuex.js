const Module = {
    state: {
        titles: [],
        sizes: [],
        generations: [],
        frequencies: [],
        states: [],
        regions: [],
        counties: [],
        carriers: [],
        personal: [],
        commercial: [],
        benefit: [],
        crop: [],
        industries: [],
        coverages: []
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
        setCarriers(state, value) {
            state.carriers = value;
        },
        setCoverages(state, value) {
            state.personal = value.personal;
            state.commercial = value.commercial;
            state.benefit = value.benefit;
            state.crop = [
                {"code": "11016", "desc":"Crop coverages"}
            ];
            let array = Array.prototype.concat(state.personal, state.commercial, state.benefit, state.crop);
            array.sort((a, b) => {
                if(a.desc < b.desc) return -1;
                if(a.desc > b.desc) return 1;
                return 0;
            })
            state.coverages = array;
        },
        setIndustries(state, value) {
            state.industries = value;
        },
    }
}

export default Module;
