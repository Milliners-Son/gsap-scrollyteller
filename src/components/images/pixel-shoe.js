const { h, Component } = require('preact');
let shoePNG = require('./pixel-shoe-solo.png');
let styles = require('../scss/animation.scss');

class Shoe extends Component {

    constructor(){
		super();
    }
    render(props,state) {

        return (
            <div id={props.id} className={`${styles.imageHolder} ${props.className}`}>
				<img src={shoePNG} />
			</div>
        );
    }
}
module.exports = Shoe;