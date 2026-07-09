// starfield
const sky = document.getElementById('sky');
const starCount = 90;
for(let i=0;i<starCount;i++){
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random()*2 + 1;
  s.style.width = size+'px';
  s.style.height = size+'px';
  s.style.left = Math.random()*100+'vw';
  s.style.top = Math.random()*100+'vh';
  s.style.animationDelay = (Math.random()*3.5)+'s';
  sky.appendChild(s);
}
const fireflyCount = 8;
for(let i=0;i<fireflyCount;i++){
  const f = document.createElement('div');
  f.className = 'firefly';
  f.style.left = Math.random()*100+'vw';
  f.style.top = Math.random()*100+'vh';
  f.style.animationDelay = (Math.random()*10)+'s';
  f.style.animationDuration = (10+Math.random()*8)+'s';
  sky.appendChild(f);
}

// dodge button
const noBtn = document.getElementById('noBtn');
const buttonsWrap = document.getElementById('buttonsWrap');
const yesBtn = document.getElementById('yesBtn');
let dodgeCount = 0;
function dodge(){
  dodgeCount++;
  const wrapRect = buttonsWrap.getBoundingClientRect();
  const maxX = Math.max(wrapRect.width - 90, 40);
  const maxY = Math.max(wrapRect.height - 20, 10);
  const newX = Math.random()*maxX;
  const newY = (Math.random()-0.5) * maxY;
  noBtn.style.left = newX + 'px';
  noBtn.style.top = newY + 'px';
  const scale = Math.min(1 + dodgeCount*0.08, 1.6);
  yesBtn.style.transform = `scale(${scale})`;
  noBtn.style.opacity = Math.max(1 - dodgeCount*0.12, 0.35);
}
noBtn.addEventListener('mouseenter', dodge);
noBtn.addEventListener('click', (e)=>{ e.preventDefault(); dodge(); });
noBtn.addEventListener('touchstart', (e)=>{ e.preventDefault(); dodge(); });

// yes -> swap screens (no scrolling, just a view swap)
const askSection = document.getElementById('askSection');
const celebrateSection = document.getElementById('celebrateSection');
yesBtn.addEventListener('click', ()=>{
  askSection.classList.remove('visible');
  celebrateSection.classList.add('visible');
  burstPetals();
  const summaryDodges = document.getElementById('summaryDodges');
  if(dodgeCount > 0 && summaryDodges){
    summaryDodges.textContent = `(after making "no" run away ${dodgeCount} time${dodgeCount>1?'s':''})`;
  }
});

// date type picker
const dateOpts = document.querySelectorAll('.date-opt');
const summaryCard = document.getElementById('summaryCard');
const summaryDate = document.getElementById('summaryDate');
dateOpts.forEach(opt=>{
  opt.addEventListener('click', ()=>{
    dateOpts.forEach(o=>o.classList.remove('selected'));
    opt.classList.add('selected');
    summaryDate.textContent = opt.dataset.date;
    summaryCard.classList.add('active');

    // show the thank-you pop-up
    showModal(opt.dataset.date);

  });
});

// pop-up modal
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalHike = document.getElementById('modalHike');

function showModal(hikeName){
  modalHike.textContent = hikeName;
  modalOverlay.classList.add('visible');
}
function hideModal(){
  modalOverlay.classList.remove('visible');
}
modalClose.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', (e)=>{
  if(e.target === modalOverlay) hideModal();
});

function burstPetals(){
  const bloom = document.getElementById('bloom');
  for(let i=0;i<24;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    const angle = Math.random()*360;
    p.style.setProperty('--rot', angle+'deg');
    p.style.animationDelay = (Math.random()*0.4)+'s';
    p.style.background = i % 2 === 0 ? 'var(--blush)' : 'var(--gold)';
    bloom.appendChild(p);
  }
}
