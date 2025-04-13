
import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronRight, LockIcon, EyeIcon, Volume2 } from 'lucide-react';

// Demo timeline clips
const initialClips = [
  { id: 1, type: 'video', track: 1, start: 0, end: 250, name: 'interview.mp4' },
  { id: 2, type: 'video', track: 1, start: 270, end: 470, name: 'b-roll.mp4' },
  { id: 3, type: 'audio', track: 3, start: 0, end: 320, name: 'soundtrack.mp3' },
  { id: 4, type: 'audio', track: 4, start: 120, end: 250, name: 'voiceover.mp3' },
  { id: 5, type: 'text', track: 2, start: 50, end: 200, name: 'Title' },
];

// Track configurations
const tracks = [
  { id: 1, name: 'Video 1', type: 'video', visible: true, locked: false },
  { id: 2, name: 'Text', type: 'text', visible: true, locked: false },
  { id: 3, name: 'Audio 1', type: 'audio', visible: true, locked: false },
  { id: 4, name: 'Audio 2', type: 'audio', visible: true, locked: false },
];

const Timeline: React.FC = () => {
  const [clips, setClips] = useState(initialClips);
  const [playheadPosition, setPlayheadPosition] = useState(120);
  const [zoom, setZoom] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Map to translate time to pixels
  const timeToPixels = (time: number) => time * zoom;
  
  // Create time markers for the ruler
  const generateTimeMarkers = () => {
    const totalDuration = 600; // 10 minutes in seconds
    const markers = [];
    const interval = 60; // 1 minute intervals
    
    for (let time = 0; time <= totalDuration; time += interval) {
      const position = timeToPixels(time);
      markers.push(
        <div 
          key={time}
          className="timeline-ruler-mark"
          style={{ left: `${position}px` }}
        >
          <span className="px-1">
            {`${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`}
          </span>
        </div>
      );
    }
    
    return markers;
  };
  
  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    setPlayheadPosition(clickX);
  };
  
  return (
    <div className="flex flex-col h-full bg-editor-bg-dark">
      <div className="panel-header">
        <span>Timeline</span>
      </div>
      
      <div className="flex border-b border-editor-border">
        <div className="w-48 flex-shrink-0 bg-editor-bg-darker p-2">
          <div className="flex items-center space-x-2">
            <button className="editor-btn">
              <ChevronDown className="h-4 w-4" />
            </button>
            <span className="text-xs font-medium">All Tracks</span>
          </div>
        </div>
        
        <div className="timeline-ruler flex-1 relative">
          {generateTimeMarkers()}
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Track labels */}
        <div className="w-48 flex-shrink-0 overflow-y-auto">
          {tracks.map(track => (
            <div key={track.id} className="h-20 border-b border-editor-border bg-editor-bg-darker flex items-center p-2">
              <div className="flex items-center w-full">
                <button className="editor-btn mr-0.5">
                  <ChevronRight className="h-4 w-4" />
                </button>
                
                <span className="text-xs font-medium flex-1">{track.name}</span>
                
                <div className="flex space-x-1">
                  <button className="editor-btn">
                    <EyeIcon className="h-3.5 w-3.5" />
                  </button>
                  <button className="editor-btn">
                    <LockIcon className="h-3.5 w-3.5" />
                  </button>
                  {track.type === 'audio' && (
                    <button className="editor-btn">
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Timeline area */}
        <div 
          ref={timelineRef} 
          className="flex-1 overflow-x-auto overflow-y-auto relative"
          onClick={handleTimelineClick}
        >
          {/* Playhead */}
          <div 
            className="playhead" 
            style={{ left: `${playheadPosition}px` }}
          />
          
          {/* Tracks */}
          {tracks.map(track => (
            <div key={track.id} className="timeline-track">
              {/* Render clips that belong to this track */}
              {clips
                .filter(clip => clip.track === track.id)
                .map(clip => {
                  const clipStyle = {
                    left: `${timeToPixels(clip.start)}px`,
                    width: `${timeToPixels(clip.end - clip.start)}px`,
                  };
                  
                  return (
                    <div 
                      key={clip.id}
                      className={`timeline-clip ${clip.type}`}
                      style={clipStyle}
                      title={clip.name}
                    >
                      <div className="p-1 text-xs truncate">
                        {clip.name}
                      </div>
                    </div>
                  );
                })
              }
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-6 border-t border-editor-border flex items-center justify-between px-3 bg-editor-bg-darker">
        <div className="text-xs text-editor-text-secondary">
          00:01:20 / 00:10:00
        </div>
        
        <div className="flex items-center">
          <span className="text-xs text-editor-text-secondary mr-2">Zoom:</span>
          <input 
            type="range" 
            min="0.5" 
            max="3" 
            step="0.1" 
            value={zoom} 
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
