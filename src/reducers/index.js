import { combineReducers } from 'redux';
import CashflowCalculator from './reducer-cashflowCalculator';
import RealEstate from './reducer-realEstate';
import FinancialInstitution from './reducer-financialInstitution';

const allReducers = combineReducers({
    CashflowCalculatorData : CashflowCalculator,
    RealEstateData : RealEstate,
    FinancialInstitutionData : FinancialInstitution
});

export default allReducers
