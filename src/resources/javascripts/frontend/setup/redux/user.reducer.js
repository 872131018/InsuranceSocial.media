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
    principle_name: '',
    principle_email: '',
    organization_name: '',
    website: '',
    staff_size: '',
    year_founded: '',
    multi_generation: '',
    notification_frequency: '',
    notify_email: true,
    notify_text: true
};

module.exports = function(user = initialState, action) {
    switch(action.type) {
        case 'SET_USER':
            user.id = action.data.id;
            user.name = action.data.name;
            user.email = action.data.email;
            user.api_token = action.data.api_token;
            user.discount = action.data.discount;
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
            user.principle_name = action.data.principle_name;
            user.principle_email = action.data.principle_email;
            user.organization_name = action.data.organization_name;
            user.website = action.data.website;
            user.staff_size = action.data.staff_size;
            user.year_founded = action.data.year_founded;
            user.multi_generation = action.data.multi_generation;
            user.notification_frequency = action.data.notification_frequency;
            user.notify_email = action.data.notify_email;
            user.notify_text = action.data.notify_text;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(user));
}
