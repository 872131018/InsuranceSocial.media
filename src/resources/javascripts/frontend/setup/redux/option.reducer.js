import States from './states.json';
import Counties from './counties.json';
import Regions from './regions.json';
import Coverages from './coverages.json';
import Industries from './industries.json';

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
    regions: Regions.regions,
    states: States.states,
    counties: Counties.counties,
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
    coverage_lines: [
        {"code": "C", "desc":"Commercial"},
        {"code": "P", "desc":"Personal"},
        {"code": "B", "desc":"Benefits"}
    ],
    coverage_targets: Coverages.coverages,
    industry_currents: Industries.industries,
    industry_targets: Industries.industries,
    engagement_mix: [
        'Existing Clients Only',
        'Mostly Existinig Clients',
        'Existing and New Clients Equally',
        'Mostly New Clients',
        'New Clients Only'
    ],
    engagement_tone: [
        'Simply Informative',
        'Conversational',
        'Entertainingly Informative'
    ],
    special_topics: [
        'Recognition of National Holidays',
        'Insurance Humor',
        'Current News'
    ],
    causes: [
        'Alzheimer\'s',
        'American Red Cross',
        'Amnesty International',
        'Animal Rescue',
        'Arthritis',
        'Asthma',
        'Cancer',
        'Child Abuse',
        'Chronic Obstructive Pulmonary Disease (COPD)',
        'Dental Health',
        'Depression',
        'Diabetes',
        'Environmental Issues',
        'Habitat for Humanity',
        'Heart Disease',
        'Heifer International',
        'Homelessness',
        'Hunger',
        'Kidney Disease',
        'Mental Health',
        'Military Veterans',
        'Mommy & Me Cancer Foundation',
        'Multiple Sclerosis',
        'Poverty',
        'Vision Health'
    ],
    days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    times: [
        'System Chosen',
        '2-5am',
        '5-8am',
        '8-11am',
        '11am-2pm',
        '2-5pm',
        '5-8pm',
        '8-11pm',
        '11pm-2am'
    ]
};

export default function(options = initialState, action) {
    switch(action.type) {
        default:
            break;
    }
    return JSON.parse(JSON.stringify(options));
}
