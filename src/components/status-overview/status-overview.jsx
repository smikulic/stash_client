import React, { Component } from 'react';
import moment from 'moment';
import symbolFromCurrency from 'currency-symbol-map';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import StatusOverviewBox from '../status-overview-box';

require('./status-overview.scss');

@inject('savingGoalsStore', 'userStore')
@withRouter
@observer
class StatusOverview extends Component {

  componentWillMount() {
    this.props.savingGoalsStore.loadSavingGoals(this.props.userStore.userData.id);
  }

  _getMonthlySavingExpenses() {
    const { savingGoals } = this.props.savingGoalsStore;
    let monthlySavingsTotal = 0;
    savingGoals.map((item) => {
      let durationMonthly = moment(item.deadline).diff(moment(item.created_at), 'months');
      let monthly = Math.round(item.value / durationMonthly);

      monthlySavingsTotal += monthly;
    });

    return monthlySavingsTotal;
  }

  render() {
    let currency = this.props.userData.currency;
    let monthlyFixedIncome = this.props.userData.fixed_income;
    let monthlyFixedExpenses = this.props.userData.fixed_expenses;
    let monthlySavingExpenses = this._getMonthlySavingExpenses();
    let spendThisMonth =
      monthlyFixedIncome -
      monthlyFixedExpenses -
      monthlySavingExpenses;
    return (
      <span className="status-overview">
        <h3 className="status-overview--title">{moment().format('MMMM YYYY')}</h3>
        <StatusOverviewBox
          label="Income"
          value={`${monthlyFixedIncome} ${symbolFromCurrency(currency)}`}
        />
        <StatusOverviewBox
          label="Expenses"
          value={`${monthlyFixedExpenses} ${symbolFromCurrency(currency)}`}
        />
        <StatusOverviewBox
          label="Savings"
          value={`${monthlySavingExpenses} ${symbolFromCurrency(currency)}`}
        />
        <StatusOverviewBox
          label="Available"
          value={`${spendThisMonth} ${symbolFromCurrency(currency)}`}
        />
      </span>
    );
  }
}

export default StatusOverview;
