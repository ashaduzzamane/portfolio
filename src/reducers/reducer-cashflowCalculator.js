const initialState = {
    totalInvestment: 0,
    totalExpenses: 0,
    totalRevenueCashOnCash: 0,
    totalRevenueInternalRate: 0
};

const reducer = (state = initialState, action) => {
    const newState = {...state};

    if(action.type === 'UPDATE_INVESTMENT') {
        newState.totalInvestment = action.totalInvestment
    } else if(action.type === 'UPDATE_EXPENSES') {
        newState.totalExpenses = action.totalExpenses
    } else if(action.type === 'UPDATE_REVENUE') {
        newState.totalRevenueCashOnCash = action.totalRevenueCashOnCash
        newState.totalRevenueInternalRate = action.totalRevenueInternalRate
    }

    return newState
};

export default reducer