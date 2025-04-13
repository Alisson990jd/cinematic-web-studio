
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Film, 
  Image, 
  Music, 
  Type, 
  Upload, 
  FolderOpen,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock media items for demonstration
const mediaItems = [
  { id: 1, type: 'video', name: 'interview.mp4', duration: '00:02:15' },
  { id: 2, type: 'video', name: 'drone_shot.mp4', duration: '00:01:45' },
  { id: 3, type: 'image', name: 'background.jpg' },
  { id: 4, type: 'audio', name: 'soundtrack.mp3', duration: '00:03:20' },
  { id: 5, type: 'audio', name: 'voiceover.mp3', duration: '00:00:45' },
  { id: 6, type: 'text', name: 'Title template' },
  { id: 7, type: 'video', name: 'b-roll.mp4', duration: '00:00:55' },
];

const MediaLibrary: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-full flex flex-col bg-editor-bg-dark border-r border-editor-border">
      <div className="panel-header">
        <span>Media Library</span>
      </div>
      
      <div className={`${isMobile ? 'p-2' : 'p-3'} border-b border-editor-border`}>
        <div className="flex space-x-2 mb-3">
          <button className="editor-btn">
            <Upload className="h-4 w-4" />
          </button>
          <button className="editor-btn">
            <FolderOpen className="h-4 w-4" />
          </button>
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-editor-text-secondary" />
            <Input 
              placeholder="Search" 
              className="h-8 pl-8 text-sm bg-editor-bg-darker border-editor-border" 
            />
          </div>
        </div>
        
        <div className="flex space-x-1">
          <button className="editor-btn active">
            <Film className="h-4 w-4" />
          </button>
          <button className="editor-btn">
            <Image className="h-4 w-4" />
          </button>
          <button className="editor-btn">
            <Music className="h-4 w-4" />
          </button>
          <button className="editor-btn">
            <Type className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {mediaItems.map(item => (
          <div 
            key={item.id} 
            className={`p-2 mb-2 rounded cursor-pointer hover:bg-editor-bg-light flex items-center ${isMobile ? 'text-xs' : 'text-sm'}`}
            draggable="true"
          >
            {item.type === 'video' && <Film className="h-4 w-4 mr-2 text-editor-clip-video" />}
            {item.type === 'image' && <Image className="h-4 w-4 mr-2 text-editor-clip-video" />}
            {item.type === 'audio' && <Music className="h-4 w-4 mr-2 text-editor-clip-audio" />}
            {item.type === 'text' && <Type className="h-4 w-4 mr-2 text-editor-clip-text" />}
            
            <div className="flex-1 truncate">
              <div className="font-medium truncate">{item.name}</div>
              {item.duration && (
                <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-editor-text-secondary`}>
                  {item.duration}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;
