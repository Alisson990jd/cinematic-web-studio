
import React from 'react';
import { 
  Layers, 
  Wand2, 
  SlidersHorizontal, 
  LayoutGrid, 
  Tv2, 
  Pause,
  Type,
  Music,
  MoveHorizontal,
  ZoomIn,
  Clock,
} from 'lucide-react';

const EditorToolbar: React.FC = () => {
  return (
    <div className="w-14 bg-editor-bg-darker border-r border-editor-border flex flex-col items-center py-3">
      <div className="flex flex-col space-y-1 mb-6">
        <button className="editor-btn active" title="Select Tool">
          <MoveHorizontal className="h-5 w-5" />
        </button>
        <button className="editor-btn" title="Cut Tool">
          <Pause className="h-5 w-5" />
        </button>
        <button className="editor-btn" title="Text Tool">
          <Type className="h-5 w-5" />
        </button>
        <button className="editor-btn" title="Audio Tool">
          <Music className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex flex-col space-y-1 mb-6">
        <button className="editor-btn" title="Effects">
          <Wand2 className="h-5 w-5" />
        </button>
        <button className="editor-btn" title="Layers">
          <Layers className="h-5 w-5" />
        </button>
        <button className="editor-btn" title="Color Correction">
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex flex-col space-y-1">
        <button className="editor-btn" title="Zoom">
          <ZoomIn className="h-5 w-5" />
        </button>
        <button className="editor-btn" title="Grid View">
          <LayoutGrid className="h-5 w-5" />
        </button>
        <button className="editor-btn" title="Preview">
          <Tv2 className="h-5 w-5" />
        </button>
        <button className="editor-btn" title="Timeline">
          <Clock className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;
