const Module = {
    state: {
        name: '',
        email: '',
        phone: '',
        title_code: '',
        notify_frequency: '',
        notify_email: '',
        notify_text: '',
        cell_phone: '',
        regions: [],
        states: [],
        counties: [],
        carriers: [],
        personal: [],
        commercial: [],
        benefit: [],
        crop: [],
        current_industries: [],
        target_industries: [],
        commercial_mix: '',
        personal_mix: '',
        target_coverages: []

    },
    mutations: {
        setUser(state, value) {
            for(let property in state) {
                state[property] = value[property];
            }
        },
        setPhone(state, value) {
            state.phone = value;
        },
        setTitle(state, value) {
            state.title_code = value;
        },
        setFrequency(state, value) {
            state.notify_frequency = value;
        },
        setNotifyEmail(state, value) {
            state.notify_email = value;
        },
        setNotifyText(state, value) {
            state.notify_text = value;
        },
        setCellphone(state, value) {
            state.cell_phone = value;
        },
        setUserRegions(state, value) {
            state.regions = value;
        },
        clearUserRegions(state, value) {
            state.regions = [];
        },
        setUserRegion(state, value) {
            for(let selection of state.regions) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.regions.push(value);
        },
        removeUserRegion(state, value) {
            state.regions.splice(value, 1);
        },
        setUserStates(state, value) {
            state.states = value;
        },
        clearUserStates(state, value) {
            state.states = [];
        },
        setUserState(state, value) {
            for(let selection of state.states) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.states.push(value);
        },
        removeUserState(state, value) {
            state.states.splice(value, 1);
        },
        setUserCounties(state, value) {
            state.counties = value;
        },
        clearUserCounties(state, value) {
            state.counties = [];
        },
        setUserCounty(state, value) {
            for(let selection of state.counties) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.counties.push(value);
        },
        removeUserCounty(state, value) {
            state.counties.splice(value, 1);
        },
        setUserCarriers(state, value) {
            state.carriers = value;
        },
        setCarrier(state, value) {
            for(let selection of state.carriers) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.carriers.push(value);
        },
        removeCarrier(state, value) {
            state.carriers.splice(value, 1);
        },
        setPersonalCoverages(state, value) {
            state.personal = value;
        },
        setPersonalCoverage(state, value) {
            for(let selection of state.personal) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.personal.push(value);
        },
        removePersonalCoverage(state, value) {
            state.personal.splice(value, 1);
        },
        setCommercialCoverages(state, value) {
            state.commercial = value;
        },
        setCommercialCoverage(state, value) {
            for(let selection of state.commercial) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.commercial.push(value);
        },
        removeCommercialCoverage(state, value) {
            state.commercial.splice(value, 1);
        },
        setBenefitCoverages(state, value) {
            state.benefit = value;
        },
        setBenefitCoverage(state, value) {
            for(let selection of state.benefit) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.benefit.push(value);
        },
        removeBenefitCoverage(state, value) {
            state.benefit.splice(value, 1);
        },
        setCropCoverages(state, value) {
            state.crop = value;
        },
        setCropCoverage(state, value) {
            for(let selection of state.crop) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.crop.push(value);
        },
        removeCropCoverage(state, value) {
            state.crop.splice(value, 1);
        },
        setCurrentIndustries(state, value) {
            state.current_industries = value;
        },
        setCurrentIndustry(state, value) {
            for(let selection of state.current_industries) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.current_industries.push(value);
        },
        removeCurrentIndustry(state, value) {
            state.current_industries.splice(value, 1);
        },
        setTargetIndustries(state, value) {
            state.target_industries = value;
        },
        setTargetIndustry(state, value) {
            for(let selection of state.target_industries) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.target_industries.push(value);
        },
        removeTargetIndustry(state, value) {
            state.target_industries.splice(value, 1);
        },
        setCommercialMix(state, value) {
            let result = 100 - parseInt(value);
            state.commercial_mix = value.toString();
            state.personal_mix = result.toString();
        },
        setPersonalMix(state, value) {
            let result = 100 - parseInt(value);
            state.personal_mix = value.toString();
            state.commercial_mix = result.toString();
        },
        setTargetCoverages(state, value) {
            state.target_coverages = value;
        },
        setTargetCoverage(state, value) {
            for(let selection of state.target_coverages) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.target_coverages.push(value);
        },
        removeTargetCoverage(state, value) {
            state.target_coverages.splice(value, 1);
        },
        setPersonalDefaults(state) {
            state.personal.push({
                "id":1,
                "code":"11005",
                "desc":"Auto Insurance - Personal"
            });
            state.personal.push({
                "id":6,
                "code":"11014",
                "desc":"Condo Insurance"
            });
            state.personal.push({
                "id":10,
                "code":"11029",
                "desc":"Homeowner's Insurance"
            });
            state.personal.push({
                "id":16,
                "code":"11043",
                "desc":"Renters Insurance"
            });
        },
        setCommercialDefaults(state) {
            state.commercial.push({
                "id":5,
                "code":"11011",
                "desc":"Business Owners Policy",
            });
            state.commercial.push({
                "id":7,
                "code":"11264",
                "desc":"Commercial Property Insurance"
            });
            state.commercial.push({
                "id":17,
                "code":"11260",
                "desc":"General Liability Insurance"
            });
        },
    }
}

export default Module;
