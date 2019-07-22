export function getCurrencyField(value, onChangeEvent) {
	return {
		label: 'Currency',
		targetName: 'currency',
		value: value,
		onChangeEvent: onChangeEvent,
		type: 'select', 
		options: { USD: '($) USD', EUR: '(€) EUR', GBP: '(£) GBP', CAD: '($) CAD', JPY: '(¥) JPY' },
		defaultValue: 'USD',
	};
}
