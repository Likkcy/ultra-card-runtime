(() => {
  const C=UCR.CARDS,H=UCR.HEROES;
  const $=s=>document.querySelector(s);
  const el=(tag,cls,txt='')=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt)n.textContent=txt;return n};
  const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  const rand=a=>a[Math.floor(Math.random()*a.length)];
  let state=null,selectedAttacker=null,targeting=null,session=0;

  function sideKeyFromObj(s){return state?.player===s?'player':state?.enemy===s?'enemy':null}
  function centerOf(node){if(!node)return{x:innerWidth/2,y:innerHeight/2};const r=node.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,w:r.width,h:r.height}}
  function fxLayer(){return $('#fxLayer')}
  function combatToast(text,key='player'){const root=$('#combatToastLayer');if(!root)return;const n=el('div','combat-toast '+(key==='enemy'?'enemy':''),text);root.append(n);setTimeout(()=>n.remove(),900)}
  function floatNumber(selector,n,type='damage'){const node=typeof selector==='string'?$(selector):selector;if(!node||!fxLayer())return;const c=centerOf(node),d=el('div',`fx-float-number ${type}`,`${type==='damage'?'-':'+'}${n}`);d.style.left=c.x+'px';d.style.top=(c.y-5)+'px';fxLayer().append(d);setTimeout(()=>d.remove(),900)}
  function pulseDeck(key='player'){const node=key==='player'?$('#deckInfoBtn'):$('.enemy-lane');if(!node)return;node.classList.remove('deck-pulse');void node.offsetWidth;node.classList.add('deck-pulse');setTimeout(()=>node.classList.remove('deck-pulse'),500)}
  function animateGhost(fromNode,toNode,label,key='player',duration=480){const root=fxLayer();if(!root)return;const a=centerOf(fromNode),b=centerOf(toNode),g=el('div','fx-card-ghost '+(key==='enemy'?'enemy':''),label);g.style.left=(a.x-75)+'px';g.style.top=(a.y-107)+'px';g.style.opacity='0';g.style.transform='scale(.55) rotate(-8deg)';root.append(g);requestAnimationFrame(()=>{g.style.opacity='1';g.style.transform=`translate(${b.x-a.x}px,${b.y-a.y}px) scale(.62) rotate(3deg)`});setTimeout(()=>{g.style.opacity='0';setTimeout(()=>g.remove(),180)},duration)}
  function animateDraw(key,card){pulseDeck(key);const from=key==='player'?$('#deckInfoBtn'):$('.enemy-lane'),to=key==='player'?$('#playerHand'):$('.enemy-lane .hero-side-data');animateGhost(from,to,card?.name||'抽牌',key);combatToast(`${key==='player'?'抽到':'敌方抽取'}：${card?.name||'卡牌'}`,key)}
  function animatePlayedCard(key,card){const core=$('#battlefieldCore');if(!core)return;const n=el('div','played-card-flash '+(key==='enemy'?'enemy':''));n.innerHTML=`<b>${card.name}</b><span>${typeName(card.type)}</span><small>${card.text||''}</small>`;core.append(n);setTimeout(()=>n.remove(),720);combatToast(`${H[side(key).heroId].name} · ${card.name}`,key)}
  function animateToGrave(key,label,fromNode=null){const to=$('#graveyardBtn');if(key==='player'&&to)animateGhost(fromNode||$('#battlefieldCore'),to,label,key,420)}
  function showTurnSplash(key){const n=$('#turnSplash');if(!n)return;n.classList.remove('hidden');n.querySelector('strong').textContent=key==='player'?'我方回合':'敌方回合';n.querySelector('span').textContent=key==='player'?'部署单位、使用技能并规划攻击':'对手正在执行战术';n.classList.remove('turn-splash');void n.offsetWidth;n.classList.add('turn-splash');setTimeout(()=>n.classList.add('hidden'),1050)}
  function attackNode(key,att){if(att.type==='hero')return $(key==='player'?'#playerHero':'#enemyHero');return $(`#${key}Board .slot:nth-child(${att.index+1}) .unit`)}
  function targetNode(t){if(t.unitIndex===null)return $(t.side==='player'?'#playerHero':'#enemyHero');return $(`#${t.side}Board .slot:nth-child(${t.unitIndex+1}) .unit`)}
  function animateStrike(key,att,t){const a=centerOf(attackNode(key,att)),b=centerOf(targetNode(t)),root=fxLayer();if(!root)return;const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy),ang=Math.atan2(dy,dx)*180/Math.PI,line=el('div',`fx-strike-line ${key==='enemy'?'enemy':''}`);line.style.left=a.x+'px';line.style.top=a.y+'px';line.style.width=len+'px';line.style.transform=`rotate(${ang}deg)`;root.append(line);setTimeout(()=>line.remove(),360)}

  function side(k){return state?.[k]}
  function other(k){return k==='player'?'enemy':'player'}
  function enemyFor(hero){return({tiga:'belial',belial:'nexus',nexus:'leo',leo:'tregear',tregear:'tiga'})[hero]||'belial'}
  function legalGeneratedForHero(card,heroId){return card.faction==='neutral'||card.faction===heroId}
  function cloneCard(id,extra={}){return {...C[id],...extra,instanceId:id+'_'+Math.random().toString(36).slice(2)}}
  function makeSide(heroId,isAI,deckIds){
    const hero=H[heroId];
    return {
      heroId,isAI,hp:hero.hp,maxHp:hero.hp,form:hero.baseForm,
      maxEnergy:0,energy:0,hand:[],deck:shuffle(deckIds),board:[],graveyard:[],event:null,equipment:[],traps:[],
      heroPowerUsed:false,heroAttack:0,heroAttackUsed:false,heroAttackTurns:0,heroAttackSelfDamage:0,
      nextSkillDiscount:0,nextUnitDiscount:0,firstSkillUsed:false,fatigue:0,
      heroDamagedThisTurn:false,formChangedThisTurn:false,cardsPlayedThisTurn:0,lastReturned:null,tagsPlayedThisTurn:{},trapsTriggered:0,trapTriggeredThisTurn:false,pendingEnergy:0
    };
  }


  const EQUIPMENT_SLOTS=['weapon','armor','device'];
  const EQUIPMENT_SLOT_NAMES={weapon:'武器',armor:'装甲',device:'装置'};
  function equipmentBySlot(s,slot){return s?.equipment?.find(eq=>eq.slot===slot)||null}
  function heroAttackValue(s,targetIsUnit=false){
    if(!s)return 0;let total=s.heroAttack||0;
    for(const eq of s.equipment||[]){total+=eq.effect?.attack||0;if(targetIsUnit)total+=eq.effect?.attackVsUnitBonus||0}
    return Math.max(0,total);
  }
  function removeEquipment(key,eq,{triggerBreak=true,reason='破坏'}={}){
    const s=side(key);if(!s||!eq)return;
    const idx=s.equipment.findIndex(x=>x===eq||x.instanceId===eq.instanceId);if(idx<0)return;
    s.equipment.splice(idx,1);s.graveyard.push(eq.id);
    log(`${H[s.heroId].name} 的${EQUIPMENT_SLOT_NAMES[eq.slot]||'装备'}【${eq.name}】被${reason}。`);
    if(triggerBreak)runOps(eq.effect?.onBreak||[],key,null,null);
  }
  function consumeEquipment(key,eq,n=1){
    if(!eq||eq.durability===null||eq.durability===undefined)return;
    eq.durability-=n;if(eq.durability<=0)removeEquipment(key,eq,{triggerBreak:true,reason:'耗尽'});
  }
  function equipCard(key,card){
    const s=side(key),spec=card.equipment||{slot:'device',durability:1};if(!s)return;
    const slot=spec.slot||'device',old=equipmentBySlot(s,slot);
    if(old)removeEquipment(key,old,{triggerBreak:false,reason:'替换'});
    const eq={id:card.id,instanceId:card.id+'_'+Math.random().toString(36).slice(2),name:card.name,text:card.text||'',slot,
      durability:spec.durability??null,maxDurability:spec.durability??null,effect:{...spec},enterFx:true};
    s.equipment.push(eq);runOps(card.effects||[],key,null,null);
    log(`${H[s.heroId].name} 装备了【${card.name}】（${EQUIPMENT_SLOT_NAMES[slot]}）。`);
  }
  function runEquipmentEvent(key,event){
    const s=side(key);if(!s)return;
    for(const eq of [...s.equipment]){
      if(!s.equipment.includes(eq))continue;
      const ops=eq.effect?.[event];if(ops?.length)runOps(ops,key,null,null);
      const consume=event==='turnStart'?eq.effect?.consumeOnTurnStart:event==='turnEnd'?eq.effect?.consumeOnTurnEnd:0;
      if(consume&&s.equipment.includes(eq))consumeEquipment(key,eq,consume);
    }
  }
  function afterHeroAttackEquipment(key){
    const s=side(key);if(!s)return;
    for(const eq of [...s.equipment]){
      if(!s.equipment.includes(eq))continue;
      if(eq.effect?.onHeroAttack?.length)runOps(eq.effect.onHeroAttack,key,null,null);
      if(eq.slot==='weapon'&&s.equipment.includes(eq))consumeEquipment(key,eq,1);
    }
  }

  function start(playerHero,deckIds){
    session++;
    const enemyHero=enemyFor(playerHero);
    state={turn:1,active:'setup',player:makeSide(playerHero,false,deckIds),enemy:makeSide(enemyHero,true,UCR.AI_DECKS[enemyHero]),gameOver:false,session};
    selectedAttacker=null; targeting=null; $('#log').innerHTML='';

    // 测试规则：玩家固定先手。先手起手3张；后手4张并获得一张0费临时能量牌。
    for(let i=0;i<3;i++)draw(state.player,false);
    for(let i=0;i<4;i++)draw(state.enemy,false);
    state.enemy.hand.push(cloneCard('lightSpark'));
    log(`对局准备：<b>${H[playerHero].name}</b> VS <b>${H[enemyHero].name}</b>。你的30张构筑牌已洗入牌库，当前只持有起手牌。`);
    render(); showMulligan();
  }

  function leave(){session++;state=null;selectedAttacker=null;targeting=null;closeModal()}

  function draw(s,showLog=true){
    if(!s.deck.length){s.fatigue++;damageHeroBySide(s,s.fatigue);if(showLog)log(`${H[s.heroId].name} 牌库已空，受到 ${s.fatigue} 点疲劳伤害。`);return null}
    const id=s.deck.pop();
    if(s.hand.length<10){const c=cloneCard(id);s.hand.push(c);if(showLog){const key=sideKeyFromObj(s);setTimeout(()=>{render();animateDraw(key,c)},20)}return c}
    if(showLog)log(`${H[s.heroId].name} 手牌已满，【${C[id].name}】被烧毁。`);
    return null;
  }

  function drawFiltered(s,predicate,showLog=true){
    const candidates=[];
    s.deck.forEach((id,i)=>{if(predicate(C[id]))candidates.push(i)});
    if(!candidates.length){if(showLog)log(`${H[s.heroId].name} 的牌库中没有符合条件的牌。`);return null}
    const deckIndex=rand(candidates),id=s.deck.splice(deckIndex,1)[0];
    if(s.hand.length<10){const c=cloneCard(id);s.hand.push(c);if(showLog){const key=sideKeyFromObj(s);setTimeout(()=>{render();animateDraw(key,c)},20)}return c}
    if(showLog)log(`${H[s.heroId].name} 手牌已满，【${C[id].name}】被烧毁。`);
    return null;
  }

  function showMulligan(){
    const selected=new Set();
    $('#modalTitle').textContent='起手调度'; $('#modalBody').innerHTML=''; $('#modalActions').innerHTML='';
    const shell=el('div','mulligan-shell'),sub=el('div','mulligan-subtitle','选择你想换掉的牌。被标记的牌会洗回30张牌库，并抽取等量新牌。'),row=el('div','mulligan-row'),count=el('div','mulligan-count','当前保留全部3张手牌');
    state.player.hand.forEach((c,i)=>{
      const d=el('div',`mulligan-card rarity-${c.rarity||'common'} faction-${c.faction||'neutral'} type-${c.type||'skill'}`);d.dataset.index=i;d.innerHTML=`<div class="mulligan-cost">${c.cost}</div><h3>${c.name}</h3><div class="cmeta">${typeName(c.type)} · ${(c.tags||[]).slice(0,2).join(' · ')}</div><div class="mulligan-art">${(c.tags?.[0]||typeName(c.type)).toUpperCase()}</div><div class="ctext">${c.text||'无额外效果。'}</div>`;
      d.onclick=()=>{selected.has(i)?selected.delete(i):selected.add(i);d.classList.toggle('selected');count.textContent=selected.size?`将替换 ${selected.size} 张 · 保留 ${state.player.hand.length-selected.size} 张`:'当前保留全部3张手牌'};row.append(d);
    });
    shell.append(sub,row,count);$('#modalBody').append(shell);
    const ok=el('button','primary','确认调度');
    ok.onclick=()=>{
      ok.disabled=true;[...row.children].forEach((d,i)=>{if(selected.has(i))d.classList.add('returning')});pulseDeck('player');
      setTimeout(()=>{
        const keep=[],back=[];state.player.hand.forEach((c,i)=>(selected.has(i)?back:keep).push(c));state.player.hand=keep;state.player.deck.push(...back.map(c=>c.id));state.player.deck=shuffle(state.player.deck);for(let i=0;i<back.length;i++)draw(state.player,false);
        closeModal();log(`起手调度完成，替换 ${back.length} 张牌。`);render();if(back.length){pulseDeck('player');combatToast(`调度完成 · 替换 ${back.length} 张`)}beginTurn('player');
      },390);
    };
    $('#modalActions').append(ok); $('#modal').classList.remove('hidden');
  }
  function closeModal(){$('#modal').classList.add('hidden');$('#modalBody').innerHTML='';$('#modalActions').innerHTML=''}

  function beginTurn(key){
    if(!state||state.gameOver)return;
    state.active=key; const s=side(key);
    s.maxEnergy=Math.min(10,s.maxEnergy+1); s.energy=Math.max(0,Math.min(10,s.maxEnergy+(s.pendingEnergy||0))); s.pendingEnergy=0;
    s.heroPowerUsed=false; s.heroAttackUsed=false; s.firstSkillUsed=false; s.cardsPlayedThisTurn=0;
    s.heroDamagedThisTurn=false; s.formChangedThisTurn=false; s.lastReturned=null; s.tagsPlayedThisTurn={}; s.trapTriggeredThisTurn=false;
    if(s.heroAttackTurns>0){s.heroAttackTurns--;if(s.heroAttackTurns===0)s.heroAttack=0}
    s.heroAttackSelfDamage=0;
    s.board.forEach(u=>{
      u.attacked=false;
      if((u.stunnedTurns||0)>0){u.stunnedTurns--;u.sleeping=true}
      else{u.sleeping=false;u.rushOnly=false}
    });
    runEquipmentEvent(key,'turnStart');
    s.board.slice().forEach(u=>runOps(u.triggers?.turnStart||[],key,u,null));
    draw(s); processDeaths(); render();showTurnSplash(key);
    if(checkGameOver())return;
    if(key==='enemy'){const token=session;setTimeout(()=>{if(token===session)aiTurn()},350)}
  }

  function endTurn(){if(!state||state.gameOver||state.active!=='player')return;runTurnEnd('player');if(checkGameOver())return;beginTurn('enemy')}
  function aiEndTurn(){if(!state)return;runTurnEnd('enemy');if(checkGameOver())return;state.turn++;beginTurn('player')}
  function runTurnEnd(key){
    triggerTrap(other(key),'enemyEndTurn',{actor:key});
    const s=side(key);
    s.board.slice().forEach(u=>runOps(u.triggers?.turnEnd||[],key,u,null));
    runEquipmentEvent(key,'turnEnd');
    const ev=s.event?.effect;
    if(ev?.endSelfDamage)damageHero(key,ev.endSelfDamage);
    if(ev?.endHeal)s.hp=Math.min(s.maxHp,s.hp+ev.endHeal);
    if(ev?.endBuffRandomTag){
      const pool=s.board.filter(u=>u.tags?.includes(ev.endBuffRandomTag));
      if(pool.length){const u=rand(pool);buffUnit(u,ev.endBuffAtk||0,ev.endBuffHp||0)}
    }
    if(ev?.endRandomAnyUnitBuff){
      const pool=[...side('player').board,...side('enemy').board];
      if(pool.length){const u=rand(pool);const d=Math.random()<.5?ev.endRandomAnyUnitBuff:-ev.endRandomAnyUnitBuff;buffUnit(u,d,0);log(`四次元波动影响【${u.name}】：攻击 ${d>=0?'+':''}${d}。`)}
    }
    if(ev?.endAddRandomTag){
      const pool=UCR.PACKABLE_IDS.map(id=>C[id]).filter(c=>c.tags?.includes(ev.endAddRandomTag)&&(!ev.endAddRandomType||c.type===ev.endAddRandomType)&&legalGeneratedForHero(c,s.heroId));
      if(pool.length&&s.hand.length<10){const c=rand(pool);s.hand.push(cloneCard(c.id));log(`事件效果将【${c.name}】加入手牌。`)}
    }
    if(s.event){s.event.remaining--;if(s.event.remaining<=0){log(`${H[s.heroId].name} 的事件【${s.event.name}】结束。`);if(s.event.id)s.graveyard.push(s.event.id);s.event=null}}
    processDeaths();render();
  }

  function effectiveCost(card,s){
    let c=(card.cost||0)+(card.costMod||0);
    if(card.dynamicCost?.form===s.form)c+=card.dynamicCost.delta||0;
    if(card.type==='skill'&&!s.firstSkillUsed){
      if(s.form==='sky')c-=1;
      if(s.event?.effect?.firstSkillDiscount)c-=s.event.effect.firstSkillDiscount;
    }
    if(card.type==='skill'&&s.nextSkillDiscount>0)c-=s.nextSkillDiscount;
    if(card.type==='unit'&&s.nextUnitDiscount>0)c-=s.nextUnitDiscount;
    if(s.event?.effect?.tagDiscount&&card.tags?.includes(s.event.effect.tagDiscount))c-=s.event.effect.tagDiscountAmount||0;
    for(const eq of s.equipment||[]){const fx=eq.effect||{};if(fx.tagDiscount&&card.tags?.includes(fx.tagDiscount))c-=fx.tagDiscountAmount||0}
    return Math.max(0,c);
  }

  function playCard(key,idx){
    if(!state||state.gameOver||state.active!==key)return;
    const s=side(key),card=s.hand[idx]; if(!card)return;
    const cost=effectiveCost(card,s); if(cost>s.energy)return;
    if(card.type==='unit'&&s.board.length>=5)return;
    if(card.type==='trap'&&s.traps.length>=3)return;
    if(card.target){
      const targets=legalTargets(key,card.target);
      if(!targets.length){
        // 有目标战吼的单位仍允许下场，只是该次登场效果因无合法目标而跳过；
        // 纯技能/法术则不能进入“死锁式”目标选择。
        if(card.type==='unit'){if(key==='player')combatToast('无合法目标 · 登场效果跳过');log(`【${card.name}】没有合法目标，仍然完成召唤，目标型登场效果跳过。`);resolveCard(key,idx,card,cost,null);return}
        if(key==='player'){combatToast('当前没有合法目标');status(`【${card.name}】当前没有合法目标，未进入目标选择。`);render()}
        return;
      }
      chooseTargetForCard(key,idx,card,cost);return;
    }
    resolveCard(key,idx,card,cost,null);
  }

  function chooseTargetForCard(key,idx,card,cost){
    const targets=legalTargets(key,card.target);
    if(!targets.length){
      if(card.type==='unit')resolveCard(key,idx,card,cost,null);
      else if(key==='player'){combatToast('当前没有合法目标');status(`【${card.name}】当前没有合法目标。`);render()}
      return;
    }
    if(key==='enemy'){const t=pickAITarget(key,card.target,card);if(t)resolveCard(key,idx,card,cost,t);return}
    targeting={kind:'card',key,idx,card,cost,targetType:card.target}; selectedAttacker=null;
    status(`请选择【${card.name}】的目标；按 ESC、右键或“取消选择”可退出。`); render();
  }
  function validTarget(key,type,tKey,unitIndex){
    if(type==='friendlyUnit')return tKey===key&&unitIndex!==null;
    if(type==='enemyUnit')return tKey===other(key)&&unitIndex!==null;
    if(type==='anyEnemy')return tKey===other(key);
    return false;
  }
  function legalTargets(key,type){
    const out=[];
    for(const tKey of ['player','enemy']){
      if(validTarget(key,type,tKey,null))out.push({side:tKey,unitIndex:null});
      const b=side(tKey)?.board||[];
      for(let i=0;i<b.length;i++)if(validTarget(key,type,tKey,i))out.push({side:tKey,unitIndex:i});
    }
    return out;
  }
  function hasLegalTarget(key,type){return legalTargets(key,type).length>0}
  function cancelCurrentAction(showToast=true){
    if(!targeting&&!selectedAttacker)return;
    targeting=null;selectedAttacker=null;
    if(showToast)combatToast('已取消选择');
    render();
  }

  function createUnit(card){
    return {...card,maxHp:card.hp,hp:card.hp,atk:card.atk,
      instanceId:card.instanceId||card.id+'_'+Math.random().toString(36).slice(2),
      sleeping:!card.keywords?.includes('rush')&&!card.keywords?.includes('charge'),
      attacked:false,shield:card.keywords?.includes('shield')||false,
      rushOnly:card.keywords?.includes('rush')||false,stunnedTurns:0};
  }

  function applySummonAuras(s,u){
    const ev=s.event?.effect;
    if(ev?.onSummonBuffAtk)u.atk+=ev.onSummonBuffAtk;
    if(ev?.friendlyHp){u.hp+=ev.friendlyHp;u.maxHp+=ev.friendlyHp}
    if(ev?.summonTag&&u.tags?.includes(ev.summonTag)){
      u.atk+=ev.summonTagAtk||0;u.hp+=ev.summonTagHp||0;u.maxHp+=ev.summonTagHp||0;
    }
  }

  function summonById(key,id,{battlecry=false,setHp=null}={}){
    const s=side(key),base=C[id]; if(!s||!base||base.type!=='unit'||s.board.length>=5)return null;
    const u=createUnit(cloneCard(id));u.enterFx=true; applySummonAuras(s,u); if(setHp!==null)u.hp=Math.min(u.maxHp,setHp);
    s.board.push(u); if(battlecry)runOps(base.battlecry||[],key,u,null); return u;
  }

  function resolveCard(key,idx,card,cost,target){
    const s=side(key); if(!s||!s.hand[idx]||s.energy<cost)return;
    s.energy-=cost; s.hand.splice(idx,1); s.cardsPlayedThisTurn++;
    for(const tag of card.tags||[])s.tagsPlayedThisTurn[tag]=(s.tagsPlayedThisTurn[tag]||0)+1;
    if(card.type==='skill'){s.firstSkillUsed=true;s.nextSkillDiscount=0}
    if(card.type==='unit')s.nextUnitDiscount=0;
    log(`${H[s.heroId].name} 使用【${card.name}】。`);animatePlayedCard(key,card);pulseStage(key,card.type,card.name);

    if(card.type==='unit'){
      const u=createUnit(card);u.enterFx=true;applySummonAuras(s,u); s.board.push(u); runOps(card.battlecry||[],key,u,target);triggerTrap(other(key),'enemySummon',{actor:key,unit:u,triggerCard:card});
    }else if(card.type==='event'){
      if(s.event?.id)s.graveyard.push(s.event.id);s.event={id:card.id,name:card.name,text:card.text||'',remaining:card.duration,effect:card.eventEffect||{},enterFx:true}; runOps(card.effects||[],key,null,target);
    }else if(card.type==='equipment'){
      equipCard(key,card);
    }else if(card.type==='trap'){
      s.traps.push({id:card.id,name:card.name,text:card.text||'',trigger:card.trap?.trigger,condition:card.trap?.condition||null,effects:card.trap?.effects||[],enterFx:true});
      log(`${H[s.heroId].name} 布置了一张陷阱。`);combatToast(`${H[s.heroId].name} · 陷阱已布置`,key);
    }else{runOps(card.effects||[],key,null,target);s.graveyard.push(card.id);setTimeout(()=>animateToGrave(key,card.name),430);if(card.type==='skill')triggerTrap(other(key),'enemySkill',{actor:key,triggerCard:card})}

    processDeaths(); targeting=null; render(); checkGameOver();
  }

  function checkCondition(cond,key,source,target){
    const s=side(key),e=side(other(key)); if(!cond||!s||!e)return false;
    switch(cond.type){
      case'formIs':return s.form===cond.form;
      case'heroHpAtMost':return s.hp<=cond.n;
      case'heroDamagedThisTurn':return !!s.heroDamagedThisTurn;
      case'formChangedThisTurn':return !!s.formChangedThisTurn;
      case'hpLowerThanEnemy':return s.hp<e.hp;
      case'controlTag':return s.board.some(u=>(!cond.excludeSource||u!==source)&&u.tags?.includes(cond.tag));
      case'targetHasTag':{const u=getTargetUnit(target);return !!u?.tags?.includes(cond.tag)}
      case'targetHpAtMost':{const u=getTargetUnit(target);return !!u&&u.hp<=cond.n}
      case'targetAtkAtMost':{const u=getTargetUnit(target);return !!u&&u.atk<=cond.n}
      case'targetAtkAtLeast':{const u=getTargetUnit(target);return !!u&&u.atk>=cond.n}
      case'targetDamaged':{const u=getTargetUnit(target);return !!u&&u.hp<u.maxHp}
      case'targetStunned':{const u=getTargetUnit(target);return !!u&&(u.stunnedTurns||0)>0}
      case'enemyBoardAtLeast':return e.board.length>=cond.n;
      case'trapsArmedAtLeast':return (s.traps?.length||0)>=cond.n;
      case'playedTagAtLeast':return (s.tagsPlayedThisTurn?.[cond.tag]||0)>=cond.n;
      case'heroAttackedThisTurn':return !!s.heroAttackUsed;
      case'trapsTriggeredAtLeast':return (s.trapsTriggered||0)>=cond.n;
      case'trapTriggeredThisTurn':return !!s.trapTriggeredThisTurn;
      default:return false;
    }
  }

  function runOps(ops,key,source,target){for(const op of ops||[])runOp(op,key,source,target)}
  function buffUnit(u,atk=0,hp=0){if(!u)return;u.atk=Math.max(0,u.atk+atk);u.hp+=hp;u.maxHp+=hp}
  function runOp(op,key,source,target){
    const s=side(key),e=side(other(key)); if(!s||!e)return;
    switch(op.op){
      case'conditional':runOps(checkCondition(op.condition,key,source,target)?op.then:op.else,key,source,target);break;
      case'draw':for(let i=0;i<op.n;i++)draw(s);break;
      case'drawByType':for(let i=0;i<op.n;i++)drawFiltered(s,c=>c.type===op.type);break;
      case'drawByTag':for(let i=0;i<op.n;i++)drawFiltered(s,c=>c.tags?.includes(op.tag));break;
      case'drawByTagDiscount':{const c=drawFiltered(s,c=>(!op.type||c.type===op.type)&&c.tags?.includes(op.tag));if(c)c.costMod=(c.costMod||0)-(op.discount||0);break;}
      case'drawByTagOrDraw':{const found=drawFiltered(s,c=>(!op.type||c.type===op.type)&&c.tags?.includes(op.tag),false);if(!found&&!op.noFallback)draw(s);break;}
      case'drawByKeywordOrDraw':{const found=drawFiltered(s,c=>(!op.type||c.type===op.type)&&c.keywords?.includes(op.keyword),false);if(!found&&!op.noFallback)draw(s);break;}
      case'healHero':{const before=s.hp;s.hp=Math.min(s.maxHp,s.hp+op.n);const healed=s.hp-before;if(healed)setTimeout(()=>floatNumber(key==='player'?'#playerHero':'#enemyHero',healed,'heal'),20);break;}
      case'damageOwnHero':damageHero(key,op.n);break;
      case'damageEnemyHero':damageHero(other(key),op.n);break;
      case'gainEnergy':s.energy=Math.min(10,s.energy+op.n);break;
      case'reduceNextSkill':s.nextSkillDiscount=Math.max(s.nextSkillDiscount,op.n);break;
      case'reduceNextUnit':s.nextUnitDiscount=Math.max(s.nextUnitDiscount,op.n);break;
      case'heroAttackThisTurn':s.heroAttack=Math.max(s.heroAttack,op.atk);s.heroAttackTurns=Math.max(s.heroAttackTurns,1);break;
      case'heroAttackAddThisTurn':s.heroAttack=Math.max(0,s.heroAttack+(op.atk||0));s.heroAttackTurns=Math.max(s.heroAttackTurns,1);break;
      case'refreshHeroAttack':s.heroAttackUsed=false;break;
      case'equipHeroAttack':s.heroAttack=Math.max(s.heroAttack,op.atk);s.heroAttackTurns=Math.max(s.heroAttackTurns,op.turns);break;
      case'setHeroAttackSelfDamage':s.heroAttackSelfDamage=op.n;break;
      case'changeForm':if(H[s.heroId].forms[op.form]){s.form=op.form;s.formChangedThisTurn=true;log(`${H[s.heroId].name} 切换为【${H[s.heroId].forms[op.form].name}】。`)}break;
      case'cycleTigaForm':{
        const order=['composite','power','sky'];const current=order.includes(s.form)?s.form:'composite';const next=order[(order.indexOf(current)+1)%order.length];
        s.form=next;s.formChangedThisTurn=true;log(`${H[s.heroId].name} 切换为【${H[s.heroId].forms[next].name}】。`);break;
      }
      case'buffRandomFriendly':{const pool=s.board.filter(u=>u!==source);if(pool.length)buffUnit(rand(pool),op.atk,op.hp)}break;
      case'buffRandomFriendlyTag':{const pool=s.board.filter(u=>u!==source&&u.tags?.includes(op.tag));if(pool.length)buffUnit(rand(pool),op.atk||0,op.hp||0);break;}
      case'buffTarget':buffUnit(getTargetUnit(target),op.atk,op.hp);break;
      case'buffTargetIfTag':{const u=getTargetUnit(target);if(u?.tags?.includes(op.tag))buffUnit(u,op.atk,op.hp)}break;
      case'buffAllFriendly':s.board.forEach(u=>buffUnit(u,op.atk,op.hp));break;
      case'buffAllUnits':for(const k of ['player','enemy'])side(k).board.forEach(u=>buffUnit(u,op.atk||0,op.hp||0));break;
      case'buffAllTag':s.board.filter(u=>(!op.excludeSource||u!==source)&&u.tags?.includes(op.tag)).forEach(u=>buffUnit(u,op.atk,op.hp));break;
      case'buffSelfByTargetAtk':{const u=getTargetUnit(target);if(source&&u)buffUnit(source,Math.floor(u.atk*(op.ratio??1)),0);break;}
      case'buffSelf':if(source)buffUnit(source,op.atk||0,op.hp||0);break;
      case'increaseRandomEnemyHandCost':{if(e.hand.length){const c=rand(e.hand);c.costMod=(c.costMod||0)+(op.n||0);log(`【${c.name}】的费用被提高 ${op.n||0}。`) }break;}
      case'copyTargetKeyword':{const u=getTargetUnit(target);if(!source||!u)break;const pool=(u.keywords||[]).filter(k=>['guard','rush','charge','shield'].includes(k));if(!pool.length){buffUnit(source,1,1);break}const kw=rand(pool);source.keywords=source.keywords||[];if(!source.keywords.includes(kw))source.keywords.push(kw);if(kw==='shield')source.shield=true;if(kw==='rush'||kw==='charge'){source.sleeping=false;source.rushOnly=kw==='rush'}break;}
      case'addSourceCardToHand':{if(source&&C[source.id]&&s.hand.length<10)s.hand.push(cloneCard(source.id,{costMod:-(op.discount||0)}));break;}
      case'randomSelfMode':{if(!source)break;const r=Math.floor(Math.random()*3);if(r===0)buffUnit(source,2,0);else if(r===1)buffUnit(source,0,2);else source.shield=true;break;}
      case'spendRemainingEnergyDraw':{const spent=s.energy;s.energy=0;const cards=Math.floor(spent/Math.max(1,op.per||2));for(let i=0;i<cards;i++)draw(s);break;}
      case'randomAnyUnitBuff':{const pool=[...side('player').board,...side('enemy').board];if(pool.length){const u=rand(pool);const delta=Math.random()<.5?(op.atk||0):-(op.atk||0);buffUnit(u,delta,0);log(`四次元扭曲影响了【${u.name}】：攻击 ${delta>=0?'+':''}${delta}。`)}break;}
      case'grantSelfRandomKeyword':{if(!source)break;const kw=rand(op.pool||['guard','shield','charge']);source.keywords=source.keywords||[];if(!source.keywords.includes(kw))source.keywords.push(kw);if(kw==='shield')source.shield=true;if(kw==='rush'||kw==='charge'){source.sleeping=false;source.rushOnly=kw==='rush'}break;}
      case'destroyTarget':{const u=getTargetUnit(target);if(u)u.hp=0}break;
      case'grantSelfShield':if(source)source.shield=true;break;
      case'grantTargetShield':{const u=getTargetUnit(target);if(u)u.shield=true}break;
      case'grantTargetKeyword':{const u=getTargetUnit(target);if(u){u.keywords=u.keywords||[];if(!u.keywords.includes(op.keyword))u.keywords.push(op.keyword);if(op.keyword==='shield')u.shield=true;if(op.keyword==='rush'||op.keyword==='charge'){u.sleeping=false;u.rushOnly=op.keyword==='rush'}}}break;
      case'removeTargetShield':{const u=getTargetUnit(target);if(u)u.shield=false}break;
      case'damageTargetByForm':damageTargetOp(key,target,op.base+(s.form===op.form?op.bonus:0),{});break;
      case'damageTarget':damageTargetOp(key,target,op.n,op);break;
      case'randomEnemyDamage':for(let i=0;i<op.times;i++){if(e.board.length)damageUnit(other(key),Math.floor(Math.random()*e.board.length),op.n);else damageHero(other(key),op.n);processDeaths()}break;
      case'randomEnemyUnitDamage':for(let i=0;i<op.times;i++){if(e.board.length)damageUnit(other(key),Math.floor(Math.random()*e.board.length),op.n);processDeaths()}break;
      case'damageAllEnemyUnits':e.board.forEach(u=>damageUnitObject(u,op.n));break;
      case'damageAllOtherUnits':for(const k of ['player','enemy'])side(k).board.forEach(u=>{if(!source||u.instanceId!==source.instanceId)damageUnitObject(u,op.n)});break;
      case'damageAllUnits':for(const k of ['player','enemy'])side(k).board.forEach(u=>damageUnitObject(u,op.n));break;
      case'randomAnyUnitDamage':{const pool=[];for(const k of ['player','enemy'])side(k).board.forEach((u,i)=>pool.push({k,i,u}));if(pool.length){const pick=rand(pool);damageUnit(pick.k,pick.i,op.n)}break;}
      case'damageEnemyUnitsByHpAtLeast':{const targets=e.board.filter(u=>u.hp>=op.threshold);targets.forEach(u=>damageUnitObject(u,op.n));if(targets.length&&op.heroAttackPerHit){s.heroAttack+=(targets.length*op.heroAttackPerHit);s.heroAttackTurns=Math.max(s.heroAttackTurns,1)}break;}
      case'damageTargetByHpThreshold':{const u=getTargetUnit(target);if(u)damageTargetOp(key,target,u.hp>=op.threshold?op.high:op.low,{});break;}
      case'setTargetStats':{const u=getTargetUnit(target);if(u){u.atk=Math.max(0,op.atk);u.maxHp=Math.max(1,op.hp);u.hp=Math.min(u.hp,u.maxHp)}break;}
      case'healTarget':{const u=getTargetUnit(target);if(u)u.hp=Math.min(u.maxHp,u.hp+op.n);break;}
      case'addRandomCardByTag':{
        const pool=UCR.PACKABLE_IDS.map(id=>C[id]).filter(c=>c.tags?.includes(op.tag)&&(!op.type||c.type===op.type)&&legalGeneratedForHero(c,s.heroId));
        if(pool.length&&s.hand.length<10){const c=rand(pool);s.hand.push(cloneCard(c.id,{costMod:-(op.discount||0)}));log(`【${c.name}】被加入手牌。`)}break;
      }
      case'addCard':if(C[op.id]&&s.hand.length<10)s.hand.push(cloneCard(op.id));break;
      case'summonCard':summonById(key,op.id);break;
      case'summonRandomByTag':{
        const pool=UCR.PACKABLE_IDS.map(id=>C[id]).filter(c=>c.type==='unit'&&c.tags?.includes(op.tag)&&c.cost<=op.maxCost&&legalGeneratedForHero(c,s.heroId));
        for(let i=0;i<op.count&&s.board.length<5&&pool.length;i++)summonById(key,rand(pool).id);break;
      }
      case'resurrectLastTag':{
        for(let i=s.graveyard.length-1;i>=0;i--){const id=s.graveyard[i];if(C[id]?.type==='unit'&&C[id]?.tags?.includes(op.tag)){s.graveyard.splice(i,1);summonById(key,id,{setHp:op.setHp??null});break}}break;
      }
      case'returnTargetHand':{
        const u=getTargetUnit(target);if(!u)return;const owner=side(target.side),idx=owner.board.findIndex(x=>x.instanceId===u.instanceId);if(idx<0)return;
        owner.board.splice(idx,1);if(owner.hand.length<10){const c=cloneCard(u.id,{costMod:-(op.discount||0)});owner.hand.push(c);owner.lastReturned=c}else log(`【${u.name}】返回时手牌已满，被丢弃。`);break;
      }
      case'discountLastReturned':if(s.lastReturned)s.lastReturned.costMod=(s.lastReturned.costMod||0)-op.n;break;
      case'stunTarget':{const u=getTargetUnit(target);if(u){u.stunnedTurns=Math.max(u.stunnedTurns||0,op.turns);u.sleeping=true}}break;
      case'silenceTarget':{const u=getTargetUnit(target);if(u){const base=C[u.id]||{};u.atk=Math.max(0,base.atk??u.atk);u.maxHp=Math.max(1,base.hp??u.maxHp);u.hp=Math.min(u.hp,u.maxHp);u.keywords=[];u.shield=false;u.triggers={};u.stunnedTurns=0;u.sleeping=false;u.rushOnly=false;u.text='已沉默。';log(`【${u.name}】被沉默。`)}}break;
      case'cleanseTarget':{const u=getTargetUnit(target);if(u){const base=C[u.id]||{};u.stunnedTurns=0;u.sleeping=false;u.atk=Math.max(u.atk,base.atk??u.atk);u.maxHp=Math.max(u.maxHp,base.hp??u.maxHp);log(`【${u.name}】的负面状态被净化。`)}}break;
      case'setTargetAttack':{const u=getTargetUnit(target);if(u)u.atk=Math.max(0,op.atk||0)}break;
      case'shuffleTargetIntoDeck':{const u=getTargetUnit(target);if(!u)break;const owner=side(target.side),idx=owner.board.findIndex(x=>x.instanceId===u.instanceId);if(idx>=0){owner.board.splice(idx,1);owner.deck.push(u.id);owner.deck=shuffle(owner.deck);log(`【${u.name}】被洗回牌库。`)}}break;
      case'recoverLastUnitToHand':{for(let i=s.graveyard.length-1;i>=0;i--){const id=s.graveyard[i];if(C[id]?.type==='unit'){s.graveyard.splice(i,1);if(s.hand.length<10)s.hand.push(cloneCard(id,{costMod:-(op.discount||0)}));else s.graveyard.push(id);break}}break;}
      case'recoverLastTagToHand':{for(let i=s.graveyard.length-1;i>=0;i--){const id=s.graveyard[i],card=C[id];if(card&&(!op.type||card.type===op.type)&&card.tags?.includes(op.tag)){s.graveyard.splice(i,1);if(s.hand.length<10)s.hand.push(cloneCard(id,{costMod:-(op.discount||0)}));else s.graveyard.push(id);break}}break;}
      case'resurrectRandomUnitCostAtMost':{const picks=s.graveyard.map((id,i)=>({id,i,card:C[id]})).filter(x=>x.card?.type==='unit'&&(x.card.cost||0)<=(op.maxCost??99));if(picks.length&&s.board.length<5){const pick=rand(picks);s.graveyard.splice(pick.i,1);summonById(key,pick.id,{setHp:op.setHp??null})}break;}
      case'drawLowestCost':{const pool=s.deck.map(id=>C[id]).filter(c=>c&&(!op.type||c.type===op.type));if(pool.length){const m=Math.min(...pool.map(c=>c.cost||0));drawFiltered(s,c=>(!op.type||c.type===op.type)&&(c.cost||0)===m)}break;}
      case'drawHighestCost':{const pool=s.deck.map(id=>C[id]).filter(c=>c&&(!op.type||c.type===op.type));if(pool.length){const m=Math.max(...pool.map(c=>c.cost||0));drawFiltered(s,c=>(!op.type||c.type===op.type)&&(c.cost||0)===m)}break;}
      case'destroyRandomEnemyTrap':{if(e.traps?.length){const i=Math.floor(Math.random()*e.traps.length),tr=e.traps.splice(i,1)[0];e.graveyard.push(tr.id);log(`敌方陷阱【${tr.name}】被摧毁。`);if(op.drawOnSuccess)for(let j=0;j<op.drawOnSuccess;j++)draw(s)}break;}
      case'destroyEnemyEvent':{if(e.event){const ev=e.event;e.event=null;if(ev.id)e.graveyard.push(ev.id);log(`敌方事件【${ev.name}】被中断。`);if(op.drawOnSuccess)for(let j=0;j<op.drawOnSuccess;j++)draw(s)}break;}
      case'damageSource':if(source)damageUnitObject(source,op.n||0);break;
      case'reduceSourceAttack':if(source)source.atk=Math.max(0,source.atk-(op.n||0));break;
      case'reduceSourceStats':if(source){source.atk=Math.max(0,source.atk-(op.atk||0));source.maxHp=Math.max(1,source.maxHp-(op.hp||0));source.hp=Math.min(source.hp,source.maxHp)}break;
      case'stunSource':if(source){source.stunnedTurns=Math.max(source.stunnedTurns||0,op.turns||1);source.sleeping=true}break;
      case'returnSourceEnemyHand':{if(!source)break;const owner=e,bi=owner.board.findIndex(x=>x.instanceId===source.instanceId);if(bi>=0){owner.board.splice(bi,1);if(owner.hand.length<10)owner.hand.push(cloneCard(source.id,{costMod:(op.costPlus||0)}));else owner.graveyard.push(source.id)}break;}
      case'copyTriggerCardToHand':{const tc=target?.triggerCard;if(tc&&s.hand.length<10)s.hand.push(cloneCard(tc.id,{costMod:-(op.discount||0)}));break;}
      case'cancelTriggeredAttack':if(target)target.cancel=true;break;
      case'gainNextTurnEnergy':s.pendingEnergy=(s.pendingEnergy||0)+(op.n||0);break;
      case'returnRandomTrapToHand':{if(s.traps.length){const i=Math.floor(Math.random()*s.traps.length),tr=s.traps.splice(i,1)[0];if(s.hand.length<10)s.hand.push(cloneCard(tr.id,{costMod:-(op.discount||0)}));else s.graveyard.push(tr.id)}else if(op.fallbackDraw)for(let i=0;i<op.fallbackDraw;i++)draw(s);break;}
      case'destroyRandomEnemyEquipment':{if(e.equipment?.length){const eq=rand(e.equipment);removeEquipment(other(key),eq,{triggerBreak:true,reason:'摧毁'})}break;}
    }
  }


  function trapConditionOk(cond,ctx){
    if(!cond)return true;const u=ctx?.unit;
    if(cond.type==='sourceCostAtLeast')return !!u&&(C[u.id]?.cost||u.cost||0)>=cond.n;
    if(cond.type==='sourceAtkAtLeast')return !!u&&u.atk>=cond.n;
    if(cond.type==='sourceHpAtLeast')return !!u&&u.hp>=cond.n;
    return true;
  }
  function triggerTrap(ownerKey,event,ctx={}){
    const s=side(ownerKey);if(!s?.traps?.length)return false;
    const i=s.traps.findIndex(tr=>tr.trigger===event&&trapConditionOk(tr.condition,ctx));if(i<0)return false;
    const tr=s.traps.splice(i,1)[0],card=C[tr.id]||tr;s.graveyard.push(tr.id);s.trapsTriggered=(s.trapsTriggered||0)+1;s.trapTriggeredThisTurn=true;
    log(`${H[s.heroId].name} 的陷阱【${tr.name}】发动！`);animatePlayedCard(ownerKey,card);combatToast(`陷阱发动 · ${tr.name}`,ownerKey);runOps(tr.effects||[],ownerKey,ctx.unit||null,ctx);processDeaths();return true;
  }

  function damageTargetOp(key,target,n,op){
    const isUnit=target?.unitIndex!==null&&target?.unitIndex!==undefined;
    if(isUnit){
      const u=getTargetUnit(target);if(!u)return;damageUnit(target.side,target.unitIndex,n);
      if(op.overflowHeroOnKill&&u.hp<=0)damageHero(target.side,op.overflowHeroOnKill);
      if(op.selfDamageIfSurvives&&u.hp>0)damageHero(key,op.selfDamageIfSurvives);
    }else if(target){damageHero(target.side,n);if(op.selfDamageIfSurvives)damageHero(key,op.selfDamageIfSurvives)}
  }

  function getUnit(k,i){return side(k)?.board[i]||null}
  function getTargetUnit(t){return t&&t.unitIndex!==null&&t.unitIndex!==undefined?getUnit(t.side,t.unitIndex):null}
  function damageHeroBySide(s,n){
    if(!s||n<=0)return 0;const key=state?.player===s?'player':state?.enemy===s?'enemy':null;
    const armor=equipmentBySlot(s,'armor');let dealt=n;
    if(armor?.effect?.damageReduction){const reduced=Math.min(dealt,armor.effect.damageReduction);dealt-=reduced;if(reduced>0){log(`【${armor.name}】抵消了 ${reduced} 点伤害。`);if(key)consumeEquipment(key,armor,1)}}
    if(dealt>0){s.hp-=dealt;s.heroDamagedThisTurn=true}return dealt;
  }
  function damageHero(k,n){const s=side(k);if(!s)return;const dealt=damageHeroBySide(s,n);if(dealt>0){log(`${H[s.heroId].name} 受到 ${dealt} 点伤害。`);setTimeout(()=>floatNumber(k==='player'?'#playerHero':'#enemyHero',dealt,'damage'),20)}}
  function damageUnitObject(u,n){if(!u)return;if(u.shield){u.shield=false;log(`【${u.name}】的护盾抵消了伤害。`);return}u.hp-=n}
  function damageUnit(k,i,n){const u=getUnit(k,i);if(!u)return;const before=u.hp,shield=!!u.shield;damageUnitObject(u,n);const dealt=shield?0:Math.max(0,before-u.hp);if(dealt)setTimeout(()=>floatNumber($(`#${k}Board .slot:nth-child(${i+1}) .unit`),dealt,'damage'),20)}

  function processDeaths(){
    if(!state)return;let changed=true,safety=0;
    while(changed&&safety++<30){
      changed=false;
      for(const k of ['player','enemy']){
        const s=side(k);
        for(let i=s.board.length-1;i>=0;i--){
          const u=s.board[i];if(u.hp<=0){const node=$(`#${k}Board .slot:nth-child(${i+1}) .unit`);animateToGrave(k,u.name,node);s.board.splice(i,1);s.graveyard.push(u.id);log(`【${u.name}】被消灭。`);runOps(u.triggers?.death||[],k,u,null);changed=true}
        }
      }
    }
  }

  function checkGameOver(){
    if(!state)return false;
    if(state.player.hp<=0||state.enemy.hp<=0){
      state.gameOver=true;const win=state.enemy.hp<=0&&state.player.hp>0;
      status(win?'胜利！敌方主战角色被击败。':'失败。你的主战角色被击败。');render();return true;
    }
    return false;
  }

  function heroPower(key){
    if(!state||state.active!==key||state.gameOver)return;
    const s=side(key),p=H[s.heroId].forms[s.form].power;if(s.heroPowerUsed||s.energy<p.cost)return;
    if(p.action==='damage'){
      if(key==='enemy'){damageHero('player',p.amount);s.energy-=p.cost;s.heroPowerUsed=true;triggerTrap('player','enemyHeroPower',{actor:key});processDeaths();render();checkGameOver();return}
      targeting={kind:'heroPower',key,targetType:'anyEnemy',power:p};status(`请选择【${p.name}】的目标。`);render();return;
    }
    s.energy-=p.cost;s.heroPowerUsed=true;
    if(p.action==='attackBuff'){s.heroAttack=Math.max(s.heroAttack,p.amount);s.heroAttackTurns=Math.max(s.heroAttackTurns,1)}
    if(p.action==='skyDraw'){draw(s);s.nextSkillDiscount=Math.max(s.nextSkillDiscount,1)}
    if(p.action==='belialPulse'){damageHero(other(key),p.amount||3);damageHero(key,1)}
    if(p.action==='nexusExchange'){damageHero(key,2);draw(s)}
    if(p.action==='nexusJunis'){damageHero(key,2);s.heroAttack=Math.max(s.heroAttack,3);s.heroAttackTurns=Math.max(s.heroAttackTurns,1)}
    if(p.action==='nexusBlue'){damageHero(key,1);draw(s);s.nextSkillDiscount=Math.max(s.nextSkillDiscount,1)}
    if(p.action==='leoCombat'){const atk=(s.tagsPlayedThisTurn?.['格斗']||0)>0?4:2;s.heroAttack=Math.max(s.heroAttack,atk);s.heroAttackTurns=Math.max(s.heroAttackTurns,1)}
    if(p.action==='tregearTrap'){const pool=UCR.PACKABLE_IDS.map(id=>C[id]).filter(c=>c.faction==='tregear'&&c.type==='trap');if(pool.length){const c=rand(pool);if(s.traps.length<3)s.traps.push({id:c.id,name:c.name,text:c.text||'',trigger:c.trap?.trigger,condition:c.trap?.condition||null,effects:c.trap?.effects||[],enterFx:true});else if(s.hand.length<10)s.hand.push(cloneCard(c.id,{costMod:-1}))}}
    triggerTrap(other(key),'enemyHeroPower',{actor:key});processDeaths();render();checkGameOver();
  }
  function resolveHeroPowerTarget(t){
    const {key,power}=targeting,s=side(key);if(s.energy<power.cost)return;
    s.energy-=power.cost;s.heroPowerUsed=true;if(t.unitIndex===null)damageHero(t.side,power.amount);else damageUnit(t.side,t.unitIndex,power.amount);
    targeting=null;triggerTrap(other(key),'enemyHeroPower',{actor:key});processDeaths();render();checkGameOver();
  }

  function attackWithUnit(key,i){
    if(!state||state.active!==key||state.gameOver)return;const u=getUnit(key,i);if(!u||u.sleeping||u.attacked)return;
    if(u.rushOnly&&side(other(key)).board.length===0){if(key==='player'){combatToast('当前没有可攻击的单位');status(`【${u.name}】具有【突进】，当前没有合法攻击目标。`);render()}return}
    if(key==='enemy'){resolveAttack(key,{type:'unit',index:i},pickAttackTarget(key,u));return}
    selectedAttacker={key,type:'unit',index:i};targeting=null;status(`已选择【${u.name}】，请选择攻击目标；按 ESC、右键或“取消选择”可退出。`);render();
  }
  function attackWithHero(key){
    const s=side(key);if(!s||state.active!==key||heroAttackValue(s)<=0||s.heroAttackUsed)return;
    if(key==='enemy'){resolveAttack(key,{type:'hero'},pickAttackTarget(key,{}));return}
    selectedAttacker={key,type:'hero'};targeting=null;status(`已选择${H[s.heroId].name}，请选择攻击目标。`);render();
  }
  function legalAttackTarget(attackerKey,targetSide,targetUnitIndex,attackerObj){
    if(targetSide!==other(attackerKey))return false;const enemy=side(targetSide);
    const guards=enemy.board.map((u,i)=>({u,i})).filter(x=>x.u.keywords?.includes('guard'));
    if(guards.length)return targetUnitIndex!==null&&guards.some(g=>g.i===targetUnitIndex);
    if(attackerObj?.rushOnly&&targetUnitIndex===null)return false;return true;
  }
  function resolveAttack(key,att,t){
    if(!t)return;const s=side(key),attacker=att.type==='hero'?null:getUnit(key,att.index),atk=att.type==='hero'?heroAttackValue(s,t.unitIndex!==null):attacker?.atk;
    if(!atk||!legalAttackTarget(key,t.side,t.unitIndex,att.type==='hero'?{}:attacker))return;
    const trapCtx={actor:key,attackerKey:key,att,unit:attacker,targetSide:t.side,targetIndex:t.unitIndex,cancel:false};
    triggerTrap(t.side,t.unitIndex===null?'enemyAttackHero':'enemyAttackUnit',trapCtx);
    if(trapCtx.cancel){
      if(att.type==='hero'){s.heroAttackUsed=true;afterHeroAttackEquipment(key)}else{const u=getUnit(key,att.index);if(u)u.attacked=true}
      selectedAttacker=null;processDeaths();render();checkGameOver();return;
    }
    pulseStage(key,'attack',att.type==='hero'?H[s.heroId].name:(attacker?.name||'单位攻击'));animateStrike(key,att,t);
    if(t.unitIndex===null)damageHero(t.side,atk);
    else{const def=getUnit(t.side,t.unitIndex);if(!def)return;const defAtk=def.atk;damageUnit(t.side,t.unitIndex,atk);if(att.type==='hero')damageHero(key,defAtk);else damageUnit(key,att.index,defAtk)}
    if(att.type==='hero'){
      s.heroAttackUsed=true;afterHeroAttackEquipment(key);if(s.heroAttackSelfDamage>0){damageHero(key,s.heroAttackSelfDamage);s.heroAttackSelfDamage=0}
    }else{const u=getUnit(key,att.index);if(u)u.attacked=true}
    selectedAttacker=null;processDeaths();render();checkGameOver();
  }
  function clickTarget(tSide,unitIndex){
    if(targeting){
      if(!validTarget(targeting.key,targeting.targetType,tSide,unitIndex))return;
      if(targeting.kind==='card')resolveCard(targeting.key,targeting.idx,targeting.card,targeting.cost,{side:tSide,unitIndex});else resolveHeroPowerTarget({side:tSide,unitIndex});return;
    }
    if(selectedAttacker){const u=selectedAttacker.type==='unit'?getUnit(selectedAttacker.key,selectedAttacker.index):{};if(legalAttackTarget(selectedAttacker.key,tSide,unitIndex,u))resolveAttack(selectedAttacker.key,selectedAttacker,{side:tSide,unitIndex})}
  }

  function flattenCardOps(card){
    const out=[];
    const walk=ops=>{for(const op of ops||[]){out.push(op);if(op.then)walk(op.then);if(op.else)walk(op.else)}};
    walk(card?.effects);walk(card?.battlecry);walk(card?.triggers?.death);walk(card?.triggers?.turnStart);walk(card?.triggers?.turnEnd);walk(card?.trap?.effects);
    if(card?.equipment){walk(card.equipment.turnStart);walk(card.equipment.turnEnd);walk(card.equipment.onBreak);walk(card.equipment.onHeroAttack)}
    return out;
  }
  function cardHasOp(card,name){return flattenCardOps(card).some(op=>op.op===name)}
  function cardEstimatedDamage(card){
    let best=0;for(const op of flattenCardOps(card)){if(['damageTarget','damageTargetByForm'].includes(op.op))best=Math.max(best,op.n||op.base||0);if(op.op==='damageEnemyHero')best=Math.max(best,op.n||0)}return best;
  }
  function aiThreat(u){return (u?.atk||0)*2+(u?.hp||0)+(u?.keywords?.includes('guard')?5:0)+(u?.shield?3:0)}
  function pickAITarget(key,type,card=null){
    const ek=other(key),enemy=side(ek),friendly=side(key);
    if(type==='friendlyUnit'){
      if(!friendly.board.length)return null;
      let pool=friendly.board.map((u,i)=>({u,i}));
      if(cardHasOp(card,'healTarget'))pool.sort((a,b)=>(a.u.hp/a.u.maxHp)-(b.u.hp/b.u.maxHp));
      else pool.sort((a,b)=>aiThreat(b.u)-aiThreat(a.u));
      return{side:key,unitIndex:pool[0].i};
    }
    if(type==='enemyUnit'){
      if(!enemy.board.length)return null;
      let pool=enemy.board.map((u,i)=>({u,i}));
      if(cardHasOp(card,'damageTarget')){
        const dmg=cardEstimatedDamage(card),killable=pool.filter(x=>x.u.hp<=dmg).sort((a,b)=>aiThreat(b.u)-aiThreat(a.u));
        if(killable.length)return{side:ek,unitIndex:killable[0].i};
      }
      pool.sort((a,b)=>aiThreat(b.u)-aiThreat(a.u));return{side:ek,unitIndex:pool[0].i};
    }
    if(type==='anyEnemy'){
      const dmg=cardEstimatedDamage(card);if(dmg>0&&enemy.hp<=dmg)return{side:ek,unitIndex:null};
      if(enemy.board.length){
        const pool=enemy.board.map((u,i)=>({u,i}));
        const killable=dmg>0?pool.filter(x=>x.u.hp<=dmg).sort((a,b)=>aiThreat(b.u)-aiThreat(a.u)):[];
        if(killable.length)return{side:ek,unitIndex:killable[0].i};
        if(cardHasOp(card,'destroyTarget')||cardHasOp(card,'shuffleTargetIntoDeck')||cardHasOp(card,'silenceTarget')){pool.sort((a,b)=>aiThreat(b.u)-aiThreat(a.u));return{side:ek,unitIndex:pool[0].i}}
        if(Math.random()<.55){pool.sort((a,b)=>aiThreat(b.u)-aiThreat(a.u));return{side:ek,unitIndex:pool[0].i}}
      }
      return{side:ek,unitIndex:null};
    }
    return null;
  }
  function pickAttackTarget(key,u){
    const ek=other(key),e=side(ek),guards=e.board.map((x,i)=>({x,i})).filter(o=>o.x.keywords?.includes('guard'));
    if(guards.length){guards.sort((a,b)=>aiThreat(b.x)-aiThreat(a.x));return{side:ek,unitIndex:guards[0].i}}
    const atk=u?.atk||heroAttackValue(side(key));if(e.hp<=atk)return{side:ek,unitIndex:null};
    const candidates=e.board.map((x,i)=>({x,i}));
    const favorable=candidates.filter(o=>o.x.hp<=atk&&(u?.hp??99)>o.x.atk).sort((a,b)=>aiThreat(b.x)-aiThreat(a.x));
    if(favorable.length)return{side:ek,unitIndex:favorable[0].i};
    if(u?.rushOnly&&candidates.length){candidates.sort((a,b)=>a.x.hp-b.x.hp);return{side:ek,unitIndex:candidates[0].i}}
    if(candidates.length&&Math.random()<.38){candidates.sort((a,b)=>aiThreat(b.x)-aiThreat(a.x));return{side:ek,unitIndex:candidates[0].i}}
    return{side:ek,unitIndex:null};
  }
  function aiCardScore(card,cost,s){
    const e=side('player'),ops=flattenCardOps(card);let score=8+cost*1.15;
    if(card.type==='unit')score+=(card.atk||0)*.7+(card.hp||0)*.45+(card.keywords?.includes('guard')?(s.hp<=18?6:2):0)+(card.keywords?.includes('rush')&&e.board.length?3:0);
    if(card.type==='trap')score+=(s.traps.length===0?5:s.traps.length===1?3:-1);
    if(card.type==='event'&&s.event)score-=3;
    if(card.type==='equipment'&&equipmentBySlot(s,card.equipment?.slot||'device'))score-=2;
    const selfDmg=ops.filter(o=>o.op==='damageOwnHero').reduce((n,o)=>n+(o.n||0),0);if(selfDmg){if(s.hp<=selfDmg+4)score-=30;else if(s.heroId==='belial'||s.heroId==='nexus')score+=1}
    const drawCount=ops.filter(o=>['draw','drawByType','drawByTag','drawByTagDiscount','drawByTagOrDraw','drawLowestCost','drawHighestCost'].includes(o.op)).length;if(drawCount)score+=(s.hand.length<=4?5:2);
    if(ops.some(o=>o.op==='healHero'))score+=Math.min(6,(s.maxHp-s.hp)*.35);
    if(ops.some(o=>['damageTarget','damageAllEnemyUnits','destroyTarget','shuffleTargetIntoDeck','stunTarget','silenceTarget'].includes(o.op)))score+=e.board.length?4:-2;
    if(card.tags?.includes('格斗')&&s.heroId==='leo')score+=(s.tagsPlayedThisTurn?.['格斗']||0)*1.6;
    if(card.tags?.includes('变形')&&s.heroId==='tiga')score+=1.5;
    if(card.type==='trap'&&s.heroId==='tregear')score+=1;
    if(card.tags?.includes('生命交换')&&s.heroId==='nexus'&&s.hp<=10)score-=5;
    return score;
  }
  function aiTurn(){
    if(!state||state.gameOver||state.active!=='enemy')return;const s=state.enemy;let safety=0,token=session;
    const act=()=>{
      if(!state||token!==session||state.gameOver||state.active!=='enemy')return;if(safety++>34){aiCombat();return}
      const playable=s.hand.map((c,i)=>({c,i,cost:effectiveCost(c,s)})).filter(x=>x.cost<=s.energy&&!(x.c.type==='unit'&&s.board.length>=5)&&!(x.c.type==='trap'&&s.traps.length>=3)&&!(x.c.target&&x.c.type!=='unit'&&!hasLegalTarget('enemy',x.c.target)));
      if(playable.length){const p=playable.map(x=>({...x,score:aiCardScore(x.c,x.cost,s)})).sort((a,b)=>b.score-a.score||b.cost-a.cost)[0];playCard('enemy',p.i);setTimeout(act,125)}
      else{if(!s.heroPowerUsed&&H[s.heroId].forms[s.form].power.cost<=s.energy)heroPower('enemy');setTimeout(aiCombat,150)}
    };act();
  }
  function aiCombat(){
    if(!state)return;const s=state.enemy;
    for(let i=0;i<s.board.length;i++){const u=s.board[i];if(u&&!u.sleeping&&!u.attacked){resolveAttack('enemy',{type:'unit',index:i},pickAttackTarget('enemy',u));if(!state||state.gameOver)return}}
    if(heroAttackValue(s)>0&&!s.heroAttackUsed)attackWithHero('enemy');const token=session;setTimeout(()=>{if(token===session)aiEndTurn()},180);
  }

  function pulseStage(key,kind,label){
    const core=$('#battlefieldCore');if(!core)return;
    core.classList.remove('pulse-player','pulse-enemy','fx-skill');void core.offsetWidth;
    core.classList.add(key==='player'?'pulse-player':'pulse-enemy');if(kind==='skill')core.classList.add('fx-skill');
    if(label&&$('#battleActionText'))$('#battleActionText').textContent=label;
    setTimeout(()=>core?.classList.remove('pulse-player','pulse-enemy','fx-skill'),360);
  }
  function status(t){
    if($('#statusBanner'))$('#statusBanner').textContent=t;
    if($('#battleSubText'))$('#battleSubText').textContent=t;
    if($('#battleActionText')&&/请选择|选择/.test(t))$('#battleActionText').textContent='选择目标';
  }
  function log(html){const root=$('#log');if(!root)return;const n=el('div');n.innerHTML=html;root.prepend(n);while(root.children.length>80)root.lastElementChild.remove()}
  function typeName(t){return({unit:'单位',skill:'技能',equipment:'装备',event:'事件',trap:'陷阱'})[t]||t}
  function renderPortrait(key){
    const s=side(key),root=$(key==='player'?'#playerPortrait':'#enemyPortrait');if(!root||!s)return;
    root.className='hero-portrait '+s.heroId;root.title=H[s.heroId].name;
  }
  function renderHero(key,root){
    const s=side(key),hero=H[s.heroId],form=hero.forms[s.form],p=form.power;root.innerHTML='';
    const id=el('div','hero-identity-row');id.append(el('div','hero-name',hero.name));
    const formNode=el('div','hero-form',form.name);
    const hpRow=el('div','hero-hp-row');const hpLabel=el('span','hero-hp-label','HP');const hpBar=el('div','hero-hp-bar');const hpFill=el('div','hero-hp-fill');hpFill.style.width=`${Math.max(0,Math.min(100,s.hp/s.maxHp*100))}%`;hpBar.append(hpFill);const hpNum=el('span','hero-hp-number',`${Math.max(0,s.hp)} / ${s.maxHp}`);hpRow.append(hpLabel,hpBar,hpNum);
    root.append(id,formNode,hpRow,el('div','hero-power-desc',`${p.name} · ${p.cost}能量 · ${p.text}`));
    root.onclick=()=>{if(key==='player'){if(selectedAttacker)clickTarget('player',null);else if(heroAttackValue(s)>0&&!s.heroAttackUsed&&state.active==='player')attackWithHero('player')}else clickTarget('enemy',null)};
    root.classList.toggle('can-attack',key==='player'&&heroAttackValue(s)>0&&!s.heroAttackUsed&&state.active==='player');
    const heroTargetable=(targeting&&validTarget(targeting.key,targeting.targetType,key,null))||(selectedAttacker&&legalAttackTarget(selectedAttacker.key,key,null,selectedAttacker.type==='unit'?getUnit(selectedAttacker.key,selectedAttacker.index):{}));root.classList.toggle('targetable',!!heroTargetable);
    renderPortrait(key);
  }
  function renderBoard(key,root){
    root.innerHTML='';const s=side(key);
    for(let i=0;i<5;i++){
      const slot=el('div','slot'),u=s.board[i];
      if(u){
        const d=el('div','unit '+(key==='enemy'?'enemy-unit':''));if(u.keywords?.includes('guard'))d.classList.add('guard');if(u.shield)d.classList.add('shielded');if(u.sleeping)d.classList.add('sleeping');if(!u.sleeping&&!u.attacked&&key==='player'&&state.active==='player')d.classList.add('can-attack');if(selectedAttacker?.type==='unit'&&selectedAttacker.key===key&&selectedAttacker.index===i)d.classList.add('selected');if(targeting&&validTarget(targeting.key,targeting.targetType,key,i))d.classList.add('targetable');if(selectedAttacker){const au=selectedAttacker.type==='unit'?getUnit(selectedAttacker.key,selectedAttacker.index):{};if(legalAttackTarget(selectedAttacker.key,key,i,au))d.classList.add('targetable')};
        d.append(el('div','unit-artmark',(u.tags?.[0]||typeName(u.type)||'UNIT').toUpperCase()),el('div','unit-name',u.name),el('div','unit-tags',(u.tags||[]).slice(0,3).join(' · ')),el('div','unit-text',u.text||''));const st=el('div','unit-stats');st.append(el('span','',`⚔ ${u.atk}`),el('span','',`♥ ${u.hp}`));d.append(st);
        if(u.enterFx){d.classList.add('unit-enter');u.enterFx=false}
        d.onclick=()=>{if(targeting||selectedAttacker)clickTarget(key,i);else if(key==='player'&&!u.sleeping&&!u.attacked&&state.active==='player')attackWithUnit('player',i);else if(window.UCRUI&&C[u.id])window.UCRUI.showCardFocus({...C[u.id],atk:u.atk,hp:u.hp})};d.oncontextmenu=e=>{e.preventDefault();if(window.UCRUI&&C[u.id])window.UCRUI.showCardFocus({...C[u.id],atk:u.atk,hp:u.hp})};slot.append(d);
      }
      root.append(slot);
    }
  }
  function renderHand(){
    const root=$('#playerHand');root.innerHTML='';const s=state.player,n=s.hand.length;
    s.hand.forEach((c,i)=>{
      const d=el('div',`card rarity-${c.rarity||'common'} faction-${c.faction||'neutral'} type-${c.type||'skill'}`),cost=effectiveCost(c,s),off=i-(n-1)/2;
      d.style.setProperty('--fan-rot',`${off*1.45}deg`);d.style.setProperty('--fan-y',`${Math.abs(off)*2.2}px`);d.style.setProperty('--fan-z',String(20-Math.round(Math.abs(off))));
      if(cost>s.energy||state.active!=='player'||(c.type==='unit'&&s.board.length>=5)||(c.type==='trap'&&s.traps.length>=3))d.classList.add('disabled');
      d.append(el('div','cost',String(cost)),el('div','card-name',c.name),el('div','card-type',typeName(c.type)),el('div','card-artmark',(c.tags?.[0]||typeName(c.type)).toUpperCase()),el('div','card-tags',(c.tags||[]).slice(0,3).join(' · ')),el('div','card-text',c.text||''));
      if(c.type==='unit'){const st=el('div','card-stats');st.append(el('span','',`⚔ ${c.atk}`),el('span','',`♥ ${c.hp}`));d.append(st)}
      if(c.type==='equipment'&&c.equipment){const st=el('div','card-stats equipment-card-stats');st.append(el('span','',EQUIPMENT_SLOT_NAMES[c.equipment.slot]||'装备'),el('span','',`耐久 ${c.equipment.durability??'∞'}`));d.append(st)}
      const noTarget=!!(c.target&&c.type!=='unit'&&!hasLegalTarget('player',c.target));if(noTarget)d.classList.add('no-legal-target');
      d.onclick=()=>{const currentIndex=state.player.hand.findIndex(x=>x.instanceId===c.instanceId),current=currentIndex>=0?state.player.hand[currentIndex]:c,currentCost=effectiveCost(current,state.player),noLegal=!!(current.target&&current.type!=='unit'&&!hasLegalTarget('player',current.target)),blocked=currentCost>state.player.energy||state.active!=='player'||(current.type==='unit'&&state.player.board.length>=5)||(current.type==='trap'&&state.player.traps.length>=3)||noLegal;if(window.UCRUI)window.UCRUI.showCardFocus(current,{cost:currentCost,playLabel:noLegal?'当前没有合法目标':(current.target?'选择目标并使用':'使用此牌'),disabled:blocked,onPlay:()=>{const j=state.player.hand.findIndex(x=>x.instanceId===current.instanceId);if(j>=0)playCard('player',j)}})};d.ondblclick=()=>{const j=state.player.hand.findIndex(x=>x.instanceId===c.instanceId);if(j>=0)playCard('player',j)};root.append(d);
    });
  }
  function renderEquipment(key){
    const s=side(key),root=$(key==='player'?'#playerEquipment':'#enemyEquipment');if(!root)return;root.innerHTML='';
    for(const slotName of EQUIPMENT_SLOTS){const eq=equipmentBySlot(s,slotName),d=el('div','equipment-slot'+(eq?'':' empty'));
      if(eq){const b=el('strong','',eq.name),meta=el('span','equipment-meta',`${EQUIPMENT_SLOT_NAMES[slotName]} · ${eq.durability??'∞'}/${eq.maxDurability??'∞'}`);d.append(b,meta);d.title=eq.text||eq.name;if(eq.enterFx){d.classList.add('equipment-enter');eq.enterFx=false}}
      else d.innerHTML=`<span class="equipment-empty-label">${EQUIPMENT_SLOT_NAMES[slotName]}</span><b>＋</b>`;root.append(d)}
  }

  function renderTraps(key){
    const s=side(key),root=$(key==='player'?'#playerTraps':'#enemyTraps');if(!root)return;root.innerHTML='';
    for(let i=0;i<3;i++){const tr=s.traps[i],d=el('div','trap-slot'+(tr?'':' empty'));
      if(tr){if(key==='enemy'){d.classList.add('enemy-hidden');d.textContent='◆';d.title='敌方已布置的隐藏陷阱'}else{d.textContent=tr.name;d.title=tr.text||tr.name}if(tr.enterFx){d.classList.add('revealed');tr.enterFx=false}}
      else d.textContent='+';root.append(d)}
  }
  function renderEvent(key){
    const s=side(key),root=$(key==='player'?'#playerEvent':'#enemyEvent');if(!root)return;
    if(!s.event){root.className='event-chip empty';root.textContent='无事件';root.title='';return}
    root.className='event-chip'+(s.event.enterFx?' event-enter':'');root.textContent=`${s.event.name} · 剩余 ${s.event.remaining} 回合`;root.title=s.event.text||s.event.name;s.event.enterFx=false;
  }
  function renderEnergy(){
    const root=$('#energyPips');if(!root)return;root.innerHTML='';for(let i=0;i<10;i++){const p=el('div','energy-pip');if(i<state.player.maxEnergy)p.classList.add('available');if(i<state.player.energy)p.classList.add('filled');root.append(p)}if($('#railEnergyText'))$('#railEnergyText').textContent=`${state.player.energy} / ${state.player.maxEnergy}`
  }
  function render(){
    if(!state)return;renderHero('player',$('#playerHero'));renderHero('enemy',$('#enemyHero'));renderBoard('player',$('#playerBoard'));renderBoard('enemy',$('#enemyBoard'));renderHand();renderEquipment('player');renderEquipment('enemy');renderEvent('player');renderEvent('enemy');renderTraps('player');renderTraps('enemy');renderEnergy();
    $('#playerEnergy')?.replaceChildren(document.createTextNode(`${state.player.energy}/${state.player.maxEnergy}`));$('#enemyEnergy').textContent=`${state.enemy.energy}/${state.enemy.maxEnergy}`;
    $('#playerDeckCount').textContent=state.player.deck.length;$('#enemyDeckCount').textContent=state.enemy.deck.length;$('#enemyHandCount').textContent=state.enemy.hand.length;if($('#playerHandCount'))$('#playerHandCount').textContent=state.player.hand.length;
    if($('#railDeckCount'))$('#railDeckCount').textContent=state.player.deck.length;if($('#railGraveCount'))$('#railGraveCount').textContent=state.player.graveyard.length;if($('#playerAttackState')){const atk=heroAttackValue(state.player);$('#playerAttackState').textContent=atk>0?(state.player.heroAttackUsed?`${atk} 已用`:`${atk} 可攻`):'0'};
    if($('#turnCounter'))$('#turnCounter').textContent=`回合 ${state.turn}`;if($('#turnSideLabel'))$('#turnSideLabel').textContent=state.gameOver?'战斗结束':state.active==='player'?'我方行动':state.active==='enemy'?'敌方行动':'准备阶段';if($('#battlePhaseLabel'))$('#battlePhaseLabel').textContent=state.active==='player'?'PLAYER TACTICAL PHASE':state.active==='enemy'?'ENEMY TACTICAL PHASE':'TACTICAL LINK';
    const pp=H[state.player.heroId].forms[state.player.form].power,hpBtn=$('#heroPowerBtn');const hpStrong=hpBtn?.querySelector('strong'),hpSmall=hpBtn?.querySelector('small');if(hpStrong)hpStrong.textContent=`${pp.name}（${pp.cost}）`;if(hpSmall)hpSmall.textContent='英雄能力';if(hpBtn)hpBtn.disabled=state.player.heroPowerUsed||state.player.energy<pp.cost||state.active!=='player';$('#endTurnBtn').disabled=state.active!=='player'||state.gameOver;
    const cancelBtn=$('#cancelActionBtn'),choosing=!!(targeting||selectedAttacker);if(cancelBtn)cancelBtn.classList.toggle('hidden',!choosing);$('#statusBanner')?.classList.toggle('target-mode',choosing);
    const ev=[];if(state.player.event)ev.push(`我方：${state.player.event.name}(${state.player.event.remaining})`);if(state.enemy.event)ev.push(`敌方：${state.enemy.event.name}(${state.enemy.event.remaining})`);if($('#eventZone'))$('#eventZone').textContent='事件区：'+(ev.join(' / ')||'无');
    if($('#battleActionText')&&!targeting&&!selectedAttacker)$('#battleActionText').textContent=state.gameOver?'战斗结束':state.active==='player'?'等待我方指令':state.active==='enemy'?'敌方正在行动':'等待链接';
    if(!targeting&&!selectedAttacker&&!state.gameOver)status(state.active==='player'?'你的回合：从当前手牌部署单位、使用技能或发起攻击。':state.active==='enemy'?'敌方回合：正在执行行动。':'准备对局…');
  }
  function openBattleModal(title,contentBuilder){
    $('#modalTitle').textContent=title;$('#modalBody').innerHTML='';$('#modalActions').innerHTML='';contentBuilder($('#modalBody'));const close=el('button','primary','关闭');close.onclick=closeModal;$('#modalActions').append(close);$('#modal').classList.remove('hidden');
  }
  function inspectDeck(){openBattleModal('牌库状态',root=>{const wrap=el('div','battle-inspect-grid');for(const key of ['player','enemy']){const s=side(key),panel=el('div','battle-inspect-panel');panel.innerHTML=`<h4>${key==='player'?'我方':'敌方'}牌库 · 剩余 ${s.deck.length}</h4>`;const list=el('div','inspect-list');const counts={};s.deck.forEach(id=>counts[id]=(counts[id]||0)+1);Object.keys(counts).sort((a,b)=>C[a].cost-C[b].cost).forEach(id=>{const row=el('div','inspect-pill',`${C[id].cost}费 · ${C[id].name} ×${counts[id]}`);list.append(row)});if(!s.deck.length)list.append(el('div','inspect-pill','牌库已空'));panel.append(list);wrap.append(panel)}root.append(wrap)})}
  function inspectGraveyard(){openBattleModal('墓地',root=>{const wrap=el('div','battle-inspect-grid');for(const key of ['player','enemy']){const s=side(key),panel=el('div','battle-inspect-panel');panel.innerHTML=`<h4>${key==='player'?'我方':'敌方'}墓地 · ${s.graveyard.length}</h4>`;const list=el('div','inspect-list');s.graveyard.slice().reverse().forEach(id=>list.append(el('div','inspect-pill',C[id]?.name||id)));if(!s.graveyard.length)list.append(el('div','inspect-pill','暂无记录'));panel.append(list);wrap.append(panel)}root.append(wrap)})}
  function inspectHistory(){openBattleModal('战斗历史',root=>{const copy=el('div','history-copy');[...$('#log').children].forEach(n=>copy.append(n.cloneNode(true)));if(!copy.children.length)copy.append(el('div','','暂无记录'));root.append(copy)})}
  function inspectSettings(){openBattleModal('战场设置',root=>{const row=el('div','settings-row');const txt=el('div','');txt.innerHTML='<b>战场动态效果</b><div class="muted smalltext">关闭后保留界面，只停用扫描线、光束与呼吸动画。</div>';const btn=el('button','ghost',document.body.classList.contains('reduced-fx')?'开启动效':'关闭动效');btn.onclick=()=>{document.body.classList.toggle('reduced-fx');btn.textContent=document.body.classList.contains('reduced-fx')?'开启动效':'关闭动效'};row.append(txt,btn);root.append(row)})}
  function surrender(){if(!state||state.gameOver)return;if(!confirm('确定投降并结束本局对战吗？'))return;state.gameOver=true;state.player.hp=0;status('你已投降，本局战斗结束。');log('<b>我方选择投降。</b>');render()}
  $('#endTurnBtn').onclick=endTurn;$('#heroPowerBtn').onclick=()=>heroPower('player');
  $('#cancelActionBtn')?.addEventListener('click',()=>cancelCurrentAction());
  $('#battlefieldCore')?.addEventListener('contextmenu',e=>{if(targeting||selectedAttacker){e.preventDefault();cancelCurrentAction()}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state&&(targeting||selectedAttacker)){e.preventDefault();cancelCurrentAction()}});
  $('#deckInfoBtn')?.addEventListener('click',inspectDeck);$('#graveyardBtn')?.addEventListener('click',inspectGraveyard);$('#battleHistoryBtn')?.addEventListener('click',inspectHistory);$('#battleSettingsBtn')?.addEventListener('click',inspectSettings);$('#surrenderBtn')?.addEventListener('click',surrender);
  window.UCRBattle={start,leave,render};
})();
