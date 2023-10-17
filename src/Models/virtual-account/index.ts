export interface VirtualAccountModel {
    user_id: number;
    name: string;
    number: string;
    bank: string;
    updated_at: string;
    created_at: string;
    id: number;
    ledger_balance: number;
    available_balance: number;
    withdrawable_balance: number;
    balance_last_updated_at: string;
}