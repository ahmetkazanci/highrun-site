/* ===== HIGHRUN main.js — shared header/footer/cart + helpers (v2) ===== */

/* arrow-in-circle helper for button-in-button CTAs */
const ARROW = `<span class="ic" aria-hidden="true">→</span>`;

/* Stride logo (mark + wordmark) */
function logoSVG(markColor='#43342A', wordColor='#43342A'){
  return `<span class="brand">
    <svg width="32" height="36" viewBox="0 0 56 60" aria-label="HIGHRUN" role="img">
      <rect x="14" y="8" width="5" height="40" rx="1.5" fill="${markColor}"/>
      <rect x="40" y="8" width="5" height="46" rx="1.5" fill="${markColor}"/>
      <polygon points="19,30 40,26 40,32 19,36" fill="#B08C61"/>
      <line x1="3" y1="44" x2="11" y2="44" stroke="#C7A57C" stroke-width="2.4" stroke-linecap="round"/>
      <line x1="6" y1="49" x2="11" y2="49" stroke="#C7A57C" stroke-width="2.4" stroke-linecap="round"/>
    </svg>
    <span class="word" style="color:${wordColor}">HIGHRUN</span>
  </span>`;
}

const NAV = [
  {href:'index.html', label:'Anasayfa', page:'home'},
  {href:'shop.html', label:'Koleksiyon', page:'shop'},
  {href:'shop.html?cat=cocuk', label:'Çocuk', page:'cocuk', dot:true},
  {href:'hakkimizda.html', label:'Hikaye', page:'about'},
  {href:'iletisim.html', label:'İletişim', page:'contact'}
];

/* ---------- header ---------- */
function renderHeader(){
  const cur = document.body.dataset.page;
  const links = NAV.map(n=>`<li><a href="${n.href}" class="${n.page===cur?'active':''}">${n.label}${n.dot?'<span class="dot" aria-hidden="true"></span>':''}</a></li>`).join('');
  const el = document.getElementById('site-header');
  if(!el) return;
  el.innerHTML = `
    <a class="skip" href="#main">İçeriğe geç</a>
    <div class="announce">Tüm siparişlerde <b>kargo bedava</b> — Trendyol güvencesiyle</div>
    <header id="hdr">
      <div class="nav-island">
        <a href="index.html" aria-label="HIGHRUN anasayfa">${logoSVG()}</a>
        <ul class="nav-links">${links}</ul>
        <div class="nav-right">
          <button class="cart-btn" onclick="openCart()" aria-label="Sepeti aç"><span class="lbl">Sepet</span> <span class="cart-count" id="cart-count">0</span></button>
          <button class="menu-btn" onclick="toggleMenu(true)" aria-label="Menüyü aç"><span class="bars"><span></span><span></span><span></span></span></button>
        </div>
      </div>
    </header>
    <div class="mnav" id="mnav" role="dialog" aria-modal="true" aria-label="Menü">
      <div class="mtop">
        <span class="word">HIGHRUN</span>
        <button class="close" onclick="toggleMenu(false)" aria-label="Menüyü kapat">×</button>
      </div>
      <ul>${NAV.map(n=>`<li><a href="${n.href}" onclick="toggleMenu(false)">${n.label}${n.dot?'<span class="dot" aria-hidden="true"></span>':''}</a></li>`).join('')}
        <li><a href="${TRENDYOL}" target="_blank" rel="noopener">Trendyol ↗</a></li></ul>
      <div class="mfoot">İstanbul · Türkiye</div>
    </div>`;
  const hdr = document.getElementById('hdr');
  addEventListener('scroll', ()=> hdr.classList.toggle('scrolled', scrollY>16), {passive:true});
}
function toggleMenu(open){
  document.getElementById('mnav').classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

/* ---------- footer ---------- */
function renderFooter(){
  const el = document.getElementById('site-footer');
  if(!el) return;
  el.innerHTML = `
  <footer>
    <div class="container">
      <div class="fgrid">
        <div>
          <a href="index.html" aria-label="HIGHRUN">${logoSVG('#F6EFE3','#F6EFE3')}</a>
          <p class="tagline">Kadınlar için zarif, rahat ve şık ayakkabılar. Günlükten özel güne, her adımda yanında.</p>
        </div>
        <div><h5>Koleksiyon</h5><ul>
          <li><a href="shop.html?cat=babet">Babetler</a></li>
          <li><a href="shop.html?cat=ozel">Özel Gün</a></li>
          <li><a href="shop.html?cat=sneaker">Sneaker</a></li>
          <li><a href="shop.html">Tüm Modeller</a></li>
        </ul></div>
        <div><h5>Kurumsal</h5><ul>
          <li><a href="hakkimizda.html">Hakkımızda</a></li>
          <li><a href="iade-degisim.html">İade & Değişim</a></li>
          <li><a href="numara-tablosu.html">Numara Tablosu</a></li>
          <li><a href="iletisim.html">İletişim</a></li>
        </ul></div>
        <div><h5>Alışveriş</h5><ul>
          <li><a href="${TRENDYOL}" target="_blank" rel="noopener">Trendyol Mağazası</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a></li>
        </ul></div>
      </div>
      <div class="fbottom">
        <span>© 2026 HIGHRUN · Kadın Ayakkabı</span>
        <div class="flegal">
          <a href="iade-degisim.html">İade & Değişim</a>
          <a href="numara-tablosu.html">Numara Tablosu</a>
          <a href="iletisim.html">İletişim</a>
        </div>
        <span>İstanbul · Türkiye</span>
      </div>
    </div>
  </footer>`;
}

/* ---------- product / lookbook cards ---------- */
function fmtPrice(p){
  const from = p.variants>1 ? `<span class="from">başlayan</span>` : '';
  return `${from}${p.price}<span class="cur">TL</span>`;
}
function productCard(p){
  const alt = (p.img2 && p.img2!==p.img) ? `<img class="pb" loading="lazy" src="${p.img2}" alt="">` : '';
  const vc  = p.variants>1 ? `<span class="vcount">${p.variants} renk</span>` : '';
  return `<a class="product rise" href="product.html?id=${p.id}" aria-label="${p.name}">
    <div class="ph"><span class="tag">${p.tag}</span>${vc}<img class="pa" loading="lazy" src="${p.img}" alt="${p.name} — ${p.cat}">${alt}</div>
    <div class="pinfo">
      <div class="cat">${p.cat}${p.variants>1?' · '+p.color:''}</div>
      <h3>${p.name}</h3>
      <div class="prow"><span class="price">${fmtPrice(p)}</span><span class="shop-link">İncele →</span></div>
    </div></a>`;
}
function lookCard(p){
  return `<div class="lcard rise" onclick="location.href='product.html?id=${p.id}'" role="link" tabindex="0"
       onkeydown="if(event.key==='Enter')location.href='product.html?id=${p.id}'" aria-label="${p.name}">
    <img loading="lazy" src="${p.img}" alt="${p.name}">
    <div class="lmeta">${p.name}<div class="lp">${p.cat} · ${p.price} TL</div></div></div>`;
}
/* magnetic pull on primary CTAs (decorative — gated to fine pointer + motion ok) */
function initMagnetic(){
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  document.querySelectorAll('[data-mag]').forEach(el=>{
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-(r.left+r.width/2))*.28, y=(e.clientY-(r.top+r.height/2))*.4;
      el.style.transform=`translate(${x}px,${y}px)`;
    });
    el.addEventListener('pointerleave',()=>{ el.style.transform=''; });
  });
}

/* ---------- cart (localStorage) ---------- */
function getCart(){ try{return JSON.parse(localStorage.getItem('highrun_cart')||'[]');}catch(e){return [];} }
function setCart(c){ try{localStorage.setItem('highrun_cart',JSON.stringify(c));}catch(e){} updateCartUI(); }
function addToCart(id,size,qty=1){
  const c=getCart(); const key=id+'-'+size;
  const ex=c.find(i=>i.key===key);
  if(ex) ex.qty+=qty; else c.push({key,id,size,qty});
  setCart(c); openCart();
}
function changeQty(key,d){
  let c=getCart(); const it=c.find(i=>i.key===key);
  if(!it) return; it.qty+=d; if(it.qty<1) c=c.filter(i=>i.key!==key);
  setCart(c);
}
function removeItem(key){ setCart(getCart().filter(i=>i.key!==key)); }
function cartCount(){ return getCart().reduce((s,i)=>s+i.qty,0); }
function cartTotal(){ return getCart().reduce((s,i)=>{const p=getProduct(i.id);return s+(p?p.priceNum*i.qty:0);},0); }
function money(n){ return n.toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2})+' TL'; }

function renderCartDrawer(){
  if(document.getElementById('cart-drawer')) return;
  const d=document.createElement('div');
  d.innerHTML=`
    <div class="overlay" id="cart-overlay" onclick="closeCart()"></div>
    <aside class="cart" id="cart-drawer" aria-label="Sepet">
      <div class="cart-head"><h3>Sepetin</h3><button class="close" onclick="closeCart()" aria-label="Sepeti kapat">×</button></div>
      <div class="cart-items" id="cart-items"></div>
      <div class="cart-foot" id="cart-foot"></div>
    </aside>`;
  document.body.appendChild(d);
}
function openCart(){ renderCartDrawer(); updateCartUI(); document.getElementById('cart-overlay').classList.add('open'); document.getElementById('cart-drawer').classList.add('open'); document.body.style.overflow='hidden'; }
function closeCart(){ const o=document.getElementById('cart-overlay'),c=document.getElementById('cart-drawer'); if(o)o.classList.remove('open'); if(c)c.classList.remove('open'); document.body.style.overflow=''; }

function updateCartUI(){
  const cc=document.getElementById('cart-count'); if(cc) cc.textContent=cartCount();
  const wrap=document.getElementById('cart-items'); const foot=document.getElementById('cart-foot');
  if(!wrap) return;
  const cart=getCart();
  if(!cart.length){
    wrap.innerHTML='<div class="cart-empty"><div class="ce-ic">✦</div>Sepetin henüz boş.<br>Koleksiyonu keşfetmeye ne dersin?</div>';
    foot.innerHTML=`<a class="btn btn-ghost full" href="shop.html">Koleksiyona Git ${ARROW}</a>`;
    return;
  }
  wrap.innerHTML=cart.map(i=>{const p=getProduct(i.id);if(!p)return'';return `
    <div class="citem">
      <img src="${p.img}" alt="${p.name}">
      <div class="ci-info">
        <h4>${p.name}</h4>
        <div class="ci-meta">Numara: ${i.size} · ${p.price} TL</div>
        <div class="ci-row">
          <div class="qty"><button onclick="changeQty('${i.key}',-1)" aria-label="Azalt">−</button><span>${i.qty}</span><button onclick="changeQty('${i.key}',1)" aria-label="Artır">+</button></div>
          <button class="ci-remove" onclick="removeItem('${i.key}')">Kaldır</button>
        </div>
      </div>
    </div>`;}).join('');
  const lines=cart.map(i=>{const p=getProduct(i.id);return `• ${p.name} (Numara ${i.size}) x${i.qty}`;}).join('%0A');
  const msg=`Merhaba, HIGHRUN sipariş vermek istiyorum:%0A${lines}%0A%0AToplam: ${money(cartTotal())}`;
  foot.innerHTML=`
    <div class="cart-total"><span>Toplam</span><b>${money(cartTotal())}</b></div>
    <a class="btn btn-solid full" href="https://wa.me/${WHATSAPP}?text=${msg}" target="_blank" rel="noopener">WhatsApp ile Sipariş Ver ${ARROW}</a>
    <div class="cart-note">Siparişin WhatsApp üzerinden onaylanır. Online ödeme yakında.</div>`;
}

/* ---------- reveal (staggered blur fade-up) ---------- */
function initReveal(){
  const els=[...document.querySelectorAll('.reveal,.rise')];
  const show=el=>el.classList.add('in');
  if(!('IntersectionObserver' in window)){ els.forEach(show); return; }
  const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){show(e.target);io.unobserve(e.target);}}),{threshold:0,rootMargin:'0px 0px -6% 0px'});
  els.forEach((el)=>{
    const sibs=[...el.parentElement.children].filter(s=>s.classList.contains('reveal')||s.classList.contains('rise'));
    el.style.transitionDelay=(Math.min(Math.max(sibs.indexOf(el),0),6)*55)+'ms';
    io.observe(el);
  });
  // reveal anything already near the first screen so the landing is never blank
  const vh=window.innerHeight||800;
  requestAnimationFrame(()=>els.forEach(el=>{ if(el.getBoundingClientRect().top < vh*1.2) show(el); }));
  // hard safety net: content must never stay hidden (no-scroll / IO quirks)
  setTimeout(()=>els.forEach(show), 2600);
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded',()=>{
  renderHeader(); renderFooter(); renderCartDrawer(); updateCartUI();
  if(typeof pageInit==='function') pageInit();
  initReveal(); initMagnetic();
  addEventListener('keydown',e=>{ if(e.key==='Escape'){ closeCart(); toggleMenu(false); } });
});
