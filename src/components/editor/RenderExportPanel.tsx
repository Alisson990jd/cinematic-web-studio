
import React, { useState } from 'react';
import { useEditor } from '@/context/EditorContext';
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Download, Cog, Film, Settings, Cpu } from 'lucide-react';
import { renderFinalVideo, checkProcessingStatus } from '@/services/videoProcessingService';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const RenderExportPanel: React.FC = () => {
  const { 
    isServerConnected, 
    processingSettings, 
    updateSettings, 
    timelineData,
    isProcessing,
    processingProgress
  } = useEditor();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('presets');
  const [jobId, setJobId] = useState<string | null>(null);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderStatus, setRenderStatus] = useState<string | null>(null);
  
  const resolutionOptions = [
    { label: '4K', value: '2160p' },
    { label: '2K', value: '1440p' },
    { label: 'Full HD', value: '1080p' },
    { label: 'HD', value: '720p' },
    { label: 'SD', value: '480p' }
  ];
  
  const formatOptions = [
    { label: 'MP4 (H.264)', value: 'mp4' },
    { label: 'WebM', value: 'webm' },
    { label: 'MOV', value: 'mov' },
    { label: 'GIF', value: 'gif' }
  ];
  
  const frameRateOptions = [
    { label: '60 fps', value: 60 },
    { label: '30 fps', value: 30 },
    { label: '24 fps', value: 24 }
  ];
  
  const qualityPresets = [
    { name: 'Máxima', resolution: '2160p', frameRate: 60, quality: 100 },
    { name: 'Alta', resolution: '1080p', frameRate: 60, quality: 90 },
    { name: 'Média', resolution: '1080p', frameRate: 30, quality: 80 },
    { name: 'Web', resolution: '720p', frameRate: 30, quality: 70 },
    { name: 'Rápida', resolution: '720p', frameRate: 30, quality: 60 }
  ];
  
  const applyPreset = (preset: any) => {
    updateSettings({
      resolution: preset.resolution,
      frameRate: preset.frameRate,
      quality: preset.quality
    });
  };
  
  const handleExport = async () => {
    if (!isServerConnected) {
      toast.error("Conecte-se a um servidor de processamento antes de exportar");
      return;
    }
    
    try {
      // Iniciar renderização no servidor
      const jobId = await renderFinalVideo(timelineData, processingSettings);
      setJobId(jobId);
      setRenderStatus('processing');
      toast.success("Renderização iniciada");
      
      // Iniciar monitoramento do progresso
      monitorRenderProgress(jobId);
    } catch (error) {
      console.error("Erro ao iniciar renderização:", error);
      toast.error("Falha ao iniciar renderização");
    }
  };
  
  const monitorRenderProgress = async (jobId: string) => {
    try {
      // Verificar a cada 1 segundo
      const intervalId = setInterval(async () => {
        const result = await checkProcessingStatus(jobId);
        
        setRenderProgress(result.progress || 0);
        
        if (result.status === 'completed') {
          clearInterval(intervalId);
          setRenderStatus('completed');
          setRenderProgress(100);
          toast.success("Renderização concluída com sucesso!");
          
          // Se tiver URL de download, oferecer para baixar
          if (result.output_url) {
            window.open(result.output_url, '_blank');
          }
        } else if (result.status === 'failed') {
          clearInterval(intervalId);
          setRenderStatus('failed');
          toast.error(`Erro na renderização: ${result.error || 'Falha desconhecida'}`);
        }
      }, 1000);
      
      // Limpar intervalo se o componente for desmontado
      return () => clearInterval(intervalId);
    } catch (error) {
      console.error("Erro ao monitorar progresso:", error);
      setRenderStatus('failed');
      toast.error("Falha ao monitorar progresso da renderização");
    }
  };
  
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={isServerConnected ? "default" : "outline"}
          disabled={!isServerConnected || isProcessing}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          <span>Exportar</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Exportar Projeto</DialogTitle>
          <DialogDescription>
            Configure as opções de renderização e exporte seu vídeo.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="presets" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="presets" className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              <span>Presets</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Avançado</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="presets" className="pt-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Escolha uma configuração predefinida para exportar seu vídeo rapidamente:
              </p>
              
              <div className="grid gap-2">
                {qualityPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    className="justify-start"
                    onClick={() => applyPreset(preset)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{preset.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {preset.resolution}, {preset.frameRate}fps, Qualidade {preset.quality}%
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Resolução</Label>
                <div className="grid grid-cols-3 gap-2">
                  {resolutionOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={processingSettings.resolution === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateSettings({ resolution: option.value })}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Formato</Label>
                <div className="grid grid-cols-2 gap-2">
                  {formatOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={processingSettings.format === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateSettings({ format: option.value })}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Frame Rate</Label>
                <div className="grid grid-cols-3 gap-2">
                  {frameRateOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={processingSettings.frameRate === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateSettings({ frameRate: option.value })}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Qualidade</Label>
                  <span className="text-sm">{processingSettings.quality}%</span>
                </div>
                <Slider
                  value={[processingSettings.quality]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => updateSettings({ quality: value[0] })}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="gpu-acceleration"
                  checked={processingSettings.useGpu}
                  onCheckedChange={(checked) => updateSettings({ useGpu: checked })}
                />
                <Label htmlFor="gpu-acceleration" className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  <span>Aceleração GPU</span>
                </Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {renderStatus && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                {renderStatus === 'processing' 
                  ? 'Renderizando...' 
                  : renderStatus === 'completed'
                  ? 'Renderização concluída!' 
                  : 'Falha na renderização'}
              </span>
              <span>{renderProgress}%</span>
            </div>
            <Progress value={renderProgress} className="h-2" />
          </div>
        )}
        
        <div className="flex justify-end gap-2 mt-4">
          <Button 
            variant="outline" 
            onClick={() => setDialogOpen(false)}
            disabled={renderStatus === 'processing'}
          >
            Cancelar
          </Button>
          
          {renderStatus === 'completed' ? (
            <Button variant="default" onClick={() => setDialogOpen(false)}>
              Fechar
            </Button>
          ) : (
            <Button 
              variant="default" 
              onClick={handleExport}
              disabled={!isServerConnected || renderStatus === 'processing'}
            >
              {renderStatus === 'processing' ? 'Processando...' : 'Exportar'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RenderExportPanel;
