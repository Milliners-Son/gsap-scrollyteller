const { h, Component } = require('preact');
const styles = require('../scss/tick.scss');
const Pixels = require('./pixelart.js');
import {TweenMax, Power2, TimelineLite,TimelineMax} from "gsap";
const TL = TweenLite;
const TM = TweenMax;

class Tick extends Component {

    constructor(){
        super();
        this.state.coords = new Array(
            [6,31],
            [4,5,29,30],
            [3,4,26,27,28],
            [2,3,4,23,24,25,26],
            [2,3,19,20,21,22,23],
            [1,2,3,15,16,17,18,19,20,21],
            [1,2,3,4,11,12,13,14,15,16,17,18],
            [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 
            [1,2,3,4,5,6,7,8,9,10,11,12,13],
            [1,2,3,4,5,6,7,8,9,10,11],
            [2,3,4,5,6,7,8,9],
            [3,4,5,6,7]        
        );
        this.state.size = 10;
        this.state.max = 31;
    }
    render(props,state) {
       
        let blastIt = ()=>{
            console.log('blastit');
            let blast = new TimelineMax;
            blast.staggerTo("div[data-symbol]",1,{top:200,ease:Bounce.easeOut},0.01);
            blast.play();
        }

        return (
            <Pixels onClick={blastIt} className={styles.tick} options={state} id="tick_graphic"/>
        );
    }
}
module.exports = Tick;