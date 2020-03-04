import moment from 'moment';
import { browserHistory } from 'react-router';
import authStore from '../stores/auth_store';

export function sanitizeValue(value) {
  return value.replace(/[,. ]+/g, '').trim();
}

export function deadlineInPast(deadline) {
  return moment(deadline).isBefore(moment());
}

export function normalizeCreatedDate(date) {
  let normalizedCreatedDate = moment(date).utcOffset(0);
  return normalizedCreatedDate.set({hour:0,minute:0,second:0,millisecond:0});
}

export function normalizeDeadlineDate(date) {
  return moment(date).startOf('month').add(1, 'days');
}

export function dueDateMessage(normalizedDeadline) {
  const durationTillEnd = moment(normalizedDeadline).diff(moment(), 'months');
  if (deadlineInPast(normalizedDeadline)) {
    return `Goal achieved - ${moment(normalizedDeadline).format('DD MMM YY')}`;
  } else {
    return durationTillEnd === 0 ?
      'this month' :
      moment(normalizedDeadline).subtract(1, 'month').endOf('month').fromNow();
  }
}

export function monthlyValue(deadlineDate, createdDate, goalValue) {
  const durationMonthly = moment(deadlineDate).diff(createdDate, 'months');
  return Math.round(goalValue / durationMonthly);
}

export function savedUntilNowValue(createdDate, monthlyValue, goalValue) {
  const durationSince = moment().diff(createdDate, 'months');
  const percentage = monthlyValue / goalValue * 100;
  return durationSince * percentage;
}

export function transformUserSettingsFormData(eventTarget) {
  return {
    average_monthly_incomes: eventTarget['avgIncome'].value,
    average_monthly_expenses: eventTarget['avgExpenses'].value,
    main_currency: eventTarget['currency'].value,
  };
}

export function buildSortQuery(columnName, currentDirection = 'default') {
  const dbColumnNameMap = {
    'Goal': 'description',
    'Goal progress': 'deadline',
    'Total budget': 'value',
    'Bank name': 'name',
    'Balance': 'balance',
    'Status': 'status',
    'Last update': 'updated_at',
  };
  let newSortDirection = currentDirection !== 'desc' ? 'desc' : 'asc';

  return {
    sortQuery: `?sort_by=${dbColumnNameMap[columnName]}&sort_direction=${newSortDirection.toUpperCase()}`,
    sortedBy: { columnName: columnName, direction: newSortDirection },
  };
}

export function handleSignOut() {
  authStore.logout();
  browserHistory.push('/');
}
