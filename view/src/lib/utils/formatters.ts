const currencyFormat = new Intl.NumberFormat('es-AR', {
	style: 'currency',
	currency: 'ARS',
});

export function formatCurrency(c: number) {
	return currencyFormat.format(c)
}
