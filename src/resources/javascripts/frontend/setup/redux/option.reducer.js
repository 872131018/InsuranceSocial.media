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
    states: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'District of Columbia',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ],
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

module.exports = function(options = initialState, action) {
    switch(action.type) {
        default:
            break;
    }
    return JSON.parse(JSON.stringify(options));
}
