export interface UserModel {
    created_at: string;
    email: string;
    email_verified_at: string;
    first_name: string;
    id: string;
    last_name: string;
    phone: string;
    profile_completed_at: string;
    identity_verified_at: string;
    identity_verification_failure_reason: string;
    role_id: string;
    updated_at: string; date_of_birth: string;
    verified_at: string;
    bvn_verified_at: string;
    has_pin: boolean;
    image: string;
    podcast_goal_updated_at: string;
    current_subscription: {
        id: number;
        name: string;
        amount: number;
        interval: string;
        currency: string;
        created_at: string;
        updated_at: string;
        subscription: {
            user_id: number;
            plan_id: number;
            amount: number;
            status: string;
            expires_at: string;
            created_at: string;
            updated_at: string;
        }
    }
    role: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
    }
}

export interface ProfileModel {
    id: number;
    role_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_name: string;
    email_verified_at: string;
    podcast_goal_updated_at: string;
    created_at: string;
    updated_at: string;
    profile_image_url: string;
    settings: string;
    role: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
    },
}