import {TweenMax, Power2, TimelineLite,TimelineMax} from "gsap";

const {IDS} = require('../components/constants.js');
const {queryID,rangeArray,rangeSelector,resetPixels,createGrid,countNumber,circleTrans,burst} = require('./ani-utils.js');


//Add elements to an object
let ELS = {};
let prepConstants = ()=>{

  ELS["SHOEPIXELS"] = document.querySelectorAll(`#${IDS.TICK} div[data-symbol]`);

  for (var key in IDS) {
    if (IDS.hasOwnProperty(key)) ELS[`${key}`] = queryID(IDS[key])
  }

}
//Prep timeline functions
prepConstants();

let costPos = (index)=>{
    let costHeight = 55;
    return (index=="off"?0-costHeight:index*costHeight)
  }
let costRow = (index)=>`#${IDS.DOLLARCOUNT} [data-costrow${index!=undefined?`="${index}"`:''}]`;


//FRAMES

//Prep the stage, hide the things
let prepStage = ()=>{

    let hideArray = [
      ELS.DOLLAR_NUMBER,
      ELS.DOLLARCOUNT,
      ELS.NETHERLAND_FLAG_ANI,
      ELS.AUS_FLAG_ANI,
      ELS.AUSTAX,
      ELS.NETHTAX,
      ELS.FRAME2,
      ELS.FRAME3,
      ELS.FRAME4,
      ELS.FRAME5,
      ELS.FRAMEPATENT,
      ELS.LABEL2DOLLAR,
      ELS.LABELTAX
    ];
 
    let section = new TimelineMax();

    //Set
    section.set([ELS.SHOEHOLDER_FRONT,ELS.SHOEHOLDER_BACK],{scale:0.5,rotation:10,autoAlpha:0,bottom:100});
    section.set(ELS.SHOEHOLDER_FRONT,{left:50});
    section.set([ELS.SHOEMASK_FRONT,ELS.SHOEMASK_BACK],{scale:0,transformOrigin:"center center"});
    section.set(hideArray,{autoAlpha:0});
    section.set(costRow(),{autoAlpha:0,bottom:costPos("off")});
    section.set('[data-circlemask]',{scale:0});

    return section
}

let popOut = ()=>{
  let section = new TimelineMax();
  section.add(prepStage());
  section.add(circleTrans(ELS.FRAME1,ELS.FRAME1,true),"0");
  return section
}

let popIn = ()=>{

  let section = new TimelineMax();
  
  section.set(ELS.FRAME1,{autoAlpha:1});

  let $circleMask = `[data-circlemask="${IDS.FRAME1}"]`;
  section.set($circleMask,{scale:0});

  section.to(ELS.DOLLARCOUNT,0.01,{autoAlpha:0}); 
  section.add(resetPixels(ELS.TICK,true),"0");
  
  section.to(ELS.SHOEHOLDER_FRONT,1,{scale:1,autoAlpha:1,ease:Elastic.easeOut.config(1, 0.3)},"0");
  section.to(ELS.SHOEHOLDER_FRONT,0.5,{rotation:0,bottom:0,ease:Bounce.easeOut});

  section.to(ELS.SHOEHOLDER_BACK,1,{scale:1,autoAlpha:1,ease:Elastic.easeOut.config(1, 0.3)},"0.3");
  section.to(ELS.SHOEHOLDER_BACK,0.6,{rotation:0,bottom:50,ease:Bounce.easeOut},"-=0.4");

  section.add(burst(IDS.BURST),"0");
  return section

}
let hideBackShoe = ()=>{
  let section = new TimelineMax();
  section.to(ELS.SHOE_BACK,0.5,{scale:0.8,ease: Power2.easeIn},0);
  section.to(ELS.SHOEMASK_BACK,0.5,{scale:2,transformOrigin:"center center",ease: Power2.easeIn},0);
  return section
}

let hideFrontShoe = ()=>{
  let section = new TimelineMax();
  
  section.to(ELS.TICK,0.5,{scale:1.8,right:"20%",top:0,ease: Power2.easeInOut},"0");
  section.to(ELS.SHOE_FRONT,0.5,{scale:0.8,ease: Power2.easeInOut},"0");
  section.to(ELS.SHOEMASK_FRONT,0.5,{scale:2,transformOrigin:"center center",ease: Power2.easeInOut},"0");
  section.to(ELS.DOLLARCOUNT,0.1,{autoAlpha:1},"0");
  section.to(costRow(0),0.5,{autoAlpha:1,bottom:costPos(0)});
  
  return section
}

let remove20Percent = ()=>{

  let section = new TimelineMax();
  let $dots = rangeArray(IDS.TICK,'data-index',[2,5,6,9,10,11,15,16,17,18,21,22,23,24,25,31,32,33,34,35])
  
  section.staggerTo(
    $dots,
    1,
    {top:100,ease:Bounce.easeOut},
    0.01
  )
  section.to($dots,0.5,{autoAlpha:0})
  
  //section.add(countNumber(100,80,IDS.DOLLAR_NUMBER),"0");
  section.to(costRow(0),0.5,{autoAlpha:0,bottom:costPos(1),ease:Power2.easeInOut},"0");
  section.to(costRow(1),0.5,{autoAlpha:1,bottom:costPos(0),ease:Power2.easeInOut},"0");
  return section;
  
}

let showNethFlag = () =>{
  let section = new TimelineMax();
  
  section.set(ELS.NETHERLAND_FLAG_ANI,{autoAlpha:1,top:"25%",width:"100%"});
  section.set(ELS.AUS_FLAG_ANI,{autoAlpha:0,left:"-150%",width:"40%"});

  section.set(ELS.AUSTAX,{autoAlpha:0,left:"-50%"});

  section.set(ELS.NETHTAX,{autoAlpha:0,right:"-50%"});

  section.add(circleTrans(ELS.FRAME2,ELS.FRAME1),"0");
  section.to(ELS.FRAME1,0.5,{autoAlpha:0},"0");

  return section;
  
}

let showAusTax = ()=>{
  let section = new TimelineMax();
  section.set(ELS.FRAME1,{autoAlpha:0});
  section.set(ELS.AUSTAX,{autoAlpha:0});
  
  //Flags
  section.to(ELS.AUS_FLAG_ANI,0.5,{autoAlpha:1,left:"0%",right:"50%"});
  section.to(ELS.NETHERLAND_FLAG_ANI,0.5,{left:"50%",width:"40%",top:"0%",ease:Power2.easeInOut},"0");
  
  //Show Oz tax
  section.to(ELS.AUSTAX,0.3,{autoAlpha:1},"0");
  section.to(ELS.AUSTAX,1.5,{left:0,rotation:360,
    ease: Power4.easeOut},
  "0");
  section.to(queryID(`${IDS.AUSTAX}_chunk`),1,{top:-50,left:50,autoAlpha:0,ease:Power2.easeInOut},"-=0.5");


  return section;  
}

let showNethTax = ()=>{

    let section = new TimelineMax();
    section.set(ELS.FRAME1,{autoAlpha:0});

    section.set(ELS.NETHTAX,{autoAlpha:0,right:"-50%"});
    section.to(ELS.NETHTAX,0.3,{autoAlpha:1},"0");
    
      //Show Neth Tax
    section.to(ELS.NETHTAX,1.5,{right:0,rotation:-360,
        ease: Power4.easeOut},"0"
      );
    return section;  
}



let returnToCosting = ()=>{

  let section = new TimelineMax();
  section.add(circleTrans(ELS.FRAME1,ELS.FRAME2))
  return section;

}
let remove36Percent = ()=>{
  
    let section = new TimelineMax();
    let $dots = rangeArray(IDS.TICK,'data-index',
    [29,30,40,41,42,43,44,45,46,47,48,54,55,56,57,58,59,60,61,62,63,68,69,70,71,72,73,74,75,76,83,84,85,86,87,88]
    )
    
    section.staggerTo(
      $dots,1,
      {top:100,ease:Bounce.easeOut},
      0.01
    )
    section.to($dots,0.5,{autoAlpha:0})

    section.to(costRow(1),0.5,{bottom:costPos(1),ease:Power2.easeInOut},"0");
    section.to(costRow(2),0.5,{autoAlpha:1,bottom:costPos(0),ease:Power2.easeInOut},"0");
    return section;
    
  }

let remove17Percent = ()=>{
  
    let section = new TimelineMax();
    let $dots = rangeArray(IDS.TICK,'data-index',
    [1,3,4,7,8,12,13,14,19,20,96,97,98,99,100,95,94]
    )
    
    section.staggerTo(
      $dots,
      1,
      {top:100,ease:Bounce.easeOut},
      0.01
    )
    section.to($dots,0.5,{autoAlpha:0})

    section.to(costRow(1),0.5,{bottom:costPos(2),ease:Power2.easeInOut},"0");
    section.to(costRow(2),0.5,{bottom:costPos(1),ease:Power2.easeInOut},"0");
    section.to(costRow(3),0.5,{autoAlpha:1,bottom:costPos(0),ease:Power2.easeInOut},"0");
    
    return section;
    
  }
let removeTheRest = ()=>{
  let section = new TimelineMax();

  let attr = "data-index";
  let $restOfDots = `
  ${rangeSelector(IDS.OZ,attr,26,28)}, 
  ${rangeSelector(IDS.OZ,attr,36,39)}, 
  ${rangeSelector(IDS.OZ,attr,49,53)}, 
  ${rangeSelector(IDS.OZ,attr,64,67)}, 
  ${rangeSelector(IDS.OZ,attr,77,82)}, 
  ${rangeSelector(IDS.OZ,attr,89,93)}
  `;

  section.staggerTo(
    $restOfDots,
    1,
    {top:100,ease:Bounce.easeOut},
    0.01
  )

  section.to(costRow(1),0.5,{bottom:costPos(3),ease:Power2.easeInOut},"0");
  section.to(costRow(2),0.5,{bottom:costPos(2),ease:Power2.easeInOut},"0");
  section.to(costRow(3),0.5,{bottom:costPos(1),ease:Power2.easeInOut},"0");
  section.to(costRow(6),0.5,{autoAlpha:1,bottom:costPos(0),ease:Power2.easeInOut},"0");

  return section;
}

let showPatents = ()=>{
    let section = new TimelineMax();
    section.add(circleTrans(ELS.FRAMEPATENT,ELS.FRAME1))
    return section;
}

let showTaxGraph = ()=>{


  let section = new TimelineMax();

  let $revenue = document.querySelector(`#${IDS.TAXGRAPH} [data-row="0"]`);
  let $tax = document.querySelector(`#${IDS.TAXGRAPH} [data-row="1"]`);

  let $revenueLabel = document.querySelector(`#${IDS.TAXGRAPH} [data-row="0"] [data-label]`)
  let $taxLabel =  document.querySelector(`#${IDS.TAXGRAPH} [data-row="1"] [data-label]`)

  section.set(ELS.TAXGRAPH,{bottom:"25%"});
  section.set([$revenue,$tax],{width:"0%"});
  section.set([$revenueLabel,$taxLabel],{autoAlpha:0});


   section.add(circleTrans(ELS.FRAME3,ELS.FRAMEPATENT));

   section.to($revenue,1.5,{width:"100%",ease:Power2.easeInOut},"1");
   section.to($revenueLabel,0.5,{autoAlpha:1},"1");
   section.to($tax,0.5,{width:"1.4%",ease:Power2.easeInOut},"2");
   section.to($taxLabel,0.5,{autoAlpha:1},"2");


  
  return section;
}

let returnTo100 = (prev)=>{
  let section = new TimelineMax();

  section.add(circleTrans(ELS.FRAME1,ELS[`FRAME${prev}`]));



  section.set(costRow(1),{autoAlpha:0,bottom:costPos("off")});
  section.to(costRow(0),0.5,{autoAlpha:1,bottom:costPos(0),ease:Power2.easeInOut},"0");
  section.to(costRow(1),0.5,{autoAlpha:0,bottom:costPos(3),ease:Power2.easeInOut},"0");
  section.to(costRow(2),0.5,{autoAlpha:0,bottom:costPos(2),ease:Power2.easeInOut},"0");
  section.to(costRow(3),0.5,{autoAlpha:0,bottom:costPos(1),ease:Power2.easeInOut},"0");

  section.add(resetPixels(ELS.TICK),"1");
  return section;
}
let remove80dollar = ()=>{
  let section = new TimelineMax();
  //section.add(countNumber(100,20,IDS.DOLLAR_NUMBER),"0");
  const attr = 'data-index';
  const eightyDots =  `
  ${rangeSelector(IDS.TICK,attr,2,2)}, 
  ${rangeSelector(IDS.TICK,attr,5,7)}, 
  ${rangeSelector(IDS.TICK,attr,9,11)}, 
  ${rangeSelector(IDS.TICK,attr,15,18)}, 
  ${rangeSelector(IDS.TICK,attr,21,25)}, 
  ${rangeSelector(IDS.TICK,attr,29,35)}, 
  ${rangeSelector(IDS.TICK,attr,40,47)}, 
  ${rangeSelector(IDS.TICK,attr,51,100)} 
  `;

  section.staggerTo(
    eightyDots   
    ,0.5,{left:"100%",top:"+10",autoAlpha:0},0.01,"0");
  
  section.to(costRow(0),0.5,{autoAlpha:1,bottom:costPos(1),ease:Power2.easeInOut},"0");
  section.to(costRow(4),0.5,{autoAlpha:1,bottom:costPos(0),ease:Power2.easeInOut},"0");


  

  return section;
}
let remove18dollar = ()=>{
  let section = new TimelineMax();
  let $dots = rangeArray(IDS.TICK,'data-index',[1,3,4,8,12,13,14,26,27,28,36,37,38,39,48,49,50])

  section.set(ELS.LABEL2DOLLAR,{top:295,left:226});

  section.to(costRow(0),0.5,{autoAlpha:1,bottom:costPos(2),ease:Power2.easeInOut},"0");
  section.to(costRow(4),0.5,{autoAlpha:1,bottom:costPos(1),ease:Power2.easeInOut},"0");
  section.to(costRow(5),0.5,{autoAlpha:1,bottom:costPos(0),ease:Power2.easeInOut},"0");

  section.staggerTo(
    $dots,1,
    {top:100,ease:Bounce.easeOut},
    0.01
  )
  section.to($dots,0.5,{autoAlpha:0});

 
  section.to(ELS.LABEL2DOLLAR,0.5,{autoAlpha:1},"0.5");

  return section;
}
let showProfitGraph = ()=>{
  let section = new TimelineMax();
  section.set(ELS.PROFITGRAPH,{autoAlpha:0,bottom:"40px"});
  section.set(ELS.REVENUEGRAPH,{bottom:"25%"});
  section.set(`#${IDS.PROFITGRAPH} [data-row]`,{width:"0%"});

  let $revenue = document.querySelector(`#${IDS.REVENUEGRAPH} [data-row="0"]`);
  let $profit = document.querySelector(`#${IDS.REVENUEGRAPH} [data-row="1"]`);

  let $revenueLabel = document.querySelector(`#${IDS.REVENUEGRAPH} [data-row="0"] [data-label]`)
  let $profitLabel =  document.querySelector(`#${IDS.REVENUEGRAPH} [data-row="1"] [data-label]`)
  
  let profitP = (11/500)*100;
  section.set([$revenue,$profit],{width:"0%"});
  section.set([$revenueLabel,$profitLabel],{autoAlpha:0});

  section.add(circleTrans(ELS.FRAME4,ELS.FRAME1));


  section.to($revenue,1,{width:"100%",ease:Power2.easeInOut},"1");
  section.to($revenueLabel,0.5,{autoAlpha:1},"1");
  section.to($profit,0.5,{width:`${profitP}%`,ease:Power2.easeInOut},"1.5");
  section.to($profitLabel,0.5,{autoAlpha:1},"1.5");
  
  return section;
}
let showCountryGraph = ()=>{
  let section = new TimelineMax();

  let $total = document.querySelector(`#${IDS.PROFITGRAPH} [data-row="0"]`);
  let $aus = document.querySelector(`#${IDS.PROFITGRAPH} [data-row="2"]`);
  let $usa = document.querySelector(`#${IDS.PROFITGRAPH} [data-row="1"]`);

  let $totalLabel = document.querySelector(`#${IDS.PROFITGRAPH} [data-row="0"] [data-label]`);
  let $ausLabel =  document.querySelector(`#${IDS.PROFITGRAPH} [data-row="2"] [data-label]`);
  let $usaLabel = document.querySelector(`#${IDS.PROFITGRAPH} [data-row="1"] [data-label]`);

  section.set([$total,$aus,$usa],{width:"0%"});
  section.set([$totalLabel,$ausLabel,$usaLabel],{autoAlpha:0});

  section.to(ELS.REVENUEGRAPH,0.7,{bottom:"67%",ease:Power2.easeInOut})
  section.to(ELS.PROFITGRAPH,0.7,{autoAlpha:1,ease:Power2.easeIn},"0");

  let total = 100;
  let auProfit = 2;
  let usProfit = 14;
  
  section.to($total,1,{width:"100%",ease:Power2.easeInOut},"1");
  section.to($totalLabel,0.5,{autoAlpha:1},"1");

  section.to($usa,0.5,{width:`${usProfit}%`,ease:Power2.easeInOut},"1.5");
  section.to($usaLabel,0.5,{autoAlpha:1},"1.5");

  section.to($aus,0.5,{width:`${auProfit}%`,ease:Power2.easeInOut},"1.75");
  section.to($ausLabel,0.5,{autoAlpha:1},"1.75");

  

  return section;
}
let prepTaxFrame = ()=>{
    let section = new TimelineMax();

    section.to(ELS.LABEL2DOLLAR,0.1,{autoAlpha:0},"0");
    section.to(costRow(),0.1,{autoAlpha:0,bottom:costPos("off")},"0");
    section.to(costRow(0),0.1,{autoAlpha:1,bottom:costPos(0)},"0");

    section.add(returnTo100(4),"0.1");

    return section;
}
let showTaxPaid = ()=>{
  let section = new TimelineMax();

  //Get consts
  const $dots = `[data-id="${IDS.TICK}"][data-index="1"],${rangeSelector(IDS.TICK,'data-index',3,100)}`;
  const $taxDot = `[data-id=${IDS.TICK}][data-pixel][data-index="2"]`;


  //Set inits
  section.set(ELS.LABELTAX,{top:235,left:103});

  section.set($taxDot,{scaleY:1});

  //Do to's
  section.staggerTo(
    $dots,
    1,
    {top:100,ease:Bounce.easeOut},
    0.01
  )

  
  section.to($taxDot,1,{left:129,ease:Power2.easeInOut},"0.5");
  section.to($dots,1,{autoAlpha:0},"1");
  section.to($taxDot,0.5,{scaleY:0.76},"1");

  section.to(ELS.LABELTAX,0.5,{autoAlpha:1},"1");
  section.to(costRow(0),0.5,{autoAlpha:1,bottom:costPos("off")},"0");

  return section;
}

let showOz = ()=>{
    let section = new TimelineMax();
    section.set(ELS.OZ,{scale:4});
    section.add(circleTrans(ELS.FRAME5,ELS.FRAME1));
    return section;
}
let showDomesticProduct = ()=>{

  let section = new TimelineMax();


  let dist = 100;
  let size = 0.1;
  let time = 1.5;
  let offset = "-=1.3";


  let topLeft =     {top:`-=${dist}`, left:`-=${dist}`,scale:size,autoAlpha:0,ease:Back.easeIn,transformOrigin:"center center"};
  let topRight =    {top:`-=${dist}`, left:`+=${dist}`,scale:size,autoAlpha:0,ease:Back.easeIn,transformOrigin:"center center"};
  let bottomLeft =  {top:`+=${dist}`, left:`-=${dist}`,scale:size,autoAlpha:0,ease:Back.easeIn,transformOrigin:"center center"};
  let bottomRight = {top:`+=${dist}`, left:`+=${dist}`,scale:size,autoAlpha:0,ease:Back.easeIn,transformOrigin:"center center"};

  let ozDot = (index)=>`#${IDS.OZ} [data-index="${index}"]`;

  section.to(ozDot(4),time,topLeft,offset);
  section.to(ozDot(24),time,topRight,offset);
  section.to(ozDot(26),time,topLeft,offset);
  section.to(ozDot(63),time,topRight,offset);
  section.to(ozDot(100),time,topRight,offset);
  section.to(ozDot(101),time,bottomLeft,offset);
  section.to(ozDot(106),time,bottomRight,offset);
  section.to(ozDot(127),time,bottomRight,offset);
  section.to(ozDot(129),time,bottomLeft,offset);
  section.to(ozDot(132),time,bottomRight,offset);

  return section;
}
let showQuarterOz = ()=>{

  let section = new TimelineMax();

  let attr = "data-index";
  let $quarterDots = `
  ${rangeSelector(IDS.OZ,attr,2,2)}, 
  ${rangeSelector(IDS.OZ,attr,6,6)}, 
  ${rangeSelector(IDS.OZ,attr,12,14)}, 
  ${rangeSelector(IDS.OZ,attr,21,24)}, 
  ${rangeSelector(IDS.OZ,attr,33,37)}, 
  ${rangeSelector(IDS.OZ,attr,47,52)}, 
  ${rangeSelector(IDS.OZ,attr,62,68)}
  `;
  section.staggerTo($quarterDots,2,{top:"-=10", left:"+=10" ,scale:"0.8",backgroundColor:"#fff",ease:Elastic.easeOut},0.01);

  return section;
}

module.exports = {
    prepStage,
    popOut,
    popIn,
    hideBackShoe,
    hideFrontShoe,
    remove20Percent,
    showNethFlag,
    showAusTax,
    showNethTax,
    returnToCosting,
    remove36Percent,
    remove17Percent,
    removeTheRest,
    showPatents,
    showTaxGraph,
    returnTo100,
    remove80dollar,
    remove18dollar,
    showProfitGraph,
    showCountryGraph,
    prepTaxFrame,
    showTaxPaid,
    showOz,
    showDomesticProduct
}