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
            [[2,4],[23,26]],
            [2,3,[19,23]],
            [1,2,3,[15,21]],
            [[1,4],[11,18]],
            [[1,16]], 
            [[1,13]],
            [[1,11]],
            [[2,9]],
            [[3,7]]        
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