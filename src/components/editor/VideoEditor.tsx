
import React from 'react';
import EditorHeader from './EditorHeader';
import EditorToolbar from './EditorToolbar';
import MediaLibrary from './MediaLibrary';
import PreviewPanel from './PreviewPanel';
import Timeline from './Timeline';
import PropertiesPanel from './PropertiesPanel';

const VideoEditor: React.FC = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <EditorHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <EditorToolbar />
        
        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 flex-shrink-0">
            <MediaLibrary />
          </div>
          
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="h-1/2">
              <PreviewPanel />
            </div>
            
            <div className="flex-1">
              <Timeline />
            </div>
          </div>
          
          <div className="w-72 flex-shrink-0">
            <PropertiesPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
