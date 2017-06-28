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
    ]
};

export default function(options = initialState, action) {
    switch(action.type) {
        default:
            break;
    }
    return JSON.parse(JSON.stringify(options));
}
