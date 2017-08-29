const initialState = {
    titles: [],
    sizes: [],
    generations: [],
    frequencies: [],
    regions: [],
    states: [],
    counties: [],
    targets: [
        {
          "stateCd":"",
          "code":"R",
          "desc":"Region"
        },
        {
          "stateCd":"",
          "code":"S",
          "desc":"State and Counties"
        }
    ],
    carriers: [],
    commercial_coverage_lines: [],
    personal_coverage_lines: [],
    benefit_coverage_lines: [],
    crop_coverage_lines: [
        {"code": "YES", "desc":"Yes I write Crop coverages"},
        {"code": "NO", "desc":"No I do not write Crop coverages"},
    ],
    industry_currents: [],
    industry_targets: [],
    engagement_mix: [
        {"code": "EO", "desc":"Existing Clients Only"},
        {"code": "ME", "desc":"Mostly Existing Clients"},
        {"code": "EN", "desc":"Existing and New Clients Equally"},
        {"code": "MN", "desc":"Mostly New Clients"},
        {"code": "NO", "desc":"New Clients Only"}
    ],
    engagement_tone: [
        {"code": "I", "desc":"Simply Informative"},
        {"code": "C", "desc":"Conversational"},
        {"code": "E", "desc":"Entertainingly Informative"}
    ],
    special_topics: [
        {"code": "NH", "desc":"Recognition of National Holidays"},
        {"code": "IH", "desc":"Insurance Humor"},
        {"code": "CN", "desc":"Current News"}
    ],
    causes: [],
    days: [
        {"code": "sunday", "desc":"Sunday"},
        {"code": "monday", "desc":"Monday"},
        {"code": "tuesday", "desc":"Tuesday"},
        {"code": "wednesday", "desc":"Wednesday"},
        {"code": "thursday", "desc":"Thursday"},
        {"code": "friday", "desc":"Friday"},
        {"code": "saturday", "desc":"Saturday"}
    ],
    times: [
        {"code": "system_chosen", "desc":"System Chosen"},
        {"code": "2-5am", "desc":"2-5am"},
        {"code": "5-8am", "desc":"5-8am"},
        {"code": "8-11am", "desc":"8-11am"},
        {"code": "11am-2pm", "desc":"11am-2pm"},
        {"code": "2-5pm", "desc":"2-5pm"},
        {"code": "8-11pm", "desc":"8-11pm"},
        {"code": "11pm-2am", "desc":"11pm-2am"}
    ]
};

export default function(options = initialState, action) {
    switch(action.type) {
        case 'SET_REGIONS':
            for(let region of action.data) {
                options['regions'].push(region);
            }
            break;
        case 'SET_STATES':
            for(let state of action.data) {
                options['states'].push(state);
            }
            break;
        case 'SET_COUNTIES':
            for(let county of action.data) {
                options['counties'].push(county);
            }
            break;
        case 'SET_COVERAGES':
            for(let coverage of action.data.commercial) {
                options['commercial_coverage_lines'].push(coverage);
            }
            for(let coverage of action.data.personal) {
                options['personal_coverage_lines'].push(coverage);
            }
            for(let coverage of action.data.benefit) {
                options['benefit_coverage_lines'].push(coverage);
            }
            break;
        case 'SET_INDUSTRIES':
            for(let industry of action.data) {
                options['industry_currents'].push(industry);
                options['industry_targets'].push(industry);
            }
            break;
        case 'SET_CAUSES':
            for(let cause of action.data) {
                options['causes'].push(cause);
            }
            break;
        case 'SET_TITLES':
            for(let title of action.data) {
                options['titles'].push(title);
            }
            break;
        case 'SET_SIZES':
            for(let size of action.data) {
                options['sizes'].push(size);
            }
            break;
        case 'SET_GENERATIONS':
            for(let generation of action.data) {
                options['generations'].push(generation);
            }
            break;
        case 'SET_FREQUENCIES':
            for(let frequency of action.data) {
                options['frequencies'].push(frequency);
            }
            break;
        case 'SET_CARRIERS':
            for(let carrier of action.data) {
                options['carriers'].push(carrier);
            }
            break;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(options));
}
