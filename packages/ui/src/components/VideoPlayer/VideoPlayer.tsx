import { ClosedCaptioning, ArrowsOut, ArrowsIn, Pause, Play, Gear, SpeakerHigh, SpeakerX } from '../../icons';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode, type SyntheticEvent } from 'react';
import './VideoPlayer.css';

export type VideoFit = 'contain' | 'cover' | 'fill';
export type VideoPlayerSize = 'sm' | 'default' | 'lg';
export type VideoSource = { src: string; type?: string };
export type VideoTrack = { src: string; kind?: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata'; srcLang?: string; label?: string; default?: boolean };

export type VideoPlayerProps = {
  'aria-label'?: string;
  aspectRatio?: number | string;
  autoHideControls?: boolean;
  autoPlay?: boolean;
  className?: string;
  controls?: boolean;
  defaultPlaybackRate?: number;
  defaultVolume?: number;
  fallback?: ReactNode;
  fit?: VideoFit;
  height?: number | string;
  loop?: boolean;
  muted?: boolean;
  onEnded?: () => void;
  onError?: (event: SyntheticEvent<HTMLVideoElement>) => void;
  onPause?: () => void;
  onPlay?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  playsInline?: boolean;
  poster?: string;
  preload?: 'none' | 'metadata' | 'auto';
  rates?: number[];
  showClosedCaptioningControl?: boolean;
  showFullscreenControl?: boolean;
  showPlaybackRateControl?: boolean;
  showVolumeControl?: boolean;
  size?: VideoPlayerSize;
  sources?: VideoSource[];
  src?: string;
  style?: CSSProperties;
  title?: string;
  track?: VideoTrack;
  videoClassName?: string;
  width?: number | string;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const formatTime = (value: number) => { if (!Number.isFinite(value)) return '0:00'; const seconds = Math.max(0, Math.floor(value)); return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`; };

export function VideoPlayer({ 'aria-label': ariaLabel = 'Video player', aspectRatio = '16 / 9', autoHideControls = false, autoPlay = false, className, controls = true, defaultPlaybackRate = 1, defaultVolume = 1, fallback = 'Video is unavailable', fit = 'contain', height, loop = false, muted = false, onEnded, onError, onPause, onPlay, onTimeUpdate, playsInline = true, poster, preload = 'metadata', rates = [0.5, 1, 1.25, 1.5, 2], showClosedCaptioningControl = true, showFullscreenControl = true, showPlaybackRateControl = true, showVolumeControl = true, size = 'default', sources, src, style, title, track, videoClassName, width }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(Math.min(1, Math.max(0, defaultVolume)));
  const [isMuted, setIsMuted] = useState(muted);
  const [playbackRate, setPlaybackRate] = useState(defaultPlaybackRate);
  const [fullscreen, setFullscreen] = useState(false);
  const [captionsOn, setClosedCaptioningOn] = useState(Boolean(track?.default));
  const [showGear, setShowGear] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => { const video = videoRef.current; if (!video) return; video.volume = volume; video.muted = isMuted; video.playbackRate = playbackRate; }, [isMuted, playbackRate, volume]);
  useEffect(() => { const handleFullscreen = () => setFullscreen(document.fullscreenElement === rootRef.current); document.addEventListener('fullscreenchange', handleFullscreen); return () => document.removeEventListener('fullscreenchange', handleFullscreen); }, []);
  useEffect(() => { if (!track || !videoRef.current?.textTracks[0]) return; videoRef.current.textTracks[0].mode = captionsOn ? 'showing' : 'hidden'; }, [captionsOn, track]);

  const togglePlay = async () => { const video = videoRef.current; if (!video) return; if (video.paused) { try { await video.play(); } catch { /* Browser autoplay policy can reject playback. */ } } else video.pause(); };
  const seek = (nextTime: number) => { const video = videoRef.current; if (!video) return; video.currentTime = nextTime; setCurrentTime(nextTime); };
  const toggleMute = () => { const next = !isMuted; setIsMuted(next); if (next) setVolume(0); else setVolume(volume || 1); };
  const changeVolume = (nextVolume: number) => { setVolume(nextVolume); setIsMuted(nextVolume === 0); };
  const toggleFullscreen = async () => { if (!rootRef.current) return; if (document.fullscreenElement) await document.exitFullscreen(); else await rootRef.current.requestFullscreen?.(); };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => { if (event.target !== rootRef.current) return; if (event.key === ' ' || event.key.toLowerCase() === 'k') { event.preventDefault(); void togglePlay(); } else if (event.key === 'ArrowLeft') { event.preventDefault(); seek(Math.max(0, currentTime - 5)); } else if (event.key === 'ArrowRight') { event.preventDefault(); seek(Math.min(duration, currentTime + 5)); } else if (event.key.toLowerCase() === 'm') { event.preventDefault(); toggleMute(); } else if (event.key.toLowerCase() === 'f') { event.preventDefault(); void toggleFullscreen(); } };
  const wrapperStyle = { '--mm-video-aspect-ratio': aspectRatio, ...(width !== undefined && { width: typeof width === 'number' ? `${width}px` : width }), ...(height !== undefined && { height: typeof height === 'number' ? `${height}px` : height }), ...style } as CSSProperties;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const hasSource = Boolean(src || sources?.length);

  return <div aria-label={ariaLabel} className={cx('mm-video-player', `mm-video-player--${fit}`, `mm-video-player--${size}`, !controls && 'mm-video-player--controls-hidden', autoHideControls && !hovered && 'mm-video-player--controls-idle', fullscreen && 'mm-video-player--fullscreen', className)} onKeyDown={handleKeyDown} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} ref={rootRef} role="region" style={wrapperStyle} tabIndex={0}>
    {hasSource && !failed ? <video autoPlay={autoPlay} className={cx('mm-video-player__video', videoClassName)} loop={loop} muted={isMuted} onClick={togglePlay} onDurationChange={(event) => setDuration(event.currentTarget.duration)} onEnded={() => { setPaused(true); onEnded?.(); }} onError={(event) => { setFailed(true); onError?.(event); }} onLoadedMetadata={(event) => { setDuration(event.currentTarget.duration); event.currentTarget.playbackRate = defaultPlaybackRate; }} onPause={() => { setPaused(true); onPause?.(); }} onPlay={() => { setPaused(false); onPlay?.(); }} onTimeUpdate={(event) => { const nextTime = event.currentTarget.currentTime; setCurrentTime(nextTime); onTimeUpdate?.(nextTime, event.currentTarget.duration); }} playsInline={playsInline} poster={poster} preload={preload} ref={videoRef} title={title}>{sources?.map((source) => <source key={`${source.src}-${source.type ?? ''}`} src={source.src} type={source.type} />)}{!sources && src ? <source src={src} /> : null}{track ? <track default={track.default} kind={track.kind ?? 'captions'} label={track.label} src={track.src} srcLang={track.srcLang} /> : null}</video> : <div className="mm-video-player__fallback">{fallback}</div>}
    {hasSource && !failed && <button aria-label={paused ? 'Play video' : 'Pause video'} className={cx('mm-video-player__center-button', !paused && !hovered && 'mm-video-player__center-button--hidden')} onClick={togglePlay} type="button">{paused ? <Play fill="currentColor" size={28} /> : <Pause fill="currentColor" size={28} />}</button>}
    {controls && hasSource && !failed && <div className="mm-video-player__controls"><input aria-label="Video progress" className="mm-video-player__progress" max={duration || 0} min="0" onChange={(event) => seek(Number(event.target.value))} style={{ '--mm-video-progress': `${progress}%` } as CSSProperties} type="range" value={currentTime} /><div className="mm-video-player__control-row"><button aria-label={paused ? 'Play video' : 'Pause video'} className="mm-video-player__control" onClick={togglePlay} type="button">{paused ? <Play fill="currentColor" size={17} /> : <Pause fill="currentColor" size={17} />}</button>{showVolumeControl && <><button aria-label={isMuted || volume === 0 ? 'Unmute video' : 'Mute video'} className="mm-video-player__control" onClick={toggleMute} type="button">{isMuted || volume === 0 ? <SpeakerX size={17} /> : <SpeakerHigh size={17} />}</button><input aria-label="Volume" className="mm-video-player__volume" max="1" min="0" onChange={(event) => changeVolume(Number(event.target.value))} step="0.01" type="range" value={isMuted ? 0 : volume} /></>}<span className="mm-video-player__time">{formatTime(currentTime)} / {formatTime(duration)}</span><span className="mm-video-player__spacer" />{showClosedCaptioningControl && track && <button aria-label={captionsOn ? 'Hide captions' : 'Show captions'} className={cx('mm-video-player__control', captionsOn && 'mm-video-player__control--active')} onClick={() => setClosedCaptioningOn((value) => !value)} type="button"><ClosedCaptioning size={17} /></button>}{showPlaybackRateControl && <div className="mm-video-player__settings"><button aria-expanded={showGear} aria-label="Playback settings" className="mm-video-player__control" onClick={() => setShowGear((value) => !value)} type="button"><Gear size={17} /></button>{showGear && <div className="mm-video-player__rates">{rates.map((rate) => <button className={cx(rate === playbackRate && 'mm-video-player__rate--active')} key={rate} onClick={() => { setPlaybackRate(rate); setShowGear(false); }} type="button">{rate}×</button>)}</div>}</div>}{showFullscreenControl && <button aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} className="mm-video-player__control" onClick={() => void toggleFullscreen()} type="button">{fullscreen ? <ArrowsIn size={17} /> : <ArrowsOut size={17} />}</button>}</div></div>}
  </div>;
}
