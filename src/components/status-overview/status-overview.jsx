import React, { Component } from 'react';
import moment from 'moment';
import symbolFromCurrency from 'currency-symbol-map';
import accounting from 'accounting';
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
      let normalizedCreatedAt = moment(item.created_at).utcOffset(0);
      normalizedCreatedAt.set({hour:0,minute:0,second:0,millisecond:0});
      let durationMonthly = moment(item.deadline).diff(normalizedCreatedAt, 'months');
      let monthly = Math.round(item.value / durationMonthly);

      monthlySavingsTotal += monthly;
    });

    return monthlySavingsTotal;
  }

  render() {
    const { userData } = this.props;
    let currency = userData ? symbolFromCurrency(userData.main_currency) : '';
    let monthlyFixedIncome = userData ? userData.average_monthly_incomes : 0;
    let monthlyFixedExpenses = userData ? userData.average_monthly_expenses : 0;
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
          value={`${accounting.formatNumber(monthlyFixedIncome)} ${currency}`}
        />
        <StatusOverviewBox
          label="Expenses"
          value={`${accounting.formatNumber(monthlyFixedExpenses)} ${currency}`}
        />
        <StatusOverviewBox
          label="Savings"
          value={`${accounting.formatNumber(monthlySavingExpenses)} ${currency}`}
        />
        <StatusOverviewBox
          label="Available"
          value={`${accounting.formatNumber(spendThisMonth)} ${currency}`}
        />
      </span>
    );
  }
}

export default StatusOverview;
