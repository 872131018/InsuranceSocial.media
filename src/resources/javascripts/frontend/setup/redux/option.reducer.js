import States from './states.json';
import Counties from './counties.json';

const initialState = {
    titles: [
        'Owner',
        'Operations Manager',
        'Marketing Manager',
        'Principle',
        'Sales Manager',
        'Other'
    ],
    sizes: [
        'Sole Proprietor',
        '2-5 Employees',
        '6-10 Employees',
        '11-15 Employees',
        '16+ Employees'
    ],
    generations: [
        '1st',
        '2nd',
        '3rd',
        '4th',
        '5th'
    ],
    frequencies: [
        'Daily',
        'Weekly',
        'Monthly',
        'Quarterly',
        'Never'
    ],
    states: States.states,
    counties: Counties.counties,
    targets: [
        'Region',
        'State and Counties'
    ],
    regions: [
        'Northern California',
        'Southern California',
        'Middle Atlantic',
        'Midwest',
        'New England',
        'South',
        'Southwest',
        'West'
    ],
    carriers: [
        'Carrier',
        'Farmer\'s Mutual Hail',
        'Grinnel Mutual',
        'GuideOne',
        'IMT Group',
        'Plymouth Rock Insurance'
    ],
    coverage_lines: [
        'Commercial',
        'Personal',
        'Benefits'
    ],
    coverage_targets: [
        'asdf',
        'qewrqwer',
        '123123123',
        'aszxcvzx',
        '12354634'
    ],
    industry_currents: [
        'qwerty',
        'asdfzxcvzxcv',
        '12345sasdf',
        '098132098kjshdfkjh',
        '08asdfmkn0972'
    ],
    industry_targets: [
        'qwerty',
        'asdfzxcvzxcv',
        '12345sasdf',
        '098132098kjshdfkjh',
        '08asdfmkn0972'
    ],
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
