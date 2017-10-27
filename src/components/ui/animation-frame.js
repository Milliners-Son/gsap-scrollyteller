const { h, Component } = require('preact');
const styles = require('../scss/animation.scss');

class AniFrame extends Component {

    constructor(){
        super();
    }
    render(props,state) {
        return (
            <div id={props.id} className={`${props.className} ${styles.frameHolder}`}>
                <div data-circlemask={props.id} className={styles.circleMask} />
                {props.children}
            </div>
        );
    }
}
module.exports = AniFrame;