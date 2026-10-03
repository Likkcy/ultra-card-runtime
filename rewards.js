(() => {
  const DEFAULT='sunlit',REWARD='ultra-graveyard',LUXURY='celestial-sanctuary';
  const RULES={win:120,loss:40,drawCost:100,chance:.015,pity:100};
  function normalize(value={}){
    if(!value||typeof value!=='object')value={};
    const n=x=>Number.isSafeInteger(x)&&x>=0?x:0;
    const ownedBoards=[DEFAULT];if(Array.isArray(value.ownedBoards)&&value.ownedBoards.includes(REWARD))ownedBoards.push(REWARD);
    if(Array.isArray(value.ownedBoards)&&value.ownedBoards.includes(LUXURY))ownedBoards.push(LUXURY);
    return {winStreak:n(value.winStreak),bestStreak:n(value.bestStreak),ownedBoards,equippedBoard:ownedBoards.includes(value.equippedBoard)?value.equippedBoard:DEFAULT,pendingBattle:value.pendingBattle===true,boardPity:Math.min(RULES.pity-1,n(value.boardPity))};
  }
  function resume(value){const r=normalize(value);if(r.pendingBattle){r.winStreak=0;r.pendingBattle=false}return r}
  function start(value){const r=normalize(value);if(r.pendingBattle)r.winStreak=0;r.pendingBattle=true;return r}
  function finish(value,outcome){
    const r=normalize(value);if(!r.pendingBattle)return {state:r,unlocked:false,creditDelta:0};r.pendingBattle=false;
    r.winStreak=outcome==='victory'?r.winStreak+1:0;r.bestStreak=Math.max(r.bestStreak,r.winStreak);
    const unlocked=r.winStreak>=10&&!r.ownedBoards.includes(REWARD);if(unlocked)r.ownedBoards.push(REWARD);
    return {state:r,unlocked,creditDelta:outcome==='victory'?RULES.win:outcome==='draw'?0:-RULES.loss};
  }
  function drawBoard(value,credits,count=1,rng=Math.random){
    const r=normalize(value);let balance=Number.isFinite(credits)?Math.max(0,Math.floor(credits)):0;const results=[];
    if(r.ownedBoards.includes(LUXURY))return {state:r,credits:balance,results};
    for(let i=0;i<Math.min(10,Math.max(0,Math.floor(count)));i++){
      if(balance<RULES.drawCost)break;balance-=RULES.drawCost;r.boardPity++;
      const guaranteed=r.boardPity>=RULES.pity,won=guaranteed||rng()<RULES.chance;
      results.push({won,guaranteed,pull:r.boardPity});
      if(won){r.ownedBoards.push(LUXURY);r.boardPity=0;break}
    }
    return {state:r,credits:balance,results};
  }
  function equip(value,id){const r=normalize(value);if(r.ownedBoards.includes(id))r.equippedBoard=id;return r}
  function dayKey(now=Date.now()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(now))}
  function claimRelief(lastClaim,credits,now=Date.now()){const today=dayKey(now),balance=Number.isFinite(credits)?Math.max(0,credits):0;if(lastClaim&&lastClaim>=today)return {claimed:false,lastClaim,credits:balance};return {claimed:true,lastClaim:today,credits:balance+1000}}
  window.UCRRewards={normalize,resume,start,finish,equip,drawBoard,RULES,dayKey,claimRelief};
})();
