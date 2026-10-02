(() => {
  const C=UCR.CARDS,H=UCR.HEROES,R=UCR.RARITIES;
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const STORE='ucr_profile_v11',LEGACY=['ucr_profile_v10','ucr_profile_v09','ucr_profile_v08','ucr_profile_v07','ucr_profile_v06'];
  let profile=null,currentPage='home',deckHero='tiga',memoryStore=null;

  const devCollection=()=>Object.fromEntries(UCR.PACKABLE_IDS.map(id=>[id,C[id].rarity==='legendary'?1:2]));
  const defaultProfile=()=>({version:11,credits:6000,collection:devCollection(),decks:Object.fromEntries(Object.entries(UCR.TEST_DECKS).map(([k,v])=>[k,[...v]])),selectedHero:'tiga',packsOpened:0,legendaryPity:0});
  function storageGet(){try{return localStorage.getItem(STORE)||LEGACY.map(k=>localStorage.getItem(k)).find(Boolean)}catch(e){return memoryStore}}
  function storageSet(v){try{localStorage.setItem(STORE,v)}catch(e){memoryStore=v}}
  function storageRemove(){try{localStorage.removeItem(STORE);LEGACY.forEach(k=>localStorage.removeItem(k))}catch(e){memoryStore=null}}
  function load(){const raw=storageGet();if(!raw)return null;try{const old=JSON.parse(raw),base=defaultProfile();const migratedDecks=(old.version||0)<11?Object.fromEntries(Object.entries(UCR.TEST_DECKS).map(([k,v])=>[k,[...v]])):{...base.decks,...(old.decks||{})};return {...base,...old,version:11,collection:{...base.collection,...(old.collection||{})},decks:migratedDecks}}catch{return null}}
  function save(){storageSet(JSON.stringify(profile));renderGlobal()}
  function own(id){return profile?.collection?.[id]||0}
  function legalForHero(card,hero){return card.faction==='neutral'||card.faction===hero}
  function copyLimit(card){return card.rarity==='legendary'?1:2}
  function rarityRank(r){return({common:0,rare:1,epic:2,legendary:3})[r]||0}
  function typeName(t){return({unit:'单位',skill:'技能',equipment:'装备',event:'事件',trap:'陷阱'})[t]||t}
  function factionName(f){return({neutral:'中立',tiga:'迪迦',belial:'贝利亚',nexus:'奈克瑟斯',leo:'雷欧',tregear:'托雷基亚'})[f]||f}
  function slotName(s){return({weapon:'武器',armor:'装甲',device:'装置'})[s]||s}

  function cardFaceHTML(c,{cost=c.cost,large=false}={}){
    const stats=c.type==='unit'?`<div class="focus-stats"><span>⚔ ${c.atk}</span><span>♥ ${c.hp}</span></div>`:c.type==='equipment'&&c.equipment?`<div class="focus-stats"><span>${slotName(c.equipment.slot)}</span><span>耐久 ${c.equipment.durability??'∞'}</span></div>`:'';
    if(large)return `<div class="focus-cost">${cost}</div><div class="focus-art">${(c.tags?.[0]||typeName(c.type)).toUpperCase()}</div><div class="focus-title">${c.name}</div><div class="focus-type">${R[c.rarity]?.name||''} · ${factionName(c.faction)} · ${typeName(c.type)}</div><div class="focus-rule">${c.text||'无额外效果。'}</div>${stats}`;
    return `<div class="art-placeholder">${(c.tags?.[0]||typeName(c.type)).toUpperCase()}</div><div class="cname">${c.name}</div><div class="cmeta">${R[c.rarity]?.name||''} · ${factionName(c.faction)} · ${c.cost}费 · ${typeName(c.type)}</div><div class="ctags">${(c.tags||[]).join(' · ')}</div><div class="ctext">${c.text||'无额外效果。'}</div>${c.type==='unit'?`<div class="cstats"><span>⚔ ${c.atk}</span><span>♥ ${c.hp}</span></div>`:c.type==='equipment'&&c.equipment?`<div class="cstats"><span>${slotName(c.equipment.slot)}</span><span>耐久 ${c.equipment.durability??'∞'}</span></div>`:''}`;
  }

  function showCardFocus(card,{cost=card.cost,playLabel=null,onPlay=null,disabled=false}={}){
    const overlay=$('#cardFocus'),focus=$('#focusCard');if(!overlay||!card)return;
    focus.className=`focus-card rarity-${card.rarity||'common'} faction-${card.faction||'neutral'} type-${card.type||'skill'}`;focus.innerHTML=cardFaceHTML(card,{cost,large:true});
    $('#focusName').textContent=card.name;$('#focusMeta').textContent=`${cost}费 · ${typeName(card.type)} · ${factionName(card.faction)} · ${R[card.rarity]?.name||''}`;$('#focusText').textContent=card.text||'无额外效果。';
    const tags=$('#focusTags');tags.innerHTML='';(card.tags||[]).forEach(t=>{const s=document.createElement('span');s.textContent=t;tags.append(s)});
    const actions=$('#focusActions');actions.innerHTML='';
    if(onPlay){const b=document.createElement('button');b.className='focus-play';b.textContent=playLabel||'使用此牌';b.disabled=disabled;b.onclick=()=>{hideCardFocus();onPlay()};actions.append(b)}
    const close=document.createElement('button');close.className='ghost';close.textContent='关闭';close.onclick=hideCardFocus;actions.append(close);
    overlay.classList.remove('hidden');
  }
  function hideCardFocus(){$('#cardFocus')?.classList.add('hidden')}

  function init(){
    profile=load();
    if(!profile){$('#welcomePage').classList.remove('hidden');$('#mainNav').classList.add('hidden');$('#creditsLabel').textContent='0'}
    else{$('#welcomePage').classList.add('hidden');$('#mainNav').classList.remove('hidden');deckHero=profile.selectedHero||'tiga';showPage('home')}
  }
  function showPage(page){
    currentPage=page;document.body.classList.toggle('battle-mode',page==='game');$$('.page').forEach(p=>p.classList.add('hidden'));const map={home:'#homePage',packs:'#packsPage',collection:'#collectionPage',decks:'#decksPage',battle:'#battleLobbyPage',game:'#gameScreen'};$(map[page]).classList.remove('hidden');
    $('#mainNav').classList.toggle('hidden',page==='game'||!profile);$$('#mainNav button').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
    if(page==='home')renderHome();if(page==='packs')renderPackPage();if(page==='collection')renderCollection();if(page==='decks')renderDeckBuilder();if(page==='battle')renderBattleLobby();renderGlobal();window.scrollTo({top:0,behavior:'instant'});
  }
  function renderGlobal(){if(profile)$('#creditsLabel').textContent=profile.credits}
  function renderHome(){
    const hero=H[profile.selectedHero];$('#homeHeroName').textContent=hero.name;$('#homeHeroDesc').textContent=hero.description;$$('[data-home-hero]').forEach(b=>b.classList.toggle('active',b.dataset.homeHero===profile.selectedHero));
    const emblem=$('#homeHeroEmblem');emblem.className=`home-hero-emblem ${profile.selectedHero}`;
    const counts=Object.values(profile.collection);$('#uniqueOwned').textContent=counts.filter(n=>n>0).length;$('#totalOwned').textContent=counts.reduce((a,b)=>a+b,0);$('#packsOpened').textContent=profile.packsOpened;$('#deckProgress').textContent=`${profile.decks[profile.selectedHero].length}/30`;
  }

  function weightedRarity(minRank=0,forceLegendary=false){if(forceLegendary)return'legendary';const pool=Object.entries(R).filter(([k])=>rarityRank(k)>=minRank);const total=pool.reduce((a,[,v])=>a+v.weight,0);let roll=Math.random()*total;for(const [k,v] of pool){roll-=v.weight;if(roll<=0)return k}return pool[pool.length-1][0]}
  function randomCardOfRarity(rarity){const pool=UCR.PACKABLE_IDS.filter(id=>C[id].rarity===rarity);return pool[Math.floor(Math.random()*pool.length)]}
  function openPack(){const forceLegendary=profile.legendaryPity>=39,ids=[];let hasRarePlus=false,hasLegendary=false;for(let i=0;i<5;i++){let rarity;if(forceLegendary&&i===4)rarity='legendary';else if(i===4&&!hasRarePlus)rarity=weightedRarity(1);else rarity=weightedRarity(0);const id=randomCardOfRarity(rarity);ids.push(id);if(rarityRank(rarity)>=1)hasRarePlus=true;if(rarity==='legendary')hasLegendary=true;profile.collection[id]=(profile.collection[id]||0)+1}profile.packsOpened++;profile.legendaryPity=hasLegendary?0:profile.legendaryPity+1;return ids}
  function spendAndOpen(count,cost){if(profile.credits<cost){$('#packNotice').textContent='光之结晶不足。';return null}profile.credits-=cost;const packs=[];for(let i=0;i<count;i++)packs.push(openPack());save();return packs}
  function renderPackPage(){$('#packNotice').textContent=`距离传说保底最多还有 ${40-profile.legendaryPity} 包。`;$('#openOneBtn').disabled=profile.credits<100;$('#openTenBtn').disabled=profile.credits<900}
  function makePackCard(id){const c=C[id],wrap=document.createElement('div');wrap.className='pack-card';wrap.innerHTML=`<div class="pack-card-inner"><div class="pack-face pack-back">UCR</div><div class="pack-face pack-front rarity-${c.rarity}">${cardFaceHTML(c)}</div></div>`;wrap.onclick=()=>{wrap.classList.add('revealed');setTimeout(()=>showCardFocus(c),520)};return wrap}
  function openOne(){const packs=spendAndOpen(1,100);if(!packs)return;const root=$('#packReveal');root.innerHTML='';$('#packNotice').textContent='点击卡背逐张翻开。';packs[0].forEach(id=>root.append(makePackCard(id)));renderPackPage()}
  function openTen(){const packs=spendAndOpen(10,900);if(!packs)return;const ids=packs.flat().sort((a,b)=>rarityRank(C[b].rarity)-rarityRank(C[a].rarity)),root=$('#packReveal');root.innerHTML='';ids.forEach(id=>root.append(makeCollectionCard(id,true)));const l=ids.filter(id=>C[id].rarity==='legendary').length,e=ids.filter(id=>C[id].rarity==='epic').length,r=ids.filter(id=>C[id].rarity==='rare').length;$('#packNotice').textContent=`10包完成：传说 ${l} · 史诗 ${e} · 稀有 ${r} · 普通 ${50-l-e-r}`;renderPackPage()}

  function makeCollectionCard(id,showNoOwned=false,{addAction=null,extraClass=''}={}){
    const c=C[id],n=own(id),d=document.createElement('article');d.className=`collection-card rarity-${c.rarity} faction-${c.faction} type-${c.type} ${n===0&&!showNoOwned?'locked':''} ${extraClass}`;d.innerHTML=`${showNoOwned?'':`<div class="owned">×${n}</div>`}${cardFaceHTML(c)}`;
    d.onclick=e=>{if(e.target.closest('.card-add'))return;showCardFocus(c)};
    if(addAction){const plus=document.createElement('button');plus.className='card-add';plus.textContent='＋';plus.title='加入牌组';plus.onclick=e=>{e.stopPropagation();addAction()};d.append(plus)}
    return d;
  }
  function renderCollection(){const f=$('#collectionFaction').value,t=$('#collectionType').value,root=$('#collectionGrid');root.innerHTML='';UCR.PACKABLE_IDS.map(id=>C[id]).filter(c=>(f==='all'||c.faction===f)&&(t==='all'||c.type===t)).sort((a,b)=>a.cost-b.cost||rarityRank(b.rarity)-rarityRank(a.rarity)).forEach(c=>root.append(makeCollectionCard(c.id)))}

  function countInDeck(hero,id){return profile.decks[hero].filter(x=>x===id).length}
  function canAdd(hero,id){const c=C[id];return own(id)>countInDeck(hero,id)&&countInDeck(hero,id)<copyLimit(c)&&profile.decks[hero].length<30&&legalForHero(c,hero)}
  function addCard(hero,id){if(!canAdd(hero,id))return;profile.decks[hero].push(id);profile.decks[hero].sort((a,b)=>C[a].cost-C[b].cost||C[a].name.localeCompare(C[b].name));save();renderDeckBuilder()}
  function removeCard(hero,id){const i=profile.decks[hero].lastIndexOf(id);if(i>=0){profile.decks[hero].splice(i,1);save();renderDeckBuilder()}}
  function renderDeckBuilder(){
    $('#deckHeroTitle').textContent=H[deckHero].name;$$('[data-deck-hero]').forEach(b=>b.classList.toggle('active',b.dataset.deckHero===deckHero));const pool=$('#deckCardPool');pool.innerHTML='';
    UCR.PACKABLE_IDS.map(id=>C[id]).filter(c=>legalForHero(c,deckHero)).sort((a,b)=>a.cost-b.cost||rarityRank(b.rarity)-rarityRank(a.rarity)).forEach(c=>{const usable=canAdd(deckHero,c.id);pool.append(makeCollectionCard(c.id,false,{addAction:usable?()=>addCard(deckHero,c.id):null,extraClass:usable?'':'unusable'}))});
    const deck=profile.decks[deckHero],counts={};deck.forEach(id=>counts[id]=(counts[id]||0)+1);const list=$('#deckList');list.innerHTML='';Object.keys(counts).sort((a,b)=>C[a].cost-C[b].cost||C[a].name.localeCompare(C[b].name)).forEach(id=>{const c=C[id],e=document.createElement('div');e.className='deck-entry';e.innerHTML=`<div class="deck-cost">${c.cost}</div><div class="deck-name">${c.name}</div><div class="deck-copy">×${counts[id]}</div>`;e.title='点击移除一张';e.onclick=()=>removeCard(deckHero,id);list.append(e)});$('#deckCount').textContent=`${deck.length} / 30`;$('#deckStatus').textContent=deck.length===30?'牌组已就绪，可以进入战斗模拟。':`还需要 ${30-deck.length} 张牌。`;
  }
  function autoBuild(){profile.decks[deckHero]=[...UCR.TEST_DECKS[deckHero]];save();renderDeckBuilder()}
  function enemyFor(hero){return({tiga:'belial',belial:'nexus',nexus:'leo',leo:'tregear',tregear:'tiga'})[hero]||'belial'}
  function renderBattleLobby(){const hero=profile.selectedHero,deck=profile.decks[hero]||[],enemy=enemyFor(hero),valid=deck.length===30;$('#battleHeroName').textContent=H[hero].name;$('#battleEnemyName').textContent=H[enemy].name;$('#battleDeckStatus').textContent=valid?'30张构筑牌已锁定。对局开始后先进行起手调度。':'当前牌组未满30张，请先完成构筑。';$('#startBattleBtn').disabled=!valid;const p=$('#lobbyPlayerSigil'),e=$('#lobbyEnemySigil');p.className=`lobby-sigil ${hero}`;e.className=`lobby-sigil ${enemy}`;p.textContent=H[hero].sigil||hero[0].toUpperCase();e.textContent=H[enemy].sigil||enemy[0].toUpperCase()}
  function startBattle(){const hero=profile.selectedHero,deck=profile.decks[hero];if(deck.length!==30)return;showPage('game');UCRBattle.start(hero,[...deck])}

  $('#createProfileBtn').onclick=()=>{profile=defaultProfile();save();$('#welcomePage').classList.add('hidden');$('#mainNav').classList.remove('hidden');showPage('home')};
  $$('#mainNav button').forEach(b=>b.onclick=()=>showPage(b.dataset.page));$$('[data-jump]').forEach(b=>b.onclick=()=>showPage(b.dataset.jump));
  $$('[data-home-hero]').forEach(b=>b.onclick=()=>{profile.selectedHero=b.dataset.homeHero;deckHero=profile.selectedHero;save();renderHome()});
  $$('[data-deck-hero]').forEach(b=>b.onclick=()=>{deckHero=b.dataset.deckHero;profile.selectedHero=deckHero;save();renderDeckBuilder()});
  $('#openOneBtn').onclick=openOne;$('#openTenBtn').onclick=openTen;$('#collectionFaction').onchange=renderCollection;$('#collectionType').onchange=renderCollection;$('#autoBuildBtn').onclick=autoBuild;$('#clearDeckBtn').onclick=()=>{profile.decks[deckHero]=[];save();renderDeckBuilder()};$('#startBattleBtn').onclick=startBattle;
  $('#leaveBattleBtn').onclick=()=>{UCRBattle.leave();showPage('battle')};$('#resetProfileBtn').onclick=()=>{if(confirm('确定重置 UCR Prototype 0.11 的本地测试档案吗？')){storageRemove();location.reload()}};
  $('#cardFocus .focus-backdrop').onclick=hideCardFocus;document.addEventListener('keydown',e=>{if(e.key==='Escape'){hideCardFocus();if(!$('#modal').classList.contains('hidden'))$('#modal').classList.add('hidden')}});
  $('#modalX').onclick=()=>{$('#modal').classList.add('hidden')};
  window.UCRUI={showCardFocus,hideCardFocus,cardFaceHTML};window.UCRApp={showPage};init();
})();
