import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, Square, Play, Trash2, Loader2 } from 'lucide-react';
import { uploadPronunciation, getMyPronunciation, deletePronunciation } from '../../services/pronunciationService';

const MAX_RECORDING_TIME = 30; // seconds

/**
 * PronunciationRecorder - A reusable component for recording student pronunciation
 * @param {string} vocabularyId - The vocabulary ID to associate the recording with
 * @param {string} className - Additional CSS classes
 */
export function PronunciationRecorder({ vocabularyId, className = '' }) {
  // States: idle, recording, recorded, playing
  const [status, setStatus] = useState('idle'); // idle | recording | recorded | playing
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [existingRecording, setExistingRecording] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const chunksRef = useRef([]);

  // Fetch existing recording on mount
  useEffect(() => {
    if (vocabularyId) {
      fetchExistingRecording();
    }

    return () => {
      // Cleanup on unmount
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      // Only revoke blob URLs (local recordings), not full URLs from server
      if (audioUrl && audioUrl.startsWith('blob:')) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [vocabularyId]);

  const fetchExistingRecording = async () => {
    try {
      setLoading(true);
      const data = await getMyPronunciation(vocabularyId);
      console.log('Fetched recording data:', data);
      if (data && data.audioUrl) {
        setExistingRecording(data);
        setAudioUrl(data.audioUrl);
        console.log('Set audioUrl:', data.audioUrl);
        setStatus('recorded');
      }
    } catch (err) {
      // No existing recording is fine, just set to idle
      console.log('No existing recording found');
      setStatus('idle');
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      setError(null);
      
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        
        // Create audio blob
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        
        // Create URL for playback
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setStatus('recorded');
        
        // Upload to server
        await uploadAudio(audioBlob);
      };

      // Start recording
      mediaRecorder.start(100);
      setStatus('recording');
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= MAX_RECORDING_TIME - 1) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err) {
      console.error('Error starting recording:', err);
      if (err.name === 'NotAllowedError') {
        setError('Microphone permission denied. Please allow microphone access to record.');
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found. Please connect a microphone and try again.');
      } else {
        setError('Failed to start recording. Please try again.');
      }
    }
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, []);

  const uploadAudio = async (audioBlob) => {
    try {
      setLoading(true);
      const file = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
      console.log('Uploading audio file:', file, 'vocabularyId:', vocabularyId);
      const result = await uploadPronunciation(vocabularyId, file, 'pending');
      console.log('Upload result:', result);
      // Update audioUrl with the returned URL from server
      if (result && result.audioUrl) {
        setAudioUrl(result.audioUrl);
        console.log('Updated audioUrl from server:', result.audioUrl);
      }
    } catch (err) {
      console.error('Error uploading audio:', err);
      setError('Recording saved locally but failed to upload. You can try again.');
    } finally {
      setLoading(false);
    }
  };

  const playRecording = () => {
    console.log('Play recording - audioUrl:', audioUrl, 'audioRef:', audioRef.current);
    if (audioRef.current) {
      console.log('Audio src:', audioRef.current.src);
      audioRef.current.play();
      setStatus('playing');
    }
  };

  // CRITICAL: Stop playback immediately - not just pause
  const stopPlayback = () => {
    console.log('Stop playback - audioRef:', audioRef.current);
    if (audioRef.current) {
      console.log('Current time before stop:', audioRef.current.currentTime);
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      console.log('Current time after stop:', audioRef.current.currentTime);
      setStatus('recorded');
    }
  };

  const handleAudioEnded = () => {
    setStatus('recorded');
  };

  const handleDelete = async () => {
    if (!existingRecording?.id) {
      // Just reset locally if no server recording
      resetRecording();
      return;
    }

    try {
      setLoading(true);
      await deletePronunciation(existingRecording.id);
      resetRecording();
      setExistingRecording(null);
    } catch (err) {
      console.error('Error deleting recording:', err);
      setError('Failed to delete recording. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetRecording = () => {
    // Only revoke blob URLs (local recordings), not full URLs from server
    if (audioUrl && audioUrl.startsWith('blob:')) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setStatus('idle');
    setRecordingTime(0);
    setError(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* Error Message */}
      {error && (
        <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Audio Player (hidden, used for playback) */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={handleAudioEnded}
        className="hidden"
      />

      {/* Recording Timer */}
      {status === 'recording' && (
        <div className="flex items-center gap-2 text-red-600">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
          <span className="text-lg font-mono font-semibold">
            {formatTime(recordingTime)} / {formatTime(MAX_RECORDING_TIME)}
          </span>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Record/Stop Button */}
        {status !== 'playing' && (
          <button
            onClick={status === 'recording' ? stopRecording : startRecording}
            disabled={loading}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm
              transition-all duration-200
              ${status === 'recording'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-slate-900 text-white hover:bg-slate-800'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === 'recording' ? (
              <>
                <Square className="w-4 h-4" />
                Stop
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                Record
              </>
            )}
          </button>
        )}

        {/* Play Button (when recorded) */}
        {status === 'recorded' && audioUrl && (
          <button
            onClick={playRecording}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full font-semibold text-sm hover:bg-blue-700 transition-all duration-200"
          >
            <Play className="w-4 h-4" />
            Play
          </button>
        )}

        {/* Stop Button (when playing) - STOPS immediately, does not pause */}
        {status === 'playing' && (
          <button
            onClick={stopPlayback}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-full font-semibold text-sm hover:bg-red-700 transition-all duration-200"
          >
            <Square className="w-4 h-4" />
            Stop
          </button>
        )}

        {/* Delete Button (when recorded) */}
        {status === 'recorded' && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-full font-semibold text-sm hover:bg-red-50 hover:text-red-600 transition-all duration-200 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>

      {/* Status Text */}
      {status === 'idle' && (
        <p className="text-sm text-slate-500">
          Click "Record" to practice pronunciation (max {MAX_RECORDING_TIME} seconds)
        </p>
      )}
      {status === 'recording' && (
        <p className="text-sm text-red-500 font-medium">
          Recording... Click "Stop" when finished
        </p>
      )}
      {status === 'recorded' && (
        <p className="text-sm text-green-600 font-medium">
          Recording complete! Play back or re-record
        </p>
      )}
      {status === 'playing' && (
        <p className="text-sm text-blue-600 font-medium">
          Playing back your recording...
        </p>
      )}
    </div>
  );
}

export default PronunciationRecorder;