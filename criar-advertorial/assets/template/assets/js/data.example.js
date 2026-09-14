// MODELO de data.js. Copie para data.js e substitua TODO o conteúdo.
// TODA a copy da página vive aqui. Mudou texto/preço/ordem? Edite só este arquivo e rode `node build.mjs`.
// Imagens: coloque em assets/img/<chave>.webp e cite a <chave> nos blocos (k, seal, authorImg, testimonials[0]).
export const CONFIG = {
  meta: {
    lang: "en",
    out: "",                                  // opcional: caminho do HTML final (senão usa env OUT ou ./dist)
    title: "Headline | Nome da narradora",
    checkout: "https://link-do-checkout",     // todos os CTAs e a barra fixa apontam pra cá
    brand: "The Midlife Reset",               // nome do veículo na barra azul
    section: "Health & Body",
    disclosure: "Advertorial",
    headline: "Headline da peça",
    sub: "Sub-headline (vai com marca-texto amarelo): número + filtro + promessa.",
    author: "Nome da Narradora",
    authorImg: "author",                      // chave em assets/img (rosto recortado, sem produto)
    authorRole: "Quem ela é · Onde mora",
    date: "Mês Ano · 11 min read",
    stickyBtn: "See Today's Bundle →",
    stickyText: "90-day money-back guarantee"
  },

  blocks: [
    { t: "img", k: "hero", cap: "Legenda que puxa pra história (não mostrar o produto aqui)." },
    { t: "lede", v: ["1º parágrafo sai em negrito automaticamente.", "Demais parágrafos do lead..."] },

    // note: cls "teaser" (caixa azul com setas) · "calm" (caixa amarela tracejada com checks — auto-identificação)
    //       "warn" (caixa amarela tracejada com bolinhas vermelhas — avisos) · sem cls (caixa cinza com checks)
    { t: "note", cls: "teaser", h: "In the next eleven minutes", list: ["Fascinação 1", "Fascinação 2"] },
    { t: "note", cls: "calm", h: "See how many of these are yours", list: ["Sintoma 1", "Sintoma 2"], foot: "Frase de fechamento da caixa." },

    { t: "h2", v: "Sub-headline que conta a história sozinha" },
    { t: "h3", v: "Intertítulo menor" },
    { t: "p", v: "Parágrafo. Aceita <strong>negrito</strong> e <em>itálico</em>." },
    { t: "pull", v: "Frase de impacto em citação." },

    { t: "steps", items: [["Título do passo.", "Explicação do passo."]] },              // passos numerados
    { t: "cards", items: [["Way #1 — X", "Por que falha."], ["Way #4 — A saída", "O último card sai verde."]] },
    { t: "check", items: ["Item com check verde"] },
    { t: "check", cls: "x", items: ["Item com X vermelho"] },
    { t: "time", rows: [["Days 1–3", "O que ela sentiu."], ["Week 1", "..."]] },          // timeline

    // CTA: hd opcional vira caixa azul com título; seal opcional mostra o selo abaixo
    { t: "cta", hd: "Pergunta curta antes do botão?", label: "Botão →", under: "garantia · envio", seal: "seal" },

    // testimonials: [chaveDaImagem, nome, tag, depoimento, título curto opcional] — imagem menor à esquerda
    { t: "testimonials", items: [["ba1", "Nome", "Verified purchase", "Depoimento sem aspas.", "Título curto"]], foot: "Disclaimer de resultados." },

    { t: "compare", them: ["The pen", "~$1,600", "per month"], us: ["Product", "from $19.99", "per jar"] },
    { t: "price", tiers: [["Buy 1, Get 1 Free", "2 jars", "$44.75", "per jar"], ["Buy 3, Get 3 Free", "6 jars", "$19.99", "per jar", "Lowest price"]], under: "Frete · sem assinatura · só no site oficial" },
    { t: "guarantee", seal: "seal", h: "Título da garantia", v: ["Parágrafo 1", "Parágrafo 2"] },

    { t: "sign", v: "— Nome", sub: "Nome completo · cidade" },
    { t: "ps", items: [["P.S.", "Fecha o loop emocional."], ["P.P.S.", "Fecha o loop do mecanismo."]] },
    // comments: [iniciais, nome, tempo, texto, curtidas, éResposta]
    { t: "comments", count: "86", items: [["AB", "Nome", "2 h", "Comentário.", "120"], ["NN", "Narradora", "1 h", "Resposta.", "40", true]] }
  ],

  footer: [
    "<strong>ADVERTISEMENT.</strong> Divulgação de conteúdo pago / conexão material.",
    "Não é conselho médico.",
    "FDA disclaimer (se suplemento). Resultados variam.",
    "Marca · contato · ©"
  ]
};
