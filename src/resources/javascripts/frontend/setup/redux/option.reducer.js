import States from './states.json';
import Counties from './counties.json';

const initialState = {
    titles: [
        'Owner',
        'Operations Manager',
        'Marketing Manager',
        'Principal',
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
        'No',
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
        'Grinnell Mutual',
        'IMT Group',
        'Plymouth Rock Assurance'
    ],
    coverage_lines: [
        'Commercial',
        'Personal',
        'Benefits'
    ],
    coverage_targets: [
        'Auto Insurance - Commercial',
        'Auto Insurance - Personal',
        'Aviation Insurance',
        'Boat Insurance',
        'Boiler and Machinery Insurance',
        'Builder\'s Risk Insurance',
        'Business Interruption Insurance',
        'Business Owners Policy',
        'Cancer Insurance',
        'Church Insurance',
        'Classic Car Insurance',
        'Commercial Property Insurance',
        'Condo Insurance',
        'Crime Insurance',
        'Crop Insurance',
        'Cyber Liability Insurance',
        'Dental Insurance',
        'Directors and Officers Insurance',
        'Disability Insurance - Long-Term',
        'Disability Insurance - Short-Term',
        'Dwelling/Fire Insurance',
        'Earthquake Insurance',
        'Employment Practices Liability',
        'Errors and Omissions Insurance',
        'Farm Insurance',
        'Fidelity Bond',
        'Flood Insurance',
        'Gap Insurance',
        'General Liability Insurance',
        'Health Insurance - Group',
        'Health Insurance - Individual',
        'Home Insurance',
        'Identity Theft Insurance',
        'Individual Retirement Accounts',
        'Landlord Insurance',
        'Life Insurance - Group',
        'Life Insurance - Individual',
        'Long-term Care',
        'Marine Cargo Insurance',
        'Medicare Supplement Insurance',
        'Mobile Home Insurance',
        'Motorcycle Insurance',
        'Mutual Funds',
        'Personal Identity Theft Insurance',
        'Pet  Insurance',
        'Professional Liability Insurance',
        'Public Liability Insurance',
        'Renters Insurance',
        'RV Insurance',
        'Snowmobile Insurance',
        'Surety Bond',
        'Travel Insurance',
        'Umbrella Insurance',
        'Vision Insurance',
        'Workers\' Compensation',
        'Youth Sports Protection Insurance'
    ],
    industry_currents: [
        'Agribusiness',
        'Barber and Beauty',
        'Commercial Trucking',
        'Contractor',
        'Convenience Stores',
        'Feed, Seed, Grain',
        'Florist',
        'Garage and Auto',
        'Golf',
        'Photographer',
        'Religious Organization',
        'Restaurant',
        'Storage Warehouse',
        'Veterinarian'
    ],
    industry_targets: [
        'Agribusiness',
        'Barber and Beauty',
        'Commercial Trucking',
        'Contractor',
        'Convenience Stores',
        'Feed, Seed, Grain',
        'Florist',
        'Garage and Auto',
        'Golf',
        'Photographer',
        'Religious Organization',
        'Restaurant',
        'Storage Warehouse',
        'Veterinarian'
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
