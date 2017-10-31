const { h, Component } = require('preact');
const styles = require('../scss/animation.scss');

class SimpleGraph extends Component {

    constructor(){
        super();
       
    }
    render(props,state) {
        let rows = [];
        let j = 1;
        for(j in props.rows){
            rows.push(
            <div className={styles.simpleRow} data-row={j}>
                <div data-label className={styles.simpleLabel}>{props.rows[j]}</div>
            </div>
            )
        }
        return (

            <div class={styles.simpleGraph} id={props.id}>
                {rows}
            </div>
            

        );
    }
}
module.exports = SimpleGraph;