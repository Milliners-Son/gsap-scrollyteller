const { h, Component } = require('preact');

import {TweenMax, Power2, TimelineLite,TimelineMax} from "gsap";
const TL = TweenLite;
const TM = TweenMax;


const styles = require('./scss/animation.scss');

//Components
const Tick = require('./images/tick.js');
const ImageHolder = require('./images/images-holder.js');
const Burst = require('./images/burst.js');
const AniButton = require('./ui/ani-button.js');
const Coin = require('./images/coin.js');
const AniFrame = require('./ui/animation-frame.js');
const SimpleGraph = require('./ui/simple-graph.js');
//Static Images
let shoePNG = require('./static/pixel-shoe-solo.png');
let nethFlagAni = require('./static/netherland_flag_ani.gif');
let ausFlag = require('./static/australian_flag_ani.gif');

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
          <div id={IDS.DOLLAR_NUMBER} className={`${styles.numberHolder} ${styles.dollarCount}`} />
          <div className={`${styles.shoeHolder} ${styles.shoeHolderFront}`} id={IDS.SHOEHOLDER_FRONT}>
            <Tick id={IDS.TICK} className={styles.tick}/>
            <div className={styles.shoeMask} id={IDS.SHOEMASK_FRONT} />
            <ImageHolder id={IDS.SHOE_FRONT} img={shoePNG}/>
          </div>

          <div className={`${styles.shoeHolder} ${styles.shoeHolderBack}`} id={IDS.SHOEHOLDER_BACK}>
            <div className={styles.shoeMask} id={IDS.SHOEMASK_BACK} />
            <ImageHolder id={IDS.SHOE_BACK} className={styles.shoeBack} img={shoePNG}/>
          </div>

        </AniFrame>


        <AniFrame id={IDS.FRAME2} >
          
          <ImageHolder id={IDS.NETHERLAND_FLAG_ANI} img={nethFlagAni} className={styles.netherlandsFlag}/>
          <ImageHolder id={IDS.AUS_FLAG_ANI} img={ausFlag} className={styles.ausFlag} />
          <Coin id={IDS.AUSTAX} />
          <Coin id={IDS.NETHTAX} />

        </AniFrame>

        <AniFrame id={IDS.FRAME3} >
          
       
          <SimpleGraph id={IDS.TAXGRAPH} rows={[<span>Revenue<br />($12.2b)</span>,<span>Tax<br />(1.4%)</span>]} />

        </AniFrame>

        <AniFrame id={IDS.FRAME4} >
          
       
          <SimpleGraph id={IDS.REVENUEGRAPH} rows={[<span>Revenue<br />($500m)</span>,<span>Profit<br />($11)</span>]} />
          <SimpleGraph id={IDS.PROFITGRAPH} rows={[<span>WHOLESALE<br />($100)</span>,<span>AU Profit<br />($2)</span>,<span>US Profit<br />($14)</span>]} />

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
