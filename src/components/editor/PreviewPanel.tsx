
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Play, 
  Square, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Maximize2,
  Scissors,
  Split,
  MousePointer,
  Hand
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const PreviewPanel: React.FC = () => {
  const isMobile = useIsMobile();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTool, setCurrentTool] = useState('select');

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col h-full bg-editor-bg-dark border-r border-editor-border">
      <div className="panel-header">
        <span>Preview</span>
      </div>
      
      <div className="flex-1 bg-black flex items-center justify-center">
        <div className="relative w-full max-w-3xl aspect-video bg-editor-bg-darker flex items-center justify-center">
          <span className="text-editor-text-secondary text-sm">Preview area - Drop media to view</span>
        </div>
      </div>
      
      <div className={`p-2 ${isMobile ? 'p-1' : 'p-3'} border-t border-editor-border`}>
        {!isMobile && (
          <div className="flex justify-center space-x-1 mb-3">
            <button 
              className={`editor-btn ${currentTool === 'select' ? 'active' : ''}`}
              onClick={() => setCurrentTool('select')}
            >
              <MousePointer className="h-4 w-4" />
            </button>
            <button 
              className={`editor-btn ${currentTool === 'hand' ? 'active' : ''}`}
              onClick={() => setCurrentTool('hand')}
            >
              <Hand className="h-4 w-4" />
            </button>
            <button 
              className={`editor-btn ${currentTool === 'cut' ? 'active' : ''}`}
              onClick={() => setCurrentTool('cut')}
            >
              <Scissors className="h-4 w-4" />
            </button>
            <button 
              className={`editor-btn ${currentTool === 'split' ? 'active' : ''}`}
              onClick={() => setCurrentTool('split')}
            >
              <Split className="h-4 w-4" />
            </button>
          </div>
        )}
      
        <div className={`flex items-center ${isMobile ? 'justify-between' : 'justify-center space-x-3'}`}>
          {!isMobile && <div className="text-xs text-editor-text-secondary">00:00:15</div>}
          
          <div className="flex items-center space-x-1">
            <button className="editor-btn">
              <SkipBack className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
            </button>
            
            <button 
              className="editor-btn bg-editor-accent hover:bg-editor-accent-hover text-white"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Square className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
              ) : (
                <Play className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
              )}
            </button>
            
            <button className="editor-btn">
              <SkipForward className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
            </button>
          </div>
          
          {!isMobile && <div className="text-xs text-editor-text-secondary">00:02:30</div>}
          
          {!isMobile ? (
            <div className="flex items-center">
              <Volume2 className="h-4 w-4 mr-2 text-editor-text-secondary" />
              <Slider 
                defaultValue={[80]} 
                max={100} 
                step={1}
                className="w-20"
              />
            </div>
          ) : (
            <button className="editor-btn">
              <Volume2 className="h-3.5 w-3.5" />
            </button>
          )}
          
          <button className="editor-btn">
            <Maximize2 className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
