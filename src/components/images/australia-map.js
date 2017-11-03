const { h, Component } = require('preact');
const Pixels = require('./pixelart.js');
const styles = require('../scss/pixelart.scss');


class Oz extends Component {

    constructor(){
        super();
        this.state.coords = new Array(
            [9,12],
            [7,8,9,12],
            [[5,9],[11,13]],
            [[4,13]],
            [[2,14]],
            [[1,15]],
            [[1,16]],
            [[1,16]],
            [[1,16]],
            [[1,5],[8,16]],
            [2,3,[9,15]],
            [[11,15]],
            [12,13,14],
            [],
            [13,14],
            [13]
        );
        this.state.size = 8;
        this.state.max = 16;
    }
    render(props,state) {

        return (
            <Pixels className={`${props.className}`} options={state} id={props.id}>
            </Pixels>
        );
    }
}
module.exports = Oz;