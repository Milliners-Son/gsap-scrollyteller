const { h, Component } = require('preact');

let styles = require('../scss/animation.scss');

class ImageHolder extends Component {

    constructor(){
		super();
    }
    render(props,state) {

        return (
            <div id={props.id} className={`${styles.imageHolder} ${props.className}`}>
				<img src={props.img} />
			</div>
        );
    }
}
module.exports = ImageHolder;