import { loadingBarRef } from '@/app/layout';
import { PlaybackData } from '@/models/playback';
import { Howl, Howler } from 'howler';

export function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    return [
        h,
        m > 9 ? m : (h ? '0' + m : m || '0'),
        s > 9 ? s : '0' + s
    ].filter(Boolean).join(':');
}

export function formatTimeW(seconds?: number) {
    if (!seconds) return ""
    const h = Math.floor(seconds / 3600) ? `${Math.floor(seconds / 3600)}h` : "";
    const m = Math.floor((seconds % 3600) / 60) ? `${Math.floor((seconds % 3600) / 60)}mins` : ""
    const s = Math.round(seconds % 60) ? `${Math.round(seconds % 60)}secs` : "";

    return `${h} ${m} ${s}`
}

export class AudioPlayer {
    static player: Howl;
    static radioPlayer: Howl;

    static loaded = false;
    static paused = false;
    static _playing = false;
    static _duration = "";
    static _playtime = "";
    static _durationSeconds = 0;
    static _playtimeSeconds = 0;
    static _volume = 1;
    static _rate = 1;

    static playingNow = "";
    static resetted = false;
    static updateFn: (playbackData: PlaybackData) => void | null;
    static getQueue: () => void;
    static onEndFn: () => void;
    static onPlayFn: () => void;
    static loadingUrl = "";
    static loading = false;

    static get rate() {
        return AudioPlayer.player.rate()
    }

    static get duration() {
        if (AudioPlayer.player)
            return formatTime(Math.round(AudioPlayer.player.duration()));
        return "0:00"
    }

    static get playtime() {
        if (AudioPlayer.player)
            return formatTime(Math.round(AudioPlayer.player.seek()))
        return "0:00"
    }

    static get durationSeconds() {
        return AudioPlayer.player.duration()

    }

    static get playtimeSeconds() {
        return AudioPlayer.player.seek()
    }

    static get playing() {
        if (AudioPlayer.player)
            return AudioPlayer.player.playing()
        return false;
    }

    static get volume() {
        return Howler.volume();
    }

    static loadAudioAndPlay(src: string) {
        if (AudioPlayer.loading && AudioPlayer.loadingUrl == src)
            return;

        AudioPlayer.loading = true;
        AudioPlayer.loadingUrl = src;
        AudioPlayer.loaded = false;

        if (AudioPlayer.player) {
            AudioPlayer.stop();
            AudioPlayer.setRate(1);

        }
        AudioPlayer.updateFn({
            rate: 1,
            playing: false,
            paused: false,
            duration: "0:00",
            durationSeconds: 0,
            playtimeSeconds: 0,
            volume: AudioPlayer.volume,
            playtimeCap: 0,
            playtime: "0:00",
            loading: true
        });
        loadingBarRef.current?.continuousStart();
        AudioPlayer.player = new Howl({
            src,
            html5: true,
            format: ["mp3", "aac"],
            onload: () => {
                AudioPlayer.loaded = true;
                AudioPlayer.loading = false;
                AudioPlayer.updateFn({
                    rate: 1,
                    playing: false,
                    paused: false,
                    duration: "0:00",
                    durationSeconds: 0,
                    playtimeSeconds: 0,
                    volume: AudioPlayer.volume,
                    playtimeCap: 0,
                    playtime: "0:00",
                    loading: false
                })
                AudioPlayer.play();
                loadingBarRef.current?.complete();
            },
            onplay: () => {
                if (AudioPlayer.player)
                    AudioPlayer.loaded = true;
                AudioPlayer.playingNow = src;
                AudioPlayer.loading = false;

                // requestAnimationFrame(AudioPlayer.step)
            },
            onend: () => {
                AudioPlayer.loaded = false;
                AudioPlayer._playing = false;
                AudioPlayer.paused = false;
                AudioPlayer.loaded = false;

                AudioPlayer?.onEndFn();
            },
            onpause: () => {
                AudioPlayer.paused = true;
                AudioPlayer._playing = false;
            },
            onstop: () => {
                AudioPlayer.paused = false;
                AudioPlayer._playing = false;
                AudioPlayer.loading = false;
                AudioPlayer.loaded = false;
            },
            onseek: () => {
                // requestAnimationFrame(AudioPlayer.step)
            }
        });
    }

    static play() {
        if (AudioPlayer.player) {
            if (AudioPlayer.loading)
                AudioPlayer.player.unload();
            if (AudioPlayer.playing)
                AudioPlayer.stop();
            AudioPlayer._playing = true;
            AudioPlayer.setRate(1);
            AudioPlayer.player.play();
            loadingBarRef.current?.complete()
        }

    }

    static playRadio() {
        AudioPlayer._playing = true
        AudioPlayer.radioPlayer.play();
    }

    static pauseRadio() {
        AudioPlayer.paused = true;
        AudioPlayer._playing = false;
        AudioPlayer.radioPlayer.pause();
    }

    static pause() {
        AudioPlayer.player.pause();
        AudioPlayer.paused = true;
        AudioPlayer._playing = false;
    }

    static stop() {
        if (AudioPlayer.player) {
            AudioPlayer.player.stop();
            AudioPlayer.setRate(1);
        }
        AudioPlayer._duration = "";
        AudioPlayer._playtime = "";
        AudioPlayer._durationSeconds = 0;
        AudioPlayer._playtimeSeconds = 0;
        AudioPlayer.paused = false;
        AudioPlayer._playing = false;
    }

    static setVolume(val: number) {
        AudioPlayer._volume = val;
        Howler.volume(val);
    }

    static step() {
        let seek = AudioPlayer.player.seek();
        AudioPlayer._playtime = formatTime(Math.round(seek));

        if (AudioPlayer._playing) {
            requestAnimationFrame(AudioPlayer.step);
        }
    }

    static update() {
        if (!AudioPlayer.updateFn) return;

        if (AudioPlayer.loaded)
            if (AudioPlayer.playing || AudioPlayer.paused) {
                AudioPlayer.resetted = false;

                AudioPlayer.updateFn({
                    rate: AudioPlayer.rate,
                    playing: AudioPlayer.playing,
                    paused: AudioPlayer.paused,
                    duration: AudioPlayer.duration,
                    durationSeconds: AudioPlayer.durationSeconds,
                    playtimeSeconds: AudioPlayer.playtimeSeconds,
                    volume: AudioPlayer.volume,
                    playtimeCap: (AudioPlayer.playtimeSeconds / AudioPlayer.durationSeconds) * 100,
                    playtime: AudioPlayer.playtime,
                    loading: AudioPlayer.loading

                });

            }

        if (!AudioPlayer.playing && !AudioPlayer.paused && !AudioPlayer.resetted) {
            AudioPlayer.resetted = true;
            AudioPlayer.updateFn({
                rate: 1,
                playing: false,
                paused: false,
                duration: "0:00",
                durationSeconds: 0,
                playtimeSeconds: 0,
                volume: AudioPlayer.volume,
                playtimeCap: 0,
                playtime: "0:00",
                loading: AudioPlayer.loading
            })

        }
    }

    static seek(val: number) {
        if (AudioPlayer._playing) {
            AudioPlayer.player.seek(AudioPlayer.player.duration() * val);
        }
    }

    static fastforward() {
        if (AudioPlayer._playing) {
            if (AudioPlayer.player.seek() + 15 < AudioPlayer.player.duration())
                AudioPlayer.player.seek(AudioPlayer.player.seek() + 15);
        }
    }

    static reverse() {
        if (AudioPlayer._playing) {
            if (AudioPlayer.player.seek() - 15 > 0)
                AudioPlayer.player.seek(AudioPlayer.player.seek() - 15);
        }
    }

    static setRate(rate: 0.5 | 0.75 | 1.0 | 1.25 | 1.5 | 1.75 | 2.0) {
        if (AudioPlayer.player)
            AudioPlayer.player.rate(rate)
    }

};