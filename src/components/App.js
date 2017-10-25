const { h, Component } = require('preact');


const globalStyles = require('./scss/global.scss');
const styles = require('./scss/animation.scss');

//Componsnets
const Tick = require('./images/tick.js');

//Libs
const animation = require('../animation/animation.js');


const TICK_ID = "tick_holder";

class App extends Component {

  componentDidMount(){

  }

  render() {
    return (
      <div className={styles.body}>
      <Tick id={TICK_ID} className={styles.tick}/>
      </div>
    );
  }
}



module.exports = App;
