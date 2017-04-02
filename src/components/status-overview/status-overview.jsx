import React, { Component } from 'react';
import moment from 'moment';
import symbolFromCurrency from 'currency-symbol-map';

require('./status-overview.scss');

class StatusOverview extends Component {

  constructor(props) {
    super(props);

    this.savingGoals = this.props.savingGoals;
    this.currency = this.props.userData.currency;
    this.monthlyFixedIncome = this.props.userData.fixed_income;
    this.monthlyFixedExpenses = this.props.userData.fixed_expenses;
    this.monthlySavingExpenses = this._getMonthlySavingExpenses();
    this.spendThisMonth =
      this.monthlyFixedIncome -
      this.monthlyFixedExpenses -
      this.monthlySavingExpenses;
  }

  _getMonthlySavingExpenses() {
    let monthlySavingsTotal = 0;

    this.savingGoals.map((item) => {
      let durationMonthly = moment(item.end_date).diff(moment(item.start_date), 'months');
      let monthly = Math.round(item.total_value / durationMonthly);

      monthlySavingsTotal += monthly;
    });

    return monthlySavingsTotal;
  }

  render() {
    return (
      <span>
        <h3 className="status-overview--title">{moment().format('MMMM YYYY')}</h3>
        <div className="status-overview--box">
          <div className="status-overview--label">
            Income
          </div>
          <div className="status-overview--value">
            {`${this.monthlyFixedIncome} ${symbolFromCurrency(this.currency)}`}
          </div>
        </div>
        <div className="status-overview--box">
          <div className="status-overview--label">
            Expenses
          </div>
          <div className="status-overview--value">
            {`${this.monthlyFixedExpenses} ${symbolFromCurrency(this.currency)}`}
          </div>
        </div>
        <div className="status-overview--box">
          <div className="status-overview--label">
            Savings
          </div>
          <div className="status-overview--value">
            {`${this.monthlySavingExpenses} ${symbolFromCurrency(this.currency)}`}
          </div>
        </div>
        <div className="status-overview--box">
          <div className="status-overview--label">
            Available
          </div>
          <div className="status-overview--value">
            {`${this.spendThisMonth} ${symbolFromCurrency(this.currency)}`}
          </div>
        </div>
      </span>
    );
  }
}

export default StatusOverview;
