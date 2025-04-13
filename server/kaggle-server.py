
import os
import json
import time
import uuid
import threading
import numpy as np
import cv2
import torch
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Configuração
UPLOAD_FOLDER = './uploads'
TEMP_FOLDER = './temp'
OUTPUT_FOLDER = './output'
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'webm', 'mkv', 'mp3', 'wav', 'ogg', 'png', 'jpg', 'jpeg'}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(TEMP_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Status dos jobs de processamento
processing_jobs = {}

# Verificar disponibilidade da GPU
def check_gpu():
    if torch.cuda.is_available():
        return {
            "available": True,
            "device": torch.cuda.get_device_name(0),
            "count": torch.cuda.device_count(),
            "memory": {
                "total": torch.cuda.get_device_properties(0).total_memory,
                "reserved": torch.cuda.memory_reserved(0),
                "allocated": torch.cuda.memory_allocated(0)
            }
        }
    else:
        return {"available": False}

# Rotas para saúde e capacidades
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "online", "timestamp": time.time()})

@app.route('/capabilities', methods=['GET'])
def capabilities():
    return jsonify({
        "version": "1.0.0",
        "gpu": check_gpu(),
        "supported_formats": list(ALLOWED_EXTENSIONS),
        "max_file_size": 1024 * 1024 * 1024,  # 1GB
        "effects": [
            "color_correction", "brightness", "contrast", "saturation", 
            "hue", "blur", "sharpen", "noise_reduction", "lut"
        ],
        "transitions": ["cut", "fade", "dissolve", "wipe", "slide"]
    })

# Função para processar vídeo em segundo plano
def process_video_task(job_id, request_data):
    try:
        # Atualizar status para processando
        processing_jobs[job_id]["status"] = "processing"
        processing_jobs[job_id]["progress"] = 0
        
        # Tipo de processamento
        process_type = request_data.get("type")
        
        # Simulando progresso
        for i in range(1, 11):
            time.sleep(1)  # Simulando trabalho
            processing_jobs[job_id]["progress"] = i * 10
        
        # Gerar arquivo de saída simulado
        output_filename = f"{job_id}.mp4"
        output_path = os.path.join(OUTPUT_FOLDER, output_filename)
        
        # Em uma implementação real, aqui faríamos o processamento com GPU
        # Por enquanto, apenas criamos um vídeo simples para demonstração
        if process_type == "render":
            create_demo_video(output_path, 10)  # 10 segundos de vídeo
        
        # Atualizar status para concluído
        processing_jobs[job_id]["status"] = "completed"
        processing_jobs[job_id]["progress"] = 100
        processing_jobs[job_id]["output_url"] = f"/download/{job_id}"
        
    except Exception as e:
        processing_jobs[job_id]["status"] = "failed"
        processing_jobs[job_id]["error"] = str(e)

# Criar um vídeo de demonstração
def create_demo_video(output_path, duration=10, fps=30):
    height, width = 720, 1280
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    
    for i in range(duration * fps):
        # Criar frame com gradiente de cores
        frame = np.zeros((height, width, 3), dtype=np.uint8)
        
        # Adicionar texto com contador de frames
        cv2.putText(frame, f'Frame {i}', (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 
                    1, (255, 255, 255), 2, cv2.LINE_AA)
        
        # Adicionar gradiente de cor que muda ao longo do tempo
        for y in range(height):
            for x in range(width):
                b = int(255 * (0.5 + 0.5 * np.sin(0.1 * i + x * 0.01)))
                g = int(255 * (0.5 + 0.5 * np.sin(0.1 * i + y * 0.01)))
                r = int(255 * (0.5 + 0.5 * np.cos(0.1 * i + (x + y) * 0.01)))
                frame[y, x] = [b, g, r]
        
        out.write(frame)
    
    out.release()

# Rota para iniciar processamento
@app.route('/process', methods=['POST'])
def process_video():
    data = request.json
    
    # Gerar ID único para o job
    job_id = str(uuid.uuid4())
    
    # Registrar job
    processing_jobs[job_id] = {
        "id": job_id,
        "status": "queued",
        "created_at": time.time(),
        "type": data.get("type", "unknown"),
        "progress": 0
    }
    
    # Iniciar processamento em thread separada
    thread = threading.Thread(target=process_video_task, args=(job_id, data))
    thread.daemon = True
    thread.start()
    
    return jsonify({
        "success": True,
        "jobId": job_id,
        "message": "Processamento iniciado"
    })

# Rota para verificar status
@app.route('/status/<job_id>', methods=['GET'])
def job_status(job_id):
    if job_id in processing_jobs:
        return jsonify(processing_jobs[job_id])
    else:
        return jsonify({"success": False, "error": "Job não encontrado"}), 404

# Rota para renderização final
@app.route('/render', methods=['POST'])
def render_project():
    data = request.json
    timeline = data.get("timeline")
    settings = data.get("settings")
    
    # Gerar ID único para o job
    job_id = str(uuid.uuid4())
    
    # Registrar job
    processing_jobs[job_id] = {
        "id": job_id,
        "status": "queued",
        "created_at": time.time(),
        "type": "render",
        "progress": 0
    }
    
    # Iniciar processamento em thread separada
    thread = threading.Thread(target=process_video_task, args=(job_id, {"type": "render"}))
    thread.daemon = True
    thread.start()
    
    return jsonify({
        "success": True,
        "jobId": job_id,
        "message": "Renderização iniciada"
    })

# Rota para preview de efeito
@app.route('/preview/effect', methods=['POST'])
def preview_effect():
    data = request.json
    clip_id = data.get("clipId")
    effect = data.get("effect")
    
    # Em um sistema real, aplicaríamos o efeito e retornaríamos a URL para o preview
    # Aqui apenas simulamos o resultado
    preview_id = str(uuid.uuid4())
    preview_url = f"/preview/{preview_id}"
    
    return jsonify({
        "success": True,
        "previewUrl": preview_url
    })

# Rota para obter frame
@app.route('/frame', methods=['GET'])
def get_frame():
    src = request.args.get('src')
    timestamp = float(request.args.get('timestamp', 0))
    
    # Em um sistema real, extrairíamos o frame do vídeo
    # Aqui criamos um frame simulado
    frame_id = str(uuid.uuid4())
    frame_path = os.path.join(TEMP_FOLDER, f"{frame_id}.jpg")
    
    # Criar uma imagem simples
    img = np.zeros((720, 1280, 3), dtype=np.uint8)
    cv2.putText(img, f'Frame at {timestamp:.2f}s', (50, 360), 
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
    cv2.imwrite(frame_path, img)
    
    return jsonify({
        "success": True,
        "frameUrl": f"/temp/{frame_id}.jpg"
    })

# Rota para download de arquivo processado
@app.route('/download/<job_id>', methods=['GET'])
def download_file(job_id):
    if job_id in processing_jobs and processing_jobs[job_id]["status"] == "completed":
        filename = f"{job_id}.mp4"
        return send_file(os.path.join(OUTPUT_FOLDER, filename), as_attachment=True)
    else:
        return jsonify({"success": False, "error": "Arquivo não disponível"}), 404

# Rota para arquivos temporários (previews, frames)
@app.route('/temp/<filename>', methods=['GET'])
def temp_file(filename):
    return send_file(os.path.join(TEMP_FOLDER, filename))

if __name__ == '__main__':
    # Obter porta do ambiente ou usar 5000 como padrão
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
