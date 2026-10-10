import { Download, FastForward, Pause, Play, Rewind, Gear, SpeakerHigh, SpeakerX } from '../../icons';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode, type SyntheticEvent } from 'react';
import './AudioPlayer.css';

export type AudioPlayerSize = 'sm' | 'default' | 'lg';
export type AudioSource = { src: string; type?: string };
export type AudioPlayerProps = {
  'aria-label'?: string;
  artist?: ReactNode;
  artwork?: string;
  autoPlay?: boolean;
  className?: string;
  compact?: boolean;
  defaultPlaybackRate?: number;
  defaultVolume?: number;
  download?: boolean;
  fallback?: ReactNode;
  loop?: boolean;
  muted?: boolean;
  onEnded?: () => void;
  onError?: (event: SyntheticEvent<HTMLAudioElement>) => void;
  onPause?: () => void;
  onPlay?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  preload?: 'none' | 'metadata' | 'auto';
  rates?: number[];
  showPlaybackRateControl?: boolean;
  showVolumeControl?: boolean;
  skipSeconds?: number;
  size?: AudioPlayerSize;
  sources?: AudioSource[];
  src?: string;
  style?: CSSProperties;
  title?: ReactNode;
  width?: number | string;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const formatTime = (value: number) => { if (!Number.isFinite(value)) return '0:00'; const seconds = Math.max(0, Math.floor(value)); return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`; };

export function AudioPlayer({ 'aria-label': ariaLabel = 'Audio player', artist, artwork, autoPlay = false, className, compact = false, defaultPlaybackRate = 1, defaultVolume = 1, download = false, fallback = 'Audio is unavailable', loop = false, muted = false, onEnded, onError, onPause, onPlay, onTimeUpdate, preload = 'metadata', rates = [0.75, 1, 1.25, 1.5, 2], showPlaybackRateControl = true, showVolumeControl = true, skipSeconds = 10, size = 'default', sources, src, style, title, width }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(Math.min(1, Math.max(0, defaultVolume)));
  const [isMuted, setIsMuted] = useState(muted);
  const [rate, setRate] = useState(defaultPlaybackRate);
  const [settingsOpen, setGearOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => { const audio = audioRef.current; if (!audio) return; audio.volume = volume; audio.muted = isMuted; audio.playbackRate = rate; }, [isMuted, rate, volume]);
  const togglePlay = async () => { const audio = audioRef.current; if (!audio) return; if (audio.paused) { try { await audio.play(); } catch { /* Browser autoplay policy can reject playback. */ } } else audio.pause(); };
  const seek = (next: number) => { const audio = audioRef.current; if (!audio) return; audio.currentTime = Math.max(0, Math.min(duration || 0, next)); setCurrentTime(audio.currentTime); };
  const toggleMute = () => { const next = !isMuted; setIsMuted(next); if (next) setVolume(0); else setVolume(volume || 1); };
  const changeVolume = (next: number) => { setVolume(next); setIsMuted(next === 0); };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => { if (event.key === ' ' || event.key.toLowerCase() === 'k') { event.preventDefault(); void togglePlay(); } else if (event.key === 'ArrowLeft') { event.preventDefault(); seek(currentTime - skipSeconds); } else if (event.key === 'ArrowRight') { event.preventDefault(); seek(currentTime + skipSeconds); } else if (event.key.toLowerCase() === 'm') { event.preventDefault(); toggleMute(); } };
  const hasSource = Boolean(src || sources?.length);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const wrapperStyle = { ...(width !== undefined && { width: typeof width === 'number' ? `${width}px` : width }), ...style } as CSSProperties;
  return <div aria-label={ariaLabel} className={cx('mm-audio-player', `mm-audio-player--${size}`, compact && 'mm-audio-player--compact', failed && 'mm-audio-player--failed', className)} onKeyDown={handleKeyDown} role="region" style={wrapperStyle} tabIndex={0}>
    {hasSource && !failed ? <audio autoPlay={autoPlay} loop={loop} muted={isMuted} onDurationChange={(event) => setDuration(event.currentTarget.duration)} onEnded={() => { setPaused(true); onEnded?.(); }} onError={(event) => { setFailed(true); onError?.(event); }} onLoadedMetadata={(event) => { setDuration(event.currentTarget.duration); event.currentTarget.playbackRate = defaultPlaybackRate; }} onPause={() => { setPaused(true); onPause?.(); }} onPlay={() => { setPaused(false); onPlay?.(); }} onTimeUpdate={(event) => { const nextTime = event.currentTarget.currentTime; setCurrentTime(nextTime); onTimeUpdate?.(nextTime, event.currentTarget.duration); }} preload={preload} ref={audioRef}>{sources?.map((source) => <source key={`${source.src}-${source.type ?? ''}`} src={source.src} type={source.type} />)}{!sources && src ? <source src={src} /> : null}</audio> : null}
    {failed || !hasSource ? <div className="mm-audio-player__fallback">{fallback}</div> : <><div className="mm-audio-player__main">{artwork ? <img alt="" className="mm-audio-player__artwork" src={artwork} /> : <div aria-hidden="true" className="mm-audio-player__artwork mm-audio-player__artwork--placeholder"><span>♪</span></div>}<div className="mm-audio-player__info"><div className="mm-audio-player__title">{title ?? 'Audio track'}</div>{artist ? <div className="mm-audio-player__artist">{artist}</div> : null}</div></div><div className="mm-audio-player__controls"><input aria-label="Audio progress" className="mm-audio-player__progress" max={duration || 0} min="0" onChange={(event) => seek(Number(event.target.value))} style={{ '--mm-audio-progress': `${progress}%` } as CSSProperties} type="range" value={currentTime} /><div className="mm-audio-player__row"><button aria-label="Rewind" className="mm-audio-player__button" onClick={() => seek(currentTime - skipSeconds)} type="button"><Rewind size={16} /></button><button aria-label={paused ? 'Play audio' : 'Pause audio'} className="mm-audio-player__button mm-audio-player__button--primary" onClick={togglePlay} type="button">{paused ? <Play fill="currentColor" size={18} /> : <Pause fill="currentColor" size={18} />}</button><button aria-label="Fast forward" className="mm-audio-player__button" onClick={() => seek(currentTime + skipSeconds)} type="button"><FastForward size={16} /></button>{showVolumeControl && <><button aria-label={isMuted || volume === 0 ? 'Unmute audio' : 'Mute audio'} className="mm-audio-player__button" onClick={toggleMute} type="button">{isMuted || volume === 0 ? <SpeakerX size={17} /> : <SpeakerHigh size={17} />}</button><input aria-label="Volume" className="mm-audio-player__volume" max="1" min="0" onChange={(event) => changeVolume(Number(event.target.value))} step="0.01" type="range" value={isMuted ? 0 : volume} /></>}<span className="mm-audio-player__time">{formatTime(currentTime)} / {formatTime(duration)}</span><span className="mm-audio-player__spacer" />{showPlaybackRateControl && <div className="mm-audio-player__settings"><button aria-expanded={settingsOpen} aria-label="Playback settings" className="mm-audio-player__button" onClick={() => setGearOpen((value) => !value)} type="button"><Gear size={17} /></button>{settingsOpen && <div className="mm-audio-player__rates">{rates.map((value) => <button className={cx(value === rate && 'mm-audio-player__rate--active')} key={value} onClick={() => { setRate(value); setGearOpen(false); }} type="button">{value}×</button>)}</div>}</div>}{download && src ? <a aria-label="Download audio" className="mm-audio-player__button" download href={src}><Download size={17} /></a> : null}</div></div></>}
  </div>;
}
