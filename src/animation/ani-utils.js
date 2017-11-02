import {TweenMax, Power2, TimelineLite,TimelineMax} from "gsap";
const {IDS} = require('../components/constants.js');

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


let circleTrans = (show,hide,quick)=>{
  let snippet = new TimelineMax;
  let time = (quick?0.01:0.5);
  snippet.set(show,{autoAlpha:0});
  snippet.set($(show).find('[data-circlemask]'),{scale:10});

  snippet.to($(hide).find('[data-circlemask]'),time,{scale:10,ease:Power2.easeIn},"0");
  snippet.set(hide,{autoAlpha:0});
  snippet.set(show,{autoAlpha:1});
  snippet.to($(show).find('[data-circlemask]'),time,{scale:0,ease:Power2.easeOut});

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
let createGrid = (id,index,min,max,width,height)=>{
  let snippet = new TimelineMax({id:`Create Grid ${index}`});
  let j = min;
  let dotCount = 1;
  let xCount = 1;
  let yCount = 1;
  const padding=2;

  while(j<=max){

    let dot = document.querySelectorAll(`[data-id="${IDS.TICK}"][data-index="${j}"]`);
    let x = ($(dot).width()+padding)*xCount;
    let y = ($(dot).height()+padding)*yCount;

    snippet.to(dot,0.5,{top:y,left:x},"0");

    if(xCount>=width){
      xCount = 1;
      yCount++;
    } else{
      xCount++;
    }
    dotCount++;
    j++;
  }
  return snippet
}
let resetPixels = (holder,quick)=>{
  let snippet = new TimelineMax({id:`Reset Pixels ${holder}`});
  let time = (quick?0.1:0.5);
  $(holder).find('[data-pixel]').each(function(){
    let dot = $(this);
    let left = $(this).attr('data-left');
    let top = $(this).attr('data-top');
    snippet.to(dot,0.5, {left:left,top:top,autoAlpha:1},"0");
  })
  return snippet;
}

//SELECTOR FUNCITONS
let rangeSelector = (id,atr,start,end)=>{
  let rangeString = '';
  let count = start;
  while(count<=end){
    rangeString+=`${count!=start?',':''}[data-id="${id}"][${atr}="${count}"]`;
    count++;
  }
  
  return rangeString;
}

let rangeArray = (id,atr,array)=>{
  let rangeString = '';
  for(var i in array){
    rangeString+=`${i!=0?',':''}[data-id="${id}"][${atr}="${array[i]}"]`;
  }
  return rangeString;
}
let queryID = (id)=>document.querySelector(`#${id}`);

module.exports = {queryID,rangeArray,rangeSelector,resetPixels,createGrid,countNumber,circleTrans,burst};