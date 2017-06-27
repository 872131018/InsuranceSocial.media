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
    ]

};

export default function(options = initialState, action) {
    switch(action.type) {
        default:
            break;
    }
    return JSON.parse(JSON.stringify(options));
}
