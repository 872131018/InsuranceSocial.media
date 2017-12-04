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
        coverages: [],
        mixes: [],
        tones: [],
        topics: [],
        causes:[],
        days: [],
        times: []
    },
    mutations: {
        setOptions(state, value) {
            state.titles = value.titles;
            state.sizes = value.sizes;
            state.generations = value.generations;
            state.frequencies = value.frequencies;
            for(let index of value.states) {
                index.desc = `${ index.desc } - ${ index.state_code }`;
            }
            state.states = value.states;
            state.regions = value.regions;
            for(let index of value.counties) {
                index.desc = `${ index.desc } - ${ index.state_code }`;
            }
            state.counties = value.counties;
            state.carriers = value.carriers;
            state.personal = value.personal;
            state.commercial = value.commercial;
            state.benefit = value.benefit;
            state.crop = [
                {"code": "11016", "desc":"Crop Coverages"}
            ];
            let array = Array.prototype.concat(state.personal, state.commercial, state.benefit, state.crop);
            array.sort((a, b) => {
                if(a.desc < b.desc) return -1;
                if(a.desc > b.desc) return 1;
                return 0;
            })
            state.coverages = array;
            state.industries = value.industries;
            state.mixes = [
                {"code": "1", "desc":"Existing Clients Only"},
                {"code": "2", "desc":"Mostly Existing Clients"},
                {"code": "3", "desc":"Existing and New Clients Equally"},
                {"code": "4", "desc":"Mostly New Clients"},
                {"code": "5", "desc":"New Clients Only"}
            ];
            state.tones = [
                {"code": "1", "desc":"Simply Informative"},
                {"code": "2", "desc":"Conversational"},
                {"code": "3", "desc":"Entertainingly Informative"}
            ];
            state.topics = [
                {"code": "NH", "desc":"Recognition of National Holidays"},
                {"code": "IH", "desc":"Insurance Humor"},
                {"code": "CN", "desc":"Current News"}
            ];
            state.causes = value.causes;
            state.days = [
                {"code": "monday", "desc":"Monday"},
                {"code": "tuesday", "desc":"Tuesday"},
                {"code": "wednesday", "desc":"Wednesday"},
                {"code": "thursday", "desc":"Thursday"},
                {"code": "friday", "desc":"Friday"},
                {"code": "saturday", "desc":"Saturday"},
                {"code": "sunday", "desc":"Sunday"}
            ];
            state.times = [
                {"code": "system_chosen", "desc":"System Chosen"},
                {"code": "2-5am", "desc":"2-5am"},
                {"code": "5-8am", "desc":"5-8am"},
                {"code": "8-11am", "desc":"8-11am"},
                {"code": "11am-2pm", "desc":"11am-2pm"},
                {"code": "2-5pm", "desc":"2-5pm"},
                {"code": "8-11pm", "desc":"8-11pm"},
                {"code": "11pm-2am", "desc":"11pm-2am"}
            ];
        }
    }
}

export default Module;
