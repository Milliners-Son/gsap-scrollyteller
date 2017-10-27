import {TweenMax, Power2, TimelineLite,TimelineMax} from "gsap";
//require('./GSDevTools.js');
const TL = TweenLite;
const TM = TweenMax;

const {IDS} = require('../components/constants.js');

let $shoePixels,
$shoeHolderFront,
$shoeHolderBack,
$shoeFront,
$shoeBack,
$shoeMaskFront,
$shoeMaskBack,
$tick,
$dollarNumber,
$netherlandsFlag,
$ausFlag,
$frame1,
$frame2,
$ausTax,
$nethTax

let prepConstants = ()=>{
  $shoePixels = document.querySelectorAll(`#${IDS.TICK} div[data-symbol]`);
  $shoeHolderFront = queryID(IDS.SHOEHOLDER_FRONT);
  $shoeHolderBack = queryID(IDS.SHOEHOLDER_BACK);
  $shoeFront  = queryID(IDS.SHOE_FRONT);
  $shoeBack = queryID(IDS.SHOE_BACK);
  $shoeMaskFront   = queryID(IDS.SHOEMASK_FRONT);
  $shoeMaskBack  = queryID(IDS.SHOEMASK_BACK);
  $tick = queryID(IDS.TICK);
  $dollarNumber =queryID(IDS.DOLLAR_NUMBER);
  $netherlandsFlag = queryID(IDS.NETHERLAND_FLAG_ANI);
  $ausFlag = queryID(IDS.AUS_FLAG_ANI);
  $frame1 = queryID(IDS.FRAME1);
  $frame2 = queryID(IDS.FRAME2);
  $ausTax = queryID(IDS.AUSTAX);
  $nethTax = queryID(IDS.NETHTAX);
}

let master;
const aniLabels = new Array();
let currentLabel = 0;
let initAni = false;

let addLabel = (label)=>{
  console.log('addLabel(',label,')');
  aniLabels.push(label);
  return label;
}
let setCurrent = (index)=>{
  currentLabel = index;
  console.log('currentLabel',currentLabel);
}

//SNIPPETS


//FRAMES
let prepStage = ()=>{

  let hideArray = [
    $dollarNumber,
    $netherlandsFlag,
    $ausFlag,
    $ausTax,
    $nethTax
  ];

  let section = new TimelineMax({id:`START`});
    //Set
    section.set([$shoeHolderFront,$shoeHolderBack],{scale:0.5,rotation:10,autoAlpha:0,bottom:100});
    section.set($shoeHolderFront,{left:50});
    section.set([$shoeMaskFront,$shoeMaskBack],{scale:0,transformOrigin:"center center"});
    section.set(hideArray,{autoAlpha:0});
    section.set('[data-circlemask]',{scale:0});

    return section
}
let popIn = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`,onComplete:setCurrent(index)});

  
  section.to($shoeHolderFront,1,{scale:1,autoAlpha:1,ease:Elastic.easeOut.config(1, 0.3)});
  section.to($shoeHolderFront,0.5,{rotation:0,bottom:0,ease:Bounce.easeOut});

  section.to($shoeHolderBack,1,{scale:1,autoAlpha:1,ease:Elastic.easeOut.config(1, 0.3)},"-=1.3");
  section.to($shoeHolderBack,0.6,{rotation:0,bottom:50,ease:Bounce.easeOut},"-=0.4");

  section.add(burst(IDS.BURST),"0");
  return section

}
let hideBackShoe = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`,onComplete:setCurrent(index)});
  section.to($shoeBack,0.5,{scale:0.8,ease: Power2.easeIn},0);
  section.to($shoeMaskBack,0.5,{scale:2,transformOrigin:"center center",ease: Power2.easeIn},0);
  return section
}

let hideFrontShoe = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`,onComplete:setCurrent(index)});

  section.to($tick,0.5,{scale:1.8,right:"20%",top:0,ease: Power2.easeIn},"0");
  section.to($shoeFront,0.5,{scale:0.8,ease: Power2.easeIn},"0");
  section.to($shoeMaskFront,0.5,{scale:2,transformOrigin:"center center",ease: Power2.easeIn},"0");
  section.to($dollarNumber,0.5,{autoAlpha:1},"0");

  return section
}

let remove20Percent = (index)=>{

  let section = new TimelineMax({id:`Part ${index}`,onComplete:setCurrent(index)});
  let $dots = rangeArray('data-index',[2,5,6,9,10,11,15,16,17,18,21,22,23,24,25,31,32,33,34,35])
  
  section.staggerTo(
    $dots,
    1,
    {top:100,ease:Bounce.easeOut},
    0.01
  )
  section.to($dots,0.5,{autoAlpha:0})
  
  section.add(countNumber(100,80,IDS.DOLLAR_NUMBER),"0");
  return section;
  
}

let showNethFlag = (index) =>{
  let section = new TimelineMax({id:`Part ${index}`,onComplete:setCurrent(index)});
  section.set($netherlandsFlag,{left:"30%"})
  section.set($frame1,{zIndex:1});
  section.set($frame2,{zIndex:10});
  section.to($netherlandsFlag,1,{autoAlpha:1});
  //section.to($frame1,0.7,{autoAlpha:0,top:30,ease:Power2.easeOut},"0");

  section.to($($frame1).find('[data-circlemask]'),1,{scale:10},"0");
  section.set($frame1,{autoAlpha:0});

  return section;
  
}

let showAusTax = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`,onComplete:setCurrent(index)});
  section.set($ausTax,{autoAlpha:1,left:"-50%"});
  section.to($ausFlag,0.5,{autoAlpha:1});
  section.to($netherlandsFlag,0.5,{left:"50%"},"0");
  section.to($ausTax,2,{left:0,rotation:360,
    ease: Power4.easeOut},
  "0");
  section.to(queryID(`${IDS.AUSTAX}_chunk`),1,{top:-50,left:50},"-=0.3");
  return section;  
}

let showNethTax = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`,onComplete:setCurrent(index)});
  section.set($nethTax,{autoAlpha:1,right:"-50%"});
  section.to($nethTax,2,{right:0,rotation:-360,
    ease: Power4.easeOut},
  "0");
  return section
}
let returnToCosting = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`,onComplete:setCurrent(index)});
  section.to($($frame2).find('[data-circlemask]'),0.5,{scale:10,ease:Power2.easeIn},"0");
  section.set($frame2,{autoAlpha:0});
  section.set($frame1,{autoAlpha:1});
  section.to($($frame1).find('[data-circlemask]'),0.5,{scale:0,ease:Power2.easeOut});

  return section;

}
/////////////////
//UTILS

//ANIMATION SNIPPETS
let burst = (id)=>{
  let snippet = new TimelineMax;
  snippet.set(`#${id}`,{scale:0.8,autoAlpha:0})
  snippet.to(`#${id}`,1.1,{rotation:30, transformOrigin:"center center",autoAlpha:1})
  snippet.to(`#${id} [data-id="circle_outer"]`,0.5,{scale:5, transformOrigin:"center center"},"0");
  snippet.to(`#${id} [data-id="circle_inner"]`,0.5,{scale:5, transformOrigin:"center center"},"0.5");
  snippet.set(`#${id}`,{autoAlpha:0});
  return snippet;
}

let countNumber = (from,to,container)=>{
  let number = {count:from};
  let countSection = new TimelineMax();
  let updateContainer = ()=>{

   
    let countHolder = document.getElementById(container);
    $(countHolder).html('$'+Math.round(number.count));
  }
  countSection.to(number,1,{count:to,roundProps:"score",onUpdate:updateContainer});
  return countSection;

}
let createGrid = (index,min,max,width,height)=>{
  let section = new TimelineMax({id:`Create Grid ${index}`,onComplete:setCurrent(index)});
  let j = min;
  let dotCount = 1;
  let xCount = 1;
  let yCount = 1;
  const padding=2;

  while(j<=max){

    let dot = document.querySelectorAll(`[data-index="${j}"]`);
    let x = ($(dot).width()+padding)*xCount;
    let y = ($(dot).height()+padding)*yCount;

    section.to(dot,0.5,{top:y,left:x},"0");

    if(xCount>=width){
      xCount = 1;
      yCount++;
    } else{
      xCount++;
    }
    dotCount++;
    j++;
  }
  return section
}

//SELECTOR FUNCITONS
let rangeSelector = (atr,start,end)=>{
  let rangeString = '';
  let count = start;
  while(count<=end){
    rangeString+=`${count!=start?',':''}[${atr}="${count}"]`;
    count++;
  }
  return rangeString;
}

let rangeArray = (atr,array)=>{
  let rangeString = '';
  for(var i in array){
    rangeString+=`${i!=0?',':''}[${atr}="${array[i]}"]`;
  }
  return rangeString;
}
let queryID = (id)=>document.querySelector(`#${id}`);

//TIMELINE
let init = ()=>{
  
  prepConstants();

  master = new TimelineMax();

  master.add(addLabel("Start"));
  master.add(prepStage());

  // #markIDone
  // Take a $200 pair of Nike shoes for example.
  master.add(popIn(1));
  master.add(addLabel("Pop in"));

  // #markIDtwo
  // You can give one of those shoes away for starters.
  // About $100 of the $200 goes to the retailer who sells the shoe. (CHECK: Margin given to external retailer).
  master.add(hideBackShoe(2));
  master.add(addLabel("Single Shoe"));

  //START APPARENTLY
  // Take the $100 that Nike makes wholesaling a pair of shoes - the money takes a surprising journey.
  master.add(hideFrontShoe(3));
  master.add(addLabel("Count"));

  //#frame2
  // Just on $80 of that shoe will go to a Nike company in the Netherlands.
  master.add(remove20Percent(4));
  master.add(addLabel("Remove 20 percent"))

  //#frame3
  // Why the Netherlands?
  // It could be because Nike likes tulips and bicycles.
  // Or it could be because Nike likes a tax regime that allows elaborate corporate structures.
  master.add(showNethFlag(5));
  master.add(addLabel("Show Netherlands Flag"))

  //#frame4
  // It’s worth remembering that if you make a dollar of profit in Australia, you have to pay 30 cents in tax.
  master.add(showAusTax(5));
  master.add(addLabel("Show Australian Tax"))

  //#frame5
  // In the Netherlands, if you play your cards right, you may not have to pay a cent.
  master.add(showNethTax(6));
  master.add(addLabel("Show Netherlands Tax"))

  //#frame6
  // That Australian money does not stay in the Netherlands. 
  // From the $80 Nike pays for the manufacture of each shoe, in factories it subcontracts in countries such as Vietnam,  Indonesia and China. 
  master.add(returnToCosting(7));
  master.add(addLabel("Return to costing"))
  //#frame8
  // While Nike’s manufacturing costs aren’t publicly available, a report from German consumer group Stiftung Warentest, calculated the average price of manufacturing for five of the top athetic shoes makes at about $36.

//#frame9
// And also from the $80, Nike pays about $17 (on most recent estimates STUART TO CHECK) to a company called Nike Innovate CV. 

  master.add(addLabel("End"));
  master.pause();


  currentLabel = 0;

  initAni = true;

}
function pause(){
  master.pause();  
}  


let play = (index) =>{
  //if(!initAni) init();
  console.log(index,currentLabel,aniLabels);

  if(index!= currentLabel){
    let first,next;
    first = aniLabels[currentLabel];
    next = aniLabels[index];

    console.log("tweenFromTo()",currentLabel,first,next);
    master.tweenFromTo(first,next);
    currentLabel = index;
  }
}

module.exports = {init,play}