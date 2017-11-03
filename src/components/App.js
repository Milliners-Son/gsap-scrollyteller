const { h, Component } = require('preact');

import {TweenMax, Power2, TimelineLite,TimelineMax} from "gsap";
const TL = TweenLite;
const TM = TweenMax;


const styles = require('./scss/animation.scss');

//Components
const Tick = require('./images/tick.js');
const Oz = require('./images/australia-map.js');
const ImageHolder = require('./images/images-holder.js');
const Burst = require('./images/burst.js');
const Coin = require('./images/coin.js');
const Patents = require('./images/patents-blank.js');

const AniFrame = require('./ui/animation-frame.js');
const SimpleGraph = require('./ui/simple-graph.js');
const Costs = require('./ui/costs-holder.js');
const AniButton = require('./ui/ani-button.js');
const Label = require('./ui/label.js');

//Static Images
let shoePNG = require('./static/pixel-shoe-solo.png');
let nethFlagAni = require('./static/netherland_flag_ani.gif');
let ausFlag = require('./static/australian_flag_ani.gif');

let patentSwoosh = require('./static/patent-swoosh.png');
let patentBubble = require('./static/patent-bubble.png');
//Libs
const animation = require('../animation/animation.js');

const {IDS} = require('../components/constants.js');

let hasYetToInit = true;   
class App extends Component {
  
  componentDidMount(){
    if(hasYetToInit){
      animation.init();
      document.addEventListener('mark', tick);
      function tick(ev){
        let next = ev.detail.activated.config.id;
        let prev;
        try{
          prev = ev.detail.deactivated.config.id
        }catch(e){
          prev = false;
        }
        animation.playFrame(next,prev);
      }
      hasYetToInit = false;
    }
 
  }

  render() {
    let frameArray = [0,1,2,3,4,5,6,7,8];
    let resizeForMob = ()=>{
      $(`.${styles.canvas}`).css({"transform":"matrix(0.5, 0, 0, 0.5, -168, -140)"});
    }
    return (
      <div className={styles.body}>



        <div className={styles.canvas}>



        <AniFrame id={IDS.FRAME1} >
          
          <Burst id={IDS.BURST}/> 

          
          <Costs id={IDS.DOLLARCOUNT}
          rows={[
            <span>$100 <em>(wholesale)</em></span>,
            <span>$80 <em>(to the Netherlands)</em></span>,
            <span>- $36 <em>(production)</em></span>,
            <span>- $17 <em>(to Nike Global Trading BV)</em></span>,
            <span>- $80 <em>(to the Netherlands)</em></span>,
            <span>- $18 <em>(marketing &amp; distribution)</em></span>,
            <span>- the rest <em>(Nike Innovate CV)</em></span>
          ]}

          />


          <div className={`${styles.shoeHolder} ${styles.shoeHolderFront}`} id={IDS.SHOEHOLDER_FRONT}>

            <Tick id={IDS.TICK} className={styles.tick}/>
            <div className={styles.shoeMask} id={IDS.SHOEMASK_FRONT} />
            <ImageHolder id={IDS.SHOE_FRONT} img={shoePNG}/>
          </div>

          <div className={`${styles.shoeHolder} ${styles.shoeHolderBack}`} id={IDS.SHOEHOLDER_BACK}>
            <div className={styles.shoeMask} id={IDS.SHOEMASK_BACK} />
            <ImageHolder id={IDS.SHOE_BACK} className={styles.shoeBack} img={shoePNG}/>
          </div>
          <Label id={IDS.LABEL2DOLLAR} label="$2 profit" dir="left"/>
          <Label id={IDS.LABELTAX} label="89c tax" dir="right"/>
        </AniFrame>


        <AniFrame id={IDS.FRAME2} >
          
          <ImageHolder id={IDS.NETHERLAND_FLAG_ANI} img={nethFlagAni} className={styles.netherlandsFlag}/>
          <ImageHolder id={IDS.AUS_FLAG_ANI} img={ausFlag} className={styles.ausFlag} />
          <Coin id={IDS.AUSTAX} />
          <Coin id={IDS.NETHTAX} />

        </AniFrame>

        <AniFrame id={IDS.FRAMEPATENT} >
          <ImageHolder id={IDS.PATENTSWOOSH} img={patentSwoosh} className={styles.patentSwoosh}/>
          <ImageHolder id={IDS.PATENTBUBBLE} img={patentBubble} className={styles.patentBubble}/>
          {/*<Patents id={IDS.PATENTSBLANK} className={styles.patentHolder} />*/}

        </AniFrame>
        <AniFrame id={IDS.FRAME3} >
          
          <SimpleGraph id={IDS.TAXGRAPH} 
            rows={[<span>Profit<br />($12.2b)</span>,<span>Tax<br />($171m)</span>]}  
            label="Revenue made &amp; tax paid in the Netherlands" 
            scale={["0","$12.2b"]}
          />

        </AniFrame>

        <AniFrame id={IDS.FRAME4} >
          
          <SimpleGraph id={IDS.REVENUEGRAPH} 
            rows={[<span>Revenue<br />($500m)</span>,<span>Profit<br />($11m)</span>]} 
            label="Nike Australia - Revenue & profit 2016" 
            scale={["0","$500m"]}
          />
          <SimpleGraph id={IDS.PROFITGRAPH} 
            rows={[<span>Wholesale<br />($100)</span>,<span>US Profit<br />($14)</span>,<span>AU Profit<br />($2)</span>]}  
            label="Profit made on $100 in Australia and USA"
            scale={["0","$100"]}
          />

        </AniFrame>

        <AniFrame id={IDS.FRAME5}>
          <Oz id={IDS.OZ} className={styles.oz} />
        </AniFrame>
        </div>
        

        

        {/* <div className={styles.aniButtonHolder}>
            {  frameArray.map((num)=><AniButton className={styles.anibutton} onClick={()=>animation.play(num)} label={num}/>) }
            <AniButton className={styles.anibutton} onClick={()=>resizeForMob()} label={"RESIZE FOR MOB"}/>
        </div> */}
      </div>
    );
  }
}



module.exports = App;
