import { API_URL } from "@/utils";
import axios from "axios";

export const getPodcasts = async (page = 1, perPage = 15, q= "") => axios.get(`${API_URL}/publishers/podcasts?q=${q}&page=${page}&per_page=${perPage}`);
export const getPodcastsById = async (id: number | string) => axios.get(`${API_URL}/publishers/podcasts/${id}`);
export const getArchivePodcastsById = async (id: number | string) => axios.get(`${API_URL}/publishers/archives/podcasts/${id}`);
export const getPodcastRssById = async (podcastId: number | string) => axios.get(`${API_URL}/publishers/podcasts/${podcastId}/rss`);

export const getPodcastEpisodes = async (id: number | string, page = 1, perPage = 10, archived= false) => axios.get(`${API_URL}/publishers/podcasts/${id}/episodes?page=${page}&per_page=${perPage}&archived=${archived}`);
export const getEpisodes = async (page = 1, perPage = 10, q = "") => axios.get(`${API_URL}/publishers/episodes?page=${page}&per_page=${perPage}&q=${q}`);
export const getArchivedEpisodes = async (page = 1, perPage = 10) => axios.get(`${API_URL}/publishers/archives/episodes?page=${page}&per_page=${perPage}`);
export const getArchivedEpisodeById = async (podcastId: number | string, episodeId: number | string) => axios.get(`${API_URL}/publishers/archives/podcasts/${podcastId}/episodes/${episodeId}`);



export const getPodcastEpisode = async (podcastId: number | string, episodeId: number | string) => axios.get(`${API_URL}/publishers/podcasts/${podcastId}/episodes/${episodeId}`);
export const subscribeToPlan = async (id: number | string) => axios.post(`${API_URL}/publishers/plans/${id}/subscriptions`);
export const updateWebsiteSettings = async (data: any) => axios.post(`${API_URL}/publishers/settings/website-page`, data);
export const createCollaborators = async (data: any) => axios.post(`${API_URL}/publishers/collaborators`, data);
export const getCollaborators = async () => axios.get(`${API_URL}/publishers/collaborators`);
export const updateCollaborators = async (id: number, data: any) => axios.put(`${API_URL}/publishers/collaborators/${id}`, data);
export const deleteCollaborators = async (id: number) => axios.delete(`${API_URL}/publishers/collaborators/${id}`);

export const getVirtualAccount = async () => axios.get(`${API_URL}/publishers/virtual-accounts`);
export const getTransactions = async (page = 1, per_page = 15, start_date = "", end_date = "") => axios.get(`${API_URL}/publishers/virtual-accounts/transactions?page=${page}&per_page=${per_page}&start_date=${start_date}&end_date=${end_date}`);

export const getAnalytics = async () => axios.get(`${API_URL}/publishers/podcasts/analyitcs`);


export const transferMoney = async (data: any) => axios.post(`${API_URL}/publishers/virtual-accounts/transfer`, data);


export const getKYC = async () => axios.get(`${API_URL}/publishers/kyc`);

export const udpateUserProfile = async (data: any) => axios.post(`${API_URL}/publishers/settings/account`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

export const updateKYC = async (data: any) => axios.post(`${API_URL}/publishers/kyc`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});
export const getBanks = async () => axios.get(`${API_URL}/publishers/banks`);
export const nameEnquiry = async (acct = "", bank_code = "") => axios.get(`${API_URL}/publishers/name-enquiry?account_number=${acct}&bank_code=${bank_code}`);


export const createPodcast = async (data: any) => axios.post(`${API_URL}/publishers/podcasts`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

export const updatePodcast = async (podcastId: string, data: any) => axios.post(`${API_URL}/publishers/podcasts/${podcastId}`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

export const uploadEpisode = async (podcastId: string, data: any) => axios.post(`${API_URL}/publishers/podcasts/${podcastId}/episodes`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});
export const uploadEpisodeAudio = async (podcastId: string, episodeId: string, data: any) => axios.post(`${API_URL}/publishers/podcasts/${podcastId}/episodes/${episodeId}/audio`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});
export const updateEpisode = async (podcastId: string, episodeId: string | number, data: any) => axios.post(`${API_URL}/publishers/podcasts/${podcastId}/episodes/${episodeId}`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});


//archives
export const archiveEpisode = async (podcastId: string | number, episodeId: string | number) => axios.post(`${API_URL}/publishers/podcasts/${podcastId}/episodes/${episodeId}/archives`);
export const removeArchiveEpisode = async (podcastId: string | number, episodeId: string | number) => axios.delete(`${API_URL}/publishers/podcasts/${podcastId}/episodes/${episodeId}/archives`);
export const getEpisodesArchive = async (podcastId: string | number, page = 1, perPage = 15) => axios.get(`${API_URL}/publishers/archives/podcasts/${podcastId}/episodes?page=${page}&per_page=${perPage}`);

export const archivePodcast = async (podcastId: string | number) => axios.post(`${API_URL}/publishers/podcasts/${podcastId}/archives`);
export const removeArchivePodcasts = async (podcastId: string | number) => axios.delete(`${API_URL}/publishers/podcasts/${podcastId}/archives`);
export const getPodcastArchive = async (q = "", page = 1, perPage = 15) => axios.get(`${API_URL}/publishers/archives/podcasts?q=${q}&page=${page}&per_page=${perPage}`);


export const initiatePodcastImport = async (url: string) => axios.post(`${API_URL}/publishers/podcasts/import/verification`, { url });
export const importPodcast = async (url: string, otp: string) => axios.post(`${API_URL}/publishers/podcasts/import`, { url, otp });


export const updatePodcastGoals = async (data: any) => axios.put(`${API_URL}/publishers/profile/podcast-goals`, data);