import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HomeIcon from '@material-ui/icons/Home';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Link } from 'react-router-dom';
import './css/LandingPage.css';

export const mainListItems = (
  <div>
    <Link to='/' className='NavLink'>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon id="Icon" />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to='/stocks' className='NavLink'>
      <ListItem button>
        <ListItemIcon>
          <ShowChartIcon id="Icon" />
        </ListItemIcon>
        <ListItemText primary="Stocks" />
      </ListItem>
    </Link>
    <Link to='/real-estate' className='NavLink'>
      <ListItem button>
        <ListItemIcon>
          <HomeWorkIcon id="Icon" />
        </ListItemIcon>
        <ListItemText primary="Real Estate" />
      </ListItem>
    </Link>
    <Link to='/loans' className='NavLink'>
      <ListItem button>
        <ListItemIcon>
          <AccountBalanceIcon id="Icon" />
        </ListItemIcon>
        <ListItemText primary="Loans" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader id="Icon" inset>Tools</ListSubheader>
    <Link to='/mortgage-calculator' className='NavLink'>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon id="Icon" />
        </ListItemIcon>
        <ListItemText primary="Mortgage Calculator" />
      </ListItem>
    </Link>
    <Link to='/cashflow-calculator' className='NavLink'>
      <ListItem button>
        <ListItemIcon>
            <AttachMoneyIcon id="Icon" />
        </ListItemIcon>
        <ListItemText primary="Cashflow Calculator" />
      </ListItem>
    </Link>
  </div>
);