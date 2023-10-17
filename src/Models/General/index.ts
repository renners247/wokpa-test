export interface VirtualAccountModel {
    user_id: number;
    name: string;
    number: string;
    ledger: number;
    available: number;
    withdrawable: number;
    bank: string;
    updated_at: string;
    created_at: string;
    id: number;
}

export interface WalletModel {
    id: number;
    user_id: number;
    vertofx_id: number;
    amount: number;
    currency: string;
    created_at: string;
    updated_at: string;
}

export interface BankModel {
    name: string;
    code: string;
}