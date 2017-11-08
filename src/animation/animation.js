import {TweenMax, Power2, TimelineLite,TimelineMax} from "gsap";
const {IDS} = require('../components/constants.js');

let master;
const aniLabels = new Array();
let currentLabel = 0;
let initAni = false;


let addLabel = (label)=>{
  aniLabels.push(label);
  //console.log(`[${label}] added to queue`)
  return label;
}
let setCurrent = (index)=>{
  currentLabel = index;
}


//TIMELINE
let init = ()=>{
  const Frames = require('./frames.js');

  master = new TimelineMax();

  // #markID0
  // Let's have a look...
  master.add(addLabel("Start"));
  master.add(Frames.popOut());

  // #markID1
  // Take this pair of Nike shoes for example.

  master.add(Frames.popIn());
  master.add(addLabel("Pop in"));

// #markID2
// A chunk of the money you pay goes straight to the retailer to cover their costs and helps out their profit.
  master.add(Frames.hideBackShoe());
  master.add(addLabel("Single Shoe"));

// #markID3
// So now we're left with the money Nike makes wholesaling a pair of shoes.
// Say that figure is a nice, round $100 — that money takes a surprising journey.
  master.add(Frames.hideFrontShoe());
  master.add(addLabel("Count"));

// #markID5
// Why the Netherlands?
// It could be because Nike likes tulips and bicycles.
// Or it could be because Nike likes a tax regime that allows elaborate corporate structures.

  master.add(Frames.remove20Percent());
  master.add(addLabel("Remove 20 percent"))


// #markID5
// Why the Netherlands?
// It could be because Nike likes tulips and bicycles.
// Or it could be because Nike likes a tax regime that allows elaborate corporate structures.
  master.add(Frames.showNethFlag());
  master.add(addLabel("Show Netherlands Flag"))

// #markID6
// It's worth remembering that if you make a dollar of profit in Australia, you have to pay 30 cents in tax.
// In the Netherlands, if you play your cards right, you may not have to pay a cent.
  master.add(Frames.showAusTax());
  master.add(addLabel("Show Oz Tax"))

  master.add(Frames.showNethTax());
  master.add(addLabel("Show Neth Tax"))

  // #markID7
// That Australian money does not stay in the Netherlands.
// From the $80 Nike pays for the manufacture of each shoe, in factories it subcontracts in countries such as Vietnam,  Indonesia and China.
 master.add(Frames.returnToCosting());
  master.add(addLabel("Return to costing"))

  //#markID8
// While Nike's manufacturing costs aren't publicly available, a report from German consumer group Stiftung Warentest, calculated the average price of manufacturing for five of the top athletic shoes makes at about $36.

  master.add(Frames.remove36Percent());
  master.add(addLabel("Remove $36"))

// #markID9
// And also from the $80, Nike pays about $17 (on most recent estimates CHECK) to a company called Nike Innovate CV.
  master.add(Frames.remove17Percent());
  master.add(addLabel("Remove $17"))

  /*
  master.add(Frames.removeTheRest());
  master.add(addLabel("Remove the rest"));
  */

//#markID10
// The money is for the Swoosh. It's for the bubble. (CHECK: Weird thing Nike has taken a patent out over) It's for things that Nike has taken one of x patents worldwide.
// It means that for years Nike has been sending billions of dollars offshore, first to Bermuda then to the Netherlands.
master.add(Frames.showPatents());
master.add(addLabel("Show Patents"))

// #markID11
// Wait. Did we say the Netherlands?
// Nike Innovate CV has no address for tax purposes. It's a Dutch company with no known tax address.
// Yet Nike Innovate CV is where Nike pools its money for royalties from all over the world.
master.add(addLabel("World view"))

// #markID11
// Nike now reports that of the $12.2 billion in profits it has made from all these royalties, it has paid about 1.4 cents in the dollar in tax.
// No wonder Nike likes the Netherlands.
master.add(Frames.showTaxGraph());
master.add(addLabel("Show tax graph"));


// #markID12
// Now let's go back to that $100 shoe.
master.add(Frames.returnTo100(3));
master.add(addLabel("Show whole $100"));

// #markID13
// After Nike has sent the $80 to the Netherlands, it costs about $18 to market and distribute and sell its shoes in Australia.
// So there is only a very skinny profit left in Australia: $2 for that $100 shoe.
master.add(Frames.remove80dollar());
master.add(Frames.remove18dollar(),"-=1");
master.add(addLabel("Remove $80"))


// #markID14
// To put that in perspective, Nike in Australia generated almost $500 million in revenue but made about $11 million in profit.
master.add(Frames.showProfitGraph());
master.add(addLabel("Show profit graph"))

// #markID15
// It's these kinds of results that lead tax activists to ask: Matt Gardner quote on why do they bother to even do business in Australia.
// And they also ask why it is that Australia makes $2 in profit but Nike in America makes $14 in profit.
master.add(Frames.showCountryGraph());
master.add(addLabel("Show US profit"))
// #markID16
// And how much of that $100 shoe ends up with the taxman?
master.add(Frames.prepTaxFrame());
master.add(addLabel("Show $100 for tax"))
// #markID17
// In 2017, it was about 76 cents.
master.add(Frames.showTaxPaid());
master.add(addLabel("Show $76c"))

// #markID18
// It's not like Nike is alone in seeking out low-tax jurisdictions, and paying large sums to what are called "related parties".
// Australian Taxation Office figures show almost $400 billion flowed through low-tax jurisdictions such as the Netherlands in 2013, through tactics such as these.
master.add(Frames.showOz());
master.add(addLabel("Money flow"))

// #markID19
// That figure equates to about a quarter of Australia's annual Gross Domestic Product.
master.add(Frames.showDomesticProduct());
master.add(addLabel("Gross domestic product"))

  
  master.add(addLabel("End"));
  master.pause();

  // let prepTL = new TimelineMax();
  // prepTL.add(Frames.prepStage());
  // prepTL.play();

  currentLabel = 0;

  initAni = true;

}
function pause(){
  master.pause();  
}  


let play = (index) =>{
  //if(!initAni) init();


  if(index!= currentLabel){
    let first,next;
    first = aniLabels[currentLabel];
    next = aniLabels[index];


    let timeScale = (first<next?1:3);
    master.timeScale(timeScale).tweenFromTo(first,next);
    currentLabel = index;
  }
}

let playFrame = (current,prev)=>{
  let prevID = (prev?prev:0);

  let first = aniLabels[prevID];
  let next = aniLabels[current];

  master.tweenFromTo(first,next);
}

module.exports = {init,play,playFrame}