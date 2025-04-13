
# Configuração do Editor de Vídeo com GPU no Kaggle

Este documento descreve como configurar e executar o editor de vídeo com processamento GPU no Kaggle.

## Pré-requisitos

- Uma conta no Kaggle
- Acesso a uma sessão com GPU no Kaggle
- Token ngrok (fornecido)

## Instruções para Configuração do Servidor

1. Faça login na sua conta do Kaggle

2. Crie um novo notebook com GPU habilitada:
   - Ao criar um novo notebook, selecione "GPU" em "Accelerator"
   - Recomendamos o uso de uma GPU T4 ou P100

3. Importe os arquivos do servidor:
   - Faça upload do arquivo `server/kaggle-server.py` para o seu notebook
   - Faça upload do arquivo `server/kaggle-server-setup.ipynb` para o seu notebook

4. Execute o notebook de configuração:
   - Abra o arquivo `kaggle-server-setup.ipynb`
   - Execute todas as células em ordem
   - Anote a URL pública fornecida pelo ngrok (será necessária para conectar o cliente)

## Instruções para o Cliente

1. Inicie o aplicativo cliente (editor de vídeo)

2. Conecte ao servidor Kaggle:
   - Clique no botão "Conectar ao Servidor" no canto superior direito
   - Insira a URL pública fornecida pelo ngrok
   - Clique em "Conectar"

3. Verifique a conexão:
   - Se a conexão for bem-sucedida, você verá "Conectado" no botão do servidor
   - Você deve ver as informações da GPU disponível

## Funcionalidades Suportadas

Com o servidor GPU configurado, você pode utilizar as seguintes funcionalidades:

- Renderização acelerada por GPU
- Aplicação de efeitos em tempo real
- Transições de alta qualidade
- Exportação em diversos formatos e resoluções
- Correção de cor avançada

## Resolução de Problemas

Se você encontrar problemas na conexão com o servidor:

1. Verifique se o notebook Kaggle está em execução
2. Verifique se o túnel ngrok está ativo
3. Certifique-se de usar "https://" no início da URL
4. Verifique se a GPU está disponível no Kaggle

## Limitações

- A sessão Kaggle expira após algumas horas de inatividade
- A largura de banda do ngrok gratuito é limitada
- Arquivos muito grandes podem causar problemas de transferência

## Configuração Avançada

Para configurações avançadas, edite o arquivo `kaggle-server.py` e personalize os parâmetros conforme necessário.
