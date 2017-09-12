const initialState = {
    selected_regions: [],
    selected_states: [],
    selected_counties: [],
    selected_carriers: [],
    selected_personal_coverages: [],
    selected_commercial_coverages: [],
    selected_benefit_coverages: [],
    selected_crop_coverages: [],
    selected_current_industries: [],
    selected_target_industries: [],
    selected_special_topics: [],
    selected_causes: []
};

module.exports = function(selections = initialState, action) {
    switch(action.type) {
        case 'SET_SELECTIONS':
            for(let property in action.data) {
                selections[property] = action.data[property];
            }
            break;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(selections));
}
