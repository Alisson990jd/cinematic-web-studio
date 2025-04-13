
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  VideoClip, 
  ProcessingSettings, 
  TimelineData, 
  setServerUrl, 
  checkServerAvailability,
  getServerCapabilities
} from '@/services/videoProcessingService';

interface EditorContextProps {
  serverUrl: string;
  setServerUrl: (url: string) => void;
  isServerConnected: boolean;
  serverCapabilities: any | null;
  isProcessing: boolean;
  currentJob: string | null;
  processingProgress: number;
  clips: VideoClip[];
  selectedClipId: number | null;
  timelineData: TimelineData;
  processingSettings: ProcessingSettings;
  addClip: (clip: VideoClip) => void;
  removeClip: (clipId: string) => void;
  selectClip: (clipId: number | null) => void;
  updateClip: (clipId: string, updates: Partial<VideoClip>) => void;
  updateSettings: (settings: Partial<ProcessingSettings>) => void;
  connectToServer: (url: string) => Promise<boolean>;
}

const defaultProcessingSettings: ProcessingSettings = {
  resolution: '1080p',
  format: 'mp4',
  frameRate: 30,
  quality: 80,
  useGpu: true
};

const defaultTimelineData: TimelineData = {
  duration: 600, // 10 minutos em segundos
  tracks: [
    { id: 1, type: 'video' },
    { id: 2, type: 'text' },
    { id: 3, type: 'audio' },
    { id: 4, type: 'audio' },
    { id: 5, type: 'effect' }
  ]
};

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [serverUrlState, setServerUrlState] = useState<string>('');
  const [isServerConnected, setIsServerConnected] = useState<boolean>(false);
  const [serverCapabilities, setServerCapabilities] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentJob, setCurrentJob] = useState<string | null>(null);
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [selectedClipId, setSelectedClipId] = useState<number | null>(null);
  const [timelineData, setTimelineData] = useState<TimelineData>(defaultTimelineData);
  const [processingSettings, setProcessingSettings] = useState<ProcessingSettings>(defaultProcessingSettings);

  // Conectar ao servidor de processamento
  const connectToServer = async (url: string): Promise<boolean> => {
    setServerUrl(url);
    setServerUrlState(url);
    
    try {
      const isAvailable = await checkServerAvailability();
      setIsServerConnected(isAvailable);
      
      if (isAvailable) {
        // Obter capacidades do servidor
        const capabilities = await getServerCapabilities();
        setServerCapabilities(capabilities);
        toast({
          title: "Conectado ao servidor",
          description: `GPU ${capabilities.gpu.available ? 'disponível' : 'indisponível'}`
        });
        return true;
      } else {
        toast({
          title: "Erro de conexão",
          description: "Não foi possível conectar ao servidor de processamento",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      toast({
        title: "Erro de conexão",
        description: "Falha ao estabelecer conexão com o servidor",
        variant: "destructive"
      });
      return false;
    }
  };

  // Adicionar um novo clip
  const addClip = (clip: VideoClip) => {
    setClips(prevClips => [...prevClips, clip]);
  };

  // Remover um clip
  const removeClip = (clipId: string) => {
    setClips(prevClips => prevClips.filter(clip => clip.id !== clipId));
    if (selectedClipId === parseInt(clipId)) {
      setSelectedClipId(null);
    }
  };

  // Selecionar um clip
  const selectClip = (clipId: number | null) => {
    setSelectedClipId(clipId);
  };

  // Atualizar um clip existente
  const updateClip = (clipId: string, updates: Partial<VideoClip>) => {
    setClips(prevClips => 
      prevClips.map(clip => 
        clip.id === clipId ? { ...clip, ...updates } : clip
      )
    );
  };

  // Atualizar configurações de processamento
  const updateSettings = (settings: Partial<ProcessingSettings>) => {
    setProcessingSettings(prev => ({ ...prev, ...settings }));
  };

  // Exportar as funções e estados
  const contextValue: EditorContextProps = {
    serverUrl: serverUrlState,
    setServerUrl: setServerUrlState,
    isServerConnected,
    serverCapabilities,
    isProcessing,
    currentJob,
    processingProgress,
    clips,
    selectedClipId,
    timelineData,
    processingSettings,
    addClip,
    removeClip,
    selectClip,
    updateClip,
    updateSettings,
    connectToServer
  };

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = (): EditorContextProps => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
