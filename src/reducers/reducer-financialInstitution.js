const initialState = {
    rowsAssets : [],
    rowsLiabilities : []
};

const reducer = (state = initialState, action) => {
    const newState = {...state};

    if(action.type === 'UPDATE_ASSETS') {
        newState.rowsAssets = action.rowsAssets
    } else if(action.type === 'UPDATE_LIABILITIES') {
        newState.rowsLiabilities = action.rowsLiabilities
    }

    return newState
};

export default reducer