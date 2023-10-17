export interface PodcastModel {
    id: number;
    user_id: number;
    title: string;
    author: string;
    language: string;
    category_name: string;
    category_type: string;
    picture_url: string;
    description: string;
    explicit: string;
    created_at: string;
    updated_at: string;
    tips_and_donations_activated: string;
    email: string;
    episode_count: string;
    play_count: string;
    total_duration: number;
    cover_picture_url: string;
    rating_count: string;
    average_rating: string;
    total_tips: 0;
    subscriber_count;
}

export interface PodcastGoal {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}