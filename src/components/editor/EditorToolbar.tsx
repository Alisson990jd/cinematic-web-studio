
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
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
import { 
  Tooltip,
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

const EditorToolbar: React.FC = () => {
  const isMobile = useIsMobile();
  
  const renderTooltipButton = (title: string, icon: React.ReactNode, isActive: boolean = false) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button className={`editor-btn ${isActive ? 'active' : ''}`} title={title}>
            {icon}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          {title}
        </TooltipContent>
      </Tooltip>
    );
  };
  
  return (
    <div className={`${isMobile ? 'w-10' : 'w-14'} bg-editor-bg-darker border-r border-editor-border flex flex-col items-center py-3`}>
      <div className="flex flex-col space-y-1 mb-6">
        {renderTooltipButton("Select Tool", <MoveHorizontal className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />, true)}
        {renderTooltipButton("Cut Tool", <Pause className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />)}
        {renderTooltipButton("Text Tool", <Type className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />)}
        {renderTooltipButton("Audio Tool", <Music className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />)}
      </div>
      
      {!isMobile && (
        <>
          <div className="flex flex-col space-y-1 mb-6">
            {renderTooltipButton("Effects", <Wand2 className="h-5 w-5" />)}
            {renderTooltipButton("Layers", <Layers className="h-5 w-5" />)}
            {renderTooltipButton("Color Correction", <SlidersHorizontal className="h-5 w-5" />)}
          </div>
          
          <div className="flex flex-col space-y-1">
            {renderTooltipButton("Zoom", <ZoomIn className="h-5 w-5" />)}
            {renderTooltipButton("Grid View", <LayoutGrid className="h-5 w-5" />)}
            {renderTooltipButton("Preview", <Tv2 className="h-5 w-5" />)}
            {renderTooltipButton("Timeline", <Clock className="h-5 w-5" />)}
          </div>
        </>
      )}
    </div>
  );
};

export default EditorToolbar;
