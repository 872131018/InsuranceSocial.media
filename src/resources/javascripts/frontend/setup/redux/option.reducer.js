const initialState = {
    titles: [
        {"code":"OW","desc":"Owner"},
        {"code":"OM","desc":"Operations Manager"},
        {"code":"MM","desc":"Marketing Manager"},
        {"code":"PR","desc":"Principle"},
        {"code":"SM","desc":"Sales Manager"},
        {"code":"OT","desc":"Other"}
    ],
    sizes: [
        {"code": "SP", "desc":"Sole Proprietor"},
        {"code": "2-5", "desc":"2-5 Employees"},
        {"code": "6-10", "desc":"6-10 Employees"},
        {"code": "11-15", "desc":"11-15 Employees"},
        {"code": "16+", "desc":"16+ Employees"}
    ],
    generations: [
        {"code": "N", "desc":"No"},
        {"code": "2", "desc":"2nd"},
        {"code": "3", "desc":"3rd"},
        {"code": "4", "desc":"5th"},
        {"code": "5", "desc":"5th"}
    ],
    frequencies: [
        {"code": "D", "desc":"Daily"},
        {"code": "W", "desc":"Weekly"},
        {"code": "M", "desc":"Monthly"},
        {"code": "Q", "desc":"Quarterly"},
        {"code": "N", "desc":"Never"}
    ],
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
    carriers: [
        {"code": "C", "desc":"Carrier"},
        {"code": "F", "desc":"Farmer\'s Mutual Hail"},
        {"code": "G", "desc":"Grinnell Mutual"},
        {"code": "I", "desc":"IMT Group"},
        {"code": "P", "desc":"Plymouth Rock Assurance"},
    ],
    coverage_targets: [],
    industry_currents: [],
    industry_targets: [],
    engagement_mix: [
        {"code": "EO", "desc":"Existing Clients Only"},
        {"code": "ME", "desc":"Mostly Existinig Clients"},
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
            for(let coverage of action.data) {
                options['coverage_targets'].push(coverage);
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
        default:
            break;
    }
    return JSON.parse(JSON.stringify(options));
}
