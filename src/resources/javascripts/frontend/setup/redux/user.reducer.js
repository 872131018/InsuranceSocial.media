const initialState = {
    id: '',
    name: '',
    email: '',
    api_token: '',
    discount: '',
    plan: {},
    facebook: false,
    twitter: false,
    phone: '',
    title: '',
    principal_name: '',
    principal_email: '',
    organization_name: '',
    website: '',
    staff_size: '',
    year_founded: '',
    multi_generation: '',
    notification_frequency: '',
    notify_method: [],
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zip: '',
    marketing_regions: [],
    marketing_states: [],
    marketing_counties: [],
    carriers: [],
    coverage_lines: [],
    coverage_targets: [],
    industry_currents: [],
    industry_targets: [],
    commercial_mix: '',
    personal_mix: '',
    engagement_mix: '',
    engagement_tone: '',
    special_topics: [],
    causes: [],
    posting_days: [],
    posting_time: ''
};

module.exports = function(user = initialState, action) {
    switch(action.type) {
        case 'SET_USER':
        /*
            user.id = action.data.id;
            user.name = action.data.name;
            user.email = action.data.email;
            user.api_token = action.data.api_token;
            user.discount = action.data.discount;
            */
            user = action.data;
            break;
        case 'SET_PLAN':
            user.plan = action.data;
            break;
        case 'SET_SOCIAL_MEDIA':
            user.facebook = action.data.facebook;
            user.twitter = action.data.twitter;
            break;
        case 'SET_PROPERTIES':
            user.phone = action.data.phone;
            user.title = action.data.title;
            user.principal_name = action.data.principal_name;
            user.principal_email = action.data.principal_email;
            user.organization_name = action.data.organization_name;
            user.website = action.data.website;
            user.staff_size = action.data.staff_size;
            user.year_founded = action.data.year_founded;
            user.multi_generation = action.data.multi_generation;
            user.notification_frequency = action.data.notification_frequency;
            user.notify_method = action.data.notify_method;
            break;
        case 'SET_LOCATION':
            user.address_1 = action.data.address_1;
            user.address_2 = action.data.address_2;
            user.city = action.data.city;
            user.state = action.data.state;
            user.zip = action.data.zip;
            user.marketing_regions = action.data.marketing_regions;
            user.marketing_states = action.data.marketing_states;
            user.marketing_counties = action.data.marketing_counties;
            break;
        case 'SET_COVERAGE':
            user.carriers = action.data.carriers;
            user.coverage_lines = action.data.coverage_lines;
            user.coverage_targets = action.data.coverage_targets;
            user.industry_currents = action.data.industry_currents;
            user.industry_targets = action.data.industry_targets;
            user.commercial_mix = action.data.commercial_mix;
            user.personal_mix = action.data.personal_mix;
            break;
        case 'SET_OUTREACH':
            user.engagement_mix = action.data.engagement_mix;
            user.engagement_tone = action.data.engagement_tone;
            user.special_topics = action.data.special_topics;
            user.causes = action.data.causes;
            user.posting_days = action.data.posting_days;
            user.posting_time = action.data.posting_time;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(user));
}
