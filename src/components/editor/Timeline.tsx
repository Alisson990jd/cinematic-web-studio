
import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronRight, LockIcon, EyeIcon, Volume2, Plus, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Demo timeline clips with extended properties
const initialClips = [
  { 
    id: 1, 
    type: 'video', 
    track: 1, 
    start: 0, 
    end: 250, 
    name: 'interview.mp4',
    color: '#6366f1',
    effects: ['color-correction'],
    transitions: { in: null, out: 'fade' }
  },
  { 
    id: 2, 
    type: 'video', 
    track: 1, 
    start: 270, 
    end: 470, 
    name: 'b-roll.mp4',
    color: '#6366f1',
    effects: [],
    transitions: { in: 'fade', out: null }
  },
  { 
    id: 3, 
    type: 'audio', 
    track: 3, 
    start: 0, 
    end: 320, 
    name: 'soundtrack.mp3',
    color: '#60a5fa',
    effects: ['eq', 'compression'],
    transitions: { in: null, out: 'fade' }
  },
  { 
    id: 4, 
    type: 'audio', 
    track: 4, 
    start: 120, 
    end: 250, 
    name: 'voiceover.mp3',
    color: '#60a5fa',
    effects: ['noise-reduction'],
    transitions: { in: 'fade', out: 'fade' }
  },
  { 
    id: 5, 
    type: 'text', 
    track: 2, 
    start: 50, 
    end: 200, 
    name: 'Title',
    color: '#a78bfa',
    effects: ['animation'],
    transitions: { in: 'fade', out: null }
  },
  { 
    id: 6, 
    type: 'effect', 
    track: 5, 
    start: 150, 
    end: 350, 
    name: 'Color Grade',
    color: '#f97316',
    effects: ['lut-cinematic'],
    transitions: { in: 'fade', out: 'fade' }
  },
];

// Enhanced track configurations
const initialTracks = [
  { id: 1, name: 'Video 1', type: 'video', visible: true, locked: false, color: '#6366f1' },
  { id: 2, name: 'Text', type: 'text', visible: true, locked: false, color: '#a78bfa' },
  { id: 3, name: 'Audio 1', type: 'audio', visible: true, locked: false, color: '#60a5fa' },
  { id: 4, name: 'Audio 2', type: 'audio', visible: true, locked: false, color: '#60a5fa' },
  { id: 5, name: 'Effects', type: 'effect', visible: true, locked: false, color: '#f97316' },
];

const Timeline: React.FC = () => {
  const [clips, setClips] = useState(initialClips);
  const [tracks, setTracks] = useState(initialTracks);
  const [playheadPosition, setPlayheadPosition] = useState(120);
  const [zoom, setZoom] = useState(1);
  const [selectedClip, setSelectedClip] = useState<number | null>(null);
  const [isMultitrackExpanded, setIsMultitrackExpanded] = useState(true);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Map to translate time to pixels
  const timeToPixels = (time: number) => time * zoom;
  
  // Create time markers for the ruler
  const generateTimeMarkers = () => {
    const totalDuration = 600; // 10 minutes in seconds
    const markers = [];
    const interval = zoom > 1.5 ? 30 : 60; // Adjust marker density based on zoom
    
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
    // Deselect any selected clip
    setSelectedClip(null);
  };
  
  const handleClipClick = (e: React.MouseEvent, clipId: number) => {
    e.stopPropagation();
    setSelectedClip(clipId);
  };
  
  const toggleTrackVisibility = (trackId: number) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, visible: !track.visible } : track
    ));
  };
  
  const toggleTrackLock = (trackId: number) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, locked: !track.locked } : track
    ));
  };
  
  const addNewTrack = (type: 'video' | 'audio' | 'text' | 'effect') => {
    const tracksOfType = tracks.filter(track => track.type === type);
    const newTrackNumber = tracksOfType.length + 1;
    
    let color;
    switch(type) {
      case 'video': color = '#6366f1'; break;
      case 'audio': color = '#60a5fa'; break;
      case 'text': color = '#a78bfa'; break;
      case 'effect': color = '#f97316'; break;
      default: color = '#6366f1';
    }
    
    const newTrack = {
      id: Math.max(...tracks.map(track => track.id)) + 1,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${newTrackNumber}`,
      type,
      visible: true,
      locked: false,
      color
    };
    
    setTracks([...tracks, newTrack]);
  };
  
  const removeTrack = (trackId: number) => {
    // First remove any clips on this track
    setClips(clips.filter(clip => clip.track !== trackId));
    // Then remove the track
    setTracks(tracks.filter(track => track.id !== trackId));
  };
  
  const toggleMultitrackExpand = () => {
    setIsMultitrackExpanded(!isMultitrackExpanded);
  };
  
  return (
    <div className="flex flex-col h-full bg-editor-bg-dark">
      <div className="panel-header flex justify-between items-center">
        <span>Timeline</span>
        <div className="flex items-center space-x-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Plus className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => addNewTrack('video')}
                >
                  <div className="w-3 h-3 bg-indigo-500 rounded-sm mr-2" />
                  Add Video Track
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => addNewTrack('audio')}
                >
                  <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2" />
                  Add Audio Track
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => addNewTrack('text')}
                >
                  <div className="w-3 h-3 bg-purple-500 rounded-sm mr-2" />
                  Add Text Track
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => addNewTrack('effect')}
                >
                  <div className="w-3 h-3 bg-orange-500 rounded-sm mr-2" />
                  Add Effect Track
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex border-b border-editor-border">
        <div className="w-48 flex-shrink-0 bg-editor-bg-darker p-2">
          <div className="flex items-center space-x-2">
            <button 
              className="editor-btn" 
              onClick={toggleMultitrackExpand}
            >
              {isMultitrackExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
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
          {isMultitrackExpanded && tracks.map(track => (
            <div 
              key={track.id} 
              className="h-20 border-b border-editor-border bg-editor-bg-darker flex items-center p-2"
              style={{
                opacity: track.visible ? 1 : 0.5
              }}
            >
              <div className="flex items-center w-full">
                <button className="editor-btn mr-0.5">
                  <ChevronRight className="h-4 w-4" />
                </button>
                
                <div 
                  className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0" 
                  style={{ backgroundColor: track.color }}
                />
                
                <span className="text-xs font-medium flex-1 truncate">{track.name}</span>
                
                <div className="flex space-x-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        className={`editor-btn ${!track.visible ? 'opacity-50' : ''}`}
                        onClick={() => toggleTrackVisibility(track.id)}
                      >
                        <EyeIcon className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      {track.visible ? 'Hide Track' : 'Show Track'}
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        className={`editor-btn ${track.locked ? 'bg-editor-bg-light' : ''}`}
                        onClick={() => toggleTrackLock(track.id)}
                      >
                        <LockIcon className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      {track.locked ? 'Unlock Track' : 'Lock Track'}
                    </TooltipContent>
                  </Tooltip>
                  
                  {track.type === 'audio' && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="editor-btn">
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Adjust Volume
                      </TooltipContent>
                    </Tooltip>
                  )}
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        className="editor-btn text-red-400 hover:text-red-500"
                        onClick={() => removeTrack(track.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Delete Track
                    </TooltipContent>
                  </Tooltip>
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
          {isMultitrackExpanded && tracks.map(track => (
            <div 
              key={track.id} 
              className={`timeline-track ${track.locked ? 'bg-editor-bg-light/20' : ''}`}
              style={{ opacity: track.visible ? 1 : 0.5 }}
            >
              {/* Render clips that belong to this track */}
              {clips
                .filter(clip => clip.track === track.id)
                .map(clip => {
                  const clipStyle = {
                    left: `${timeToPixels(clip.start)}px`,
                    width: `${timeToPixels(clip.end - clip.start)}px`,
                    borderColor: selectedClip === clip.id ? 'white' : 'transparent',
                    backgroundColor: clip.color || undefined,
                  };
                  
                  return (
                    <div 
                      key={clip.id}
                      className={`timeline-clip ${clip.type} ${selectedClip === clip.id ? 'ring-2 ring-white' : ''}`}
                      style={clipStyle}
                      onClick={(e) => handleClipClick(e, clip.id)}
                      title={clip.name}
                    >
                      <div className="p-1 text-xs truncate flex items-center h-full">
                        {clip.name}
                        
                        {/* Show clip effects indicators */}
                        {clip.effects && clip.effects.length > 0 && (
                          <div className="ml-auto flex space-x-0.5">
                            {clip.effects.map(effect => (
                              <div 
                                key={effect} 
                                className="w-2 h-2 rounded-full bg-white/70" 
                                title={`Effect: ${effect}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Transition indicators */}
                      {clip.transitions?.in && (
                        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-transparent to-white/20" title={`${clip.transitions.in} transition`} />
                      )}
                      
                      {clip.transitions?.out && (
                        <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-transparent to-white/20" title={`${clip.transitions.out} transition`} />
                      )}
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
