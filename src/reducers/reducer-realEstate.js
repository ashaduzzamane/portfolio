const initialState = {
    propertiesList: []
};

const reducer = (state = initialState, action) => {
    const newState = {...state};

    if(action.type === 'UPDATE_DASHBOARD_REAL_ESTATE_INVESTMENT') {
        newState.propertiesList = action.propertiesData
    } 

    return newState
};

export default reducer