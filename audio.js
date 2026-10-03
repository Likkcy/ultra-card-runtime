(() => {
  const KEY='ucr_audio_v1';
  let prefs={music:true,musicVolume:.35,sound:true,soundVolume:.6};
  try { prefs={...prefs,...JSON.parse(localStorage.getItem(KEY)||'{}')}; } catch {}
  for(const key of ['musicVolume','soundVolume'])prefs[key]=Math.max(0,Math.min(1,Number(prefs[key])||0));
  let context=null,battle=false,voices=new Set(),trackIndex=0,unlocked=false;
  const music=new Audio();music.preload='none';music.volume=prefs.musicVolume;
  // No names are rendered; this manifest contains only public asset paths.
  const tracks=Array.isArray(window.UCR_BGM)?window.UCR_BGM.filter(x=>typeof x==='string'&&/^assets\/audio\/bgm\/[\w.-]+$/.test(x)):[];
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(prefs))}catch{}}
  function playMusic(){
    if(!battle||!prefs.music||!unlocked||!tracks.length||document.hidden){music.pause();return;}
    if(!music.getAttribute('src'))music.src=tracks[trackIndex];
    music.play().catch(()=>{});
  }
  function unlock(){
    unlocked=true;
    const AudioContext=window.AudioContext||window.webkitAudioContext;
    if(!context&&AudioContext){try{context=new AudioContext()}catch{}}
    context?.resume().catch(()=>{});playMusic();
  }
  document.addEventListener('pointerdown',unlock,{passive:true});
  document.addEventListener('keydown',unlock);
  music.addEventListener('ended',()=>{trackIndex=(trackIndex+1)%tracks.length;music.src=tracks[trackIndex];playMusic()});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)music.pause();else playMusic()});
  const notes={draw:[660,990],play:[220,440],heavy:[110,165,330,660],grave:[330,165],attack:[180,90],damage:[95],heal:[440,660,880],turn:[330,440],trap:[740,370],form:[220,440,880],victory:[392,494,587,784],defeat:[330,294,220],end:[392,330]};
  function sound(kind){
    if(!battle||!prefs.sound||!context||context.state!=='running'||document.hidden||voices.size>=24)return;
    const tones=notes[kind]||notes.play,now=context.currentTime;
    tones.forEach((hz,i)=>{
      const osc=context.createOscillator(),gain=context.createGain(),start=now+i*.075;
      osc.type=['attack','damage','grave'].includes(kind)?'triangle':'sine';osc.frequency.setValueAtTime(hz,start);
      if(kind==='attack'||kind==='damage')osc.frequency.exponentialRampToValueAtTime(Math.max(30,hz/3),start+.14);
      gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(prefs.soundVolume*.12,start+.012);gain.gain.exponentialRampToValueAtTime(.001,start+.24);
      osc.connect(gain);gain.connect(context.destination);voices.add(osc);osc.onended=()=>{voices.delete(osc);osc.disconnect();gain.disconnect()};osc.start(start);osc.stop(start+.26);
    });
  }
  function stop(){battle=false;music.pause();for(const osc of voices){try{osc.stop()}catch{}}voices.clear()}
  function controls(root){
    for(const [label,toggle,volume] of [['音乐','music','musicVolume'],['音效','sound','soundVolume']]){
      const row=document.createElement('div');row.className='settings-row audio-controls';
      const name=document.createElement('b');name.textContent=label;
      const button=document.createElement('button');button.className='ghost';button.type='button';
      const update=()=>{button.textContent=prefs[toggle]?'开启':'关闭';button.setAttribute('aria-pressed',String(prefs[toggle]))};update();
      button.onclick=()=>{prefs[toggle]=!prefs[toggle];persist();update();unlock();if(toggle==='music')playMusic()};
      const slider=document.createElement('input');slider.type='range';slider.min='0';slider.max='100';slider.value=String(Math.round(prefs[volume]*100));slider.setAttribute('aria-label',label+'音量');
      const value=document.createElement('output');value.textContent=slider.value+'%';
      slider.oninput=()=>{prefs[volume]=Number(slider.value)/100;value.textContent=slider.value+'%';music.volume=prefs.musicVolume;persist()};
      row.append(name,button,slider,value);root.append(row);
    }
  }
  window.UCRAudio={sound,controls,start(){battle=true;trackIndex=tracks.length?Math.floor(Math.random()*tracks.length):0;music.removeAttribute('src');music.load();playMusic()},end(){battle=false;music.pause()},stop};
})();
