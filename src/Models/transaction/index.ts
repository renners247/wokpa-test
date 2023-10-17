export interface TransactionModel {
    reference_number: string;
    transaction_time: string;
    amount: number;
    narration: string;
    request_reference: string;
    type: string;
    beneficiary_name: string;
}