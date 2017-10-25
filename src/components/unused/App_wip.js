const { h, Component } = require('preact');


const ShoeStatic = require('./images/really-big-shoe-export.svg');
const styles = require('./scss/animation.scss');

const Shoe = require('./images/shoe.js');
const Burst = require('./images/burst.js');
const Tick = require('./images/tick.js');

const animation = require('../animation/animation.js');
const AniCanvas = require('./canvas.js');
const canvasAnimation = require('../animation/canvas_animation.js');

const SHOE_ID = "really_big_shoe";
const SHOE_HOLDER = "animation_holder";
const BURST_ID = "burst_ani";

class App extends Component {

  componentDidMount(){
    console.log('mounted');
    animation.init();
    //canvasAnimation.init();
  }

  render() {
    return (

      <div>
      <Tick />
      <div className={styles.root} id={SHOE_HOLDER}>
        <Shoe id={SHOE_ID} />
        <Burst id={BURST_ID} />
      </div>
     
      </div>
    );
  }
}



module.exports = App;
