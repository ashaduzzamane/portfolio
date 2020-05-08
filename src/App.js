import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';


export default App =>(
  <BrowserRouter>
    <Switch>
      <Route exact path={["/"]} render={props => <LandingPage {...props} refreshRoute={"/"} /> } />
      <Route exact path={["/stocks"]} render={props => <LandingPage {...props} refreshRoute={"/stocks"} /> } />
      <Route exact path={["/real-estate"]} render={props => <LandingPage {...props} refreshRoute={"/real-estate"} /> } />
      <Route exact path={["/financial-institution"]} render={props => <LandingPage {...props} refreshRoute={"/financial-institution"} /> } />
      <Route exact path={["/mortgage-calculator"]} render={props => <LandingPage {...props} refreshRoute={"/mortgage-calculator"} /> } />
      <Route exact path={["/cashflow-calculator"]} render={props => <LandingPage {...props} refreshRoute={"/cashflow-calculator"} /> } />
    </Switch>
  </BrowserRouter>
);