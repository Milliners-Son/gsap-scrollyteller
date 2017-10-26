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
$tick;

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
let burst = (id)=>{

  let snippet = new TimelineMax;
  snippet.set(`#${id}`,{scale:0.8,left: "-100",top: "-172",autoAlpha:0})
  snippet.to(`#${id}`,1.1,{rotation:30, transformOrigin:"center center",autoAlpha:1})
  snippet.to(`#${id} [data-id="circle_outer"]`,0.5,{scale:5, transformOrigin:"center center"},"0");
  snippet.to(`#${id} [data-id="circle_inner"]`,0.5,{scale:5, transformOrigin:"center center"},"0.5");
  snippet.set(`#${id}`,{autoAlpha:0});
  return snippet;
}

//FRAMES
let popIn = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`,onComplete:setCurrent(index)});
  //Set
  section.set([$shoeHolderFront,$shoeHolderBack],{scale:0.5,rotation:10,autoAlpha:0,bottom:100});
  section.set($shoeHolderFront,{left:50});
  section.set([$shoeMaskFront,$shoeMaskBack],{scale:0,transformOrigin:"center center"});
  
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

  section.to($tick,0.5,{scale:1.1,ease: Power2.easeIn},0);
  section.to($shoeFront,0.5,{scale:0.8,ease: Power2.easeIn},0);
  section.to($shoeMaskFront,0.5,{scale:2,transformOrigin:"center center",ease: Power2.easeIn},0);
  return section
}
let rearrangeDots = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`,onComplete:setCurrent(index)});
  section.staggerTo(rangeSelector('data-index',15,45),1,{backgroundColor:"#ffffff",scale:1.1,transformOrigin:"center center"},0.05);
  section.staggerTo(rangeArray('data-index',[2,5,6,9,10,11,15,16,17,18]),1,{backgroundColor:"#000",scale:0.8,transformOrigin:"center center"},0.05);

  section.staggerTo($shoePixels,1,{top:100,ease:Bounce.easeOut},0.01,"-=0.5");
  return section
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
let init = ()=>{
    
  $shoePixels = document.querySelectorAll(`#${IDS.TICK} div[data-symbol]`);

  $shoeHolderFront = queryID(IDS.SHOEHOLDER_FRONT);
  $shoeHolderBack = queryID(IDS.SHOEHOLDER_BACK);
  $shoeFront  = queryID(IDS.SHOE_FRONT);
  $shoeBack = queryID(IDS.SHOE_BACK);
  $shoeMaskFront   = queryID(IDS.SHOEMASK_FRONT);
  $shoeMaskBack  = queryID(IDS.SHOEMASK_BACK);  
  $tick = queryID(IDS.TICK);


  master = new TimelineMax();

  master.add(addLabel("Start"));
  master.add(popIn(1));

  master.add(addLabel("Pop in"));
  master.add(hideBackShoe(2));

  master.add(addLabel("Single Shoe"));
  master.add(hideFrontShoe(3));

  master.add(addLabel("Melt"));
  master.add(rearrangeDots(4));

  master.add(addLabel("Grid"));
  master.add(createGrid(4,1,100,10,10));

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

let blastIt = (a,b,c)=>{
  console.log('blastIt',a,b,c);
  let melt = new TimelineMax;
  melt.staggerTo(`#${IDS.TICK} div[data-symbol]`,1,{top:200,ease:Bounce.easeOut},0.01);
  melt.play();
}

module.exports = {init,play,blastIt}