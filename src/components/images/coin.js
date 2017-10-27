const { h, Component } = require('preact');
const ImageHolder = require('./images-holder.js');
const coinPNGs = [require('../static/coin-half.png'),require('../static/coin-bit.png')];
const styles = require('../scss/animation.scss');

class Coin extends Component {

    constructor(){
        super();
       
    }
    render(props,state) {

        return (
            <div id={props.id} className={`${props.className} ${styles.coin}`}>
            <ImageHolder img={coinPNGs[0]} id={`${props.id}_bg`} className={styles.coinBottom}/>
            <ImageHolder img={coinPNGs[1]} id={`${props.id}_chunk`} className={styles.coinTop}/>
            </div>

        );
    }
}
module.exports = Coin;