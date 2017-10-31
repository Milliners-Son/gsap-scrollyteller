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
$frame3,
$frame4,
$ausTax,
$taxGraph,
$nethTax,
$profitGraph,
$revenueGraph

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
  $frame3 = queryID(IDS.FRAME3);
  $frame4 = queryID(IDS.FRAME4);
  $ausTax = queryID(IDS.AUSTAX);
  $nethTax = queryID(IDS.NETHTAX);
  $taxGraph = queryID(IDS.TAXGRAPH);

  $profitGraph = queryID(IDS.PROFITGRAPH);
  $revenueGraph = queryID(IDS.REVENUEGRAPH);
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
      $nethTax,
      $frame2,
      $frame3
    ];

    let section = new TimelineMax({id:`START`});
    console.log('prepstage()')
    //Set
    section.set([$shoeHolderFront,$shoeHolderBack],{scale:0.5,rotation:10,autoAlpha:0,bottom:100});
    section.set($shoeHolderFront,{left:50});
    section.set([$shoeMaskFront,$shoeMaskBack],{scale:0,transformOrigin:"center center"});
    section.set(hideArray,{autoAlpha:0});

    section.set('[data-circlemask]',{scale:0});
    section.add(circleTrans($frame1,$frame1),"0");

    //Set circleMasksBig
    //section.set($($frame3).find('[data-circlemask]'),{scale:10});

    return section
}
let popIn = (index)=>{

  let section = new TimelineMax({id:`Part ${index}`});
  
  
  section.set($frame1,{autoAlpha:1});
  let $circleMask = $(`[data-circlemask="${IDS.FRAME1}"]`);
  console.log('circle:',$circleMask[0])
  section.set($circleMask[0],{scale:0});
  console.log('popIn()', $circleMask);
  
  section.to($shoeHolderFront,1,{scale:1,autoAlpha:1,ease:Elastic.easeOut.config(1, 0.3)});
  section.to($shoeHolderFront,0.5,{rotation:0,bottom:0,ease:Bounce.easeOut});

  section.to($shoeHolderBack,1,{scale:1,autoAlpha:1,ease:Elastic.easeOut.config(1, 0.3)},"-=1.3");
  section.to($shoeHolderBack,0.6,{rotation:0,bottom:50,ease:Bounce.easeOut},"-=0.4");

  section.add(burst(IDS.BURST),"0");
  return section

}
let hideBackShoe = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`});
  section.to($shoeBack,0.5,{scale:0.8,ease: Power2.easeIn},0);
  section.to($shoeMaskBack,0.5,{scale:2,transformOrigin:"center center",ease: Power2.easeIn},0);
  return section
}

let hideFrontShoe = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`});

  section.to($tick,0.5,{scale:1.8,right:"20%",top:0,ease: Power2.easeInOut},"0");
  section.to($shoeFront,0.5,{scale:0.8,ease: Power2.easeInOut},"0");
  section.to($shoeMaskFront,0.5,{scale:2,transformOrigin:"center center",ease: Power2.easeInOut},"0");
  section.to($dollarNumber,0.5,{autoAlpha:1},"0");

  return section
}

let remove20Percent = (index)=>{

  let section = new TimelineMax({id:`Part ${index}`});
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
  let section = new TimelineMax({id:`Part ${index}`});
  section.set($netherlandsFlag,{left:"30%"});
  section.set($netherlandsFlag,{autoAlpha:1});
  section.add(circleTrans($frame2,$frame1),"0")
  return section;
  
}

let showAusTax = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`});
  section.set($ausTax,{autoAlpha:1,left:"-50%",ease:Power2.easeInOut});
  section.to($ausFlag,0.5,{autoAlpha:1});
  section.to($netherlandsFlag,0.5,{left:"50%",ease:Power2.easeInOut},"0");
  section.to($ausTax,2,{left:0,rotation:360,
    ease: Power4.easeOut},
  "0");
  section.to(queryID(`${IDS.AUSTAX}_chunk`),1,{top:-50,left:50,ease:Power2.easeInOut},"-=0.3");
  return section;  
}

let showNethTax = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`});
  section.set($nethTax,{autoAlpha:1,right:"-50%"});
  section.to($nethTax,2,{right:0,rotation:-360,
    ease: Power4.easeOut},
  "0");
  return section
}
let returnToCosting = (index)=>{

  let section = new TimelineMax({id:`Part ${index}`});
  section.add(circleTrans($frame1,$frame2))
  return section;

}
let remove36Percent = (index)=>{
  
    let section = new TimelineMax({id:`Part ${index}`});
    let $dots = rangeArray('data-index',
    [29,30,40,41,42,43,44,45,46,47,48,54,55,56,57,58,59,60,61,62,63,68,69,70,71,72,73,74,75,76,83,84,85,86,87,88]
    )
    
    section.staggerTo(
      $dots,
      1,
      {top:100,ease:Bounce.easeOut},
      0.01
    )
    section.to($dots,0.5,{autoAlpha:0})
    
    section.add(countNumber(80,44,IDS.DOLLAR_NUMBER),"0");
    return section;
    
  }

let remove17Percent = (index)=>{
  
    let section = new TimelineMax({id:`Part ${index}`});
    let $dots = rangeArray('data-index',
    [1,3,4,7,8,12,13,14,19,20,96,97,98,99,100,95,94]
    )
    
    section.staggerTo(
      $dots,
      1,
      {top:100,ease:Bounce.easeOut},
      0.01
    )
    section.to($dots,0.5,{autoAlpha:0})
    
    section.add(countNumber(44,27,IDS.DOLLAR_NUMBER),"0");
    return section;
    
  }
let showTaxGraph = (index)=>{


  let section = new TimelineMax({id:`Part ${index}`});

  let $revenue = document.querySelector(`#${IDS.TAXGRAPH} [data-row="0"]`);
  let $tax = document.querySelector(`#${IDS.TAXGRAPH} [data-row="1"]`);

  let $revenueLabel = document.querySelector(`#${IDS.TAXGRAPH} [data-row="0"] [data-label]`)
  let $taxLabel =  document.querySelector(`#${IDS.TAXGRAPH} [data-row="1"] [data-label]`)

  section.set([$revenue,$tax],{width:"0%"});
  section.set([$revenueLabel,$taxLabel],{autoAlpha:0});


   section.add(circleTrans($frame3,$frame1));

   section.to($revenue,2,{width:"100%",ease:Power2.easeInOut},"1");
   section.to($revenueLabel,0.5,{autoAlpha:1},"1");
   section.to($tax,0.5,{width:"1.4%",ease:Power2.easeInOut});
   section.to($taxLabel,0.5,{autoAlpha:1},"-=0.5");


  
  return section;
}

let returnTo100 = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`});
  section.add(circleTrans($frame1,$frame3));
  section.add(countNumber(27,100,IDS.DOLLAR_NUMBER),"0");
  return section;
}
let remove80dollar = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`});
  section.add(countNumber(100,20,IDS.DOLLAR_NUMBER),"0");
  return section;
}
let remove18dollar = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`});
  section.add(countNumber(20,2,IDS.DOLLAR_NUMBER),"0");
  return section;
}
let showProfitGraph = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`});
  section.set()
  section.add(circleTrans($frame1,$frame4));
  return section;
}
let showCountryGraph = (index)=>{
  let section = new TimelineMax({id:`Part ${index}`});
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


let circleTrans = (show,hide)=>{
  let snippet = new TimelineMax;

  snippet.set(show,{autoAlpha:0});
  snippet.set($(show).find('[data-circlemask]'),{scale:10});

  snippet.to($(hide).find('[data-circlemask]'),0.5,{scale:10,ease:Power2.easeIn},"0");
  snippet.set(hide,{autoAlpha:0});
  snippet.set(show,{autoAlpha:1});
  snippet.to($(show).find('[data-circlemask]'),0.5,{scale:0,ease:Power2.easeOut});

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
  let section = new TimelineMax({id:`Create Grid ${index}`});
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
  let indexCount = 0;
  master = new TimelineMax();

  // #markID0
  // Let's have a look...
  master.add(addLabel("Start"));
  master.add(prepStage());

  // #markID1
  // Take this pair of Nike shoes for example.

  master.add(popIn(indexCount++));
  master.add(addLabel("Pop in"));

// #markID2
// A chunk of the money you pay goes straight to the retailer to cover their costs and helps out their profit.
  master.add(hideBackShoe(indexCount++));
  master.add(addLabel("Single Shoe"));

// #markID3
// So now we're left with the money Nike makes wholesaling a pair of shoes.
// Say that figure is a nice, round $100 — that money takes a surprising journey.
  master.add(hideFrontShoe(indexCount++));
  master.add(addLabel("Count"));

// #markID5
// Why the Netherlands?
// It could be because Nike likes tulips and bicycles.
// Or it could be because Nike likes a tax regime that allows elaborate corporate structures.

  master.add(remove20Percent(indexCount++));
  master.add(addLabel("Remove 20 percent"))


// #markID5
// Why the Netherlands?
// It could be because Nike likes tulips and bicycles.
// Or it could be because Nike likes a tax regime that allows elaborate corporate structures.
  master.add(showNethFlag(indexCount++));
  master.add(addLabel("Show Netherlands Flag"))

// #markID6
// It's worth remembering that if you make a dollar of profit in Australia, you have to pay 30 cents in tax.
// In the Netherlands, if you play your cards right, you may not have to pay a cent.
  master.add(showAusTax(indexCount++));
  master.add(showNethTax(indexCount++));
  master.add(addLabel("Show Tax"))

  // #markID7
// That Australian money does not stay in the Netherlands.
// From the $80 Nike pays for the manufacture of each shoe, in factories it subcontracts in countries such as Vietnam,  Indonesia and China.
 master.add(returnToCosting(indexCount++));
  master.add(addLabel("Return to costing"))

  //#markID8
// While Nike's manufacturing costs aren't publicly available, a report from German consumer group Stiftung Warentest, calculated the average price of manufacturing for five of the top athletic shoes makes at about $36.

  master.add(remove36Percent(indexCount++));
  master.add(addLabel("Remove $36"))

// #markID9
// And also from the $80, Nike pays about $17 (on most recent estimates CHECK) to a company called Nike Innovate CV.
  master.add(remove17Percent(indexCount++));
  master.add(addLabel("Remove $17"))

//#markID10
// The money is for the Swoosh. It's for the bubble. (CHECK: Weird thing Nike has taken a patent out over) It's for things that Nike has taken one of x patents worldwide.
// It means that for years Nike has been sending billions of dollars offshore, first to Bermuda then to the Netherlands.

master.add(addLabel("Show Patents"))

// #markID11
// Wait. Did we say the Netherlands?
// Nike Innovate CV has no address for tax purposes. It's a Dutch company with no known tax address.
// Yet Nike Innovate CV is where Nike pools its money for royalties from all over the world.
master.add(addLabel("World view"))

// #markID11
// Nike now reports that of the $12.2 billion in profits it has made from all these royalties, it has paid about 1.4 cents in the dollar in tax.
// No wonder Nike likes the Netherlands.
master.add(showTaxGraph(indexCount++));
master.add(addLabel("Show tax graph"));


// #markID12
// Now let's go back to that $100 shoe.
master.add(returnTo100(indexCount++));
master.add(addLabel("Show whole $100"));

// #markID13
// After Nike has sent the $80 to the Netherlands, it costs about $18 to market and distribute and sell its shoes in Australia.
// So there is only a very skinny profit left in Australia: $2 for that $100 shoe.
master.add(addLabel("Remove $80"))


// #markID14
// To put that in perspective, Nike in Australia generated almost $500 million in revenue but made about $11 million in profit.
master.add(addLabel("Show profit graph"))

// #markID15
// It's these kinds of results that lead tax activists to ask: Matt Gardner quote on why do they bother to even do business in Australia.
// And they also ask why it is that Australia makes $2 in profit but Nike in America makes $14 in profit.
master.add(addLabel("Show US profit"))
// #markID16
// And how much of that $100 shoe ends up with the taxman?
master.add(addLabel("Show $100 for tax"))
// #markID17
// In 2017, it was about 76 cents.
master.add(addLabel("Show $76c"))

// #markID18
// It's not like Nike is alone in seeking out low-tax jurisdictions, and paying large sums to what are called "related parties".
// Australian Taxation Office figures show almost $400 billion flowed through low-tax jurisdictions such as the Netherlands in 2013, through tactics such as these.
master.add(addLabel("Money flow"))

// #markID19
// That figure equates to about a quarter of Australia's annual Gross Domestic Product.
master.add(addLabel("Gross domestic product"))

// #markID20
// It's a game called "profit shifting" and it makes tax officials - and the public - angry that profits are moved from high-tax countries to very low-tax countries.
// Because that's less money for roads and schools and hospitals. And fat profits for offshore companies, their lawyers and accountants.
master.add(addLabel("Profits"))

  
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
    let timeScale = (first<next?1:3);
    master.timeScale(timeScale).tweenFromTo(first,next);
    currentLabel = index;
  }
}

let playFrame = (current,prev)=>{
  let prevID = (prev?prev:0);
  console.log('playframe',current,prev);
  let first = aniLabels[prevID];
  let next = aniLabels[current];

  master.tweenFromTo(first,next);
}

module.exports = {init,play,playFrame}