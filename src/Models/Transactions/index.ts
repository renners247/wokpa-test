export interface NGNTransactionHistoryModel {
    reference_number: string;
    transaction_time: string;
    amount: string;
    narration: string;
    request_reference: string;
    type: string;
    beneficiary_name: string;
}

export interface TransactionModel {
    id: number;
    user_id: number;
    beneficiary_id: number;
    vertofx_id: string;
    reference: string;
    amount: string;
    currency: string;
    amount_from: number;
    amount_to: number;
    currency_from: string;
    currency_to: string;
    rate: number;
    state: string;
    status: string;
    type: string;
    created_at: string;
    updated_at: string;
}