import { combineReducers } from 'redux';
import CashflowCalculator from './reducer-cashflowCalculator';

const allReducers = combineReducers({
    CashflowCalculatorData : CashflowCalculator
});

export default allReducers
