const { h, Component } = require('preact');
const styles = require('../scss/pixelart.scss');

class Pixels extends Component {

    constructor(){
        super();
        this.state = {
            coords:[[1,2,3],[1,2,3],[1,2,3]],
            size:'1',
            type:'default',
            max:'3',
            index:1
        }
    }
    render(props,state) {
    
        //Replace default states with props.options;
        
       state.coords = (props.options.coords?props.options.coords:state.coords);
       state.size = (props.options.size?props.options.size:state.size);
       state.type = (props.options.type?props.options.type:state.type);
       state.max = (props.options.max?props.options.max:state.max);
       state.width = state.max*state.size;
       state.height = state.coords.length*state.size;

        return (

            <div style={`width:${state.width}px;height:${state.height}px;`} onClick={props.onClick} className={styles.holder} id={props.id}>
                {state.coords.map(
                    (row,y)=>
                row.map((x)=>(
                    <div 
                        data-index={state.index++} 
                        data-symbol={state.type} 
                        className={styles.pixel} 
                        style={`top:${y*state.size}px;left:${x*state.size}px;width:${state.size}px;height:${state.size}px;`}
                    >
                    </div>
                )            
                    ))
            }
            </div>
        );
    }
}
module.exports = Pixels;