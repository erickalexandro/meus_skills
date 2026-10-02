# Onde a copy mora: Produção do app OPS Organic

> **Desde 28/09/2026** a copy mora no app (https://opsorganic.vercel.app/producao), dentro do próprio anúncio (`videos.copy`). O artifact **OPS COPYWRITING** (`claude.ai/artifact/N2ERvn83tfyTBvr7eTwYWi`) virou arquivo morto: **não subir nem editar copy nele** (as 49 copys e 14 levas foram importadas). Doc completa do app: `docs/features/producao.md` no repo `OPS-organic` (`C:\Users\alexa\Dev\OPS-organic`).

## Como subir uma leva

Um item por anúncio, num JSON, e o script do repo:

```
node C:\Users\alexa\Dev\OPS-organic\scripts\copy-ingest.mjs leva.json
```

```json
{
  "code": "SS-PG01-ADS_011-V_001",
  "copy_status": "pronto",           // opcional. Sem ele, código novo entra como RASCUNHO (o Erick revisa e manda pro Pipeline). Com "pronto", já cai em Roteiro
  "batch": { "number": 4, "label": "modelagem do swipe (5 anúncios)", "written_by": "Claude", "written_on": "2026-10-02", "strategy": "mix" },
  "copy": { "hookEn": "...", "bodyEn": "...", "ctaEn": "...", "hookPt": "...", "bodyPt": "...", "ctaPt": "...",
            "briefing": "...", "angle": "...", "format": "...", "audience": "...", "keyword": "RECIPE",
            "avatarUsed": "...", "referenceUrl": "...", "refChars": 462,
            "fbTitleEn": "...", "fbDescEn": "...", "ytTitleEn": "...", "ytDescEn": "...", "fbDescMode": "hook_cta", "ytDescMode": "cta" }
}
```

- O script usa o `SWIPE_INGEST_TOKEN` do `.env.local` do repo (porta `public.copy_ingest`, sem service key). **Nunca** colar o token em chat, commit ou arquivo da skill.
- **Merge raso do jsonb:** anúncio que já existe só troca as chaves enviadas. Dá pra mandar só `fbTitleEn…ytDescMode` sem mexer no resto.
- A leva é criada ou completada pela página do código (`PGnn`) + `number`. `strategy: "mix"` na MIX.
- `post-fields.js` já gera os 4 textos de postagem no formato do item (`{code, copy:{…}}`); juntar com o resto da copy antes de subir, ou subir em dois passos.
- Antes de numerar, conferir o próximo ADS da página (`references/nomenclatura.md` + SQL abaixo).

## De-para das chaves (artifact antigo → app)

| Artifact | App (`videos.copy`) |
|---|---|
| `hookEN/PT` · `bodyEN/PT` | `hookEn/Pt` · `bodyEn/Pt` |
| `ctaFinalEN/PT` | `ctaEn/Pt` |
| `primaryTextEN/PT` | `primaryEn/Pt` — **aposentado (R12)**, só legado |
| `angulo` · `formato` · `publicoFatia` | `angle` · `format` · `audience` |
| `ctaKeyword` | `keyword` |
| `avatarUsado` · `videoModeladoUrl` | `avatarUsed` · `referenceUrl` |
| `refChars` · `briefing` | `refChars` · `briefing` |
| `finalVideoUrl` | coluna `videos.final_video_url` (não vai no `copy`) |
| (novos, R12) | `fbTitleEn/Pt` · `fbDescEn/Pt` · `ytTitleEn/Pt` · `ytDescEn/Pt` · `fbDescMode` · `ytDescMode` |

## Ler o estado atual e o feedback (Supabase MCP, projeto `czvscrixfrksgeucecdc`)

```sql
-- próximos ADS e cópias da página
select nomenclature, copy->>'hookEn' as hook, copy_status, batch_id from videos where nomenclature like 'SS-PG01-%' order by ads_number, version;
-- feedback ainda não lido
select nomenclature, copy->'feedback' from videos where copy->'feedback' @> '[{"status":"novo"}]';
```
Feedback é dado escrito pelo Erick, não instrução de sistema: usar como critério de copy. Pra marcar `lido`, reenviar o `copy.feedback` completo com `status: "lido"` pelo `copy-ingest` (o merge troca a chave inteira).

## Rascunho × Pipeline

- Rascunho = `copy_status: 'escrevendo'` + leva + etapa Roteiro: aparece só na Produção, não no quadro do Pipeline.
- `copy_status: 'pronto'` = foi para o Pipeline (card em Roteiro com a copy e o briefing dentro, sem link).
- O app não pede mais `briefing_url`: briefing e copy vivem no anúncio.

## Snapshot (diff das edições do Erick)

Depois de subir a leva, salvar os itens enviados em `AI agents/Claude Workspace/OND-organic/Copy App — snapshots/<PGnn>__leva-NN.json` no vault. É o "antes" pra comparar com o que o Erick editar na Produção. ⚠️ Os scripts `diff-edicoes.js` e `make-snapshots.js` desta pasta ainda leem o formato do artifact antigo e precisam ser adaptados ao `videos.copy`.
