import moment from 'moment';

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

export function monthlyValue(deadlineDate, createdDate, goalValue) {
  const durationMonthly = moment(deadlineDate).diff(createdDate, 'months');
  return Math.round(goalValue / (durationMonthly + 1));
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
