
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Check, Palette, SlidersHorizontal, Type, FileVideo } from 'lucide-react';

const PropertiesPanel: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-editor-bg-dark border-l border-editor-border">
      <div className="panel-header">
        <span>Properties</span>
      </div>
      
      <Tabs defaultValue="video" className="flex-1">
        <TabsList className="bg-editor-bg-darker border-b border-editor-border w-full justify-start h-10 rounded-none p-0">
          <TabsTrigger 
            value="video" 
            className="rounded-none data-[state=active]:bg-editor-bg-light data-[state=active]:shadow-none h-10"
          >
            <FileVideo className="h-4 w-4 mr-1" />
            <span>Video</span>
          </TabsTrigger>
          <TabsTrigger 
            value="effects" 
            className="rounded-none data-[state=active]:bg-editor-bg-light data-[state=active]:shadow-none h-10"
          >
            <Palette className="h-4 w-4 mr-1" />
            <span>Effects</span>
          </TabsTrigger>
          <TabsTrigger 
            value="text" 
            className="rounded-none data-[state=active]:bg-editor-bg-light data-[state=active]:shadow-none h-10"
          >
            <Type className="h-4 w-4 mr-1" />
            <span>Text</span>
          </TabsTrigger>
          <TabsTrigger 
            value="audio" 
            className="rounded-none data-[state=active]:bg-editor-bg-light data-[state=active]:shadow-none h-10"
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            <span>Audio</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="video" className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Transform</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-editor-text-secondary">Position X</label>
                  <Input type="number" value="0" className="h-8 text-sm bg-editor-bg-darker border-editor-border" />
                </div>
                <div>
                  <label className="text-xs text-editor-text-secondary">Position Y</label>
                  <Input type="number" value="0" className="h-8 text-sm bg-editor-bg-darker border-editor-border" />
                </div>
                <div>
                  <label className="text-xs text-editor-text-secondary">Scale</label>
                  <Input type="number" value="100" className="h-8 text-sm bg-editor-bg-darker border-editor-border" />
                </div>
                <div>
                  <label className="text-xs text-editor-text-secondary">Rotation</label>
                  <Input type="number" value="0" className="h-8 text-sm bg-editor-bg-darker border-editor-border" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Crop</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs text-editor-text-secondary">Top</label>
                    <span className="text-xs">0</span>
                  </div>
                  <Slider defaultValue={[0]} max={100} step={1} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs text-editor-text-secondary">Bottom</label>
                    <span className="text-xs">0</span>
                  </div>
                  <Slider defaultValue={[0]} max={100} step={1} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs text-editor-text-secondary">Left</label>
                    <span className="text-xs">0</span>
                  </div>
                  <Slider defaultValue={[0]} max={100} step={1} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs text-editor-text-secondary">Right</label>
                    <span className="text-xs">0</span>
                  </div>
                  <Slider defaultValue={[0]} max={100} step={1} />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Opacity</h3>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-editor-text-secondary">Opacity</label>
                <span className="text-xs">100%</span>
              </div>
              <Slider defaultValue={[100]} max={100} step={1} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="effects" className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Color Correction</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs text-editor-text-secondary">Brightness</label>
                    <span className="text-xs">0</span>
                  </div>
                  <Slider defaultValue={[0]} min={-100} max={100} step={1} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs text-editor-text-secondary">Contrast</label>
                    <span className="text-xs">0</span>
                  </div>
                  <Slider defaultValue={[0]} min={-100} max={100} step={1} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs text-editor-text-secondary">Saturation</label>
                    <span className="text-xs">0</span>
                  </div>
                  <Slider defaultValue={[0]} min={-100} max={100} step={1} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs text-editor-text-secondary">Temperature</label>
                    <span className="text-xs">0</span>
                  </div>
                  <Slider defaultValue={[0]} min={-100} max={100} step={1} />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Filters</h3>
              <div className="grid grid-cols-3 gap-2">
                <button className="bg-editor-bg-darker hover:bg-editor-bg-light border border-editor-border rounded-sm p-2 text-xs flex flex-col items-center">
                  <div className="w-full h-10 bg-editor-clip-video rounded-sm mb-1"></div>
                  Normal
                </button>
                <button className="bg-editor-bg-darker hover:bg-editor-bg-light border border-editor-border rounded-sm p-2 text-xs flex flex-col items-center">
                  <div className="w-full h-10 bg-gray-700 rounded-sm mb-1"></div>
                  B&W
                </button>
                <button className="bg-editor-bg-darker hover:bg-editor-bg-light border border-editor-border rounded-sm p-2 text-xs flex flex-col items-center">
                  <div className="w-full h-10 bg-yellow-900/60 rounded-sm mb-1"></div>
                  Sepia
                </button>
                <button className="bg-editor-bg-darker hover:bg-editor-bg-light border border-editor-border rounded-sm p-2 text-xs flex flex-col items-center">
                  <div className="w-full h-10 bg-blue-900/40 rounded-sm mb-1"></div>
                  Cool
                </button>
                <button className="bg-editor-bg-darker hover:bg-editor-bg-light border border-editor-border rounded-sm p-2 text-xs flex flex-col items-center">
                  <div className="w-full h-10 bg-orange-900/40 rounded-sm mb-1"></div>
                  Warm
                </button>
                <button className="bg-editor-bg-darker hover:bg-editor-bg-light border border-editor-border rounded-sm p-2 text-xs flex flex-col items-center">
                  <div className="w-full h-10 bg-purple-900/40 rounded-sm mb-1"></div>
                  Dream
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="text" className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Text</h3>
              <textarea 
                className="w-full h-20 p-2 bg-editor-bg-darker border border-editor-border rounded-sm text-sm"
                placeholder="Enter text here..."
                defaultValue="Sample Text"
              />
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Font</h3>
              <select className="w-full h-8 p-2 bg-editor-bg-darker border border-editor-border rounded-sm text-sm">
                <option>Arial</option>
                <option>Helvetica</option>
                <option>Times New Roman</option>
                <option>Courier</option>
                <option>Verdana</option>
              </select>
              
              <div className="flex mt-2 space-x-2">
                <div className="w-1/2">
                  <label className="text-xs text-editor-text-secondary">Size</label>
                  <Input type="number" value="24" className="h-8 text-sm bg-editor-bg-darker border-editor-border" />
                </div>
                <div className="w-1/2">
                  <label className="text-xs text-editor-text-secondary">Line Height</label>
                  <Input type="number" value="1.2" className="h-8 text-sm bg-editor-bg-darker border-editor-border" />
                </div>
              </div>
              
              <div className="flex mt-2 space-x-1">
                <button className="editor-btn active">B</button>
                <button className="editor-btn">I</button>
                <button className="editor-btn">U</button>
                <div className="w-5 h-5 rounded-full bg-white ml-2 border border-editor-border" />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Animation</h3>
              <select className="w-full h-8 p-2 bg-editor-bg-darker border border-editor-border rounded-sm text-sm">
                <option>None</option>
                <option>Fade In</option>
                <option>Slide In</option>
                <option>Pop</option>
                <option>Typewriter</option>
              </select>
              
              <div className="flex justify-between mt-2">
                <label className="text-xs text-editor-text-secondary">Duration</label>
                <span className="text-xs">1s</span>
              </div>
              <Slider defaultValue={[1]} min={0.1} max={5} step={0.1} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="audio" className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Volume</h3>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-editor-text-secondary">Level</label>
                <span className="text-xs">100%</span>
              </div>
              <Slider defaultValue={[100]} max={200} step={1} />
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Equalizer</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-editor-text-secondary text-center block">Low</label>
                  <Slider defaultValue={[0]} min={-12} max={12} step={1} orientation="vertical" className="h-20" />
                  <span className="text-xs block text-center">0 dB</span>
                </div>
                <div>
                  <label className="text-xs text-editor-text-secondary text-center block">Mid</label>
                  <Slider defaultValue={[0]} min={-12} max={12} step={1} orientation="vertical" className="h-20" />
                  <span className="text-xs block text-center">0 dB</span>
                </div>
                <div>
                  <label className="text-xs text-editor-text-secondary text-center block">High</label>
                  <Slider defaultValue={[0]} min={-12} max={12} step={1} orientation="vertical" className="h-20" />
                  <span className="text-xs block text-center">0 dB</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Effects</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="noise-reduction" className="mr-2" />
                  <label htmlFor="noise-reduction" className="text-xs">Noise Reduction</label>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs text-editor-text-secondary">Amount</label>
                    <span className="text-xs">50%</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                
                <div className="flex items-center mt-4">
                  <input type="checkbox" id="reverb" className="mr-2" />
                  <label htmlFor="reverb" className="text-xs">Reverb</label>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs text-editor-text-secondary">Size</label>
                    <span className="text-xs">20%</span>
                  </div>
                  <Slider defaultValue={[20]} max={100} step={1} />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertiesPanel;
