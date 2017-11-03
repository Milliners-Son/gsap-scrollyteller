const { h, Component } = require('preact');

const styles = require('../scss/animation.scss');


class Label extends Component {

    constructor(){
        super();
    }
    render(props,state) {

        return (
            <div id={props.id} className={`${props.className} ${styles.label}`}>
                <div className={props.dir=="left"?styles.labelArmLeft:styles.labelArmRight}></div>
                <div className={styles.labelBox}>{props.label}</div>
            </div>
        );
    }
}
module.exports = Label;