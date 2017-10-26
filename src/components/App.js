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
        </div>
        

        <div className={styles.aniButtonHolder}>
          
            <AniButton className={styles.anibutton} onClick={()=>animation.play(0)} label="0"/>
            <AniButton className={styles.anibutton} onClick={()=>animation.play(1)} label="1"/>
            <AniButton className={styles.anibutton} onClick={()=>animation.play(2)} label="2"/>
            <AniButton className={styles.anibutton} onClick={()=>animation.play(3)} label="3"/>
            <AniButton className={styles.anibutton} onClick={()=>animation.play(4)} label="4"/>

        </div>
      </div>
    );
  }
}



module.exports = App;
