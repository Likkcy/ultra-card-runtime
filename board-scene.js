(() => {
  const canvas=document.querySelector('#boardScene'),shade=document.querySelector('#boardNightShade'),arena=canvas.parentElement;
  const ctx=canvas.getContext('2d'),motion=matchMedia('(prefers-reduced-motion: reduce)');
  const wraith=new Image();wraith.src='assets/boards/graveyard-wraith-v1.png';
  let running=false,kind='sunlit',raf=0,elapsed=0,last=0,lastPaint=0;
  const clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
  function resize(){const r=arena.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(r.width*dpr);canvas.height=Math.round(r.height*dpr)}
  new ResizeObserver(resize).observe(arena);
  function ellipse(x,y,rx,ry,color){ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill()}
  function glow(x,y,r,color){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2)}
  function chain(ax,ay,bx,by,tension){
    const dx=bx-ax,dy=by-ay,len=Math.hypot(dx,dy),steps=Math.max(2,Math.ceil(len/14));
    for(let i=0;i<=steps;i++){const p=i/steps,x=ax+dx*p,y=ay+dy*p+Math.sin(p*Math.PI)*(1-tension)*50;ctx.save();ctx.translate(x,y);ctx.rotate(Math.atan2(dy,dx)+(i%2?.5:0));ctx.strokeStyle=i%2?'#ddd0ad':'#766958';ctx.lineWidth=3;ctx.shadowColor='#000';ctx.shadowBlur=3;ctx.beginPath();ctx.ellipse(0,0,8,i%2?3:5,0,0,Math.PI*2);ctx.stroke();ctx.restore()}
  }
  function ghost(t){
    const cycle=Math.floor((t+18)/22),p=(t+18)%22;if(p>7)return;
    const x=cycle%2?1280:120,base=725,rise=smooth(p/2.5),fall=smooth((p-4.5)/2.5),y=base-220*rise+260*fall,alpha=smooth(p/.8)*(1-smooth((p-5.8)/1.2));
    ctx.save();ctx.globalAlpha=alpha;glow(x,y,110,'#b7e7e166');
    for(let i=0;i<9;i++){const sway=Math.sin(t*2-i*.4)*12;ellipse(x+sway,y+35+i*8,35-i*2,15,`rgba(145,206,195,${.08-i*.007})`)}
    ctx.save();ctx.translate(x+Math.sin(t*1.8)*9,y);ctx.shadowColor='#b4fff4';ctx.shadowBlur=18;
    if(wraith.complete&&wraith.naturalWidth){ctx.drawImage(wraith,-80,-115,160,235)}else{
    const g=ctx.createLinearGradient(0,-65,0,80);g.addColorStop(0,'#e3f7eacc');g.addColorStop(.6,'#a6d9ccaa');g.addColorStop(1,'#6f9e9b00');ctx.fillStyle=g;
    ctx.beginPath();ctx.moveTo(-34,5);ctx.bezierCurveTo(-42,-65,42,-65,34,5);ctx.bezierCurveTo(39,33,46,49,50,68);ctx.lineTo(24,51);ctx.lineTo(12,80);ctx.lineTo(-3,53);ctx.lineTo(-21,77);ctx.lineTo(-27,48);ctx.lineTo(-49,67);ctx.closePath();ctx.fill();
    }ctx.restore();
    if(p>2){const wrap=smooth((p-2)/1.3);chain(x-95,base+35,x-22,y+20,wrap);chain(x+95,base+35,x+22,y+20,wrap);ctx.strokeStyle='#d0bb91';ctx.lineWidth=4;for(let j=0;j<3;j++){ctx.beginPath();ctx.ellipse(x,y+10+j*12,37,9,.2,0,Math.PI*2*wrap);ctx.stroke()}}
    glow(x,base+40,65,'#ff762333');ctx.restore();
  }
  function eruption(t){
    const cycle=Math.floor((t+9)/17),p=(t+9)%17;if(p>3.6)return;const x=cycle%2?1350:50,y=cycle%3?650:345,fade=1-clamp(p/3.6);
    glow(x,y,110*fade+20,`rgba(255,118,24,${fade*.4})`);
    for(let i=0;i<32;i++){const delay=(i%8)*.09,a=p-delay;if(a<0||a>2.6)continue;const speed=120+(i%7)*26,vx=Math.sin(i*8.7)*65,px=x+vx*a,py=y-speed*a+115*a*a;const hot=1-a/2.6;glow(px,py,10,'#ff8b2755');ellipse(px,py,2+hot*3,3+hot*4,hot>.5?'#ffe39b':'#f97b32')}
  }
  function fountain(t,x){
    ctx.save();ctx.beginPath();ctx.rect(x-100,320,200,330);ctx.clip();
    for(let i=0;i<7;i++){ctx.strokeStyle=`rgba(163,239,255,${.13+i*.035})`;ctx.lineWidth=2+i%2;ctx.shadowColor='#b0fbff';ctx.shadowBlur=5;ctx.beginPath();ctx.moveTo(x-28+i*9,368);ctx.bezierCurveTo(x-35+i*11,425,x+Math.sin(t*1.4+i)*7,480,x+Math.sin(t*1.7+i)*20,548);ctx.stroke();for(let j=0;j<5;j++){const p=(t*.6+j*.2+i*.04)%1;ellipse(x-25+i*8+Math.sin(p*9+t)*6,370+p*180,1.6,3,'#e7ffffbb')}}
    ctx.shadowBlur=0;for(let i=0;i<6;i++){const p=(t*.45+i/6)%1;ctx.strokeStyle=`rgba(220,252,255,${(1-p)*.48})`;ctx.lineWidth=1.3;ctx.beginPath();ctx.ellipse(x,555,8+p*78,2+p*23,0,0,Math.PI*2);ctx.stroke()}
    for(let i=0;i<18;i++){const p=(t*.23+i*.071)%1;ellipse(x+Math.sin(i*9+p*3)*65,535+Math.cos(i*2+p*4)*35,1.2,1.2,`rgba(255,255,239,${.25+.25*Math.sin(t*2+i)})`)}ctx.restore();
  }
  function heaven(t){
    const phase=t%90,night=smooth((phase-32)/8)*(1-smooth((phase-72)/10));shade.style.opacity=String(night*.82);arena.classList.toggle('scene-night',night>.55);
    fountain(t,115);fountain(t+1.3,1285);
    const sweep=(t+21)%26;if(sweep<5){const x=-500+sweep*420;ctx.save();ctx.globalAlpha=Math.sin(sweep/5*Math.PI)*.3;const g=ctx.createLinearGradient(x-130,0,x+170,0);g.addColorStop(0,'transparent');g.addColorStop(.5,'#fff7cb');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.transform(1,0,-.3,1,0,0);ctx.fillRect(x-130,0,300,1000);ctx.restore()}
    if(night>.05){ctx.save();ctx.globalAlpha=night;for(let i=0;i<32;i++){const x=30+(i*317)%1340,y=20+(i*163)%980;if(x>215&&x<1185&&y>120&&y<850)continue;glow(x,y,8,'#d6e8ff77');ellipse(x,y,1.2,1.2,`rgba(232,243,255,${.5+.4*Math.sin(t*1.6+i)})`)}ctx.restore()}
  }
  function paint(t){ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);ctx.setTransform(canvas.width/1400,0,0,canvas.height/1000,0,0);if(kind==='ultra-graveyard'){ghost(t);eruption(t)}if(kind==='celestial-sanctuary')heaven(t);canvas.dataset.sceneTime=t.toFixed(2)}
  function permitted(){return running&&!document.hidden&&!motion.matches&&!document.body.classList.contains('reduced-fx')}
  function frame(now){raf=0;if(!permitted()){last=0;return}if(last)elapsed+=Math.min((now-last)/1000,.1);last=now;if(now-lastPaint>=33){paint(elapsed);lastPaint=now}raf=requestAnimationFrame(frame)}
  function sync(){cancelAnimationFrame(raf);raf=0;last=0;if(permitted()){resize();raf=requestAnimationFrame(frame)}else{ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);shade.style.opacity='0';arena.classList.remove('scene-night')}}
  document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
  window.UCRScene={start(board){kind=board;elapsed=0;running=board!=='sunlit';sync()},stop(){running=false;sync()}};
})();
