
import React, { useState, useEffect } from 'react';
import { useEditor } from '@/context/EditorContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CheckCircle, Server, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ServerConnection: React.FC = () => {
  const { 
    serverUrl, 
    isServerConnected, 
    serverCapabilities,
    connectToServer 
  } = useEditor();
  
  const { toast } = useToast();
  const [serverUrlInput, setServerUrlInput] = useState(serverUrl || '');
  const [isConnecting, setIsConnecting] = useState(false);
  const [open, setOpen] = useState(!serverUrl);

  // Auto-abrir o diálogo se não houver servidor configurado
  useEffect(() => {
    if (!serverUrl) {
      setOpen(true);
    }
  }, [serverUrl]);

  const handleConnect = async () => {
    if (!serverUrlInput.trim()) {
      toast({
        title: "URL inválida",
        description: "Por favor, insira uma URL válida do servidor",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      // Normalizar URL (garantir que comece com http:// ou https://)
      let normalizedUrl = serverUrlInput;
      if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
        normalizedUrl = `https://${normalizedUrl}`;
        setServerUrlInput(normalizedUrl);
      }
      
      const success = await connectToServer(normalizedUrl);
      
      if (success) {
        setOpen(false);
      }
    } catch (error) {
      console.error('Erro na conexão:', error);
      toast({
        title: "Falha na conexão",
        description: "Não foi possível conectar ao servidor. Verifique a URL e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant={isServerConnected ? "outline" : "destructive"} 
            size="sm" 
            className="flex items-center gap-2"
          >
            {isServerConnected ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Conectado</span>
              </>
            ) : (
              <>
                <Server className="h-4 w-4" />
                <span>Conectar ao Servidor</span>
              </>
            )}
          </Button>
        </DialogTrigger>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conectar ao Servidor de Processamento</DialogTitle>
            <DialogDescription>
              Insira a URL do servidor Kaggle para habilitar processamento de vídeo com GPU.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">URL do Servidor</p>
              <Input
                placeholder="https://xxxx-xxxx.ngrok.io"
                value={serverUrlInput}
                onChange={(e) => setServerUrlInput(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Use a URL fornecida pelo notebook Kaggle.
              </p>
            </div>
            
            {isServerConnected && serverCapabilities && (
              <div className="rounded-md bg-muted p-3">
                <h4 className="font-medium text-sm mb-2">Informações do Servidor</h4>
                <div className="space-y-1">
                  <p className="text-xs flex items-center gap-2">
                    <span className="font-medium">GPU:</span>
                    {serverCapabilities.gpu.available ? (
                      <span className="text-green-500 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {serverCapabilities.gpu.device}
                      </span>
                    ) : (
                      <span className="text-amber-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Indisponível
                      </span>
                    )}
                  </p>
                  <p className="text-xs">
                    <span className="font-medium">Versão:</span> {serverCapabilities.version}
                  </p>
                  <p className="text-xs">
                    <span className="font-medium">Formatos suportados:</span> {serverCapabilities.supported_formats.join(', ')}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? "Conectando..." : "Conectar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Botão flutuante para quando o servidor está desconectado */}
      {!isServerConnected && !open && (
        <Button 
          variant="destructive" 
          size="sm" 
          className="fixed bottom-4 right-4 z-50"
          onClick={() => setOpen(true)}
        >
          <Server className="h-4 w-4 mr-2" />
          Conectar ao Servidor
        </Button>
      )}
    </>
  );
};

export default ServerConnection;
