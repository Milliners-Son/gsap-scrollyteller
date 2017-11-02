const { h, Component } = require('preact');
let styles = require('../scss/animation.scss');

class Costs extends Component {

    constructor(){
		super();
    }
    render(props,state) {
        let rows = [];
        let j;
        for(j in props.rows){
            rows.push(
                <div className={styles.costRow} data-costrow={j}>{props.rows[j]}</div>
            )
        }

        return (
            <div id={props.id} className={`${styles.Costs} ${props.className}`}>
                {rows}
                <div className={styles.costResult} data-result>
                    <div className={styles.costBorder} data-costborder />
                </div>
			</div>
        );
    }
}
module.exports = Costs;