
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Upload, Download, Settings, Share2, HelpCircle } from 'lucide-react';

const EditorHeader: React.FC = () => {
  return (
    <header className="h-12 px-4 bg-editor-bg-darker border-b border-editor-border flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-semibold mr-6">CinematicWeb Studio</h1>
        <div className="flex space-x-1 text-sm">
          <button className="px-3 py-1 hover:bg-editor-bg-light rounded-sm">File</button>
          <button className="px-3 py-1 hover:bg-editor-bg-light rounded-sm">Edit</button>
          <button className="px-3 py-1 hover:bg-editor-bg-light rounded-sm">View</button>
          <button className="px-3 py-1 hover:bg-editor-bg-light rounded-sm">Clip</button>
          <button className="px-3 py-1 hover:bg-editor-bg-light rounded-sm">Effects</button>
          <button className="px-3 py-1 hover:bg-editor-bg-light rounded-sm">Audio</button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="text-editor-text-secondary">
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
        <Button variant="ghost" size="sm" className="text-editor-text-secondary">
          <Upload className="h-4 w-4 mr-1" />
          Import
        </Button>
        <Button variant="ghost" size="sm" className="text-editor-text-secondary">
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
        <Button variant="ghost" size="icon" className="text-editor-text-secondary">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-editor-text-secondary">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-editor-text-secondary">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default EditorHeader;
