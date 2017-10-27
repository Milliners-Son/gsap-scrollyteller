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
$dollarNumber

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
  let section = new TimelineMax({id:`START`});
    //Set
    section.set([$shoeHolderFront,$shoeHolderBack],{scale:0.5,rotation:10,autoAlpha:0,bottom:100});
    section.set($shoeHolderFront,{left:50});
    section.set([$shoeMaskFront,$shoeMaskBack],{scale:0,transformOrigin:"center center"});
    section.set($dollarNumber,{autoAlpha:0});
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

  section.to($tick,0.5,{scale:1.1,ease: Power2.easeIn},"0");
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

/////////////////
//UTILS

//ANIMATION SNIPPETS
let burst = (id)=>{
  let snippet = new TimelineMax;
  snippet.set(`#${id}`,{scale:0.8,left: "-100",top: "-172",autoAlpha:0})
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
    console.log(number.count);
   
    let countHolder = document.getElementById(container);
    console.log(countHolder);
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

  // #markIDthree
  // Of the $100 shoe that's left - the money Nike makes wholesaling a pair of shoes - the money takes a surprising journey.
  master.add(hideFrontShoe(3));
  master.add(addLabel("Count"));

  //markIDthreeish
  // Just on $80 of that shoe will go to a Nike company in the Netherlands.
  master.add(remove20Percent(4));
  master.add(addLabel("Remove 20 percent"))

  // #markIDfour
  // Why the Netherlands?
  // It could be because Nike likes tulips and bicycles.
  // Or it could be because Nike likes a tax regime that allows elaborate corporate structures.


  
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