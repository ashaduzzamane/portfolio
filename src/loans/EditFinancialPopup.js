import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import NativeSelect from '@material-ui/core/NativeSelect';
import MuiAlert from '@material-ui/lab/Alert';
import '../css/FinancialInstitution.css'

class EditFinancialPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertyType: '',
            address: '',
            price: '',
            downPayment: '',
            closingCosts: '',
            rehabCosts: '',
            principle: '',
            rent: '',
            mortgage: '',
            taxes: '',
            insurance: '',
            miscExpenses: '',
            showErrorAllFields: false
        }
    }

    componentWillMount() {

    }

    handleSave = event => {

    }

    handleCancel = event => {
        var actionType = "cancel"
        this.props.closePopup(actionType)
    }

    render(){

        return(
            <div className='popupRoot'>  
                <div className='popupInner'>
                    
                </div>  
            </div> 
        )
    }
}

export default EditFinancialPopup;