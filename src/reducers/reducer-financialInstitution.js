const initialState = {
    // rowsAssets: [],
    // rowsLiabilities: []
    rowsAssets : [
        {
            'id' : 1,
            'Institution' : 'CIBC',
            'Description' : 'Checking Account',
            'Value' : 1200,
        },
        {
            'id' : 2,
            'Institution' : 'Wealthsimple',
            'Description' : 'TFSA',
            'Value' : 3600,
        },
        {
            'id' : 3,
            'Institution' : 'Wealthsimple Trade',
            'Description' : 'TFSA',
            'Value' : 1500,
        },
    ],
    rowsLiabilities : [
        {
            'id' : 4,
            'Institution' : 'Desjardins',
            'Description' : 'Student Loan',
            'Value' : 22400,
        },
        {
            'id' : 5,
            'Institution' : 'CIBC',
            'Description' : 'Credit Card',
            'Value' : 0,
        },
    ]
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