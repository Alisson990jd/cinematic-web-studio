
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import EditorHeader from './EditorHeader';
import EditorToolbar from './EditorToolbar';
import MediaLibrary from './MediaLibrary';
import PreviewPanel from './PreviewPanel';
import Timeline from './Timeline';
import PropertiesPanel from './PropertiesPanel';
import { Menu, X, PanelLeft, PanelRight } from 'lucide-react';
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';

const VideoEditor: React.FC = () => {
  const isMobile = useIsMobile();
  const [showMediaLibrary, setShowMediaLibrary] = useState(!isMobile);
  const [showProperties, setShowProperties] = useState(!isMobile);
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <EditorHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <EditorToolbar />
        
        {/* Mobile: Use drawers for panels */}
        {isMobile ? (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex items-center p-1.5 bg-editor-bg-darker border-b border-editor-border">
              <Drawer>
                <DrawerTrigger asChild>
                  <button className="editor-btn mr-1">
                    <PanelLeft className="h-4 w-4" />
                    <span className="sr-only">Media Library</span>
                  </button>
                </DrawerTrigger>
                <DrawerContent className="h-[85vh]">
                  <div className="h-full">
                    <MediaLibrary />
                  </div>
                </DrawerContent>
              </Drawer>
              
              <Drawer>
                <DrawerTrigger asChild>
                  <button className="editor-btn">
                    <PanelRight className="h-4 w-4" />
                    <span className="sr-only">Properties</span>
                  </button>
                </DrawerTrigger>
                <DrawerContent className="h-[85vh]">
                  <div className="h-full">
                    <PropertiesPanel />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <PreviewPanel />
            </div>
            
            <div className="h-48 min-h-[8rem] max-h-[30vh] border-t border-editor-border">
              <Timeline />
            </div>
          </div>
        ) : (
          // Desktop layout
          <div className="flex flex-1 overflow-hidden">
            {showMediaLibrary && (
              <div className="w-64 flex-shrink-0 relative">
                <button 
                  className="absolute right-2 top-2 z-10 editor-btn" 
                  onClick={() => setShowMediaLibrary(false)}
                  title="Hide Media Library"
                >
                  <X className="h-4 w-4" />
                </button>
                <MediaLibrary />
              </div>
            )}
            
            <div className="flex flex-col flex-1 overflow-hidden">
              {!showMediaLibrary && (
                <button 
                  className="absolute left-16 top-14 z-10 editor-btn bg-editor-bg-dark" 
                  onClick={() => setShowMediaLibrary(true)}
                  title="Show Media Library"
                >
                  <PanelLeft className="h-4 w-4" />
                </button>
              )}
              
              <div className="h-1/2">
                <PreviewPanel />
              </div>
              
              <div className="flex-1">
                <Timeline />
              </div>
            </div>
            
            {showProperties && (
              <div className="w-72 flex-shrink-0 relative">
                <button 
                  className="absolute left-2 top-2 z-10 editor-btn" 
                  onClick={() => setShowProperties(false)}
                  title="Hide Properties"
                >
                  <X className="h-4 w-4" />
                </button>
                <PropertiesPanel />
              </div>
            )}
            
            {!showProperties && (
              <button 
                className="absolute right-2 top-14 z-10 editor-btn bg-editor-bg-dark" 
                onClick={() => setShowProperties(true)}
                title="Show Properties"
              >
                <PanelRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoEditor;
