
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { 
  Save, 
  Upload, 
  Download, 
  Settings, 
  Share2, 
  HelpCircle,
  Menu,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const EditorHeader: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="h-12 px-4 bg-editor-bg-darker border-b border-editor-border flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold mr-6 whitespace-nowrap">CinematicWeb Studio</h1>
        
        {!isMobile && (
          <div className="flex space-x-1 text-sm">
            <button className="px-3 py-1 hover:bg-editor-bg-light rounded-sm">File</button>
            <button className="px-3 py-1 hover:bg-editor-bg-light rounded-sm">Edit</button>
            <button className="px-3 py-1 hover:bg-editor-bg-light rounded-sm">View</button>
            <button className="px-3 py-1 hover:bg-editor-bg-light rounded-sm hidden md:block">Clip</button>
            <button className="px-3 py-1 hover:bg-editor-bg-light rounded-sm hidden lg:block">Effects</button>
            <button className="px-3 py-1 hover:bg-editor-bg-light rounded-sm hidden lg:block">Audio</button>
          </div>
        )}
        
        {isMobile && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-editor-bg-dark border-editor-border">
              <DropdownMenuItem className="text-editor-text-primary hover:bg-editor-bg-light">File</DropdownMenuItem>
              <DropdownMenuItem className="text-editor-text-primary hover:bg-editor-bg-light">Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-editor-text-primary hover:bg-editor-bg-light">View</DropdownMenuItem>
              <DropdownMenuItem className="text-editor-text-primary hover:bg-editor-bg-light">Clip</DropdownMenuItem>
              <DropdownMenuItem className="text-editor-text-primary hover:bg-editor-bg-light">Effects</DropdownMenuItem>
              <DropdownMenuItem className="text-editor-text-primary hover:bg-editor-bg-light">Audio</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      
      <div className="flex items-center space-x-1">
        {!isMobile ? (
          <>
            <Button variant="ghost" size="sm" className="text-editor-text-secondary hidden sm:flex">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="ghost" size="sm" className="text-editor-text-secondary hidden md:flex">
              <Upload className="h-4 w-4 mr-1" />
              Import
            </Button>
            <Button variant="ghost" size="sm" className="text-editor-text-secondary hidden md:flex">
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
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-editor-text-secondary">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-editor-bg-dark border-editor-border">
              <DropdownMenuItem className="text-editor-text-primary hover:bg-editor-bg-light">
                <Save className="h-4 w-4 mr-2" />
                Save
              </DropdownMenuItem>
              <DropdownMenuItem className="text-editor-text-primary hover:bg-editor-bg-light">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </DropdownMenuItem>
              <DropdownMenuItem className="text-editor-text-primary hover:bg-editor-bg-light">
                <Download className="h-4 w-4 mr-2" />
                Export
              </DropdownMenuItem>
              <DropdownMenuItem className="text-editor-text-primary hover:bg-editor-bg-light">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-editor-text-primary hover:bg-editor-bg-light">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="text-editor-text-primary hover:bg-editor-bg-light">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default EditorHeader;
