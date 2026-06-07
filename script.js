const cur=document.getElementById('cur'),
      curR=document.getElementById('cur-r');

let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove',e=>{
  mx=e.clientX;
  my=e.clientY;
  cur.style.left=mx+'px';
  cur.style.top=my+'px';
});

(function raf(){
  rx+=(mx-rx)*.11;
  ry+=(my-ry)*.11;
  curR.style.left=rx+'px';
  curR.style.top=ry+'px';
  requestAnimationFrame(raf);
})();

document.querySelectorAll(
  'a,button,.proj-card,.cert-card,.soc-row,.ct-row'
).forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    curR.style.transform='translate(-50%,-50%) scale(1.7)';
    curR.style.borderColor='rgba(167,139,250,.6)';
  });

  el.addEventListener('mouseleave',()=>{
    curR.style.transform='translate(-50%,-50%) scale(1)';
    curR.style.borderColor='rgba(167,139,250,.35)';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(a =>
  a.addEventListener('click',e=>{
    e.preventDefault();

    const t=document.querySelector(
      a.getAttribute('href')
    );

    if(t){
      t.scrollIntoView({
        behavior:'smooth'
      });
    }
  })
);

const scrollIndicator =
  document.querySelector('.scroll-indicator');

window.addEventListener('scroll',()=>{
  nav.style.background =
    window.scrollY > 40
      ? 'rgba(15,12,26,.95)'
      : 'rgba(15,12,26,.75)';

  if(scrollIndicator){
    scrollIndicator.style.opacity =
      window.scrollY > 80 ? '0' : '0.7';
  }
});

/* MOBILE NAV */
const ham=document.getElementById('navHam'),
      mob=document.getElementById('mob-nav'),
      mc=document.getElementById('mobClose');

ham.addEventListener('click',()=>{
  mob.classList.toggle('open');
});

mc.addEventListener('click',()=>{
  mob.classList.remove('open');
});

document.querySelectorAll('.mob-link').forEach(a =>
  a.addEventListener('click',()=>{
    mob.classList.remove('open');
  })
);

const ro = new IntersectionObserver(
  es => es.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
    }
  }),
  {
    threshold:.08,
    rootMargin:'0px 0px -20px 0px'
  }
);

document.querySelectorAll('.rv')
  .forEach(el=>ro.observe(el));

/* CERTIFICATE MODAL */
const modal  = document.getElementById('certModal'),
      mImg   = document.getElementById('mImg'),
      mTitle = document.getElementById('mTitle'),
      mDl    = document.getElementById('mDl');

document.querySelectorAll('.cert-card').forEach(c =>
  c.addEventListener('click',()=>{
    mImg.src = c.dataset.cert;
    mTitle.textContent = c.dataset.name;
    mDl.href = c.dataset.cert;
    mDl.download = c.dataset.name;

    modal.classList.add('open');
  })
);

document.getElementById('mClose')
  .addEventListener('click',()=>{
    modal.classList.remove('open');
  });

modal.addEventListener('click',e=>{
  if(e.target === modal){
    modal.classList.remove('open');
  }
});

document.addEventListener('keydown',e=>{
  if(e.key === 'Escape'){
    modal.classList.remove('open');
  }
});
