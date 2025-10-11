export type Currency = {
    currency_id: number;
    currency_name: string;
    symbol: string;
    code: string;
};

export const currencies: Currency[] = [
    { currency_id: 1, currency_name: 'US Dollar', symbol: '$', code: 'USD' },
    { currency_id: 2, currency_name: 'Indian Rupees', symbol: '₹', code: 'INR' },
    { currency_id: 3, currency_name: 'Canadian dollar', symbol: '$', code: 'CAD' }
]