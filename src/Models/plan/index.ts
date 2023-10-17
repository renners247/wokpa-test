export interface PlanModel {
    id: number;
    name: string;
    amount: number;
    interval: string;
    currency: string;
    created_at: string;
    update_at: string;
    details: {
        transcriptions: string;
        uploads: string;
        distributions: string;
        analytics: string;
        podcast_channels: string;
        storage: string;
        hosting: string;
        audience_support: boolean;
    }
}