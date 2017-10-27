const { h, Component } = require('preact');

import {TweenMax, Power2, TimelineLite,TimelineMax} from "gsap";
const TL = TweenLite;
const TM = TweenMax;

const globalStyles = require('./scss/global.scss');
const styles = require('./scss/animation.scss');

//Components
const Tick = require('./images/tick.js');
const ImageHolder = require('./images/images-holder.js');
const Burst = require('./images/burst.js');
const AniButton = require('./ui/ani-button.js');

//Images
let shoePNG = require('./images/pixel-shoe-solo.png');


//Libs
const animation = require('../animation/animation.js');

const {IDS} = require('../components/constants.js');

      
class App extends Component {

  componentDidMount(){
    
    animation.init();
  }

  render() {
    let frameArray = [0,1,2,3,4,5];
    return (
      <div className={styles.body}>



        <div className={styles.canvas}>

          <Burst id={IDS.BURST}/>

          <div className={`${styles.shoeHolder} ${styles.shoeHolderFront}`} id={IDS.SHOEHOLDER_FRONT}>
            <Tick id={IDS.TICK} className={styles.tick}/>
            <div className={styles.shoeMask} id={IDS.SHOEMASK_FRONT} />
            <ImageHolder id={IDS.SHOE_FRONT} img={shoePNG}/>
          </div>

          <div className={`${styles.shoeHolder} ${styles.shoeHolderBack}`} id={IDS.SHOEHOLDER_BACK}>
            <div className={styles.shoeMask} id={IDS.SHOEMASK_BACK} />
            <ImageHolder id={IDS.SHOE_BACK} className={styles.shoeBack} img={shoePNG}/>
          </div>

          <div id={IDS.DOLLAR_NUMBER} className={`${styles.numberHolder} ${styles.dollarCount}`} />
        
        </div>
        
        

        <div className={styles.aniButtonHolder}>
            {  frameArray.map((num)=><AniButton className={styles.anibutton} onClick={()=>animation.play(num)} label={num}/>) }
        </div>
      </div>
    );
  }
}



module.exports = App;
