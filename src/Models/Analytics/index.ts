export interface AnalyticsModel {
    total_income: number;
    follower_count: number;
    listener_count: number;
}

export interface PodcastAnalyticsModel {
    total_tips_and_donations: number;
    listener_count: number;
    play_count: number;
    subscriber_count: number;
    gender: {
        male: number;
        female: number;
        unspecified: number;
    },
    "age": {
        "0_to_17": number
        "18_to_21": number
        "22_to_27": number
        "28_to_34": number
        "35_to_44": number
        "45_to_59": number
        "60_to_150": number
        "unspecified": number
    },
    top_countries: string[]
}