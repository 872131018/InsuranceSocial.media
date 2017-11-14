const initialState = {
    selected_regions: [],
    selected_states: [],
    selected_counties: [],
    selected_carriers: [],
    selected_personal_coverages: [],
    selected_commercial_coverages: [],
    selected_benefit_coverages: [],
    selected_crop_coverages: [],
    selected_target_coverages: [],
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
        case 'UPDATE_PERSONAL_COVERAGE':
            selections.selected_personal_coverages = action.data;
            break;
        case 'CLEAR_PERSONAL_COVERAGE':
            selections.selected_personal_coverages = [];
            break;
        case 'UPDATE_COMMERCIAL_COVERAGE':
            selections.selected_commercial_coverages = action.data;
            break;
        case 'CLEAR_COMMERCIAL_COVERAGE':
            selections.selected_commercial_coverages = [];
            break;
        case 'UPDATE_BENEFIT_COVERAGE':
            selections.selected_benefit_coverages = action.data;
            break;
        case 'CLEAR_BENEFIT_COVERAGE':
            selections.selected_benefit_coverages = [];
            break;
        case 'UPDATE_CROP_COVERAGE':
            selections.selected_crop_coverages = action.data;
            break;
        case 'CLEAR_CROP_COVERAGE':
            selections.selected_crop_coverages = [];
            break;
        case 'UPDATE_TARGET_COVERAGE':
            selections.selected_target_coverages = action.data;
            break;
        case 'CLEAR_TARGET_COVERAGE':
            selections.selected_target_coverages = [];
            break;
        default:
            break;
    }
    return JSON.parse(JSON.stringify(selections));
}
