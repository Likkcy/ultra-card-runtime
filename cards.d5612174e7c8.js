window.UCR = window.UCR || {};

UCR.RARITIES = {
  common: {name:'普通', weight:70},
  rare: {name:'稀有', weight:22},
  epic: {name:'史诗', weight:7},
  legendary: {name:'传说', weight:1}
};

UCR.CARDS = {
  // ============================================================
  // 中立基础 31
  // ============================================================
  gomora:{id:'gomora',name:'哥莫拉',cost:4,type:'unit',atk:4,hp:5,faction:'neutral',rarity:'common',tags:['怪兽','地球怪兽'],text:'稳定的中型怪兽。'},
  windom:{id:'windom',name:'乌英达姆',cost:3,type:'unit',atk:2,hp:5,faction:'neutral',rarity:'common',tags:['机械','防卫队'],keywords:['guard'],text:'【守护】'},
  melba:{id:'melba',name:'美尔巴',cost:3,type:'unit',atk:3,hp:2,faction:'neutral',rarity:'common',tags:['怪兽','飞行'],keywords:['rush'],text:'【突进】'},
  alienMetron:{id:'alienMetron',name:'梅特龙星人',cost:2,type:'unit',atk:2,hp:3,faction:'neutral',rarity:'common',tags:['宇宙人'],text:'登场：抽1张牌。',battlecry:[{op:'draw',n:1}]},
  tacticalDraw:{id:'tacticalDraw',name:'战术分析',cost:2,type:'skill',faction:'neutral',rarity:'common',tags:['战术'],text:'抽2张牌。',effects:[{op:'draw',n:2}]},
  emergencyHeal:{id:'emergencyHeal',name:'紧急支援',cost:2,type:'skill',faction:'neutral',rarity:'common',tags:['支援'],text:'为你的英雄恢复4点生命。',effects:[{op:'healHero',n:4}]},
  plasmaBlade:{id:'plasmaBlade',name:'等离子刃',cost:3,type:'equipment',faction:'neutral',rarity:'rare',tags:['装备','武器'],text:'【武器】攻击+2，耐久3。',equipment:{slot:'weapon',durability:3,attack:2}},
  battleZone:{id:'battleZone',name:'战斗区域展开',cost:3,type:'event',faction:'neutral',rarity:'rare',tags:['事件'],text:'持续2个己方回合：你召唤的单位获得+1攻击。',duration:2,eventEffect:{onSummonBuffAtk:1}},
  neronga:{id:'neronga',name:'内隆嘎',cost:2,type:'unit',atk:3,hp:2,faction:'neutral',rarity:'common',tags:['怪兽','电气'],text:'登场：获得1点临时能量。',battlecry:[{op:'gainEnergy',n:1}]},
  gudon:{id:'gudon',name:'古敦',cost:4,type:'unit',atk:5,hp:4,faction:'neutral',rarity:'common',tags:['怪兽'],text:'高攻击的标准怪兽。'},
  twinTail:{id:'twinTail',name:'双尾怪',cost:3,type:'unit',atk:2,hp:4,faction:'neutral',rarity:'rare',tags:['怪兽'],text:'死亡：抽1张牌。',triggers:{death:[{op:'draw',n:1}]}},
  kingJoe:{id:'kingJoe',name:'金古桥',cost:6,type:'unit',atk:5,hp:7,faction:'neutral',rarity:'epic',tags:['机械','宇宙机器人'],keywords:['guard'],text:'【守护】；登场：获得【护盾】。',battlecry:[{op:'grantSelfShield'}]},
  scienceTeam:{id:'scienceTeam',name:'科学特搜队支援',cost:3,type:'skill',faction:'neutral',rarity:'rare',tags:['防卫队','支援'],text:'抽1张牌，使一个友方单位+1/+2。',target:'friendlyUnit',effects:[{op:'draw',n:1},{op:'buffTarget',atk:1,hp:2}]},
  monsterCapsule:{id:'monsterCapsule',name:'怪兽胶囊',cost:2,type:'skill',faction:'neutral',rarity:'epic',tags:['怪兽','召唤'],text:'随机将一张【怪兽】单位牌加入手牌。',effects:[{op:'addRandomCardByTag',tag:'怪兽',type:'unit'}]},
  absoluteDefense:{id:'absoluteDefense',name:'绝对防御',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['防御'],text:'使一个友方单位获得【护盾】。',target:'friendlyUnit',effects:[{op:'grantTargetShield'}]},
  lastStand:{id:'lastStand',name:'最后阵线',cost:5,type:'event',faction:'neutral',rarity:'epic',tags:['事件','防卫队'],text:'持续2回合：你之后召唤的单位+0/+1；登场时抽1张牌。',duration:2,eventEffect:{friendlyHp:1},effects:[{op:'draw',n:1}]},

  bemular:{id:'bemular',name:'百慕拉',cost:1,type:'unit',atk:2,hp:1,faction:'neutral',rarity:'common',tags:['怪兽','宇宙怪兽'],text:'登场：对敌方英雄造成1点伤害。',battlecry:[{op:'damageEnemyHero',n:1}]},
  pigmon:{id:'pigmon',name:'皮古蒙',cost:1,type:'unit',atk:1,hp:2,faction:'neutral',rarity:'common',tags:['怪兽','友善怪兽'],text:'死亡：抽1张牌。',triggers:{death:[{op:'draw',n:1}]}},
  sevenger:{id:'sevenger',name:'赛文加',cost:3,type:'unit',atk:3,hp:4,faction:'neutral',rarity:'common',tags:['机械','防卫队'],text:'登场：为你的英雄恢复1点生命。',battlecry:[{op:'healHero',n:1}]},
  miclas:{id:'miclas',name:'米克拉斯',cost:3,type:'unit',atk:3,hp:5,faction:'neutral',rarity:'common',tags:['胶囊怪兽','怪兽'],keywords:['guard'],text:'【守护】'},
  eleking:{id:'eleking',name:'艾雷王',cost:4,type:'unit',atk:4,hp:4,faction:'neutral',rarity:'rare',tags:['怪兽','电气'],text:'登场：随机造成2次1点伤害。',battlecry:[{op:'randomEnemyDamage',n:1,times:2}]},
  bemstar:{id:'bemstar',name:'贝蒙斯坦',cost:5,type:'unit',atk:4,hp:7,faction:'neutral',rarity:'epic',tags:['怪兽','宇宙怪兽'],keywords:['shield'],text:'登场时拥有【护盾】。'},
  redKing:{id:'redKing',name:'雷德王',cost:5,type:'unit',atk:7,hp:5,faction:'neutral',rarity:'rare',tags:['怪兽','地球怪兽'],text:'极高攻击，但缺乏防御能力。'},
  baltan:{id:'baltan',name:'巴尔坦星人',cost:3,type:'unit',atk:3,hp:3,faction:'neutral',rarity:'rare',tags:['宇宙人'],text:'登场：召唤一个1/1【巴尔坦分身】。',battlecry:[{op:'summonCard',id:'baltanClone'}]},
  zetton:{id:'zetton',name:'宇宙恐龙 杰顿',cost:8,type:'unit',atk:7,hp:9,faction:'neutral',rarity:'legendary',tags:['怪兽','宇宙怪兽','杰顿系'],keywords:['shield'],text:'【护盾】；登场：对敌方英雄造成2点伤害。',battlecry:[{op:'damageEnemyHero',n:2}]},
  defenseBombardment:{id:'defenseBombardment',name:'防卫队集中炮击',cost:3,type:'skill',faction:'neutral',rarity:'common',tags:['防卫队','战术'],text:'随机对敌人造成3次1点伤害。',effects:[{op:'randomEnemyDamage',n:1,times:3}]},
  retreatOrder:{id:'retreatOrder',name:'紧急回收',cost:1,type:'skill',faction:'neutral',rarity:'rare',tags:['战术'],text:'将一个友方单位返回手牌，并使其费用-1。',target:'friendlyUnit',effects:[{op:'returnTargetHand',discount:1}]},
  energyRelay:{id:'energyRelay',name:'能量接驳',cost:0,type:'skill',faction:'neutral',rarity:'common',tags:['能量','战术'],text:'本回合获得1点临时能量。',effects:[{op:'gainEnergy',n:1}]},
  archiveSearch:{id:'archiveSearch',name:'档案检索',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['战术','检索'],text:'从牌库抽一张【单位】牌。',effects:[{op:'drawByType',type:'unit',n:1}]},
  suppressFire:{id:'suppressFire',name:'压制射击',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['防卫队','战术'],text:'对一个敌方单位造成2点伤害并使其下回合无法攻击。',target:'enemyUnit',effects:[{op:'damageTarget',n:2},{op:'stunTarget',turns:1}]},
  monsterResearch:{id:'monsterResearch',name:'怪兽生态研究',cost:3,type:'event',faction:'neutral',rarity:'epic',tags:['事件','怪兽'],text:'持续3回合：你每召唤一个【怪兽】，使其+0/+1。',duration:3,eventEffect:{summonTag:'怪兽',summonTagHp:1}},

  // ============================================================
  // 中立扩展：角色牌 + 战术/技能/事件混合（Prototype 0.5）
  // ============================================================
  telesdon:{id:'telesdon',name:'泰莱斯通',cost:4,type:'unit',atk:4,hp:6,faction:'neutral',rarity:'common',tags:['怪兽','地底怪兽'],text:'登场：若你已控制另一只【怪兽】，自身+1攻击。',battlecry:[{op:'conditional',condition:{type:'controlTag',tag:'怪兽',excludeSource:true},then:[{op:'buffSelf',atk:1,hp:0}]}]},
  dorako:{id:'dorako',name:'多拉考',cost:3,type:'unit',atk:3,hp:3,faction:'neutral',rarity:'common',tags:['怪兽','飞行'],keywords:['rush'],text:'【突进】。'},
  gabora:{id:'gabora',name:'加勃拉',cost:4,type:'unit',atk:5,hp:4,faction:'neutral',rarity:'common',tags:['怪兽','地球怪兽'],text:'没有复杂能力，但拥有很直接的压场数值。'},
  antlar:{id:'antlar',name:'安东拉',cost:5,type:'unit',atk:4,hp:7,faction:'neutral',rarity:'rare',tags:['怪兽','地底怪兽'],keywords:['guard'],text:'【守护】。'},
  jirass:{id:'jirass',name:'吉拉斯',cost:5,type:'unit',atk:6,hp:6,faction:'neutral',rarity:'rare',tags:['怪兽','地球怪兽'],text:'标准的大型怪兽。'},
  alienMefilas:{id:'alienMefilas',name:'美菲拉斯星人',cost:5,type:'unit',atk:4,hp:5,faction:'neutral',rarity:'epic',tags:['宇宙人','谋略'],text:'登场：随机使敌方一张手牌费用+2。',battlecry:[{op:'increaseRandomEnemyHandCost',n:2}]},
  alienZarab:{id:'alienZarab',name:'扎拉布星人',cost:3,type:'unit',atk:3,hp:3,faction:'neutral',rarity:'rare',tags:['宇宙人','拟态'],target:'enemyUnit',text:'登场：复制目标敌方单位的一个关键词；若其没有关键词，自身+1/+1。',battlecry:[{op:'copyTargetKeyword'}]},
  alienGuts:{id:'alienGuts',name:'嘎次星人',cost:4,type:'unit',atk:3,hp:4,faction:'neutral',rarity:'rare',tags:['宇宙人'],text:'死亡：将一张费用-1的“嘎次星人”加入你的手牌。',triggers:{death:[{op:'addSourceCardToHand',discount:1}]}},
  alienNackle:{id:'alienNackle',name:'纳克尔星人',cost:5,type:'unit',atk:4,hp:4,faction:'neutral',rarity:'epic',tags:['宇宙人','谋略'],target:'enemyUnit',text:'登场：若目标敌方单位当前生命值不高于4，对其造成4点伤害。',battlecry:[{op:'conditional',condition:{type:'targetHpAtMost',n:4},then:[{op:'damageTarget',n:4}]}]},
  hipporit:{id:'hipporit',name:'希波利特星人',cost:6,type:'unit',atk:4,hp:6,faction:'neutral',rarity:'epic',tags:['宇宙人'],target:'enemyUnit',text:'登场：使一个敌方单位下回合无法攻击，并使其-2攻击。',battlecry:[{op:'stunTarget',turns:1},{op:'buffTarget',atk:-2,hp:0}]},
  dada:{id:'dada',name:'达达',cost:3,type:'unit',atk:3,hp:3,faction:'neutral',rarity:'rare',tags:['宇宙人','拟态'],text:'登场：随机获得“+2攻击”“+2生命”或【护盾】之一。',battlecry:[{op:'randomSelfMode'}]},
  kanegon:{id:'kanegon',name:'卡内贡',cost:2,type:'unit',atk:2,hp:3,faction:'neutral',rarity:'epic',tags:['怪兽','宇宙生物'],text:'登场：吃掉你剩余的全部能量；每吃掉2点，抽1张牌。',battlecry:[{op:'spendRemainingEnergyDraw',per:2}]},
  bullton:{id:'bullton',name:'四次元怪兽 布鲁顿',cost:5,type:'unit',atk:3,hp:7,faction:'neutral',rarity:'legendary',tags:['怪兽','四次元'],text:'每个你的回合开始时：随机选择一个场上单位，使其攻击+2或-2。',triggers:{turnStart:[{op:'randomAnyUnitBuff',atk:2}]}},
  aceKiller:{id:'aceKiller',name:'艾斯杀手',cost:7,type:'unit',atk:6,hp:7,faction:'neutral',rarity:'legendary',tags:['超兽','人造生命'],text:'登场：随机将一张你当前英雄可使用的【必杀】技能牌加入手牌。',battlecry:[{op:'addRandomCardByTag',tag:'必杀',type:'skill'}]},
  tyrant:{id:'tyrant',name:'暴君怪兽 泰兰特',cost:9,type:'unit',atk:9,hp:9,faction:'neutral',rarity:'legendary',tags:['怪兽','合成怪兽','大怪兽'],text:'登场：随机获得【守护】、【护盾】或【速攻】之一。',battlecry:[{op:'grantSelfRandomKeyword',pool:['guard','shield','charge']}]},
  blackKing:{id:'blackKing',name:'布莱克王',cost:5,type:'unit',atk:5,hp:6,faction:'neutral',rarity:'rare',tags:['怪兽','宇宙怪兽'],text:'登场：若你控制【宇宙人】，自身+2攻击。',battlecry:[{op:'conditional',condition:{type:'controlTag',tag:'宇宙人'},then:[{op:'buffSelf',atk:2,hp:0}]}]},
  vakishim:{id:'vakishim',name:'巴克西姆',cost:4,type:'unit',atk:4,hp:5,faction:'neutral',rarity:'rare',tags:['超兽'],text:'登场：随机对一个敌人造成2点伤害。',battlecry:[{op:'randomEnemyDamage',n:2,times:1}]},
  verokron:{id:'verokron',name:'贝劳克恩',cost:6,type:'unit',atk:5,hp:6,faction:'neutral',rarity:'epic',tags:['超兽','导弹'],text:'登场：对所有敌方单位造成1点伤害。',battlecry:[{op:'damageAllEnemyUnits',n:1}]},
  crazygon:{id:'crazygon',name:'疯狂机器人 克雷奇贡',cost:4,type:'unit',atk:3,hp:6,faction:'neutral',rarity:'rare',tags:['机械','机器人'],text:'死亡：随机对一个敌人造成3点伤害。',triggers:{death:[{op:'randomEnemyDamage',n:3,times:1}]}},
  aribunta:{id:'aribunta',name:'蚁超兽 阿里蓬塔',cost:5,type:'unit',atk:5,hp:5,faction:'neutral',rarity:'common',tags:['超兽','地底'],text:'均衡的中型超兽。'},
  birdon:{id:'birdon',name:'火山怪鸟 巴顿',cost:6,type:'unit',atk:7,hp:5,faction:'neutral',rarity:'epic',tags:['怪兽','飞行'],keywords:['rush'],text:'【突进】；高攻击的空中威胁。'},
  mukadender:{id:'mukadender',name:'百足怪兽 穆卡旦达',cost:4,type:'unit',atk:4,hp:5,faction:'neutral',rarity:'common',tags:['怪兽'],text:'结实、直接，没有额外负担。'},

  jeepTraining:{id:'jeepTraining',name:'吉普车特训',cost:3,type:'skill',faction:'neutral',rarity:'epic',tags:['战术','特训','格斗'],text:'对所有当前生命值≥5的敌方单位造成2点伤害；每命中一个，使你的英雄本回合+1攻击。',effects:[{op:'damageEnemyUnitsByHpAtLeast',threshold:5,n:2,heroAttackPerHit:1}]},
  accidentalFire:{id:'accidentalFire',name:'防卫队误射',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['防卫队','战术'],text:'随机对任意一个场上单位造成4点伤害。敌我不分。',effects:[{op:'randomAnyUnitDamage',n:4}]},
  shrinkingRay:{id:'shrinkingRay',name:'缩小光线',cost:4,type:'skill',faction:'neutral',rarity:'epic',tags:['宇宙科技','控制'],target:'enemyUnit',text:'将一个敌方单位的攻击和最大生命值变为1。',effects:[{op:'setTargetStats',atk:1,hp:1}]},
  dimensionalTransfer:{id:'dimensionalTransfer',name:'异次元转移',cost:4,type:'skill',faction:'neutral',rarity:'rare',tags:['四次元','控制'],target:'enemyUnit',text:'将一个敌方单位返回其手牌，并使其费用+2。',effects:[{op:'returnTargetHand',discount:-2}]},
  heavyMissile:{id:'heavyMissile',name:'重型穿甲导弹',cost:4,type:'skill',faction:'neutral',rarity:'common',tags:['防卫队','战术','导弹'],target:'enemyUnit',text:'对一个敌方单位造成3点伤害；若它当前生命值≥6，改为造成7点伤害。',effects:[{op:'damageTargetByHpThreshold',threshold:6,low:3,high:7}]},
  anestheticRound:{id:'anestheticRound',name:'麻醉弹',cost:2,type:'skill',faction:'neutral',rarity:'common',tags:['防卫队','战术','控制'],target:'enemyUnit',text:'使一个敌方单位-1攻击，并使其下回合无法攻击。',effects:[{op:'buffTarget',atk:-1,hp:0},{op:'stunTarget',turns:1}]},
  rescueBeam:{id:'rescueBeam',name:'紧急救援光束',cost:2,type:'skill',faction:'neutral',rarity:'common',tags:['支援','防卫队'],target:'friendlyUnit',text:'为一个友方单位恢复3点生命；若它是【防卫队】，再抽1张牌。',effects:[{op:'healTarget',n:3},{op:'conditional',condition:{type:'targetHasTag',tag:'防卫队'},then:[{op:'draw',n:1}]}]},
  capsuleRecall:{id:'capsuleRecall',name:'胶囊回收',cost:1,type:'skill',faction:'neutral',rarity:'rare',tags:['胶囊怪兽','战术'],target:'friendlyUnit',text:'将一个友方【怪兽】返回手牌；若目标确实是怪兽，使其费用-2。',effects:[{op:'conditional',condition:{type:'targetHasTag',tag:'怪兽'},then:[{op:'returnTargetHand',discount:2}],else:[{op:'returnTargetHand',discount:0}]}]},
  colorTimerCrisis:{id:'colorTimerCrisis',name:'彩色计时器闪烁',cost:1,type:'skill',faction:'neutral',rarity:'epic',tags:['危机','光'],text:'若你的英雄生命≤10：抽2张牌并使下一张技能费用-1；否则只抽1张牌。',effects:[{op:'conditional',condition:{type:'heroHpAtMost',n:10},then:[{op:'draw',n:2},{op:'reduceNextSkill',n:1}],else:[{op:'draw',n:1}]}]},
  monsterEgg:{id:'monsterEgg',name:'未知怪兽蛋',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['怪兽','未知'],text:'随机将一张【怪兽】单位牌加入手牌。它费用-1。',effects:[{op:'addRandomCardByTag',tag:'怪兽',type:'unit',discount:1}]},
  mountainBlast:{id:'mountainBlast',name:'山体爆破',cost:3,type:'skill',faction:'neutral',rarity:'rare',tags:['战术','爆破'],text:'对双方所有单位造成2点伤害。',effects:[{op:'damageAllUnits',n:2}]},
  feintRetreat:{id:'feintRetreat',name:'诱敌撤退',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['战术'],target:'friendlyUnit',text:'将一个友方单位返回手牌，使其费用-1；随机对一个敌人造成1点伤害。',effects:[{op:'returnTargetHand',discount:1},{op:'randomEnemyDamage',n:1,times:1}]},
  monsterCountermeasure:{id:'monsterCountermeasure',name:'怪兽弱点解析',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['防卫队','研究','战术'],target:'enemyUnit',text:'对一个敌方【怪兽】造成4点伤害；若目标不是怪兽，只造成2点。',effects:[{op:'conditional',condition:{type:'targetHasTag',tag:'怪兽'},then:[{op:'damageTarget',n:4}],else:[{op:'damageTarget',n:2}]}]},

  monsterOutbreak:{id:'monsterOutbreak',name:'怪兽频发期',cost:4,type:'event',faction:'neutral',rarity:'epic',tags:['事件','怪兽'],text:'持续3回合：你使用的【怪兽】单位牌费用-1。',duration:3,eventEffect:{tagDiscount:'怪兽',tagDiscountAmount:1}},
  emergencyAlert:{id:'emergencyAlert',name:'一级警戒',cost:3,type:'event',faction:'neutral',rarity:'rare',tags:['事件','防卫队'],text:'持续3回合：你召唤的【防卫队】单位+0/+1。',duration:3,eventEffect:{summonTag:'防卫队',summonTagHp:1}},
  cosmicMagneticStorm:{id:'cosmicMagneticStorm',name:'宇宙磁暴',cost:3,type:'event',faction:'neutral',rarity:'rare',tags:['事件','宇宙'],text:'持续2回合：你每回合使用的第一张技能牌费用-1。',duration:2,eventEffect:{firstSkillDiscount:1}},
  cityEvacuation:{id:'cityEvacuation',name:'城市紧急疏散',cost:3,type:'event',faction:'neutral',rarity:'common',tags:['事件','支援'],text:'持续2回合：每个你的回合结束时，为英雄恢复1点生命。使用时抽1张牌。',duration:2,eventEffect:{endHeal:1},effects:[{op:'draw',n:1}]},

  // ============================================================
  // 中立扩展 II —— 首批完整生态补充 34
  // ============================================================
  aboras:{id:'aboras',name:'青色发泡怪兽 阿勃拉斯',cost:4,type:'unit',atk:4,hp:5,faction:'neutral',rarity:'common',tags:['怪兽','地球怪兽'],text:'登场：若你控制【怪兽】，获得+1攻击。',battlecry:[{op:'conditional',condition:{type:'controlTag',tag:'怪兽',excludeSource:true},then:[{op:'buffSelf',atk:1,hp:0}]}]},
  banila:{id:'banila',name:'赤色火焰怪兽 巴尼拉',cost:4,type:'unit',atk:5,hp:4,faction:'neutral',rarity:'common',tags:['怪兽','地球怪兽'],text:'朴素但进攻性很强的中型怪兽。'},
  jamila:{id:'jamila',name:'贾米拉',cost:5,type:'unit',atk:5,hp:6,faction:'neutral',rarity:'rare',tags:['怪兽','特殊生命'],text:'死亡：对双方英雄各造成1点伤害。',triggers:{death:[{op:'damageOwnHero',n:1},{op:'damageEnemyHero',n:1}]}},
  zaragas:{id:'zaragas',name:'变身怪兽 扎拉加斯',cost:5,type:'unit',atk:4,hp:7,faction:'neutral',rarity:'epic',tags:['怪兽','地球怪兽'],text:'回合结束：若仍存活，获得+1攻击。',triggers:{turnEnd:[{op:'buffSelf',atk:1,hp:0}]}},
  kemur:{id:'kemur',name:'诱拐怪人 凯姆尔人',cost:3,type:'unit',atk:3,hp:2,faction:'neutral',rarity:'rare',tags:['宇宙人','高速'],keywords:['charge'],text:'【速攻】。'},
  alienIcarus:{id:'alienIcarus',name:'伊卡尔斯星人',cost:4,type:'unit',atk:3,hp:5,faction:'neutral',rarity:'rare',tags:['宇宙人','四次元'],target:'enemyUnit',text:'登场：若目标攻击≤3，将其返回手牌；否则使其-1攻击。',battlecry:[{op:'conditional',condition:{type:'targetAtkAtMost',n:3},then:[{op:'returnTargetHand',discount:0}],else:[{op:'buffTarget',atk:-1,hp:0}]}]},
  alienPegassa:{id:'alienPegassa',name:'佩盖萨星人',cost:3,type:'unit',atk:2,hp:4,faction:'neutral',rarity:'rare',tags:['宇宙人'],text:'登场：抽1张牌，并随机使敌方一张手牌费用+1。',battlecry:[{op:'draw',n:1},{op:'increaseRandomEnemyHandCost',n:1}]},
  alienPitt:{id:'alienPitt',name:'匹特星人',cost:2,type:'unit',atk:2,hp:2,faction:'neutral',rarity:'rare',tags:['宇宙人'],text:'登场：将一张【艾雷王】加入手牌。',battlecry:[{op:'addCard',id:'eleking'}]},
  alienBado:{id:'alienBado',name:'巴德星人',cost:4,type:'unit',atk:4,hp:4,faction:'neutral',rarity:'rare',tags:['宇宙人'],target:'enemyUnit',text:'登场：若目标攻击≤2，直接消灭它；否则使其-2攻击。',battlecry:[{op:'conditional',condition:{type:'targetAtkAtMost',n:2},then:[{op:'destroyTarget'}],else:[{op:'buffTarget',atk:-2,hp:0}]}]},
  gubila:{id:'gubila',name:'深海怪兽 古维拉',cost:4,type:'unit',atk:4,hp:5,faction:'neutral',rarity:'common',tags:['怪兽','水生'],keywords:['rush'],text:'【突进】。'},
  pestan:{id:'pestan',name:'油兽 佩斯塔',cost:5,type:'unit',atk:5,hp:6,faction:'neutral',rarity:'rare',tags:['怪兽'],text:'死亡：对所有其他单位造成1点伤害。',triggers:{death:[{op:'damageAllOtherUnits',n:1}]}},
  takkong:{id:'takkong',name:'油怪兽 塔贡',cost:3,type:'unit',atk:2,hp:6,faction:'neutral',rarity:'common',tags:['怪兽'],text:'高生命的朴素前排。'},
  arstron:{id:'arstron',name:'凶暴怪兽 阿斯特隆',cost:4,type:'unit',atk:4,hp:6,faction:'neutral',rarity:'common',tags:['怪兽'],text:'标准而可靠的中型怪兽。'},
  sadora:{id:'sadora',name:'岩石怪兽 萨德拉',cost:3,type:'unit',atk:3,hp:5,faction:'neutral',rarity:'common',tags:['怪兽'],keywords:['guard'],text:'【守护】。'},
  mururoa:{id:'mururoa',name:'宇宙大怪兽 穆鲁罗亚',cost:6,type:'unit',atk:6,hp:5,faction:'neutral',rarity:'epic',tags:['怪兽','宇宙怪兽'],text:'登场：对所有敌方单位造成1点伤害。',battlecry:[{op:'damageAllEnemyUnits',n:1}]},
  ganQ:{id:'ganQ',name:'奇兽 眼Q',cost:5,type:'unit',atk:4,hp:6,faction:'neutral',rarity:'epic',tags:['怪兽','五帝王素材'],target:'enemyUnit',text:'登场：复制目标当前攻击力的一半（向下取整），作为自身额外攻击。',battlecry:[{op:'buffSelfByTargetAtk',ratio:0.5}]},
  reicubas:{id:'reicubas',name:'大海魔 雷丘巴斯',cost:6,type:'unit',atk:5,hp:7,faction:'neutral',rarity:'epic',tags:['怪兽','水生','五帝王素材'],target:'enemyUnit',text:'登场：使一个敌方单位下回合无法攻击。',battlecry:[{op:'stunTarget',turns:1}]},
  superCOV:{id:'superCOV',name:'超戈布',cost:7,type:'unit',atk:7,hp:8,faction:'neutral',rarity:'epic',tags:['怪兽','宇宙怪兽','五帝王素材'],text:'若敌方场上至少有3个单位，登场时获得+2攻击。',battlecry:[{op:'conditional',condition:{type:'enemyBoardAtLeast',n:3},then:[{op:'buffSelf',atk:2,hp:0}]}]},

  r3cBomb:{id:'r3cBomb',name:'R3C特殊炸弹',cost:4,type:'skill',faction:'neutral',rarity:'epic',tags:['防卫队','战术','爆破'],target:'enemyUnit',text:'对一个敌方单位造成3点伤害；若它是【机械】，改为8点。',effects:[{op:'conditional',condition:{type:'targetHasTag',tag:'机械'},then:[{op:'damageTarget',n:8}],else:[{op:'damageTarget',n:3}]}]},
  vFormation:{id:'vFormation',name:'V字战术编队',cost:3,type:'skill',faction:'neutral',rarity:'rare',tags:['防卫队','战术'],text:'若你控制【防卫队】，所有友方单位+1/+1；否则抽1张牌。',effects:[{op:'conditional',condition:{type:'controlTag',tag:'防卫队'},then:[{op:'buffAllFriendly',atk:1,hp:1}],else:[{op:'draw',n:1}]}]},
  captureNet:{id:'captureNet',name:'高压拘束网',cost:3,type:'skill',faction:'neutral',rarity:'rare',tags:['防卫队','控制'],target:'enemyUnit',text:'使一个敌方单位下两个其回合无法攻击。',effects:[{op:'stunTarget',turns:2}]},
  blackoutTactics:{id:'blackoutTactics',name:'全城停电',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['战术','城市'],text:'双方所有单位本回合后续交换中更难输出：所有场上单位-1攻击。',effects:[{op:'buffAllUnits',atk:-1,hp:0}]},
  emergencyPower:{id:'emergencyPower',name:'紧急超负荷供能',cost:0,type:'skill',faction:'neutral',rarity:'rare',tags:['能量','风险'],text:'获得2点临时能量；你的英雄受到2点伤害。',effects:[{op:'gainEnergy',n:2},{op:'damageOwnHero',n:2}]},
  decoyBalloon:{id:'decoyBalloon',name:'诱饵气球',cost:1,type:'skill',faction:'neutral',rarity:'common',tags:['战术','诱饵'],text:'召唤一个0/3并具有【守护】的诱饵。',effects:[{op:'summonCard',id:'decoyToken'}]},
  transportOperation:{id:'transportOperation',name:'怪兽运输作战',cost:2,type:'skill',faction:'neutral',rarity:'common',tags:['战术','支援'],target:'friendlyUnit',text:'将一个友方单位返回手牌，并获得1点临时能量。',effects:[{op:'returnTargetHand',discount:0},{op:'gainEnergy',n:1}]},
  weakPointMarking:{id:'weakPointMarking',name:'弱点标记',cost:1,type:'skill',faction:'neutral',rarity:'common',tags:['研究','战术'],target:'enemyUnit',text:'使一个敌方单位-2攻击。若它是【怪兽】，再抽1张牌。',effects:[{op:'buffTarget',atk:-2,hp:0},{op:'conditional',condition:{type:'targetHasTag',tag:'怪兽'},then:[{op:'draw',n:1}]}]},
  countermeasuresLab:{id:'countermeasuresLab',name:'怪兽对策实验室',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['研究','防卫队'],text:'从牌库抽一张【怪兽】单位；若没有则抽1张普通牌。',effects:[{op:'drawByTagOrDraw',tag:'怪兽',type:'unit'}]},
  spaceInterference:{id:'spaceInterference',name:'宇宙通讯干扰',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['宇宙','干扰'],text:'随机使敌方两张手牌费用+1。',effects:[{op:'increaseRandomEnemyHandCost',n:1},{op:'increaseRandomEnemyHandCost',n:1}]},
  reserveDeployment:{id:'reserveDeployment',name:'后备队出动',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['防卫队','支援'],text:'随机将一张【防卫队】单位加入手牌，并使其费用-1。',effects:[{op:'addRandomCardByTag',tag:'防卫队',type:'unit',discount:1}]},
  finishingVolley:{id:'finishingVolley',name:'集中终结炮火',cost:4,type:'skill',faction:'neutral',rarity:'rare',tags:['防卫队','战术'],target:'enemyUnit',text:'对一个敌方单位造成4点伤害；若它正处于眩晕状态，改为7点。',effects:[{op:'conditional',condition:{type:'targetStunned'},then:[{op:'damageTarget',n:7}],else:[{op:'damageTarget',n:4}]}]},

  sunsetBattle:{id:'sunsetBattle',name:'夕阳下的决战',cost:3,type:'event',faction:'neutral',rarity:'epic',tags:['事件','战斗'],text:'持续2回合：你之后召唤的单位获得+1攻击。',duration:2,eventEffect:{onSummonBuffAtk:1}},
  defenseSupplyLine:{id:'defenseSupplyLine',name:'防卫队补给线',cost:3,type:'event',faction:'neutral',rarity:'rare',tags:['事件','防卫队'],text:'持续3回合：你使用的【防卫队】单位费用-1。',duration:3,eventEffect:{tagDiscount:'防卫队',tagDiscountAmount:1}},
  dimensionalInstability:{id:'dimensionalInstability',name:'四次元不稳定',cost:3,type:'event',faction:'neutral',rarity:'epic',tags:['事件','四次元'],text:'持续3回合：每个你的回合结束时，随机一个场上单位攻击+1或-1。',duration:3,eventEffect:{endRandomAnyUnitBuff:1}},
  monsterGraveSurvey:{id:'monsterGraveSurvey',name:'怪兽墓场调查',cost:4,type:'event',faction:'neutral',rarity:'epic',tags:['事件','怪兽','研究'],text:'持续2回合：每个你的回合结束时，随机将一张【怪兽】单位加入手牌。',duration:2,eventEffect:{endAddRandomTag:'怪兽',endAddRandomType:'unit'}},


  // ============================================================
  // 中立扩展 III —— 防线 / 能量 / 泛用曲线（Prototype 0.10）
  // 设计目标：主题体系之外，也要有能活过前期、修正曲线、回能与交换的泛用牌。
  // ============================================================
  shelterGuide:{id:'shelterGuide',name:'避难引导队',cost:1,type:'unit',atk:0,hp:3,faction:'neutral',rarity:'common',tags:['人类','支援','防卫队'],keywords:['guard'],text:'【守护】。廉价的临时防线。'},
  shieldSquad:{id:'shieldSquad',name:'防卫队盾阵小队',cost:2,type:'unit',atk:1,hp:4,faction:'neutral',rarity:'common',tags:['人类','防卫队'],keywords:['guard'],text:'【守护】。'},
  barrierCarrier:{id:'barrierCarrier',name:'移动屏障车',cost:3,type:'unit',atk:2,hp:5,faction:'neutral',rarity:'common',tags:['机械','防卫队','载具'],keywords:['guard'],text:'【守护】；稳固的中期防线。'},
  gakumaBeta:{id:'gakumaBeta',name:'加库玛β',cost:4,type:'unit',atk:3,hp:6,faction:'neutral',rarity:'rare',tags:['怪兽','地球怪兽'],keywords:['guard'],text:'【守护】；高生命的地面怪兽。'},
  silvergon:{id:'silvergon',name:'刚力怪兽 希尔巴贡',cost:5,type:'unit',atk:4,hp:8,faction:'neutral',rarity:'rare',tags:['怪兽','地球怪兽'],keywords:['guard'],text:'【守护】。很难被一次交换掉的重型前排。'},
  kingPandon:{id:'kingPandon',name:'双头怪兽 庞敦',cost:6,type:'unit',atk:5,hp:8,faction:'neutral',rarity:'epic',tags:['怪兽','宇宙怪兽'],keywords:['guard'],text:'【守护】；登场：为你的英雄恢复2点生命。',battlecry:[{op:'healHero',n:2}]},
  defenseHeavyMech:{id:'defenseHeavyMech',name:'防卫队重装机甲',cost:7,type:'unit',atk:6,hp:9,faction:'neutral',rarity:'epic',tags:['机械','防卫队','重装'],keywords:['guard'],text:'【守护】；登场：获得【护盾】。',battlecry:[{op:'grantSelfShield'}]},

  energyEngineer:{id:'energyEngineer',name:'能源工程员',cost:3,type:'unit',atk:2,hp:3,faction:'neutral',rarity:'common',tags:['人类','支援','能量'],text:'登场：获得1点临时能量。',battlecry:[{op:'gainEnergy',n:1}]},
  fieldMedic:{id:'fieldMedic',name:'前线医疗班',cost:3,type:'unit',atk:2,hp:4,faction:'neutral',rarity:'common',tags:['人类','防卫队','支援'],text:'登场：为你的英雄恢复2点生命。',battlecry:[{op:'healHero',n:2}]},
  supplyCarrier:{id:'supplyCarrier',name:'后勤运输车',cost:3,type:'unit',atk:2,hp:4,faction:'neutral',rarity:'rare',tags:['机械','防卫队','支援'],text:'登场：使你的下一张单位牌费用-1。',battlecry:[{op:'reduceNextUnit',n:1}]},
  interceptorDrone:{id:'interceptorDrone',name:'高速拦截无人机',cost:2,type:'unit',atk:2,hp:2,faction:'neutral',rarity:'common',tags:['机械','防卫队','飞行'],keywords:['rush'],text:'【突进】。用于尽快处理对方早期单位。'},
  monsterObserver:{id:'monsterObserver',name:'怪兽观察员',cost:2,type:'unit',atk:1,hp:3,faction:'neutral',rarity:'rare',tags:['人类','研究'],text:'登场：尝试从牌库抽一张【怪兽】单位。',battlecry:[{op:'drawByTagOrDraw',tag:'怪兽',type:'unit',noFallback:true}]},

  emergencyDeployment:{id:'emergencyDeployment',name:'紧急防线部署',cost:2,type:'skill',faction:'neutral',rarity:'common',tags:['防卫队','防御','召唤'],text:'召唤一个0/3并具有【守护】的战术诱饵。为你的英雄恢复1点生命。',effects:[{op:'summonCard',id:'decoyToken'},{op:'healHero',n:1}]},
  doubleDecoy:{id:'doubleDecoy',name:'双重诱饵展开',cost:3,type:'skill',faction:'neutral',rarity:'rare',tags:['防卫队','防御','召唤'],text:'召唤两个0/3并具有【守护】的战术诱饵。',effects:[{op:'summonCard',id:'decoyToken'},{op:'summonCard',id:'decoyToken'}]},
  shieldFormation:{id:'shieldFormation',name:'防线重组',cost:2,type:'skill',faction:'neutral',rarity:'common',tags:['防御','战术'],target:'friendlyUnit',text:'使一个友方单位+0/+2并获得【守护】。',effects:[{op:'buffTarget',atk:0,hp:2},{op:'grantTargetKeyword',keyword:'guard'}]},
  guardSearch:{id:'guardSearch',name:'寻找掩护',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['防御','检索'],text:'从牌库抽一张具有【守护】的单位。若没有，则抽1张普通牌。',effects:[{op:'drawByKeywordOrDraw',keyword:'guard',type:'unit'}]},
  coverRetreat:{id:'coverRetreat',name:'掩护撤离',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['战术','防御'],target:'friendlyUnit',text:'将一个友方单位返回手牌，并召唤一个0/3【守护】战术诱饵。',effects:[{op:'returnTargetHand',discount:0},{op:'summonCard',id:'decoyToken'}]},

  energyBackflow:{id:'energyBackflow',name:'光能回流',cost:1,type:'skill',faction:'neutral',rarity:'common',tags:['能量','战术'],text:'获得2点临时能量。以一张手牌换取本回合的节奏。',effects:[{op:'gainEnergy',n:2}]},
  capacitorCharge:{id:'capacitorCharge',name:'备用电容充能',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['能量','蓄能'],text:'你的下个回合额外获得3点临时能量。',effects:[{op:'gainNextTurnEnergy',n:3}]},
  lightCircuit:{id:'lightCircuit',name:'光能回路优化',cost:1,type:'skill',faction:'neutral',rarity:'common',tags:['能量','战术'],text:'抽1张牌，并使你的下一张技能牌费用-1。',effects:[{op:'draw',n:1},{op:'reduceNextSkill',n:1}]},
  tacticalRecharge:{id:'tacticalRecharge',name:'战术回充',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['能量','战术'],text:'获得1点临时能量并抽1张牌。',effects:[{op:'gainEnergy',n:1},{op:'draw',n:1}]},
  fieldResupply:{id:'fieldResupply',name:'战地补给',cost:3,type:'skill',faction:'neutral',rarity:'rare',tags:['支援','能量'],text:'抽2张牌；你的下个回合额外获得1点临时能量。',effects:[{op:'draw',n:2},{op:'gainNextTurnEnergy',n:1}]},
  coolingCycle:{id:'coolingCycle',name:'冷却循环',cost:2,type:'skill',faction:'neutral',rarity:'common',tags:['能量','支援'],text:'为你的英雄恢复2点生命，并使下一张技能牌费用-1。',effects:[{op:'healHero',n:2},{op:'reduceNextSkill',n:1}]},

  reserveCapacitor:{id:'reserveCapacitor',name:'备用光能电容',cost:3,type:'equipment',faction:'neutral',rarity:'rare',tags:['装备','装置','能量'],text:'【装置】耐久2。每个你的回合开始时获得1点临时能量，然后消耗1点耐久。',equipment:{slot:'device',durability:2,turnStart:[{op:'gainEnergy',n:1}],consumeOnTurnStart:1}},

  // ============================================================
  // 中立扩展 IV —— 完整基础生态批次（Prototype 0.11）
  // 解场 / 沉默 / 净化 / 墓地 / 检索 / 资源 / 正常曲线 / 反制
  // ============================================================
  defenseScoutTeam:{id:'defenseScoutTeam',name:'前沿侦察小队',cost:1,type:'unit',atk:1,hp:2,faction:'neutral',rarity:'common',tags:['人类','防卫队','侦察'],text:'登场：若敌方场上至少有2个单位，抽1张牌。',battlecry:[{op:'conditional',condition:{type:'enemyBoardAtLeast',n:2},then:[{op:'draw',n:1}]}]},
  rescueVolunteer:{id:'rescueVolunteer',name:'紧急救援队员',cost:2,type:'unit',atk:2,hp:3,faction:'neutral',rarity:'common',tags:['人类','防卫队','支援'],text:'登场：为你的英雄恢复1点生命。',battlecry:[{op:'healHero',n:1}]},
  antiKaijuMarksman:{id:'antiKaijuMarksman',name:'对怪兽狙击手',cost:3,type:'unit',atk:3,hp:2,faction:'neutral',rarity:'rare',tags:['人类','防卫队','战术'],target:'enemyUnit',text:'登场：对一个敌方单位造成1点伤害；若它是【怪兽】，改为3点。',battlecry:[{op:'conditional',condition:{type:'targetHasTag',tag:'怪兽'},then:[{op:'damageTarget',n:3}],else:[{op:'damageTarget',n:1}]}]},
  electroNetSquad:{id:'electroNetSquad',name:'电磁拘束小队',cost:3,type:'unit',atk:2,hp:4,faction:'neutral',rarity:'rare',tags:['人类','防卫队','控制'],target:'enemyUnit',text:'登场：若目标攻击力不高于3，使其下回合无法攻击。',battlecry:[{op:'conditional',condition:{type:'targetAtkAtMost',n:3},then:[{op:'stunTarget',turns:1}]}]},
  salvageEngineer:{id:'salvageEngineer',name:'战地回收工程师',cost:3,type:'unit',atk:2,hp:4,faction:'neutral',rarity:'common',tags:['人类','机械','支援'],text:'登场：从牌库抽一张装备牌。',battlecry:[{op:'drawByType',type:'equipment',n:1}]},
  reserveAcePilot:{id:'reserveAcePilot',name:'后备王牌飞行员',cost:2,type:'unit',atk:2,hp:2,faction:'neutral',rarity:'common',tags:['人类','防卫队','飞行'],keywords:['rush'],text:'【突进】。'},
  capsuleTechnician:{id:'capsuleTechnician',name:'胶囊怪兽整备员',cost:3,type:'unit',atk:3,hp:3,faction:'neutral',rarity:'rare',tags:['人类','胶囊怪兽','支援'],text:'登场：随机将一张【胶囊怪兽】单位加入手牌。',battlecry:[{op:'addRandomCardByTag',tag:'胶囊怪兽',type:'unit'}]},
  dimensionalObserver:{id:'dimensionalObserver',name:'异次元观测员',cost:3,type:'unit',atk:2,hp:4,faction:'neutral',rarity:'rare',tags:['人类','研究','四次元'],text:'登场：从牌库抽一张事件牌。',battlecry:[{op:'drawByType',type:'event',n:1}]},
  medicalCarrier:{id:'medicalCarrier',name:'前线医疗运输车',cost:4,type:'unit',atk:3,hp:5,faction:'neutral',rarity:'common',tags:['机械','防卫队','支援'],text:'登场：为你的英雄恢复3点生命。',battlecry:[{op:'healHero',n:3}]},
  defenseCaptainNeutral:{id:'defenseCaptainNeutral',name:'联合防卫队队长',cost:4,type:'unit',atk:4,hp:4,faction:'neutral',rarity:'rare',tags:['人类','防卫队','指挥'],text:'登场：其他【防卫队】单位+1攻击。',battlecry:[{op:'buffAllTag',tag:'防卫队',atk:1,hp:0,excludeSource:true}]},
  heavyInterceptor:{id:'heavyInterceptor',name:'重型拦截战机',cost:5,type:'unit',atk:5,hp:5,faction:'neutral',rarity:'rare',tags:['机械','防卫队','飞行'],keywords:['rush'],text:'【突进】。适合立即争夺场面。'},
  graveSurveyor:{id:'graveSurveyor',name:'怪兽墓场回收员',cost:4,type:'unit',atk:3,hp:5,faction:'neutral',rarity:'epic',tags:['人类','研究','墓地'],text:'登场：将你墓地中最后死亡的单位返回手牌。',battlecry:[{op:'recoverLastUnitToHand',deadOnly:true}]},
  barrierMonster:{id:'barrierMonster',name:'屏障怪兽 巴利盖拉',cost:6,type:'unit',atk:4,hp:8,faction:'neutral',rarity:'epic',tags:['怪兽','防御'],keywords:['guard','shield'],text:'【守护】【护盾】。'},
  disasterBird:{id:'disasterBird',name:'灾厄鸟兽 德拉贡',cost:6,type:'unit',atk:6,hp:5,faction:'neutral',rarity:'rare',tags:['怪兽','飞行'],text:'死亡：对其他所有单位造成1点伤害。',triggers:{death:[{op:'damageAllOtherUnits',n:1}]}},
  spaceMerchant:{id:'spaceMerchant',name:'宇宙商人',cost:2,type:'unit',atk:2,hp:2,faction:'neutral',rarity:'rare',tags:['宇宙人','交易'],text:'登场：随机将一张【战术】技能加入手牌。',battlecry:[{op:'addRandomCardByTag',tag:'战术',type:'skill'}]},
  recycleRobot:{id:'recycleRobot',name:'再生资源机器人',cost:4,type:'unit',atk:3,hp:5,faction:'neutral',rarity:'rare',tags:['机械','机器人','支援'],text:'死亡：随机将一张装备牌加入手牌。',triggers:{death:[{op:'addRandomCardByTag',tag:'装备',type:'equipment'}]}},
  defenseStrategist:{id:'defenseStrategist',name:'防卫战术参谋',cost:5,type:'unit',atk:3,hp:6,faction:'neutral',rarity:'epic',tags:['人类','防卫队','指挥'],keywords:['guard'],text:'【守护】；登场：从牌库抽一张【防卫队】牌。',battlecry:[{op:'drawByTagOrDraw',tag:'防卫队',noFallback:true}]},
  ancientGuardian:{id:'ancientGuardian',name:'古代守护兽',cost:7,type:'unit',atk:6,hp:9,faction:'neutral',rarity:'rare',tags:['怪兽','古代','防御'],keywords:['guard'],text:'【守护】。简单、可靠的大型前排。'},

  silenceShot:{id:'silenceShot',name:'干扰静默弹',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['战术','干扰'],target:'enemyUnit',text:'沉默一个敌方单位：移除其关键词、触发能力与额外强化。',effects:[{op:'silenceTarget'}]},
  purificationPulse:{id:'purificationPulse',name:'净化脉冲',cost:2,type:'skill',faction:'neutral',rarity:'common',tags:['支援','净化'],target:'friendlyUnit',text:'净化一个友方单位的眩晕与攻击削弱，并为其恢复2点生命。',effects:[{op:'cleanseTarget'},{op:'healTarget',n:2}]},
  dimensionalSeal:{id:'dimensionalSeal',name:'异次元封锁',cost:5,type:'skill',faction:'neutral',rarity:'epic',tags:['四次元','控制'],target:'enemyUnit',text:'将一个敌方单位洗回其牌库。',effects:[{op:'shuffleTargetIntoDeck'}]},
  emergencyArchive:{id:'emergencyArchive',name:'紧急档案调用',cost:1,type:'skill',faction:'neutral',rarity:'common',tags:['检索','战术'],text:'从牌库抽取费用最低的一张单位牌。',effects:[{op:'drawLowestCost',type:'unit'}]},
  strategicReserve:{id:'strategicReserve',name:'战略预备队',cost:3,type:'skill',faction:'neutral',rarity:'rare',tags:['检索','战术'],text:'从牌库抽取费用最高的一张单位牌。',effects:[{op:'drawHighestCost',type:'unit'}]},
  retrievalOperation:{id:'retrievalOperation',name:'残骸回收作战',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['墓地','支援'],text:'将你墓地中最后死亡的单位返回手牌。',effects:[{op:'recoverLastUnitToHand',deadOnly:true}]},
  fieldRevival:{id:'fieldRevival',name:'紧急再部署',cost:4,type:'skill',faction:'neutral',rarity:'epic',tags:['墓地','召唤'],text:'随机复活一个本局死亡的费用不高于3的友方单位，并使其生命最多为3。',effects:[{op:'resurrectRandomUnitCostAtMost',maxCost:3,setHp:3}]},
  tacticalRebalance:{id:'tacticalRebalance',name:'战术再平衡',cost:1,type:'skill',faction:'neutral',rarity:'common',tags:['战术','能量'],target:'friendlyUnit',text:'使一个友方单位-1/-1；获得2点临时能量。',effects:[{op:'buffTarget',atk:-1,hp:-1},{op:'gainEnergy',n:2}]},
  reactorOverclock:{id:'reactorOverclock',name:'反应炉超频',cost:0,type:'skill',faction:'neutral',rarity:'epic',tags:['能量','风险'],text:'本回合获得2点临时能量；下个回合少获得1点能量。',effects:[{op:'gainEnergy',n:2},{op:'gainNextTurnEnergy',n:-1}]},
  trapScanner:{id:'trapScanner',name:'陷阱扫描',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['侦察','反制'],text:'随机摧毁一个敌方陷阱；若成功，抽1张牌。',effects:[{op:'destroyRandomEnemyTrap',drawOnSuccess:1}]},
  eventDisruptor:{id:'eventDisruptor',name:'事件干扰协议',cost:3,type:'skill',faction:'neutral',rarity:'rare',tags:['干扰','反制'],text:'摧毁敌方当前事件；若成功，抽1张牌。',effects:[{op:'destroyEnemyEvent',drawOnSuccess:1}]},
  equipmentEMP:{id:'equipmentEMP',name:'广域EMP脉冲',cost:3,type:'skill',faction:'neutral',rarity:'rare',tags:['干扰','机械','反制'],text:'随机摧毁一个敌方装备。',effects:[{op:'destroyRandomEnemyEquipment'}]},
  containmentBeam:{id:'containmentBeam',name:'拘束光束',cost:3,type:'skill',faction:'neutral',rarity:'common',tags:['控制','光线'],target:'enemyUnit',text:'将一个敌方单位的攻击力变为1，直到它离场。',effects:[{op:'setTargetAttack',atk:1}]},
  suppressionNet:{id:'suppressionNet',name:'高压压制网',cost:2,type:'skill',faction:'neutral',rarity:'rare',tags:['控制','战术'],target:'enemyUnit',text:'使一个敌方单位下回合无法攻击；若其攻击力至少5，再使其-2攻击。',effects:[{op:'stunTarget',turns:1},{op:'conditional',condition:{type:'targetAtkAtLeast',n:5},then:[{op:'buffTarget',atk:-2,hp:0}]}]},
  crossfireProtocol:{id:'crossfireProtocol',name:'交叉火力协议',cost:4,type:'skill',faction:'neutral',rarity:'rare',tags:['防卫队','战术'],text:'对所有敌方单位造成2点伤害。',effects:[{op:'damageAllEnemyUnits',n:2}]},
  precisionFinisher:{id:'precisionFinisher',name:'弱点终结射击',cost:3,type:'skill',faction:'neutral',rarity:'rare',tags:['战术','终结'],target:'enemyUnit',text:'对一个敌方单位造成3点伤害；若它已经受伤，改为5点。',effects:[{op:'conditional',condition:{type:'targetDamaged'},then:[{op:'damageTarget',n:5}],else:[{op:'damageTarget',n:3}]}]},
  emergencyEvacuation:{id:'emergencyEvacuation',name:'紧急撤离',cost:1,type:'skill',faction:'neutral',rarity:'common',tags:['战术','支援'],target:'friendlyUnit',text:'将一个友方单位返回手牌，然后抽1张牌。',effects:[{op:'returnTargetHand',discount:0},{op:'draw',n:1}]},
  archiveReconstruction:{id:'archiveReconstruction',name:'战术档案重构',cost:4,type:'skill',faction:'neutral',rarity:'epic',tags:['检索','战术'],text:'从牌库抽一张单位牌和一张技能牌。',effects:[{op:'drawByType',type:'unit',n:1},{op:'drawByType',type:'skill',n:1}]},

  layeredDefenseNetwork:{id:'layeredDefenseNetwork',name:'多层防御网',cost:4,type:'event',faction:'neutral',rarity:'rare',tags:['事件','防御','防卫队'],text:'持续3回合：你召唤的【防卫队】单位+0/+1；每回合结束恢复1点生命。',duration:3,eventEffect:{summonTag:'防卫队',summonTagHp:1,endHeal:1}},
  energyMaintenanceWindow:{id:'energyMaintenanceWindow',name:'能量维护窗口',cost:3,type:'event',faction:'neutral',rarity:'rare',tags:['事件','能量'],text:'持续2回合：每回合第一张技能费用-1；回合结束恢复1点生命。',duration:2,eventEffect:{firstSkillDiscount:1,endHeal:1}},
  tacticalPreparedness:{id:'tacticalPreparedness',name:'全域战术预案',cost:3,type:'event',faction:'neutral',rarity:'epic',tags:['事件','战术'],text:'持续3回合：你的【战术】牌费用-1。',duration:3,eventEffect:{tagDiscount:'战术',tagDiscountAmount:1}},
  multiSpectrumScanner:{id:'multiSpectrumScanner',name:'多谱段战术扫描仪',cost:3,type:'equipment',faction:'neutral',rarity:'epic',tags:['装备','装置','侦察','检索'],text:'【装置】耐久2。每个你的回合开始时，从牌库抽取费用最低的一张技能牌，然后消耗1点耐久。',equipment:{slot:'device',durability:2,turnStart:[{op:'drawLowestCost',type:'skill'}],consumeOnTurnStart:1}},


  // ============================================================
  // 装备扩展 —— 武器 / 装甲 / 装置（Prototype 0.7）
  // ============================================================
  gutsHyperGun:{id:'gutsHyperGun',name:'GUTS海帕枪',cost:2,type:'equipment',faction:'neutral',rarity:'common',tags:['装备','武器','防卫队'],text:'【武器】攻击+2，耐久2。攻击单位时额外+1攻击。',equipment:{slot:'weapon',durability:2,attack:2,attackVsUnitBonus:1}},
  ultraBracelet:{id:'ultraBracelet',name:'奥特手镯',cost:4,type:'equipment',faction:'neutral',rarity:'epic',tags:['装备','武器','光'],text:'【武器】攻击+3，耐久2。每次攻击后为你的英雄恢复1点生命。',equipment:{slot:'weapon',durability:2,attack:3,onHeroAttack:[{op:'healHero',n:1}]}},
  magmaSaber:{id:'magmaSaber',name:'马格马佩剑',cost:4,type:'equipment',faction:'neutral',rarity:'rare',tags:['装备','武器','宇宙'],text:'【武器】攻击+4，耐久1。适合一次性的强力交换。',equipment:{slot:'weapon',durability:1,attack:4}},
  defenseSpear:{id:'defenseSpear',name:'宇宙警备队制式长枪',cost:4,type:'equipment',faction:'neutral',rarity:'rare',tags:['装备','武器','光'],text:'【武器】攻击+2，耐久4。',equipment:{slot:'weapon',durability:4,attack:2}},

  compositeArmor:{id:'compositeArmor',name:'防卫队复合装甲',cost:3,type:'equipment',faction:'neutral',rarity:'common',tags:['装备','装甲','防卫队'],text:'【装甲】耐久3。每次英雄受到伤害时减少1点伤害并消耗1点耐久。',equipment:{slot:'armor',durability:3,damageReduction:1}},
  superAlloyPlate:{id:'superAlloyPlate',name:'超合金防护板',cost:5,type:'equipment',faction:'neutral',rarity:'rare',tags:['装备','装甲','机械'],text:'【装甲】耐久2。每次英雄受到伤害时减少2点伤害并消耗1点耐久。',equipment:{slot:'armor',durability:2,damageReduction:2}},
  emergencyBarrier:{id:'emergencyBarrier',name:'紧急屏障发生器',cost:3,type:'equipment',faction:'neutral',rarity:'rare',tags:['装备','装甲','防御'],text:'【装甲】耐久1。下一次英雄受到伤害时减少4点伤害。',equipment:{slot:'armor',durability:1,damageReduction:4}},
  ultraMantle:{id:'ultraMantle',name:'奥特披风',cost:5,type:'equipment',faction:'neutral',rarity:'legendary',tags:['装备','装甲','光'],text:'【装甲】耐久3。每次英雄受到伤害时减少1点；破坏时恢复3点生命。',equipment:{slot:'armor',durability:3,damageReduction:1,onBreak:[{op:'healHero',n:3}]}},
  darkArmorFragment:{id:'darkArmorFragment',name:'黑暗铠甲碎片',cost:3,type:'equipment',faction:'belial',rarity:'rare',tags:['贝利亚','装备','装甲','黑暗'],text:'【装甲】耐久2。每次英雄受到伤害时减少1点；破坏时对敌方英雄造成2点伤害。',equipment:{slot:'armor',durability:2,damageReduction:1,onBreak:[{op:'damageEnemyHero',n:2}]}},

  energyStabilizer:{id:'energyStabilizer',name:'能量稳定器',cost:2,type:'equipment',faction:'neutral',rarity:'common',tags:['装备','装置','能量'],text:'【装置】耐久3。每个你的回合开始时，使下一张技能牌费用-1，然后消耗1点耐久。',equipment:{slot:'device',durability:3,turnStart:[{op:'reduceNextSkill',n:1}],consumeOnTurnStart:1}},
  tacticalTerminal:{id:'tacticalTerminal',name:'战术分析终端',cost:4,type:'equipment',faction:'neutral',rarity:'epic',tags:['装备','装置','防卫队'],text:'【装置】耐久2。每个你的回合开始时抽1张牌，然后消耗1点耐久。',equipment:{slot:'device',durability:2,turnStart:[{op:'draw',n:1}],consumeOnTurnStart:1}},
  monsterRadar:{id:'monsterRadar',name:'怪兽追踪雷达',cost:3,type:'equipment',faction:'neutral',rarity:'rare',tags:['装备','装置','研究'],text:'【装置】耐久2。每个你的回合开始时，从牌库抽一张【怪兽】单位，然后消耗1点耐久。',equipment:{slot:'device',durability:2,turnStart:[{op:'drawByTagOrDraw',tag:'怪兽',type:'unit',noFallback:true}],consumeOnTurnStart:1}},
  maintenanceUnit:{id:'maintenanceUnit',name:'机械维护单元',cost:3,type:'equipment',faction:'neutral',rarity:'rare',tags:['装备','装置','机械'],text:'【装置】耐久3。每个你的回合结束时，随机使一个友方【机械】+0/+1，然后消耗1点耐久。',equipment:{slot:'device',durability:3,turnEnd:[{op:'buffRandomFriendlyTag',tag:'机械',atk:0,hp:1}],consumeOnTurnEnd:1}},
  spaciumAmplifier:{id:'spaciumAmplifier',name:'斯派修姆增幅器',cost:3,type:'equipment',faction:'neutral',rarity:'rare',tags:['装备','装置','光线'],text:'【装置】耐久3。你的【光线】技能费用-1；每个你的回合开始时消耗1点耐久。',equipment:{slot:'device',durability:3,tagDiscount:'光线',tagDiscountAmount:1,consumeOnTurnStart:1}},
  capsuleHolder:{id:'capsuleHolder',name:'怪兽胶囊收纳器',cost:2,type:'equipment',faction:'neutral',rarity:'rare',tags:['装备','装置','胶囊怪兽'],text:'【装置】耐久3。你的【胶囊怪兽】单位费用-1；每个你的回合开始时消耗1点耐久。',equipment:{slot:'device',durability:3,tagDiscount:'胶囊怪兽',tagDiscountAmount:1,consumeOnTurnStart:1}},
  meteorCore:{id:'meteorCore',name:'METEOR技术核心',cost:4,type:'equipment',faction:'neutral',rarity:'epic',tags:['装备','装置','防卫队'],text:'【装置】耐久3。每个你的回合开始时，使下一张单位牌费用-1，然后消耗1点耐久。',equipment:{slot:'device',durability:3,turnStart:[{op:'reduceNextUnit',n:1}],consumeOnTurnStart:1}},
  fieldCommunicator:{id:'fieldCommunicator',name:'战地通讯器',cost:2,type:'equipment',faction:'neutral',rarity:'common',tags:['装备','装置','防卫队'],text:'装备时抽1张牌。【装置】耐久2；你的【防卫队】牌费用-1，每个你的回合开始时消耗1点耐久。',effects:[{op:'draw',n:1}],equipment:{slot:'device',durability:2,tagDiscount:'防卫队',tagDiscountAmount:1,consumeOnTurnStart:1}},

  sparkLens:{id:'sparkLens',name:'神光棒',cost:2,type:'equipment',faction:'tiga',rarity:'legendary',tags:['迪迦','装备','装置','变形'],text:'装备时从牌库抽一张【变形】牌。【装置】耐久4；你的【变形】牌费用-1，每个你的回合开始时消耗1点耐久。',effects:[{op:'drawByTagOrDraw',tag:'变形',type:'skill',noFallback:true}],equipment:{slot:'device',durability:4,tagDiscount:'变形',tagDiscountAmount:1,consumeOnTurnStart:1}},
  gutsCommandLink:{id:'gutsCommandLink',name:'GUTS战术通讯终端',cost:3,type:'equipment',faction:'tiga',rarity:'epic',tags:['迪迦','装备','装置','GUTS'],text:'【装置】耐久2。每个你的回合开始时，从牌库抽一张【GUTS】牌，然后消耗1点耐久。',equipment:{slot:'device',durability:2,turnStart:[{op:'drawByTagOrDraw',tag:'GUTS',noFallback:true}],consumeOnTurnStart:1}},
  reionicBattlenizer:{id:'reionicBattlenizer',name:'雷奥尼克斯战斗仪',cost:3,type:'equipment',faction:'belial',rarity:'epic',tags:['贝利亚','装备','装置','怪兽','黑暗'],text:'【装置】耐久3。你的【怪兽】单位费用-1；每个你的回合开始时消耗1点耐久。',equipment:{slot:'device',durability:3,tagDiscount:'怪兽',tagDiscountAmount:1,consumeOnTurnStart:1}},
  imperialCommandCore:{id:'imperialCommandCore',name:'银河帝国指挥核心',cost:3,type:'equipment',faction:'belial',rarity:'rare',tags:['贝利亚','装备','装置','帝国军'],text:'【装置】耐久3。你的【帝国军】单位费用-1；每个你的回合开始时消耗1点耐久。',equipment:{slot:'device',durability:3,tagDiscount:'帝国军',tagDiscountAmount:1,consumeOnTurnStart:1}},
  sabotageKit:{id:'sabotageKit',name:'装备破坏作战包',cost:3,type:'equipment',faction:'neutral',rarity:'rare',tags:['装备','装置','战术'],text:'装备时随机摧毁一个敌方装备。【装置】耐久2；你的【战术】牌费用-1，每个你的回合开始时消耗1点耐久。',effects:[{op:'destroyRandomEnemyEquipment'}],equipment:{slot:'device',durability:2,tagDiscount:'战术',tagDiscountAmount:1,consumeOnTurnStart:1}},

  // ============================================================
  // 迪迦专属 32
  // ============================================================
  palmArrow:{id:'palmArrow',name:'手掌光箭',cost:1,type:'skill',faction:'tiga',rarity:'common',tags:['迪迦','光线'],text:'对一个目标造成2点伤害。',target:'anyEnemy',effects:[{op:'damageTarget',n:2}]},
  ultraFighting:{id:'ultraFighting',name:'奥特格斗术',cost:1,type:'skill',faction:'tiga',rarity:'common',tags:['迪迦','格斗'],text:'本回合你的英雄获得3点攻击。',effects:[{op:'heroAttackThisTurn',atk:3}]},
  powerType:{id:'powerType',name:'类型转换·强力型',cost:2,type:'skill',faction:'tiga',rarity:'rare',tags:['迪迦','变形'],text:'切换为强力型，本回合再获得2点攻击。',effects:[{op:'changeForm',form:'power'},{op:'heroAttackThisTurn',atk:2}]},
  skyType:{id:'skyType',name:'类型转换·空中型',cost:2,type:'skill',faction:'tiga',rarity:'rare',tags:['迪迦','变形'],text:'切换为空中型，并抽1张牌。',effects:[{op:'changeForm',form:'sky'},{op:'draw',n:1}]},
  compositeReturn:{id:'compositeReturn',name:'类型转换·复合型',cost:1,type:'skill',faction:'tiga',rarity:'common',tags:['迪迦','变形'],text:'切换回复合型，并抽1张牌。',effects:[{op:'changeForm',form:'composite'},{op:'draw',n:1}]},
  zeperion:{id:'zeperion',name:'哉佩利敖光线',cost:7,type:'skill',faction:'tiga',rarity:'epic',tags:['迪迦','光线','必杀'],text:'对一个目标造成8点伤害。若消灭单位，再对敌方英雄造成2点伤害。',target:'anyEnemy',effects:[{op:'damageTarget',n:8,overflowHeroOnKill:2}]},
  multiSpacium:{id:'multiSpacium',name:'复合光线连射',cost:4,type:'skill',faction:'tiga',rarity:'rare',tags:['迪迦','光线'],text:'随机造成3次1点伤害。',effects:[{op:'randomEnemyDamage',n:1,times:3}]},
  gutsSupport:{id:'gutsSupport',name:'GUTS协同作战',cost:3,type:'unit',atk:2,hp:4,faction:'tiga',rarity:'common',tags:['人类','GUTS','防卫队'],text:'登场：另一随机友方单位+1/+1。',battlecry:[{op:'buffRandomFriendly',atk:1,hp:1}]},
  gutsWing:{id:'gutsWing',name:'胜利飞燕一号',cost:2,type:'unit',atk:2,hp:2,faction:'tiga',rarity:'common',tags:['GUTS','防卫队','机械','飞行'],keywords:['rush'],text:'【突进】'},
  barrierTiga:{id:'barrierTiga',name:'迪迦屏障',cost:2,type:'skill',faction:'tiga',rarity:'rare',tags:['迪迦','防御'],text:'使一个友方单位获得【护盾】；复合型时再抽1张牌。',target:'friendlyUnit',effects:[{op:'grantTargetShield'},{op:'conditional',condition:{type:'formIs',form:'composite'},then:[{op:'draw',n:1}]}]},
  powerKnuckle:{id:'powerKnuckle',name:'强力重拳',cost:3,type:'skill',faction:'tiga',rarity:'rare',tags:['迪迦','格斗'],text:'对一个敌方单位造成4点伤害；强力型时造成6点。',target:'enemyUnit',effects:[{op:'damageTargetByForm',base:4,form:'power',bonus:2}]},
  skyDash:{id:'skyDash',name:'空中急袭',cost:2,type:'skill',faction:'tiga',rarity:'common',tags:['迪迦','空中'],text:'造成2点伤害；空中型时抽1张牌。',target:'anyEnemy',effects:[{op:'damageTarget',n:2},{op:'conditional',condition:{type:'formIs',form:'sky'},then:[{op:'draw',n:1}]}]},
  shiningHope:{id:'shiningHope',name:'致以辉煌的人们',cost:8,type:'event',faction:'tiga',rarity:'legendary',tags:['迪迦','事件','光'],text:'恢复8点生命，抽2张牌；你的所有单位+1/+1。若生命不高于10，切换为闪耀形态。',duration:1,eventEffect:{},effects:[{op:'conditional',condition:{type:'heroHpAtMost',n:10},then:[{op:'changeForm',form:'shining'}]},{op:'healHero',n:8},{op:'draw',n:2},{op:'buffAllFriendly',atk:1,hp:1}]},

  delacium:{id:'delacium',name:'迪拉休姆光流',cost:5,type:'skill',faction:'tiga',rarity:'epic',tags:['迪迦','光线','强力型'],text:'对一个敌方单位造成6点伤害；强力型时造成8点。',target:'enemyUnit',effects:[{op:'damageTargetByForm',base:6,form:'power',bonus:2}]},
  runboldt:{id:'runboldt',name:'兰帕尔特光弹',cost:4,type:'skill',faction:'tiga',rarity:'rare',tags:['迪迦','光线','空中型'],text:'对一个目标造成4点伤害；空中型时使下一张技能费用-1。',target:'anyEnemy',effects:[{op:'damageTarget',n:4},{op:'conditional',condition:{type:'formIs',form:'sky'},then:[{op:'reduceNextSkill',n:1}]}]},
  timerFlash:{id:'timerFlash',name:'计时器闪光',cost:2,type:'skill',faction:'tiga',rarity:'common',tags:['迪迦','光','支援'],text:'恢复3点生命。若处于复合型，再抽1张牌。',effects:[{op:'healHero',n:3},{op:'conditional',condition:{type:'formIs',form:'composite'},then:[{op:'draw',n:1}]}]},
  typeMastery:{id:'typeMastery',name:'类型转换连携',cost:1,type:'skill',faction:'tiga',rarity:'rare',tags:['迪迦','变形'],text:'按“复合→强力→空中→复合”循环切换形态，并使下一张技能费用-1。',effects:[{op:'cycleTigaForm'},{op:'reduceNextSkill',n:1}]},
  powerGuard:{id:'powerGuard',name:'强力型防御',cost:2,type:'skill',faction:'tiga',rarity:'common',tags:['迪迦','防御','强力型'],text:'使一个友方单位+0/+3；强力型时再获得【护盾】。',target:'friendlyUnit',effects:[{op:'buffTarget',atk:0,hp:3},{op:'conditional',condition:{type:'formIs',form:'power'},then:[{op:'grantTargetShield'}]}]},
  aerialFeint:{id:'aerialFeint',name:'高速佯攻',cost:1,type:'skill',faction:'tiga',rarity:'common',tags:['迪迦','空中型'],text:'使一个敌方单位下回合无法攻击。空中型时抽1张牌。',target:'enemyUnit',effects:[{op:'stunTarget',turns:1},{op:'conditional',condition:{type:'formIs',form:'sky'},then:[{op:'draw',n:1}]}]},
  rena:{id:'rena',name:'七濑丽娜',cost:2,type:'unit',atk:2,hp:3,faction:'tiga',rarity:'common',tags:['人类','GUTS'],text:'登场：为你的英雄恢复2点生命。',battlecry:[{op:'healHero',n:2}]},
  horii:{id:'horii',name:'堀井正美',cost:3,type:'unit',atk:2,hp:4,faction:'tiga',rarity:'rare',tags:['人类','GUTS','科学'],text:'登场：从牌库抽一张【技能】牌。',battlecry:[{op:'drawByType',type:'skill',n:1}]},
  munakata:{id:'munakata',name:'宗方诚一',cost:4,type:'unit',atk:3,hp:5,faction:'tiga',rarity:'rare',tags:['人类','GUTS','指挥'],text:'登场：其他【GUTS】单位+1/+1。',battlecry:[{op:'buffAllTag',tag:'GUTS',atk:1,hp:1,excludeSource:true}]},
  iruma:{id:'iruma',name:'居间惠',cost:5,type:'unit',atk:3,hp:6,faction:'tiga',rarity:'epic',tags:['人类','GUTS','指挥'],text:'登场：若你控制其他【GUTS】单位，抽2张牌。',battlecry:[{op:'conditional',condition:{type:'controlTag',tag:'GUTS',excludeSource:true},then:[{op:'draw',n:2}]}]},
  gutsWing2:{id:'gutsWing2',name:'胜利飞燕二号',cost:4,type:'unit',atk:4,hp:3,faction:'tiga',rarity:'rare',tags:['GUTS','防卫队','机械','飞行'],keywords:['rush'],text:'【突进】；登场：对一个随机敌方单位造成1点伤害。',battlecry:[{op:'randomEnemyUnitDamage',n:1,times:1}]},
  artdess:{id:'artdess',name:'亚特迪斯号',cost:7,type:'unit',atk:5,hp:9,faction:'tiga',rarity:'epic',tags:['GUTS','防卫队','机械'],keywords:['guard'],text:'【守护】；登场：对敌方英雄造成2点伤害。',battlecry:[{op:'damageEnemyHero',n:2}]},
  maxima:{id:'maxima',name:'麦克斯动力系统',cost:5,type:'skill',faction:'tiga',rarity:'epic',tags:['GUTS','光线','必杀'],text:'对所有敌方单位造成2点伤害，并对敌方英雄造成2点伤害。',effects:[{op:'damageAllEnemyUnits',n:2},{op:'damageEnemyHero',n:2}]},
  lightFormation:{id:'lightFormation',name:'光之阵列',cost:3,type:'event',faction:'tiga',rarity:'rare',tags:['迪迦','事件','光'],text:'持续3回合：你每回合第一张技能费用-1。',duration:3,eventEffect:{firstSkillDiscount:1}},
  compoundCounter:{id:'compoundCounter',name:'复合型反制',cost:3,type:'skill',faction:'tiga',rarity:'rare',tags:['迪迦','复合型','防御'],text:'使一个友方单位获得【护盾】并+1/+1；复合型时费用在手中视为2。',target:'friendlyUnit',dynamicCost:{form:'composite',delta:-1},effects:[{op:'grantTargetShield'},{op:'buffTarget',atk:1,hp:1}]},
  skyRescue:{id:'skyRescue',name:'空中救援',cost:2,type:'skill',faction:'tiga',rarity:'rare',tags:['迪迦','空中型'],text:'将一个友方单位返回手牌。空中型时该牌费用-2。',target:'friendlyUnit',effects:[{op:'returnTargetHand',discount:0},{op:'conditional',condition:{type:'formIs',form:'sky'},then:[{op:'discountLastReturned',n:2}]}]},
  powerBreak:{id:'powerBreak',name:'强力突破',cost:4,type:'skill',faction:'tiga',rarity:'rare',tags:['迪迦','强力型','格斗'],text:'本回合英雄获得5点攻击；强力型时获得7点。',effects:[{op:'conditional',condition:{type:'formIs',form:'power'},then:[{op:'heroAttackThisTurn',atk:7}],else:[{op:'heroAttackThisTurn',atk:5}]}]},
  lightInheritance:{id:'lightInheritance',name:'光的继承',cost:4,type:'event',faction:'tiga',rarity:'epic',tags:['迪迦','事件','光'],text:'持续2回合：你召唤的【GUTS】单位+1/+1；每回合结束恢复1点生命。',duration:2,eventEffect:{summonTag:'GUTS',summonTagAtk:1,summonTagHp:1,endHeal:1}},
  finalZeperion:{id:'finalZeperion',name:'蓄能·哉佩利敖',cost:6,type:'skill',faction:'tiga',rarity:'legendary',tags:['迪迦','光线','必杀','蓄力'],text:'对一个目标造成6点伤害。若本回合已经切换过形态，改为10点。',target:'anyEnemy',effects:[{op:'conditional',condition:{type:'formChangedThisTurn'},then:[{op:'damageTarget',n:10}],else:[{op:'damageTarget',n:6}]}]},

  // ============================================================
  // 贝利亚专属 34
  // ============================================================
  darkLops:{id:'darkLops',name:'黑暗洛普斯',cost:3,type:'unit',atk:5,hp:5,faction:'belial',rarity:'common',tags:['机械','黑暗'],text:'回合结束：你的英雄受到2点伤害。',triggers:{turnEnd:[{op:'damageOwnHero',n:2}]}},
  imperializer:{id:'imperializer',name:'黑暗帝国机兵',cost:4,type:'unit',atk:4,hp:6,faction:'belial',rarity:'common',tags:['机械','黑暗'],keywords:['guard'],text:'【守护】；登场：你的英雄受到1点伤害。',battlecry:[{op:'damageOwnHero',n:1}]},
  ruthlessAdvance:{id:'ruthlessAdvance',name:'无慈悲推进',cost:1,type:'skill',faction:'belial',rarity:'common',tags:['贝利亚','黑暗'],text:'你的英雄受到2点伤害，使一个友方单位+3攻击。',target:'friendlyUnit',effects:[{op:'damageOwnHero',n:2},{op:'buffTarget',atk:3,hp:0}]},
  sacrifice:{id:'sacrifice',name:'黑暗献祭',cost:2,type:'skill',faction:'belial',rarity:'rare',tags:['贝利亚','黑暗'],text:'消灭一个友方单位，抽2张牌并恢复2点临时能量。',target:'friendlyUnit',effects:[{op:'destroyTarget'},{op:'draw',n:2},{op:'gainEnergy',n:2}]},
  descium:{id:'descium',name:'帝斯修姆光线',cost:6,type:'skill',faction:'belial',rarity:'epic',tags:['贝利亚','光线','必杀','黑暗'],text:'对一个目标造成8点伤害。若目标存活，你受到3点伤害。',target:'anyEnemy',effects:[{op:'damageTarget',n:8,selfDamageIfSurvives:3}]},
  belialClaw:{id:'belialClaw',name:'贝利亚死亡爪',cost:3,type:'skill',faction:'belial',rarity:'rare',tags:['贝利亚','格斗','黑暗'],text:'对一个单位造成4点伤害；你的英雄受到1点伤害。',target:'enemyUnit',effects:[{op:'damageTarget',n:4},{op:'damageOwnHero',n:1}]},
  darkEnergy:{id:'darkEnergy',name:'黑暗能量灌注',cost:2,type:'skill',faction:'belial',rarity:'common',tags:['贝利亚','黑暗'],text:'你的英雄受到3点伤害；获得3点临时能量。',effects:[{op:'damageOwnHero',n:3},{op:'gainEnergy',n:3}]},
  belialArmy:{id:'belialArmy',name:'贝利亚军集结',cost:5,type:'event',faction:'belial',rarity:'rare',tags:['贝利亚','事件','黑暗'],text:'持续2回合：你召唤的【黑暗】单位+1攻击；回合结束英雄受到1点伤害。',duration:2,eventEffect:{summonTag:'黑暗',summonTagAtk:1,endSelfDamage:1}},
  darkCyclopsZero:{id:'darkCyclopsZero',name:'黑暗独眼赛罗',cost:5,type:'unit',atk:6,hp:5,faction:'belial',rarity:'rare',tags:['机械','黑暗','赛罗系'],text:'登场：你的英雄受到2点伤害，获得【护盾】。',battlecry:[{op:'damageOwnHero',n:2},{op:'grantSelfShield'}]},
  gigaBattlenizer:{id:'gigaBattlenizer',name:'终极战斗仪',cost:4,type:'equipment',faction:'belial',rarity:'epic',tags:['贝利亚','装备','武器','黑暗'],text:'【武器】攻击+3，耐久3。英雄以它攻击后，你的英雄受到1点伤害，再对敌方英雄造成1点伤害。',equipment:{slot:'weapon',durability:3,attack:3,onHeroAttack:[{op:'damageOwnHero',n:1},{op:'damageEnemyHero',n:1}]}},
  reionicCommand:{id:'reionicCommand',name:'雷奥尼克斯支配',cost:3,type:'skill',faction:'belial',rarity:'rare',tags:['贝利亚','怪兽'],text:'使一个友方【怪兽】+2/+2并抽1张牌。',target:'friendlyUnit',effects:[{op:'buffTargetIfTag',tag:'怪兽',atk:2,hp:2},{op:'draw',n:1}]},
  darkStorm:{id:'darkStorm',name:'黑暗风暴',cost:5,type:'skill',faction:'belial',rarity:'epic',tags:['贝利亚','黑暗'],text:'对所有敌方单位造成2点伤害，你的英雄受到2点伤害。',effects:[{op:'damageAllEnemyUnits',n:2},{op:'damageOwnHero',n:2}]},
  emperorBelial:{id:'emperorBelial',name:'银河帝国皇帝',cost:8,type:'unit',atk:8,hp:8,faction:'belial',rarity:'legendary',tags:['贝利亚','黑暗','奥特战士'],keywords:['guard'],text:'【守护】；登场：对敌方英雄造成3点伤害，你受到2点伤害。',battlecry:[{op:'damageEnemyHero',n:3},{op:'damageOwnHero',n:2}]},

  legionoid:{id:'legionoid',name:'雷吉内德',cost:2,type:'unit',atk:3,hp:2,faction:'belial',rarity:'common',tags:['机械','黑暗','帝国军'],text:'廉价的银河帝国战斗单位。'},
  darkgone:{id:'darkgone',name:'黑暗戈那',cost:3,type:'unit',atk:3,hp:4,faction:'belial',rarity:'rare',tags:['宇宙人','黑暗','帝国军'],text:'登场：若你的英雄本回合受过伤，抽1张牌。',battlecry:[{op:'conditional',condition:{type:'heroDamagedThisTurn'},then:[{op:'draw',n:1}]}]},
  iaron:{id:'iaron',name:'钢铁龙 艾安隆',cost:4,type:'unit',atk:6,hp:4,faction:'belial',rarity:'rare',tags:['机械','黑暗','帝国军'],text:'登场：你的英雄受到1点伤害。',battlecry:[{op:'damageOwnHero',n:1}]},
  darkCommander:{id:'darkCommander',name:'银河帝国指挥官',cost:4,type:'unit',atk:3,hp:6,faction:'belial',rarity:'epic',tags:['宇宙人','黑暗','帝国军'],text:'登场：其他【黑暗】单位+1攻击。',battlecry:[{op:'buffAllTag',tag:'黑暗',atk:1,hp:0,excludeSource:true}]},
  belialVirus:{id:'belialVirus',name:'黑暗侵蚀',cost:2,type:'skill',faction:'belial',rarity:'common',tags:['贝利亚','黑暗'],text:'你的英雄受到2点伤害，抽2张牌。',effects:[{op:'damageOwnHero',n:2},{op:'draw',n:2}]},
  monsterReanimation:{id:'monsterReanimation',name:'战斗仪再召唤',cost:5,type:'skill',faction:'belial',rarity:'epic',tags:['贝利亚','怪兽','复生'],text:'复活本局最近死亡的一个友方【怪兽】。',effects:[{op:'resurrectLastTag',tag:'怪兽'}]},
  hundredMonsters:{id:'hundredMonsters',name:'百体怪兽进军',cost:7,type:'skill',faction:'belial',rarity:'legendary',tags:['贝利亚','怪兽','召唤'],text:'随机召唤3个费用不高于4的【怪兽】。',effects:[{op:'summonRandomByTag',tag:'怪兽',maxCost:4,count:3}]},
  reionicBurst:{id:'reionicBurst',name:'雷奥尼克斯爆发',cost:3,type:'skill',faction:'belial',rarity:'rare',tags:['贝利亚','怪兽'],text:'所有友方【怪兽】+1/+1。若你的英雄生命不高于15，再+1攻击。',effects:[{op:'buffAllTag',tag:'怪兽',atk:1,hp:1},{op:'conditional',condition:{type:'heroHpAtMost',n:15},then:[{op:'buffAllTag',tag:'怪兽',atk:1,hp:0}]}]},
  darkShock:{id:'darkShock',name:'黑暗震击',cost:1,type:'skill',faction:'belial',rarity:'common',tags:['贝利亚','黑暗'],text:'对一个目标造成2点伤害，你受到1点伤害。',target:'anyEnemy',effects:[{op:'damageTarget',n:2},{op:'damageOwnHero',n:1}]},
  battlenizerSweep:{id:'battlenizerSweep',name:'战斗仪横扫',cost:3,type:'skill',faction:'belial',rarity:'rare',tags:['贝利亚','格斗','战斗仪'],text:'对一个敌方单位造成3点伤害；若本回合英雄受过伤，造成5点。',target:'enemyUnit',effects:[{op:'conditional',condition:{type:'heroDamagedThisTurn'},then:[{op:'damageTarget',n:5}],else:[{op:'damageTarget',n:3}]}]},
  kaiserBelial:{id:'kaiserBelial',name:'凯撒贝利亚',cost:6,type:'unit',atk:7,hp:6,faction:'belial',rarity:'epic',tags:['贝利亚','黑暗','奥特战士'],text:'登场：你受到2点伤害。若你的生命不高于15，获得【护盾】。',battlecry:[{op:'damageOwnHero',n:2},{op:'conditional',condition:{type:'heroHpAtMost',n:15},then:[{op:'grantSelfShield'}]}]},
  arcBelial:{id:'arcBelial',name:'电弧贝利亚',cost:9,type:'unit',atk:10,hp:10,faction:'belial',rarity:'legendary',tags:['贝利亚','黑暗','奥特战士'],text:'登场：对所有其他单位造成3点伤害，你受到4点伤害。',battlecry:[{op:'damageAllOtherUnits',n:3},{op:'damageOwnHero',n:4}]},
  bloodForPower:{id:'bloodForPower',name:'以伤换力',cost:0,type:'skill',faction:'belial',rarity:'rare',tags:['贝利亚','黑暗'],text:'你的英雄受到2点伤害；下一张单位牌费用-2。',effects:[{op:'damageOwnHero',n:2},{op:'reduceNextUnit',n:2}]},
  darkPrison:{id:'darkPrison',name:'黑暗禁锢',cost:3,type:'skill',faction:'belial',rarity:'rare',tags:['贝利亚','黑暗'],text:'使一个敌方单位下回合无法攻击，并使其-2攻击。',target:'enemyUnit',effects:[{op:'stunTarget',turns:1},{op:'buffTarget',atk:-2,hp:0}]},
  tyrantOrder:{id:'tyrantOrder',name:'暴君命令',cost:2,type:'skill',faction:'belial',rarity:'epic',tags:['贝利亚','黑暗'],text:'消灭一个友方单位。使一个随机友方单位+3/+3。',target:'friendlyUnit',effects:[{op:'destroyTarget'},{op:'buffRandomFriendly',atk:3,hp:3}]},
  monsterGrave:{id:'monsterGrave',name:'怪兽墓场',cost:4,type:'event',faction:'belial',rarity:'epic',tags:['贝利亚','事件','怪兽'],text:'持续3回合：每当回合结束，若你控制怪兽，使一个随机友方怪兽+1/+1。',duration:3,eventEffect:{endBuffRandomTag:'怪兽',endBuffAtk:1,endBuffHp:1}},
  imperialMarch:{id:'imperialMarch',name:'银河帝国行军',cost:3,type:'event',faction:'belial',rarity:'rare',tags:['贝利亚','事件','帝国军'],text:'持续3回合：你召唤的【帝国军】单位+1/+1。',duration:3,eventEffect:{summonTag:'帝国军',summonTagAtk:1,summonTagHp:1}},
  darknessReturn:{id:'darknessReturn',name:'黑暗归来',cost:4,type:'skill',faction:'belial',rarity:'rare',tags:['贝利亚','黑暗','复生'],text:'复活本局最近死亡的一个友方【黑暗】单位，使其只保留1点生命。',effects:[{op:'resurrectLastTag',tag:'黑暗',setHp:1}]},
  emperorPressure:{id:'emperorPressure',name:'皇帝威压',cost:5,type:'skill',faction:'belial',rarity:'epic',tags:['贝利亚','黑暗'],text:'对所有敌方单位造成2点伤害。若你的生命不高于15，再对敌方英雄造成3点伤害。',effects:[{op:'damageAllEnemyUnits',n:2},{op:'conditional',condition:{type:'heroHpAtMost',n:15},then:[{op:'damageEnemyHero',n:3}]}]},
  absoluteViolence:{id:'absoluteViolence',name:'绝对暴力',cost:4,type:'skill',faction:'belial',rarity:'rare',tags:['贝利亚','格斗'],text:'本回合英雄获得6点攻击。攻击结束后你受到2点伤害。',effects:[{op:'heroAttackThisTurn',atk:6},{op:'setHeroAttackSelfDamage',n:2}]},
  darkReversal:{id:'darkReversal',name:'黑暗逆转',cost:3,type:'skill',faction:'belial',rarity:'epic',tags:['贝利亚','黑暗'],text:'若你的生命少于敌方英雄：恢复3点生命并抽2张牌；否则对敌方英雄造成3点伤害。',effects:[{op:'conditional',condition:{type:'hpLowerThanEnemy'},then:[{op:'healHero',n:3},{op:'draw',n:2}],else:[{op:'damageEnemyHero',n:3}]}]},

  // ============================================================
  // 奈克瑟斯专属：生命交换 / 形态进化 / 夜袭队
  // ============================================================
  nexusLifeConversion:{id:'nexusLifeConversion',name:'生命转换',cost:0,type:'skill',faction:'nexus',rarity:'common',tags:['奈克瑟斯','生命交换'],text:'你的英雄受到2点伤害，抽1张牌，并使下一张技能牌费用-1。',effects:[{op:'damageOwnHero',n:2},{op:'draw',n:1},{op:'reduceNextSkill',n:1}]},
  particleFeather:{id:'particleFeather',name:'粒子之羽',cost:1,type:'skill',faction:'nexus',rarity:'common',tags:['奈克瑟斯','光线'],text:'对一个敌方目标造成2点伤害。',target:'anyEnemy',effects:[{op:'damageTarget',n:2}]},
  nexusCircleShield:{id:'nexusCircleShield',name:'圆形护盾',cost:2,type:'skill',faction:'nexus',rarity:'rare',tags:['奈克瑟斯','防御'],text:'使一个友方单位获得【护盾】。若你的生命不高于15，再抽1张牌。',target:'friendlyUnit',effects:[{op:'grantTargetShield'},{op:'conditional',condition:{type:'heroHpAtMost',n:15},then:[{op:'draw',n:1}]}]},
  crossRaySchrom:{id:'crossRaySchrom',name:'十字风暴',cost:4,type:'skill',faction:'nexus',rarity:'rare',tags:['奈克瑟斯','光线'],text:'对一个目标造成4点伤害。若你的生命不高于15，再造成2点伤害。',target:'anyEnemy',effects:[{op:'damageTarget',n:4},{op:'conditional',condition:{type:'heroHpAtMost',n:15},then:[{op:'damageTarget',n:2}]}]},
  overRaySchrom:{id:'overRaySchrom',name:'终极光箭风暴',cost:7,type:'skill',faction:'nexus',rarity:'epic',tags:['奈克瑟斯','光线','必杀'],text:'对一个目标造成8点伤害，然后你的英雄受到2点伤害。',target:'anyEnemy',effects:[{op:'damageTarget',n:8},{op:'damageOwnHero',n:2}]},
  nexusHurricane:{id:'nexusHurricane',name:'奈克瑟斯飓风',cost:3,type:'skill',faction:'nexus',rarity:'rare',tags:['奈克瑟斯','格斗'],text:'对一个敌方单位造成3点伤害，并使其下回合无法攻击。',target:'enemyUnit',effects:[{op:'damageTarget',n:3},{op:'stunTarget',turns:1}]},
  junisShift:{id:'junisShift',name:'适能进化·青年形态',cost:2,type:'skill',faction:'nexus',rarity:'rare',tags:['奈克瑟斯','形态'],text:'切换为青年形态，本回合获得2点攻击。',effects:[{op:'changeForm',form:'junis'},{op:'heroAttackThisTurn',atk:2}]},
  junisBlueShift:{id:'junisBlueShift',name:'适能进化·蓝色青年',cost:2,type:'skill',faction:'nexus',rarity:'epic',tags:['奈克瑟斯','形态'],text:'切换为蓝色青年形态，并抽1张牌。',effects:[{op:'changeForm',form:'junisBlue'},{op:'draw',n:1}]},
  anphansReturn:{id:'anphansReturn',name:'回归幼年形态',cost:1,type:'skill',faction:'nexus',rarity:'common',tags:['奈克瑟斯','形态'],text:'切换为幼年形态，并恢复2点生命。',effects:[{op:'changeForm',form:'anphans'},{op:'healHero',n:2}]},
  bondOfLight:{id:'bondOfLight',name:'光之纽带',cost:2,type:'skill',faction:'nexus',rarity:'epic',tags:['奈克瑟斯','羁绊','光'],text:'恢复4点生命。若你的生命不高于10，再抽2张牌。',effects:[{op:'healHero',n:4},{op:'conditional',condition:{type:'heroHpAtMost',n:10},then:[{op:'draw',n:2}]}]},
  metaField:{id:'metaField',name:'美塔领域',cost:4,type:'event',faction:'nexus',rarity:'epic',tags:['奈克瑟斯','事件','领域'],text:'持续3回合：你每回合第一张技能费用-1；回合结束恢复1点生命。',duration:3,eventEffect:{firstSkillDiscount:1,endHeal:1}},
  evolutionTruster:{id:'evolutionTruster',name:'进化信赖者',cost:2,type:'equipment',faction:'nexus',rarity:'legendary',tags:['奈克瑟斯','装备','装置','形态'],text:'装备时从牌库抽一张【形态】牌。【装置】耐久4；你的【形态】牌费用-1。',effects:[{op:'drawByTagOrDraw',tag:'形态',type:'skill',noFallback:true}],equipment:{slot:'device',durability:4,tagDiscount:'形态',tagDiscountAmount:1,consumeOnTurnStart:1}},
  armedNexus:{id:'armedNexus',name:'武装奈克瑟斯',cost:3,type:'equipment',faction:'nexus',rarity:'rare',tags:['奈克瑟斯','装备','武器'],text:'【武器】攻击+2，耐久3。英雄攻击后恢复1点生命。',equipment:{slot:'weapon',durability:3,attack:2,onHeroAttack:[{op:'healHero',n:1}]}},
  komon:{id:'komon',name:'孤门一辉',cost:2,type:'unit',atk:2,hp:3,faction:'nexus',rarity:'common',tags:['人类','夜袭队','羁绊'],text:'登场：恢复1点生命；若你的生命不高于15，再抽1张牌。',battlecry:[{op:'healHero',n:1},{op:'conditional',condition:{type:'heroHpAtMost',n:15},then:[{op:'draw',n:1}]}]},
  nagi:{id:'nagi',name:'西条凪',cost:3,type:'unit',atk:3,hp:3,faction:'nexus',rarity:'rare',tags:['人类','夜袭队'],text:'登场：从牌库抽一张【技能】牌。',battlecry:[{op:'drawByType',type:'skill',n:1}]},
  wakura:{id:'wakura',name:'和仓英辅',cost:4,type:'unit',atk:3,hp:5,faction:'nexus',rarity:'rare',tags:['人类','夜袭队','指挥'],text:'登场：其他【夜袭队】单位+1/+1。',battlecry:[{op:'buffAllTag',tag:'夜袭队',atk:1,hp:1,excludeSource:true}]},
  chromeChester:{id:'chromeChester',name:'铬金切斯特',cost:4,type:'unit',atk:4,hp:3,faction:'nexus',rarity:'rare',tags:['夜袭队','防卫队','机械','飞行'],keywords:['rush'],text:'【突进】；登场：随机对一个敌方单位造成1点伤害。',battlecry:[{op:'randomEnemyUnitDamage',n:1,times:1}]},
  nightRaiderFormation:{id:'nightRaiderFormation',name:'夜袭队协同阵型',cost:3,type:'event',faction:'nexus',rarity:'rare',tags:['夜袭队','事件'],text:'持续3回合：你召唤的【夜袭队】单位+1攻击。',duration:3,eventEffect:{summonTag:'夜袭队',summonTagAtk:1}},
  lightRelay:{id:'lightRelay',name:'继承者的光',cost:3,type:'skill',faction:'nexus',rarity:'rare',tags:['奈克瑟斯','羁绊'],text:'你的英雄受到3点伤害；随机将一张奈克瑟斯技能牌加入手牌，并使其费用-1。',effects:[{op:'damageOwnHero',n:3},{op:'addRandomCardByTag',tag:'奈克瑟斯',type:'skill',discount:1}]},
  noaAwakening:{id:'noaAwakening',name:'诺亚觉醒',cost:8,type:'skill',faction:'nexus',rarity:'legendary',tags:['奈克瑟斯','光','必杀','形态'],text:'若你的生命不高于8：切换为诺亚形态，恢复10点生命并抽2张牌；否则仅恢复3点生命。',effects:[{op:'conditional',condition:{type:'heroHpAtMost',n:8},then:[{op:'changeForm',form:'noa'},{op:'healHero',n:10},{op:'draw',n:2}],else:[{op:'healHero',n:3}]}]},

  // ============================================================
  // 雷欧专属：英雄格斗 / 连段 / 受击反打
  // ============================================================
  leoStraight:{id:'leoStraight',name:'雷欧拳',cost:1,type:'skill',faction:'leo',rarity:'common',tags:['雷欧','格斗'],text:'本回合英雄获得2点攻击。',effects:[{op:'heroAttackThisTurn',atk:2}]},
  leoChop:{id:'leoChop',name:'雷欧手刀',cost:2,type:'skill',faction:'leo',rarity:'common',tags:['雷欧','格斗'],text:'对一个敌方单位造成3点伤害。若这是你本回合第2张或之后的【格斗】牌，再使其下回合无法攻击。',target:'enemyUnit',effects:[{op:'damageTarget',n:3},{op:'conditional',condition:{type:'playedTagAtLeast',tag:'格斗',n:2},then:[{op:'stunTarget',turns:1}]}]},
  leoKick:{id:'leoKick',name:'雷欧飞踢',cost:3,type:'skill',faction:'leo',rarity:'rare',tags:['雷欧','格斗','必杀'],text:'对一个目标造成4点伤害。若这是你本回合第2张或之后的【格斗】牌，再造成2点伤害。',target:'anyEnemy',effects:[{op:'damageTarget',n:4},{op:'conditional',condition:{type:'playedTagAtLeast',tag:'格斗',n:2},then:[{op:'damageTarget',n:2}]}]},
  leoFlyingKick:{id:'leoFlyingKick',name:'雷欧双重飞踢',cost:6,type:'skill',faction:'leo',rarity:'epic',tags:['雷欧','格斗','必杀'],text:'对一个目标造成6点伤害。若英雄本回合已经攻击过，再造成2点伤害。',target:'anyEnemy',effects:[{op:'damageTarget',n:6},{op:'conditional',condition:{type:'heroAttackedThisTurn'},then:[{op:'damageTarget',n:2}]}]},
  leoDoubleStrike:{id:'leoDoubleStrike',name:'二段连击',cost:2,type:'skill',faction:'leo',rarity:'rare',tags:['雷欧','格斗','连击'],text:'若英雄本回合已经攻击过：重置英雄攻击并额外获得2点攻击；否则本回合获得3点攻击。',effects:[{op:'conditional',condition:{type:'heroAttackedThisTurn'},then:[{op:'refreshHeroAttack'},{op:'heroAttackAddThisTurn',atk:2}],else:[{op:'heroAttackThisTurn',atk:3}]}]},
  leoGuardBreak:{id:'leoGuardBreak',name:'破防重击',cost:2,type:'skill',faction:'leo',rarity:'rare',tags:['雷欧','格斗'],text:'移除一个敌方单位的【护盾】，并对其造成2点伤害。',target:'enemyUnit',effects:[{op:'removeTargetShield'},{op:'damageTarget',n:2}]},
  leoCounter:{id:'leoCounter',name:'受身反击',cost:2,type:'skill',faction:'leo',rarity:'rare',tags:['雷欧','格斗','反击'],text:'本回合英雄获得2点攻击；若本回合英雄受过伤，改为4点。',effects:[{op:'conditional',condition:{type:'heroDamagedThisTurn'},then:[{op:'heroAttackThisTurn',atk:4}],else:[{op:'heroAttackThisTurn',atk:2}]}]},
  leoEnergyBall:{id:'leoEnergyBall',name:'能量光球',cost:3,type:'skill',faction:'leo',rarity:'common',tags:['雷欧','光线','格斗'],text:'对一个目标造成3点伤害。若这是你本回合第2张或之后的【格斗】牌，抽1张牌。',target:'anyEnemy',effects:[{op:'damageTarget',n:3},{op:'conditional',condition:{type:'playedTagAtLeast',tag:'格斗',n:2},then:[{op:'draw',n:1}]}]},
  leoNunchaku:{id:'leoNunchaku',name:'雷欧双截棍',cost:3,type:'equipment',faction:'leo',rarity:'epic',tags:['雷欧','装备','武器','格斗'],text:'【武器】攻击+2，耐久3。英雄攻击后对敌方英雄造成1点伤害。',equipment:{slot:'weapon',durability:3,attack:2,onHeroAttack:[{op:'damageEnemyHero',n:1}]}},
  leoMantle:{id:'leoMantle',name:'奥特披风·雷欧',cost:4,type:'equipment',faction:'leo',rarity:'epic',tags:['雷欧','装备','装甲'],text:'【装甲】每次英雄受到伤害时减少2点，耐久3；耗尽时恢复2点生命。',equipment:{slot:'armor',durability:3,damageReduction:2,onBreak:[{op:'healHero',n:2}]}},
  sevenTraining:{id:'sevenTraining',name:'赛文的严苛特训',cost:3,type:'event',faction:'leo',rarity:'epic',tags:['雷欧','事件','特训','格斗'],text:'持续3回合：你的【格斗】牌费用-1。',duration:3,eventEffect:{tagDiscount:'格斗',tagDiscountAmount:1}},
  astra:{id:'astra',name:'阿斯特拉',cost:5,type:'unit',atk:5,hp:5,faction:'leo',rarity:'legendary',tags:['奥特战士','雷欧','格斗'],text:'登场：若你本回合已经使用至少2张【格斗】牌，获得【护盾】。',battlecry:[{op:'conditional',condition:{type:'playedTagAtLeast',tag:'格斗',n:2},then:[{op:'grantSelfShield'}]}]},
  genOhtori:{id:'genOhtori',name:'凤源',cost:2,type:'unit',atk:2,hp:3,faction:'leo',rarity:'common',tags:['人类','MAC','格斗'],text:'登场：使下一张技能牌费用-1。',battlecry:[{op:'reduceNextSkill',n:1}]},
  danTraining:{id:'danTraining',name:'诸星团的指导',cost:3,type:'unit',atk:2,hp:4,faction:'leo',rarity:'rare',tags:['人类','MAC','教官'],text:'登场：从牌库抽一张【格斗】牌。',battlecry:[{op:'drawByTag',tag:'格斗',n:1}]},
  macFighter:{id:'macFighter',name:'MAC战斗机',cost:3,type:'unit',atk:3,hp:2,faction:'leo',rarity:'common',tags:['MAC','防卫队','机械','飞行'],keywords:['rush'],text:'【突进】。'},
  macCommander:{id:'macCommander',name:'MAC战术队长',cost:4,type:'unit',atk:3,hp:5,faction:'leo',rarity:'rare',tags:['MAC','防卫队','指挥'],text:'登场：其他【MAC】单位+1/+1。',battlecry:[{op:'buffAllTag',tag:'MAC',atk:1,hp:1,excludeSource:true}]},
  kingGuidance:{id:'kingGuidance',name:'奥特之王的指引',cost:5,type:'event',faction:'leo',rarity:'legendary',tags:['雷欧','事件','光'],text:'持续2回合：每回合第一张技能费用-1；回合结束恢复2点生命。',duration:2,eventEffect:{firstSkillDiscount:1,endHeal:2}},
  fightingDiscipline:{id:'fightingDiscipline',name:'格斗修炼',cost:3,type:'skill',faction:'leo',rarity:'common',tags:['雷欧','格斗','特训'],text:'抽2张牌，并使下一张技能牌费用-1。',effects:[{op:'draw',n:2},{op:'reduceNextSkill',n:1}]},
  burningCharge:{id:'burningCharge',name:'燃烧冲锋',cost:4,type:'skill',faction:'leo',rarity:'rare',tags:['雷欧','格斗'],text:'本回合英雄获得5点攻击，然后你的英雄受到1点伤害。',effects:[{op:'heroAttackThisTurn',atk:5},{op:'damageOwnHero',n:1}]},
  leoFinalCombo:{id:'leoFinalCombo',name:'雷欧终极连段',cost:7,type:'skill',faction:'leo',rarity:'legendary',tags:['雷欧','格斗','必杀','连击'],text:'对一个目标造成5点伤害。若这是你本回合第3张或之后的【格斗】牌，再造成5点伤害。',target:'anyEnemy',effects:[{op:'damageTarget',n:5},{op:'conditional',condition:{type:'playedTagAtLeast',tag:'格斗',n:3},then:[{op:'damageTarget',n:5}]}]},

  // ============================================================
  // 托雷基亚专属：隐藏陷阱 / 欺骗 / 混沌
  // ============================================================
  falseOpening:{id:'falseOpening',name:'虚假的破绽',cost:1,type:'trap',faction:'tregear',rarity:'common',tags:['托雷基亚','陷阱','欺骗'],text:'【陷阱】敌方攻击你的英雄时：取消这次攻击，并对敌方英雄造成1点伤害。',trap:{trigger:'enemyAttackHero',effects:[{op:'cancelTriggeredAttack'},{op:'damageEnemyHero',n:1}]}},
  chaosPit:{id:'chaosPit',name:'混沌陷坑',cost:2,type:'trap',faction:'tregear',rarity:'common',tags:['托雷基亚','陷阱','混沌'],text:'【陷阱】敌方召唤单位后：对其造成2点伤害，并使其-2攻击。',trap:{trigger:'enemySummon',effects:[{op:'damageSource',n:2},{op:'reduceSourceAttack',n:2}]}},
  twistedReturn:{id:'twistedReturn',name:'错误的出口',cost:3,type:'trap',faction:'tregear',rarity:'epic',tags:['托雷基亚','陷阱','四次元'],text:'【陷阱】敌方召唤费用不低于5的单位后：将其返回手牌，并使其费用+2。',trap:{trigger:'enemySummon',condition:{type:'sourceCostAtLeast',n:5},effects:[{op:'returnSourceEnemyHand',costPlus:2}]}},
  laughingShadow:{id:'laughingShadow',name:'阴影中的笑声',cost:2,type:'trap',faction:'tregear',rarity:'rare',tags:['托雷基亚','陷阱','欺骗'],text:'【陷阱】敌方使用技能后：对敌方英雄造成2点伤害并抽1张牌。',trap:{trigger:'enemySkill',effects:[{op:'damageEnemyHero',n:2},{op:'draw',n:1}]}},
  grimdoWhisper:{id:'grimdoWhisper',name:'格里姆德的低语',cost:2,type:'trap',faction:'tregear',rarity:'rare',tags:['托雷基亚','陷阱','混沌'],text:'【陷阱】敌方使用英雄能力后：对敌方英雄造成3点伤害。',trap:{trigger:'enemyHeroPower',effects:[{op:'damageEnemyHero',n:3}]}},
  blackMirror:{id:'blackMirror',name:'黑暗镜像',cost:3,type:'trap',faction:'tregear',rarity:'epic',tags:['托雷基亚','陷阱','复制'],text:'【陷阱】敌方使用技能后：将一张该技能的复制加入你的手牌，费用-1。',trap:{trigger:'enemySkill',effects:[{op:'copyTriggerCardToHand',discount:1}]}},
  phantomWall:{id:'phantomWall',name:'幻影障壁',cost:2,type:'trap',faction:'tregear',rarity:'rare',tags:['托雷基亚','陷阱','防御'],text:'【陷阱】敌方攻击你的单位时：取消这次攻击。',trap:{trigger:'enemyAttackUnit',effects:[{op:'cancelTriggeredAttack'}]}},
  energyTheft:{id:'energyTheft',name:'偷走的回合',cost:1,type:'trap',faction:'tregear',rarity:'rare',tags:['托雷基亚','陷阱','能量'],text:'【陷阱】敌方结束回合时：你下个回合额外获得2点临时能量。',trap:{trigger:'enemyEndTurn',effects:[{op:'gainNextTurnEnergy',n:2}]}},
  mockingGift:{id:'mockingGift',name:'嘲弄的礼物',cost:2,type:'trap',faction:'tregear',rarity:'rare',tags:['托雷基亚','陷阱','欺骗'],text:'【陷阱】敌方召唤攻击力不低于5的单位后：抽2张牌。',trap:{trigger:'enemySummon',condition:{type:'sourceAtkAtLeast',n:5},effects:[{op:'draw',n:2}]}},
  chaosSeal:{id:'chaosSeal',name:'混沌封印',cost:3,type:'trap',faction:'tregear',rarity:'epic',tags:['托雷基亚','陷阱','控制'],text:'【陷阱】敌方召唤生命值不低于6的单位后：使其下回合无法攻击，并使其-1/-1。',trap:{trigger:'enemySummon',condition:{type:'sourceHpAtLeast',n:6},effects:[{op:'stunSource',turns:1},{op:'reduceSourceStats',atk:1,hp:1}]}},
  tregearEye:{id:'tregearEye',name:'托雷基亚之眼',cost:3,type:'equipment',faction:'tregear',rarity:'legendary',tags:['托雷基亚','装备','装置','陷阱'],text:'【装置】耐久3。你的【陷阱】牌费用-1；每个你的回合开始时随机获得一张陷阱，然后消耗1点耐久。',equipment:{slot:'device',durability:3,tagDiscount:'陷阱',tagDiscountAmount:1,turnStart:[{op:'addRandomCardByTag',tag:'陷阱',type:'trap'}],consumeOnTurnStart:1}},
  kirisaki:{id:'kirisaki',name:'雾崎',cost:2,type:'unit',atk:2,hp:3,faction:'tregear',rarity:'rare',tags:['人类','托雷基亚','欺骗'],text:'登场：随机将一张【陷阱】牌加入手牌。',battlecry:[{op:'addRandomCardByTag',tag:'陷阱',type:'trap'}]},
  grimdo:{id:'grimdo',name:'邪神魔兽 格里姆德',cost:9,type:'unit',atk:9,hp:10,faction:'tregear',rarity:'legendary',tags:['怪兽','混沌','邪神'],text:'登场：若本局你已经发动至少2张陷阱，自身+2/+2并获得【护盾】。',battlecry:[{op:'conditional',condition:{type:'trapsTriggeredAtLeast',n:2},then:[{op:'buffSelf',atk:2,hp:2},{op:'grantSelfShield'}]}]},
  chaosSeduction:{id:'chaosSeduction',name:'混沌诱导',cost:2,type:'skill',faction:'tregear',rarity:'common',tags:['托雷基亚','混沌','陷阱'],text:'随机将2张不同的【陷阱】牌加入手牌。',effects:[{op:'addRandomCardByTag',tag:'陷阱',type:'trap'},{op:'addRandomCardByTag',tag:'陷阱',type:'trap'}]},
  deceptiveSmile:{id:'deceptiveSmile',name:'从容的微笑',cost:2,type:'skill',faction:'tregear',rarity:'rare',tags:['托雷基亚','欺骗'],text:'从牌库抽一张【陷阱】牌，并使其费用-1。',effects:[{op:'drawByTagDiscount',tag:'陷阱',type:'trap',discount:1}]},
  tregearBeam:{id:'tregearBeam',name:'托雷拉光线',cost:4,type:'skill',faction:'tregear',rarity:'rare',tags:['托雷基亚','光线','混沌'],text:'对一个目标造成4点伤害。若本回合有陷阱发动，再造成2点伤害。',target:'anyEnemy',effects:[{op:'damageTarget',n:4},{op:'conditional',condition:{type:'trapTriggeredThisTurn'},then:[{op:'damageTarget',n:2}]}]},
  chaosDomain:{id:'chaosDomain',name:'混沌领域',cost:4,type:'event',faction:'tregear',rarity:'epic',tags:['托雷基亚','事件','混沌','陷阱'],text:'持续3回合：你的【陷阱】牌费用-1。',duration:3,eventEffect:{tagDiscount:'陷阱',tagDiscountAmount:1}},
  forbiddenKnowledge:{id:'forbiddenKnowledge',name:'禁忌知识',cost:3,type:'skill',faction:'tregear',rarity:'epic',tags:['托雷基亚','混沌'],text:'抽2张牌，并随机将一张【陷阱】加入手牌。',effects:[{op:'draw',n:2},{op:'addRandomCardByTag',tag:'陷阱',type:'trap'}]},
  recycleDeception:{id:'recycleDeception',name:'骗局回收',cost:1,type:'skill',faction:'tregear',rarity:'rare',tags:['托雷基亚','陷阱','欺骗'],text:'将你场上的一张随机陷阱返回手牌，并使其费用-1；若没有陷阱，则抽1张牌。',effects:[{op:'returnRandomTrapToHand',discount:1,fallbackDraw:1}]},
  chaosRelease:{id:'chaosRelease',name:'混沌解放',cost:6,type:'skill',faction:'tregear',rarity:'legendary',tags:['托雷基亚','混沌','必杀'],text:'对所有敌方单位造成2点伤害。若本局已发动至少2张陷阱，再对所有敌方单位和敌方英雄各造成2点伤害。',effects:[{op:'damageAllEnemyUnits',n:2},{op:'conditional',condition:{type:'trapsTriggeredAtLeast',n:2},then:[{op:'damageAllEnemyUnits',n:2},{op:'damageEnemyHero',n:2}]}]},

  // ============================================================
  // 五英雄补强批次（Prototype 0.11）——补职业短板而非单纯堆主题牌
  // ============================================================
  gutsShieldLeader:{id:'gutsShieldLeader',name:'GUTS防卫班长',cost:4,type:'unit',atk:3,hp:5,faction:'tiga',rarity:'rare',tags:['人类','GUTS','防卫队'],keywords:['guard'],text:'【守护】；登场：若你控制另一名【GUTS】单位，抽1张牌。',battlecry:[{op:'conditional',condition:{type:'controlTag',tag:'GUTS',excludeSource:true},then:[{op:'draw',n:1}]}]},
  adaptiveResponse:{id:'adaptiveResponse',name:'复合适应战术',cost:2,type:'skill',faction:'tiga',rarity:'epic',tags:['迪迦','变形','战术'],target:'enemyUnit',text:'根据当前形态：复合型造成2点伤害并抽1张；强力型造成4点；空中型使目标眩晕并抽1张。',effects:[{op:'conditional',condition:{type:'formIs',form:'power'},then:[{op:'damageTarget',n:4}],else:[{op:'conditional',condition:{type:'formIs',form:'sky'},then:[{op:'stunTarget',turns:1},{op:'draw',n:1}],else:[{op:'damageTarget',n:2},{op:'draw',n:1}]}]}]},
  gutsRecovery:{id:'gutsRecovery',name:'GUTS紧急回援',cost:2,type:'skill',faction:'tiga',rarity:'rare',tags:['GUTS','支援','墓地'],text:'将墓地中最后一张【GUTS】单位返回手牌，并使其费用-1。',effects:[{op:'recoverLastTagToHand',tag:'GUTS',type:'unit',discount:1}]},
  lightAcceleration:{id:'lightAcceleration',name:'形态加速',cost:2,type:'skill',faction:'tiga',rarity:'rare',tags:['迪迦','变形','能量'],text:'获得1点临时能量；若本回合已经切换过形态，再获得1点并抽1张牌。',effects:[{op:'gainEnergy',n:1},{op:'conditional',condition:{type:'formChangedThisTurn'},then:[{op:'gainEnergy',n:1},{op:'draw',n:1}]}]},

  darkGuardBeast:{id:'darkGuardBeast',name:'帝国黑暗护卫兽',cost:3,type:'unit',atk:3,hp:5,faction:'belial',rarity:'common',tags:['怪兽','黑暗','帝国军'],keywords:['guard'],text:'【守护】；登场：你的英雄受到1点伤害。',battlecry:[{op:'damageOwnHero',n:1}]},
  predatoryDrain:{id:'predatoryDrain',name:'黑暗掠夺',cost:3,type:'skill',faction:'belial',rarity:'rare',tags:['贝利亚','黑暗','吸收'],target:'enemyUnit',text:'对一个敌方单位造成3点伤害，并为你的英雄恢复3点生命。',effects:[{op:'damageTarget',n:3},{op:'healHero',n:3}]},
  scarPower:{id:'scarPower',name:'伤痕即力量',cost:2,type:'skill',faction:'belial',rarity:'rare',tags:['贝利亚','黑暗','自伤'],text:'若本回合你的英雄受过伤，抽2张牌；否则抽1张并使你的英雄受到1点伤害。',effects:[{op:'conditional',condition:{type:'heroDamagedThisTurn'},then:[{op:'draw',n:2}],else:[{op:'draw',n:1},{op:'damageOwnHero',n:1}]}]},
  monsterRecall:{id:'monsterRecall',name:'战斗仪·怪兽召回',cost:3,type:'skill',faction:'belial',rarity:'epic',tags:['贝利亚','怪兽','墓地'],text:'将墓地中最后一张【怪兽】单位返回手牌，并使其费用-1。',effects:[{op:'recoverLastTagToHand',tag:'怪兽',type:'unit',discount:1}]},

  nightRaiderShield:{id:'nightRaiderShield',name:'夜袭队防御阵地',cost:3,type:'unit',atk:2,hp:5,faction:'nexus',rarity:'common',tags:['人类','夜袭队','防卫队'],keywords:['guard'],text:'【守护】；登场：若你的生命不高于15，恢复2点生命。',battlecry:[{op:'conditional',condition:{type:'heroHpAtMost',n:15},then:[{op:'healHero',n:2}]}]},
  adaptationSurge:{id:'adaptationSurge',name:'适能者脉冲',cost:1,type:'skill',faction:'nexus',rarity:'rare',tags:['奈克瑟斯','生命交换','能量'],text:'你的英雄受到1点伤害；使下一张技能牌费用-2。',effects:[{op:'damageOwnHero',n:1},{op:'reduceNextSkill',n:2}]},
  bondRecovery:{id:'bondRecovery',name:'羁绊回响',cost:3,type:'skill',faction:'nexus',rarity:'rare',tags:['奈克瑟斯','光','支援'],text:'恢复3点生命；若你的生命不高于12，改为恢复6点并抽1张牌。',effects:[{op:'conditional',condition:{type:'heroHpAtMost',n:12},then:[{op:'healHero',n:6},{op:'draw',n:1}],else:[{op:'healHero',n:3}]}]},
  desperateEvolution:{id:'desperateEvolution',name:'逆境适能',cost:2,type:'skill',faction:'nexus',rarity:'epic',tags:['奈克瑟斯','适能','检索'],text:'若你的生命低于敌方，抽2张牌并使下一张技能费用-1；否则抽1张牌。',effects:[{op:'conditional',condition:{type:'hpLowerThanEnemy'},then:[{op:'draw',n:2},{op:'reduceNextSkill',n:1}],else:[{op:'draw',n:1}]}]},

  macShieldVehicle:{id:'macShieldVehicle',name:'MAC防御装甲车',cost:3,type:'unit',atk:2,hp:5,faction:'leo',rarity:'common',tags:['MAC','防卫队','机械'],keywords:['guard'],text:'【守护】。为雷欧争取展开格斗连段的时间。'},
  continuousFootwork:{id:'continuousFootwork',name:'连续步法',cost:1,type:'skill',faction:'leo',rarity:'common',tags:['雷欧','格斗','连击'],text:'从牌库抽一张【格斗】牌，并使其费用-1。',effects:[{op:'drawByTagDiscount',tag:'格斗',type:'skill',discount:1}]},
  ironBody:{id:'ironBody',name:'锻炼出的钢铁之躯',cost:2,type:'skill',faction:'leo',rarity:'rare',tags:['雷欧','格斗','防御'],text:'恢复3点生命；若本回合英雄受过伤，本回合再获得3点攻击。',effects:[{op:'healHero',n:3},{op:'conditional',condition:{type:'heroDamagedThisTurn'},then:[{op:'heroAttackThisTurn',atk:3}]}]},
  lionRoar:{id:'lionRoar',name:'雷欧震喝',cost:4,type:'skill',faction:'leo',rarity:'epic',tags:['雷欧','格斗','破防'],target:'enemyUnit',text:'沉默一个敌方单位，然后对其造成3点伤害。',effects:[{op:'silenceTarget'},{op:'damageTarget',n:3}]},

  chaosPhantom:{id:'chaosPhantom',name:'混沌幻影',cost:3,type:'unit',atk:2,hp:5,faction:'tregear',rarity:'common',tags:['托雷基亚','混沌','幻影'],keywords:['guard'],text:'【守护】。并非真正的墙，只是足够逼真的诱饵。'},
  tregearSlash:{id:'tregearSlash',name:'托雷基亚斩击',cost:2,type:'skill',faction:'tregear',rarity:'common',tags:['托雷基亚','格斗','混沌'],target:'enemyUnit',text:'对一个敌方单位造成3点伤害。若你场上至少有1张陷阱，再抽1张牌。',effects:[{op:'damageTarget',n:3},{op:'conditional',condition:{type:'trapsArmedAtLeast',n:1},then:[{op:'draw',n:1}]}]},
  falsePeace:{id:'falsePeace',name:'虚假的和平使者',cost:3,type:'unit',atk:3,hp:4,faction:'tregear',rarity:'rare',tags:['宇宙人','托雷基亚','欺骗'],text:'登场：随机使敌方一张手牌费用+1。',battlecry:[{op:'increaseRandomEnemyHandCost',n:1}]},
  grimdoFragment:{id:'grimdoFragment',name:'格里姆德碎片',cost:3,type:'equipment',faction:'tregear',rarity:'epic',tags:['托雷基亚','装备','装甲','混沌'],text:'【装甲】耐久2。每次英雄受到伤害时减少1点；破坏时随机将一张陷阱加入手牌。',equipment:{slot:'armor',durability:2,damageReduction:1,onBreak:[{op:'addRandomCardByTag',tag:'陷阱',type:'trap'}]}},


};

// 希卡利：科研与装备研发。收藏牌之外的项目由英雄技能立项。
Object.assign(UCR.CARDS, {
  scienceAide:{id:'scienceAide',name:'科技局研究员',cost:1,type:'unit',atk:1,hp:3,faction:'hikari',rarity:'common',tags:['希卡利','科研','研究员'],text:'稳定的低费研究单位。'},
  shieldDrone:{id:'shieldDrone',name:'防护试验无人机',cost:2,type:'unit',atk:1,hp:2,faction:'hikari',rarity:'common',tags:['希卡利','科研','机械'],keywords:['guard','shield'],text:'【守护】【护盾】。'},
  labGuard:{id:'labGuard',name:'实验室护卫',cost:3,type:'unit',atk:2,hp:4,faction:'hikari',rarity:'common',tags:['希卡利','科研','研究员'],keywords:['guard'],text:'【守护】。登场：恢复英雄1点生命。',battlecry:[{op:'healHero',n:1}]},
  sampleScan:{id:'sampleScan',name:'样本分析',cost:1,type:'skill',faction:'hikari',rarity:'common',tags:['希卡利','科研'],text:'抽1张牌。',effects:[{op:'draw',n:1}]},
  containmentBeam:{id:'containmentBeam',name:'约束光束',cost:2,type:'skill',faction:'hikari',rarity:'rare',tags:['希卡利','科研','光线'],target:'enemyUnit',text:'对一个敌方单位造成3点伤害，恢复英雄1点生命。',effects:[{op:'damageTarget',n:3},{op:'healHero',n:1}]},
  prototypeSupply:{id:'prototypeSupply',name:'应急防护方案',cost:2,type:'skill',faction:'hikari',rarity:'rare',tags:['希卡利','科研'],text:'召唤一个0/3【守护】战术诱饵；将防护项目加入手牌。',effects:[{op:'summonCard',id:'decoyToken'},{op:'addCard',id:'hikariDefense1'}]},
  researchRelay:{id:'researchRelay',name:'课题协作员',cost:3,type:'unit',atk:3,hp:3,faction:'hikari',rarity:'rare',tags:['希卡利','科研','研究员'],text:'登场：额外获得1点研究点。',battlecry:[{op:'gainResearch',n:1}]},
  calibration:{id:'calibration',name:'稳定性校准',cost:2,type:'skill',faction:'hikari',rarity:'rare',tags:['希卡利','科研'],target:'friendlyUnit',text:'使一个友方单位获得+1/+2与【护盾】。',effects:[{op:'buffTarget',atk:1,hp:2},{op:'grantTargetShield'}]},
  fieldRepair:{id:'fieldRepair',name:'战地修复',cost:2,type:'skill',faction:'hikari',rarity:'common',tags:['希卡利','科研','支援'],text:'恢复英雄3点生命，抽1张牌。',effects:[{op:'healHero',n:3},{op:'draw',n:1}]},
  knightBracelet:{id:'knightBracelet',name:'骑士气息',cost:3,type:'equipment',faction:'hikari',rarity:'epic',tags:['希卡利','科研','装备','武器'],text:'【武器】攻击+2，耐久3。装备时恢复英雄2点生命。',equipment:{slot:'weapon',durability:3,attack:2},effects:[{op:'healHero',n:2}]},
  energyConversion:{id:'energyConversion',name:'能量场整流',cost:3,type:'skill',faction:'hikari',rarity:'rare',tags:['希卡利','科研'],text:'对所有敌方单位造成2点伤害。',effects:[{op:'damageAllEnemyUnits',n:2}]},
  outcomeReview:{id:'outcomeReview',name:'实验复盘',cost:4,type:'skill',faction:'hikari',rarity:'rare',tags:['希卡利','科研'],text:'将墓地中最后一张【科研】单位返回手牌，费用-1；额外获得1点研究点。',effects:[{op:'recoverLastTagToHand',tag:'科研',type:'unit',discount:1},{op:'gainResearch',n:1}]},
  knightShot:{id:'knightShot',name:'骑士射线',cost:4,type:'skill',faction:'hikari',rarity:'epic',tags:['希卡利','科研','光线'],target:'anyEnemy',text:'对一个敌方目标造成5点伤害。若研究点至少3，改为7点。',effects:[{op:'conditional',condition:{type:'researchAtLeast',n:3},then:[{op:'damageTarget',n:7}],else:[{op:'damageTarget',n:5}]}]},
  techInstitute:{id:'techInstitute',name:'科技局支援队',cost:5,type:'unit',atk:4,hp:5,faction:'hikari',rarity:'epic',tags:['希卡利','科研','研究员'],keywords:['guard'],text:'【守护】。登场：恢复英雄2点生命。',battlecry:[{op:'healHero',n:2}]},
  researchDirector:{id:'researchDirector',name:'科研统筹·希卡利',cost:6,type:'unit',atk:4,hp:7,faction:'hikari',rarity:'legendary',tags:['希卡利','科研','研究员'],keywords:['guard','shield'],text:'【守护】【护盾】。登场：额外获得2点研究点，将武装项目加入手牌。',battlecry:[{op:'gainResearch',n:2},{op:'addCard',id:'hikariWeapon1'}]}
});
UCR.RESEARCH={cap:6,routes:[
  {id:'hikariDefense',name:'防护项目',tiers:[
    {text:'【装甲】减伤1，耐久2。',equipment:{slot:'armor',durability:2,damageReduction:1}},
    {text:'【装甲】减伤1，耐久3。破坏时恢复3点生命。',equipment:{slot:'armor',durability:3,damageReduction:1,onBreak:[{op:'healHero',n:3}]}},
    {text:'【装甲】减伤2，耐久3。破坏时恢复4点生命。',equipment:{slot:'armor',durability:3,damageReduction:2,onBreak:[{op:'healHero',n:4}]}}
  ]},
  {id:'hikariBio',name:'生体项目',tiers:[
    {text:'【装置】耐久2。回合开始：恢复1点生命，消耗1耐久。',equipment:{slot:'device',durability:2,turnStart:[{op:'healHero',n:1}],consumeOnTurnStart:1}},
    {text:'【装置】耐久2。回合开始：恢复1点生命，抽1张牌，消耗1耐久。',equipment:{slot:'device',durability:2,turnStart:[{op:'healHero',n:1},{op:'draw',n:1}],consumeOnTurnStart:1}},
    {text:'【装置】耐久2。回合开始：恢复2点生命，抽1张牌，消耗1耐久。',equipment:{slot:'device',durability:2,turnStart:[{op:'healHero',n:2},{op:'draw',n:1}],consumeOnTurnStart:1}}
  ]},
  {id:'hikariWeapon',name:'武装项目',tiers:[
    {text:'【武器】攻击+2，耐久2。',equipment:{slot:'weapon',durability:2,attack:2}},
    {text:'【武器】攻击+3，耐久3。',equipment:{slot:'weapon',durability:3,attack:3}},
    {text:'【武器】攻击+4，耐久2。每次英雄攻击后恢复1点生命。',equipment:{slot:'weapon',durability:2,attack:4,onHeroAttack:[{op:'healHero',n:1}]}}
  ]}
]};
for(const route of UCR.RESEARCH.routes)route.tiers.forEach((spec,i)=>{
  const id=route.id+(i+1);UCR.CARDS[id]={id,name:route.name+'·'+['I','II','III'][i],cost:2,type:'equipment',faction:'hikari',rarity:i===2?'legendary':'rare',tags:['希卡利','装备','研究项目'],collectible:false,blueprint:{route:route.id,tier:i+1},equipment:spec.equipment,text:spec.text+(i===0?' 制作：自动投入最多4研究点，每2点升级一级（最高III级）。':'')};
});

// 非收藏衍生牌 / 测试资源牌
Object.assign(UCR.CARDS, {
  baltanClone:{id:'baltanClone',name:'巴尔坦分身',cost:1,type:'unit',atk:1,hp:1,faction:'neutral',rarity:'common',tags:['宇宙人','衍生物'],collectible:false,text:'由巴尔坦星人制造的分身。'},
  lightSpark:{id:'lightSpark',name:'光之火花',cost:0,type:'skill',faction:'neutral',rarity:'common',tags:['能量','衍生物'],collectible:false,text:'本回合获得1点临时能量。',effects:[{op:'gainEnergy',n:1}]},
  decoyToken:{id:'decoyToken',name:'战术诱饵',cost:0,type:'unit',atk:0,hp:3,faction:'neutral',rarity:'common',tags:['衍生物','诱饵'],keywords:['guard'],collectible:false,text:'【守护】；用于吸引敌方火力。'}
});

UCR.HEROES = {
  tiga:{id:'tiga',name:'迪迦奥特曼',sigil:'U',hp:30,baseForm:'composite',description:'变形 / 适应 / GUTS协同 / 技能连携',forms:{
    composite:{name:'复合型',power:{cost:2,name:'手掌光箭',text:'对一个敌方目标造成1点伤害。',action:'damage',amount:1}},
    power:{name:'强力型',power:{cost:2,name:'强力格斗',text:'本回合获得2点攻击。',action:'attackBuff',amount:2}},
    sky:{name:'空中型',power:{cost:2,name:'高速机动',text:'抽1张牌，下一张技能费用-1。',action:'skyDraw',amount:1}},
    shining:{name:'闪耀形态',power:{cost:2,name:'闪耀冲击',text:'对一个敌方目标造成2点伤害。',action:'damage',amount:2}}
  }},
  belial:{id:'belial',name:'贝利亚',sigil:'B',hp:30,baseForm:'base',description:'自伤 / 黑暗军团 / 怪兽复生 / 高风险爆发',forms:{
    base:{name:'银河帝国形态',power:{cost:2,name:'黑暗脉冲',text:'对敌方英雄造成3点伤害，你受到1点伤害。',action:'belialPulse',amount:3}}
  }},
  nexus:{id:'nexus',name:'奈克瑟斯奥特曼',sigil:'N',hp:30,baseForm:'anphans',description:'生命交换 / 适能进化 / 夜袭队 / 残血爆发',forms:{
    anphans:{name:'幼年形态',power:{cost:1,name:'生命转换',text:'失去2点生命，抽1张牌。',action:'nexusExchange'}},
    junis:{name:'青年形态',power:{cost:1,name:'红色爆发',text:'失去2点生命，本回合获得3点攻击。',action:'nexusJunis'}},
    junisBlue:{name:'蓝色青年形态',power:{cost:1,name:'高速适能',text:'失去1点生命，抽1张牌并使下一张技能费用-1。',action:'nexusBlue'}},
    noa:{name:'诺亚形态',power:{cost:2,name:'诺亚闪电',text:'对一个敌方目标造成3点伤害。',action:'damage',amount:3}}
  }},
  leo:{id:'leo',name:'雷欧奥特曼',sigil:'L',hp:30,baseForm:'base',description:'英雄格斗 / 连续出拳 / 受击反打 / MAC协同',forms:{
    base:{name:'格斗形态',power:{cost:2,name:'格斗架势',text:'本回合获得2点攻击；若已使用过【格斗】牌，改为4点。',action:'leoCombat'}}
  }},
  hikari:{id:'hikari',name:'希卡利奥特曼',sigil:'H',hp:30,baseForm:'scientist',description:'科研 / 原型装备 / 防护修复 / 技术升级',passive:'每回合首张【科研】牌获得1研究点，上限6。',forms:{scientist:{name:'科技局形态',power:{cost:2,name:'课题立项',text:'选择防护、生体或武装项目加入手牌。',action:'hikariProject'}}}},
  tregear:{id:'tregear',name:'托雷基亚奥特曼',sigil:'T',hp:30,baseForm:'base',description:'隐藏陷阱 / 欺骗 / 条件反制 / 混沌操控',forms:{
    base:{name:'混沌形态',power:{cost:2,name:'诡计布置',text:'随机布置一张托雷基亚陷阱；若陷阱区已满，则加入手牌并费用-1。',action:'tregearTrap'}}
  }}
};

UCR.TEST_DECKS = {
  hikari:[
    'scienceAide','scienceAide','shieldDrone','shieldDrone','labGuard','labGuard','sampleScan','sampleScan',
    'containmentBeam','containmentBeam','prototypeSupply','prototypeSupply','researchRelay','researchRelay',
    'calibration','calibration','fieldRepair','fieldRepair','knightBracelet','energyConversion','outcomeReview',
    'knightShot','techInstitute','researchDirector','shieldSquad','shieldSquad','tacticalRecharge','tacticalRecharge','silenceShot','pigmon'
  ],
  tiga:[
    'palmArrow','palmArrow','typeMastery','typeMastery','powerType','skyType','compositeReturn','adaptiveResponse','lightAcceleration',
    'gutsWing','gutsWing','rena','horii','gutsShieldLeader','gutsShieldLeader','munakata','iruma','gutsWing2','gutsWing2','artdess',
    'barrierTiga','powerKnuckle','aerialFeint','gutsRecovery','sparkLens','lightFormation','finalZeperion','tacticalRecharge','runboldt','maxima'
  ],
  belial:[
    'darkShock','darkShock','ruthlessAdvance','sacrifice','sacrifice','darkEnergy','belialClaw','battlenizerSweep','bloodForPower',
    'darkGuardBeast','darkGuardBeast','darkLops','darkLops','imperializer','imperializer','darkgone','iaron','darkCommander','darkCyclopsZero','kaiserBelial',
    'predatoryDrain','predatoryDrain','scarPower','monsterRecall','monsterReanimation','gigaBattlenizer','reionicBattlenizer','descium','darkReversal','emperorPressure'
  ],
  nexus:[
    'nexusLifeConversion','nexusLifeConversion','particleFeather','particleFeather','adaptationSurge','junisShift','junisBlueShift','anphansReturn','nexusCircleShield',
    'crossRaySchrom','crossRaySchrom','nexusHurricane','bondOfLight','metaField','evolutionTruster','armedNexus','komon','komon','nagi','wakura',
    'chromeChester','nightRaiderShield','nightRaiderShield','nightRaiderFormation','bondRecovery','bondRecovery','desperateEvolution','lightRelay','overRaySchrom','noaAwakening'
  ],
  leo:[
    'leoStraight','leoStraight','leoChop','leoChop','leoKick','leoKick','continuousFootwork','continuousFootwork','leoDoubleStrike','leoGuardBreak',
    'leoCounter','ironBody','ironBody','lionRoar','leoNunchaku','sevenTraining','astra','genOhtori','genOhtori','danTraining',
    'macFighter','macFighter','macShieldVehicle','macShieldVehicle','macCommander','fightingDiscipline','burningCharge','leoFlyingKick','kingGuidance','leoFinalCombo'
  ],
  tregear:[
    'falseOpening','falseOpening','chaosPit','chaosPit','twistedReturn','blackMirror',
    'tregearEye','kirisaki','kirisaki','chaosPhantom','chaosPhantom','falsePeace','falsePeace','tregearSlash','tregearSlash','grimdoFragment',
    'tregearBeam','tregearBeam','chaosDomain','forbiddenKnowledge','forbiddenKnowledge','chaosRelease','grimdo',
    'shieldSquad','tacticalRecharge','tacticalRecharge','eventDisruptor','alienMefilas','silenceShot','dimensionalSeal'
  ]
};

UCR.AI_DECKS = Object.fromEntries(Object.entries(UCR.TEST_DECKS).map(([k,v])=>[k,[...v]]));

UCR.PACKABLE_IDS = Object.keys(UCR.CARDS).filter(id=>UCR.CARDS[id].collectible!==false);
