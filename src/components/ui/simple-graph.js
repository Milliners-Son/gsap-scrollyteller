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
        let scale = [];
        let i = 1;
        for(i in props.scale){
            let scaleVar = 100/(props.scale.length-1);
            scale.push(<div style={`left:${scaleVar*i}%`} className={styles.simpleScaleLabel} >{props.scale[i]}</div>);
        }
        return (

            <div class={styles.simpleGraph} id={props.id}>
                {rows}
                {props.label?(<div className={styles.simpleCaption}>{props.label}</div>):false}
                <div className={styles.simpleScale}>{scale}</div>
            </div>
            

        );
    }
}
module.exports = SimpleGraph;