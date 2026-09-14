// Converte os blocos do data.js em HTML (classes no padrão do ADV1 da marca). Mexer aqui só muda ESTRUTURA, nunca texto.
const img = (imgs, k) => imgs[k] || "";
const li = (a) => a.map((x) => `<li>${x}</li>`).join("");
const NOTE = { calm: ["alert", "chk"], warn: ["alert", "dot"], teaser: ["teaser", "arr"] };

export function renderBlock(b, ctx) {
  const { imgs, cta } = ctx;
  switch (b.t) {
    case "h2": return `<h2>${b.v}</h2>`;
    case "h3": return `<h3>${b.v}</h3>`;
    case "p": return `<p>${b.v}</p>`;
    case "lede": return `<div class="lead">${b.v.map((p) => `<p>${p}</p>`).join("")}</div>`;
    case "pull": return `<blockquote>${b.v}</blockquote>`;
    case "img": return `<figure class="fig"><img src="${img(imgs, b.k)}" alt="" loading="lazy">${b.cap ? `<figcaption>${b.cap}</figcaption>` : ""}</figure>`;
    case "note": {
      const [box, list] = NOTE[b.cls] || ["plain", "chk"];
      return `<div class="box ${box}">${b.h ? `<h3>${b.h}</h3>` : ""}${b.list ? `<ul class="${list}">${li(b.list)}</ul>` : ""}${b.v ? `<p>${b.v}</p>` : ""}${b.foot ? `<p class="foot-note">${b.foot}</p>` : ""}</div>`;
    }
    case "check": return `<ul class="${b.cls === "x" ? "xx" : "chk"}">${li(b.items)}</ul>`;
    case "steps": return `<ol class="steps">${b.items.map(([t, d]) => `<li><b>${t}</b>${d}</li>`).join("")}</ol>`;
    case "cards": return b.items.map(([h, p], i) => `<div class="opt${i === b.items.length - 1 ? " win" : ""}"><b>${h}</b>${p}</div>`).join("");
    case "time": return `<ol class="tl">${b.rows.map(([w, d]) => `<li><b>${w}</b><span>${d}</span></li>`).join("")}</ol>`;
    case "testimonials": return b.items.map(([k, n, tag, q, obj]) => `<figure class="tcard"><img src="${img(imgs, k)}" alt="${n} — before and after" loading="lazy"><div class="tb">${obj ? `<p class="obj">${obj}</p>` : ""}<p class="tq">“${q}”</p><p class="tm">${n} &nbsp;<i>★★★★★</i>&nbsp; ${tag}</p></div></figure>`).join("") + (b.foot ? `<p class="small-note">${b.foot}</p>` : "");
    case "compare": return `<div class="compare"><div class="them"><b>${b.them[0]}</b><span class="big">${b.them[1]}</span>${b.them[2]}</div><div class="us"><b>${b.us[0]}</b><span class="big">${b.us[1]}</span>${b.us[2]}</div></div>`;
    case "price": return `<div class="price">${b.tiers.map(([n, m, p, u, flag]) => `<div class="tier${flag ? " best" : ""}">${flag ? `<span class="flag">${flag}</span>` : ""}<div><div class="name">${n}</div><div class="meta">${m}</div></div><div class="num">${p}<span>${u}</span></div></div>`).join("")}</div><p class="cta-under">${b.under}</p>`;
    case "guarantee": return `<div class="panel"><h2>${b.h}</h2>${b.seal ? `<img class="seal" src="${img(imgs, b.seal)}" alt="90-day money-back guarantee">` : ""}${[].concat(b.v).map((p) => `<p>${p}</p>`).join("")}</div>`;
    case "cta": return `<div class="cta-wrap${b.hd ? " mid" : ""}">${b.hd ? `<p class="hd">${b.hd}</p>` : ""}<a class="cta" href="${cta}" rel="nofollow noopener">${b.label}</a><div class="cta-sub">${b.under}</div>${b.seal ? `<img class="seal-inline" src="${img(imgs, b.seal)}" alt="90-day money-back guarantee">` : ""}</div>`;
    case "sign": return `<div class="signoff"><b>${b.v}</b><span>${b.sub}</span></div>`;
    case "ps": return `<div class="ps-wrap">${b.items.map(([l, v]) => `<p><strong>${l}</strong> ${v}</p>`).join("")}</div>`;
    case "comments": return `<div class="fbx"><div class="fbx-h"><span class="fbx-t">Comments</span><span class="fbx-ct">${b.count} comments</span><span class="fbx-sort">Top comments ▾</span></div>${b.items.map(([av, n, t, v, likes, reply]) => `<div class="fbx-c${reply ? " fbx-r" : ""}"><div class="fbx-av">${av}</div><div><div class="fbx-b"><p class="fbx-nm">${n}</p><p class="fbx-tx">${v}</p></div><p class="fbx-m"><span class="fbx-a">Like</span> · <span class="fbx-a">Reply</span> · ${likes} · ${t}</p></div></div>`).join("")}</div>`;
    default: return "";
  }
}

export function renderPage({ cfg, imgs, css }) {
  const m = cfg.meta;
  const ctx = { imgs, cta: m.checkout };
  const body = cfg.blocks.map((b) => renderBlock(b, ctx)).join("\n");
  return `<!doctype html>
<html lang="${m.lang || "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${m.title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,700;0,800;1,400&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
<style>
${css}
</style>
</head>
<body>
<header class="header-bar"><span class="logo">${m.brand}</span><span class="divider">|</span><span class="sub">${m.section}</span></header>
<div class="ad-disclosure">${m.disclosure || "Advertorial"}</div>
<main class="page">
  <h1>${m.headline}</h1>
  <div class="deck-wrap"><span class="deck">${m.sub}</span></div>
  <div class="article-meta">
    <div class="byline">${m.authorImg && imgs[m.authorImg] ? `<img src="${imgs[m.authorImg]}" alt="${m.author}">` : `<span class="av-b">${(m.author||"").split(" ").map(w=>w[0]).join("").slice(0,2)}</span>`}<div><p class="bl-name">By ${m.author}</p><p class="bl-role">${m.authorRole}</p></div></div>
    <span>${m.date}</span>
  </div>
${body}
  <div class="foot">${cfg.footer.map((p) => `<p>${p}</p>`).join("")}</div>
</main>
<div class="sticky" id="sticky"><a class="cta" href="${m.checkout}" rel="nofollow noopener">${m.stickyBtn}</a><span class="st-sub">${m.stickyText}</span></div>
<script>
// barra fixa só aparece depois que o leitor passa do primeiro botão
(function(){
  var first=document.querySelector('.page .cta-wrap'), bar=document.getElementById('sticky');
  if(!first||!bar) return;
  function t(){ bar.classList.toggle('on', first.getBoundingClientRect().bottom<0); }
  window.addEventListener('scroll',t,{passive:true}); t();
})();
</script>
</body>
</html>`;
}
