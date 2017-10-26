import {TweenMax, Power2, TimelineLite,TimelineMax} from "gsap";
require('./GSDevTools.js');
const TL = TweenLite;
const TM = TweenMax;
const SHOE_ID = "really_big_shoe";

/*
  "shoe-only"
  "swoosh-whole"
  "ground-shadow"

*/

let bounceIn = (timeline, el,delay,pos) =>{
  let bounceTL = timeline
  let randDelay = (Number.isInteger(delay)?delay:(delay?Math.random():0));
  bounceTL.set(el,{scale:0, transformOrigin:"center center"})
  bounceTL.to(el,1 ,{scale:1, transformOrigin:"center center",ease:Elastic.easeOut,delay:randDelay});
}
let fadeIn = (timeline,el,delay,pos)=>{
  console.log((pos?pos:"+=0"))
  let fadeTL = timeline;
  let randDelay = (Number.isInteger(delay)?delay:(delay?Math.random():0));
  fadeTL.set(el,{autoAlpha:0})
  fadeTL.to(el,0.1,{autoAlpha:1,delay:randDelay});
  return fadeTL;
}

let init = ()=>{
  
  let burst = new TimelineMax;
  
    burst.set("#burst_ani",{scale:0.5,left: "131px",top: "-82"})
    burst.to("#burst_ani",1.1,{rotation:30, transformOrigin:"center center"})
    burst.to('#circle_outer',0.5,{scale:5, transformOrigin:"center center"},"0");
    burst.to('#circle_inner',0.5,{scale:5, transformOrigin:"center center"},"0.5");


  //let ShoeWhole = document.getElementById("shoe-only");
  let Combo = "#really_big_shoe";
  let ShoeWhole = "#shoe-only";
  let Swoosh = "#swoosh-whole";
  let Shadow = "#ground-shdow"
  let Laces = "#laces";
  let Stitches ="#stiches";

  console.log(ShoeWhole,Swoosh,Shadow);
  let master = new TimelineMax();
  let panel1 = new TimelineMax({id:"Panel 1"});

  //Start states
  panel1.set([ShoeWhole],{autoAlpha:0});
  panel1.set(Shadow,{autoAlpha:0,scaleX:0.8});
  panel1.set(Combo,{rotation:0})
  
  panel1.set(Swoosh,{scale:0, transformOrigin:"center center"});
  panel1.to(Swoosh,1,{scale:1, transformOrigin:"center center",ease:Elastic.easeOut});
  panel1.add(burst);
  //panel1.add(TweenLite.to(ShoeWhole,2,{autoAlpha:1}) );
  //TweenLite.fromTo(document.getElementById(SHOE_ID), 1, {css:{rotation:30,bottom:200}}, {ease: Bounce.easeOut,css:{rotation:0,bottom:0}});
  
  let panel2 = new TimelineMax({id:"Panel 2"});
  panel2.set(ShoeWhole,{autoAlpha:1});
  panel2.set(".shoepart",{scale:0, transformOrigin:"center center"});
  panel2.set(Laces,{autoAlpha:0});
  panel2.set(Stitches,{autoAlpha:0});

  panel2.to(Combo,1,{y:-300,rotation:10,ease:Power4.easeOut});
  panel2.staggerTo(".shoepart",1,{scale:1, transformOrigin:"center center",ease:Elastic.easeOut},0.01,"0.5");
  
  panel2.to(Shadow,1,{scaleX:1.2, autoAlpha:0.8, transformOrigin:"center center",ease:Elastic.easeOut},"0.5");

  panel2.to(Laces,0.1,{autoAlpha:1},"0.75");
  panel2.to(Stitches,0.1,{autoAlpha:1},"0.75");
  panel2.to(Combo,0.5,{y:-75,ease:Bounce.easeOut});
  panel2.to(Shadow,0.5,{scaleX:1,autoAlpha:1,ease:Bounce.easeOut},"-=0.5");
  panel2.to(Combo,0.5,{rotation:0, transformOrigin:"center center"},"-=0.5");
  


  master.add(panel1).add(panel2);
  master.play();


  GSDevTools.create({paused:true});

}

module.exports = {init}