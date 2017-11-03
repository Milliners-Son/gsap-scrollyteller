const { h, Component } = require('preact');
const Pixels = require('./pixelart.js');
const styles = require('../scss/pixelart.scss');


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
        this.state.size = 8;
        this.state.max = 31;
    }
    render(props,state) {

        return (
            <Pixels className={`${props.className}`} options={state} id={props.id}>
            </Pixels>
        );
    }
}
module.exports = Tick;