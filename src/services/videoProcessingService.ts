
import axios from 'axios';

// Tipos para comunicação com a API
export interface VideoProcessingRequest {
  type: 'cut' | 'merge' | 'effect' | 'transition' | 'render';
  clips: VideoClip[];
  settings: ProcessingSettings;
  timeline?: TimelineData;
}

export interface VideoClip {
  id: string;
  src: string;
  type: 'video' | 'audio' | 'text' | 'effect';
  start: number;
  end: number;
  track: number;
  effects?: Effect[];
  transitions?: Transition;
}

export interface Effect {
  type: string;
  params: Record<string, any>;
}

export interface Transition {
  in?: string;
  out?: string;
}

export interface ProcessingSettings {
  resolution: string;
  format: string;
  frameRate: number;
  quality: number;
  useGpu: boolean;
}

export interface TimelineData {
  duration: number;
  tracks: Track[];
}

export interface Track {
  id: number;
  type: 'video' | 'audio' | 'text' | 'effect';
}

export interface ProcessingResult {
  success: boolean;
  outputUrl?: string;
  previewUrl?: string;
  progress?: number;
  error?: string;
}

// URL do servidor de processamento no Kaggle via ngrok
let SERVER_URL = '';

// Função para configurar a URL do servidor
export const setServerUrl = (url: string) => {
  SERVER_URL = url;
};

// Checar se o servidor está disponível
export const checkServerAvailability = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${SERVER_URL}/health`);
    return response.status === 200;
  } catch (error) {
    console.error('Servidor de processamento indisponível:', error);
    return false;
  }
};

// Obter informações do sistema de processamento
export const getServerCapabilities = async (): Promise<any> => {
  try {
    const response = await axios.get(`${SERVER_URL}/capabilities`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter capacidades do servidor:', error);
    throw error;
  }
};

// Enviar uma solicitação de processamento de vídeo
export const processVideo = async (request: VideoProcessingRequest): Promise<ProcessingResult> => {
  try {
    const response = await axios.post(`${SERVER_URL}/process`, request);
    return response.data;
  } catch (error) {
    console.error('Erro no processamento de vídeo:', error);
    return {
      success: false,
      error: 'Falha na comunicação com o servidor de processamento'
    };
  }
};

// Verificar o status de um job de processamento
export const checkProcessingStatus = async (jobId: string): Promise<ProcessingResult> => {
  try {
    const response = await axios.get(`${SERVER_URL}/status/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar status do processamento:', error);
    return {
      success: false,
      error: 'Falha ao verificar o status do processamento'
    };
  }
};

// Renderizar o projeto final
export const renderFinalVideo = async (timeline: TimelineData, settings: ProcessingSettings): Promise<string> => {
  try {
    const response = await axios.post(`${SERVER_URL}/render`, { timeline, settings });
    return response.data.jobId;
  } catch (error) {
    console.error('Erro ao iniciar renderização:', error);
    throw new Error('Falha ao iniciar a renderização do projeto');
  }
};

// Aplicar um efeito em tempo real para preview
export const applyEffectPreview = async (clipId: string, effect: Effect): Promise<string> => {
  try {
    const response = await axios.post(`${SERVER_URL}/preview/effect`, { clipId, effect });
    return response.data.previewUrl;
  } catch (error) {
    console.error('Erro ao aplicar efeito para preview:', error);
    throw new Error('Falha ao gerar preview do efeito');
  }
};

// Obter um frame específico de um vídeo
export const getVideoFrame = async (src: string, timestamp: number): Promise<string> => {
  try {
    const response = await axios.get(`${SERVER_URL}/frame`, { params: { src, timestamp } });
    return response.data.frameUrl;
  } catch (error) {
    console.error('Erro ao obter frame do vídeo:', error);
    throw new Error('Falha ao extrair frame do vídeo');
  }
};
