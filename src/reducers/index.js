import { combineReducers } from 'redux';
import CashflowCalculator from './reducer-cashflowCalculator';
import RealEstate from './reducer-realEstate';

const allReducers = combineReducers({
    CashflowCalculatorData : CashflowCalculator,
    RealEstateData : RealEstate
});

export default allReducers
