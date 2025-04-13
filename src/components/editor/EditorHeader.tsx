
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Download, Share2, Undo, Redo, Settings, Menu, Play, Save } from 'lucide-react';
import { useEditor } from '@/context/EditorContext';
import { Button } from '@/components/ui/button';
import ServerConnection from './ServerConnection';

const EditorHeader: React.FC = () => {
  const isMobile = useIsMobile();
  const { isServerConnected, isProcessing } = useEditor();
  
  return (
    <header className="bg-editor-bg-darker border-b border-editor-border py-2 px-3 flex items-center justify-between">
      <div className="flex items-center">
        <div className="mr-4 text-white font-semibold text-lg">VideoFX</div>
        
        {!isMobile && (
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="text-editor-text">
              <Undo className="h-4 w-4 mr-1" />
              <span>Desfazer</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-editor-text">
              <Redo className="h-4 w-4 mr-1" />
              <span>Refazer</span>
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <ServerConnection />
        
        {!isMobile && (
          <>
            <Button variant="outline" size="sm" className="text-editor-text">
              <Save className="h-4 w-4 mr-1" />
              <span>Salvar</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-editor-text"
              disabled={!isServerConnected}
            >
              <Play className="h-4 w-4 mr-1" />
              <span>Preview</span>
            </Button>
          </>
        )}
        
        <Button 
          variant={isServerConnected ? "default" : "outline"} 
          size="sm"
          disabled={!isServerConnected || isProcessing}
        >
          <Download className="h-4 w-4 mr-1" />
          <span>{isProcessing ? "Processando..." : "Exportar"}</span>
        </Button>
        
        {isMobile ? (
          <Button variant="ghost" size="icon" className="text-editor-text">
            <Menu className="h-5 w-5" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="text-editor-text">
            <Settings className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default EditorHeader;
