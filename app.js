/* app.js - loads products into pages, manages cart count, filter, slider */
/* keep this file in same folder and referenced by index.html */
(function(){
  const PRODUCTS = [
    {id:'pubg-60', title:'PUBG 60 UC', cat:'pubg', price:3.50, img:'https://i.ibb.co/3r5cm0V/pubg-uc.jpg', desc:'شحن فوري لـ 60 UC'},
    {id:'pubg-325', title:'PUBG 325 UC', cat:'pubg', price:15.00, img:'https://i.ibb.co/3r5cm0V/pubg-uc.jpg', desc:'شحن فوري لـ 325 UC'},
    {id:'ff-100', title:'Free Fire 100 Diamonds', cat:'freefire', price:2.50, img:'https://i.ibb.co/1vTQG7F/freefire.jpg', desc:'شحن سريع'},
    {id:'gp-10', title:'Google Play $10', cat:'cards', price:8.50, img:'https://i.ibb.co/C8xR5cH.png', desc:'بطاقة Google Play 10$'},
    {id:'it-15', title:'iTunes $15', cat:'cards', price:13.50, img:'https://i.ibb.co/umj9U9R.png', desc:'بطاقة iTunes 15$'},
    {id:'psn-20', title:'PlayStation $20', cat:'cards', price:18.00, img:'https://i.ibb.co/L8UQwPN.png', desc:'PSN 20$'},
    {id:'xbox-25', title:'Xbox $25', cat:'cards', price:22.00, img:'https://i.ibb.co/cgl3YMJ.png', desc:'Xbox 25$'},
    {id:'steam-20', title:'Steam $20', cat:'cards', price:18.50, img:'https://i.ibb.co/TS7ImYJ.png', desc:'Steam Wallet 20$'},
    {id:'rob-400', title:'Robux 400', cat:'robux', price:4.00, img:'https://i.ibb.co/ZywjgGm.png', desc:'Robux 400'}
  ];
  // store products for cart/product page usage
  localStorage.setItem('luffy_products', JSON.stringify(PRODUCTS));

  /* slider */
  const slides = document.querySelectorAll('#slider .slide');
  let si = 0;
  function showSlide(i){
    slides.forEach(s=>s.classList.remove('active'));
    slides[i].classList.add('active');
  }
  if(slides.length){
    showSlide(0);
    setInterval(()=>{ si = (si+1) % slides.length; showSlide(si); }, 4000);
  }

  /* render products on index */
  const grid = document.getElementById('products');
  if(grid){
    const render = (list)=> {
      grid.innerHTML = '';
      list.forEach(p=>{
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `<img src="${p.img}" alt="${p.title}"><div class="title">${p.title}</div><div class="desc">${p.desc}</div>
          <div class="price-row"><div class="price">${p.price.toFixed(2)} د.ل</div>
          <div class="actions"><a class="btn ghost" href="product.html?id=${p.id}">تفاصيل</a>
          <button class="btn" onclick="addToCart('${p.id}')">أضف للسلة</button></div></div>`;
        grid.appendChild(el);
      });
    };
    render(PRODUCTS);

    // filter by category buttons
    document.querySelectorAll('.cat-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        if(cat==='all') render(PRODUCTS);
        else render(PRODUCTS.filter(p=>p.cat===cat));
      });
    });

    // search
    const input = document.getElementById('search');
    if(input){
      input.addEventListener('input', ()=> {
        const q = input.value.trim().toLowerCase();
        if(!q) render(PRODUCTS);
        else render(PRODUCTS.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)));
      });
    }
  }

  /* CART functions */
  window.addToCart = function(id){
    let cart = JSON.parse(localStorage.getItem('luffy_cart')||'[]');
    const it = cart.find(x=>x.id===id);
    if(it) it.qty++; else cart.push({id,qty:1});
    localStorage.setItem('luffy_cart', JSON.stringify(cart));
    updateCartCount();
    alert('تمت الإضافة إلى السلة');
  };

  window.updateCartCount = function(){
    const cart = JSON.parse(localStorage.getItem('luffy_cart')||'[]');
    const sum = cart.reduce((s,i)=>s+i.qty,0);
    const el = document.getElementById('top-cart-count');
    if(el) el.textContent = sum;
  };

  // init
  updateCartCount();

  // expose products for other pages (already stored in localStorage)
})();
