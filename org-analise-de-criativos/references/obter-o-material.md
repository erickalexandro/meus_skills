# Como pegar o material do criativo

## 1. Do swipe do vault (caso mais comum)

- "Pega um do swipe" / "aleatório": sortear entre as notas `SW-*` e `CV-*` de `BRAIN/Swipe/Swipe de orgânico/` (PowerShell `Get-Random`). "Os melhores": filtrar 🔥 ou ordenar por views/comentários no índice.
- A nota já traz transcrição EN, tradução PT, descrição visual e métricas. A capa fica em `_anexos/<id>.jpg`: **abrir a capa com Read** (é o frame do gancho).
- Tempos não vêm na nota. Sem vídeo, estimar a ~2,6 palavras/s e marcar "(estimado)".

## 2. Link ou arquivo que o Erick mandar

- **Google Drive**: extrair o file id da URL e tentar `mcp__claude_ai_Google_Drive__download_file_content`. Link de terceiro pode pedir acesso: avisar e seguir com o que houver.
- **Reel de IG/FB/TikTok**: abrir no Chrome (skill `claude-in-chrome`) pra ver legenda, métricas e comentários; o vídeo em si normalmente não baixa. Pedir o MP4 ou a transcrição se for essencial.
- **Artifact compartilhado** (swipe de terceiros): ver a memória `ler-artifact-compartilhado.md` (iframe + `Sec-Fetch-Dest: iframe`).
- **Print/imagem**: ler direto com Read.

## 3. Transcrever e tirar frames (quando houver MP4)

A máquina tem **3,7 GB de RAM** (memória `maquina-com-pouca-ram.md`): Whisper só `base`/`base.en` quantizado, áudio em blocos e processo desacoplado (`Start-Process`). ffmpeg **não está instalado**: se precisar de frames, perguntar antes de instalar; vídeo curto (<90 s) pode seguir sem frames, usando a descrição + capa.

Frames úteis: 0 s, 0,5 s, 1 s, 2 s, 3 s e depois a cada 3–5 s; sempre o frame do CTA.

## 4. Nada disso deu certo

Seguir com o que existe (transcrição colada, descrição) e dizer na ficha o que não foi visto. Nunca inventar tempo, métrica ou visual.
