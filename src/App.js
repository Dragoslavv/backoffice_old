import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from './scenes/components/Navigation';
import Login from './scenes/containers/Login';
import ErrorNotFound from "./scenes/containers/ErrorNotFound.js";
import CustomerBilling from "./scenes/containers/Billing/customer-billing";
import CustomerPayment from "./scenes/containers/Billing/customer-payment";
import ChargeLog from "./scenes/containers/Billing/charge-log";
import ChargeDataLog from "./scenes/containers/Billing/charge-data-log";
import PhoneNumbers from "./scenes/containers/Billing/phone-numbers";
import Devices from "./scenes/containers/Billing/devices";
import CdrOutbound from "./scenes/containers/Billing/cdr-outbound";
import CdrInbound from "./scenes/containers/Billing/cdr-inbound";
import Package from "./scenes/containers/Billing/package";
import SimDetails from "./scenes/containers/Billing/sim-details";
import CardTransaction from "./scenes/containers/Payment/card-transaction";
import IpayTransaction from "./scenes/containers/Payment/ipay-transaction";
import PaymentTransaction from "./scenes/containers/Payment/payment-transaction";
import Statistic from "./scenes/containers/Payment/statistic";
import TopupTransaction from "./scenes/containers/Payment/topup-transactions";
import Transaction from "./scenes/containers/Payment/transaction";
import SystemMessage from "./scenes/containers/SystemMessage";
import DailyActivationStatistic from "./scenes/containers/Mastercard/daily-activation-statistic";
import HourlyActivationStatistic from "./scenes/containers/Mastercard/hourly-activation-statistic";
import CdrLog from "./scenes/containers/CdrLog";
import MessageLog from "./scenes/containers/MessageLog";
import DailyStatistic from "./scenes/containers/Cdr/hourly-statistic";
import HourlyStatistic from "./scenes/containers/Cdr/daily-statistic";
import Daily from "./scenes/containers/Messaging/daily";
import Hourly from "./scenes/containers/Messaging/hourly";
import Numbers from "./scenes/containers/Numbers/numbers";
import StatisticNumbers from "./scenes/containers/Numbers/statistic-numbers";
import SpecialOfferNumbers from "./scenes/containers/Numbers/special-offer-numbers";
import Routes from "./scenes/containers/Routes";
import Rates from "./scenes/containers/Rates";
import ParkingService from "./scenes/containers/Parking/parking-service";
import ParkingStat from "./scenes/containers/Parking/parking-stat";
import PackageGroup from "./scenes/containers/Package/package-group";
import PackageDefault from "./scenes/containers/Package/package";
import PackageStat from "./scenes/containers/Package/package-stat";
import SimReport from "./scenes/containers/SimDataActiveUsers/sim-report";
import SimDaily from "./scenes/containers/SimDataActiveUsers/sim-daily";
import SimHourly from "./scenes/containers/SimDataActiveUsers/sim-hourly";
import ActiveUsers from "./scenes/containers/SimDataActiveUsers/active-users";
import DataConsumption from "./scenes/containers/SimDataActiveUsers/data-consumption";
import MostCommonCases from "./scenes/containers/MostCommonCases";
import Profile from "./scenes/containers/Profile";
import ReactNotifications from 'react-notifications-component';
import MessageBulk from "./scenes/containers/MessageBulk";
import PinVerification from "./scenes/containers/Billing/pin-verification";

class App extends Component {
  render() {
    return (
      <div className="App app-container">

          <Router>

              <div>
                  <Navigation />
                  <ReactNotifications/>
                  <Switch>
                      //billing
                      <Route exact path="/customer-billing">
                          <CustomerBilling />
                      </Route>
                      <Route exact path="/customer-payment">
                          <CustomerPayment />
                      </Route>
                      <Route exact path="/charge-log">
                          <ChargeLog />
                      </Route>
                      <Route exact path="/charge-data-log">
                          <ChargeDataLog />
                      </Route>
                      <Route exact path="/phone-numbers">
                          <PhoneNumbers />
                      </Route>
                      <Route exact path="/devices">
                          <Devices />
                      </Route>
                      <Route exact path="/cdr-outbound">
                          <CdrOutbound />
                      </Route>
                      <Route exact path="/cdr-inbound">
                          <CdrInbound />
                      </Route>
                      <Route exact path="/package">
                          <Package />
                      </Route>
                      <Route exact path="/sim-details">
                          <SimDetails />
                      </Route>
                      <Route exact path="/pin-verification">
                          <PinVerification />
                      </Route>
                      //payment
                      <Route exact path="/card-transaction">
                          <CardTransaction />
                      </Route>
                      <Route exact path="/ipay-transaction">
                          <IpayTransaction />
                      </Route>
                      <Route exact path="/payment-transaction">
                          <PaymentTransaction />
                      </Route>
                      <Route exact path="/statistic">
                          <Statistic />
                      </Route>
                      <Route exact path="/topup-transaction">
                          <TopupTransaction />
                      </Route>
                      <Route exact path="/transaction">
                          <Transaction />
                      </Route>
                      //cdr-log
                      <Route exact path="/cdr-log">
                          <CdrLog />
                      </Route>
                      //message log
                      <Route exact path="/message-log">
                          <MessageLog />
                      </Route>
                      //cdr
                      <Route exact path="/daily-statistic">
                          <HourlyStatistic />
                      </Route>
                      <Route exact path="/hourly-statistic">
                          <DailyStatistic />
                      </Route>
                      //messaging
                      <Route exact path="/daily">
                          <Daily />
                      </Route>
                      <Route exact path="/hourly">
                          <Hourly />
                      </Route>
                      //numbers
                      <Route exact path="/numbers">
                          <Numbers />
                      </Route>
                      <Route exact path="/statistic-numbers">
                          <StatisticNumbers />
                      </Route>
                      <Route exact path="/special-offer-numbers">
                          <SpecialOfferNumbers />
                      </Route>
                      //routes
                      <Route exact path="/routes">
                          <Routes />
                      </Route>
                      //routes
                      <Route exact path="/rates">
                          <Rates />
                      </Route>
                      //parking service
                      <Route exact path="/parking-service">
                          <ParkingService />
                      </Route>
                      <Route exact path="/parking-stat">
                          <ParkingStat />
                      </Route>
                      //package
                      <Route exact path="/package-default">
                          <PackageDefault />
                      </Route>
                      <Route exact path="/package-group">
                          <PackageGroup />
                      </Route>
                      <Route exact path="/package-stat">
                          <PackageStat />
                      </Route>
                      //Sim data & active users
                      <Route exact path="/sim-report">
                          <SimReport />
                      </Route>
                      <Route exact path="/sim-daily">
                          <SimDaily />
                      </Route>
                      <Route exact path="/sim-hourly">
                          <SimHourly />
                      </Route>
                      <Route exact path="/active-users">
                          <ActiveUsers />
                      </Route>
                      <Route exact path="/data-consumption">
                          <DataConsumption />
                      </Route>
                      //mastercard
                      <Route exact path="/daily-activation-statistic">
                          <DailyActivationStatistic />
                      </Route>
                      <Route exact path="/hourly-activation-statistic">
                          <HourlyActivationStatistic />
                      </Route>
                      //most common cases
                      <Route exact path="/most-common-cases">
                          <MostCommonCases/>
                      </Route>
                      //message bulk
                      <Route exact path="/message-bulk">
                          <MessageBulk/>
                      </Route>
                      //system message
                      <Route exact path="/system-message">
                          <SystemMessage />
                      </Route>
                      //profile
                      <Route exact path="/profile">
                          <Profile />
                      </Route>
                      //login
                      <Route exact path="/">
                          <Login />
                      </Route>

                      /* add 404 page */
                      <Route path="*" component={ErrorNotFound} />
                  </Switch>
              </div>

          </Router>
      </div>
    );
  }
}

export default App;
