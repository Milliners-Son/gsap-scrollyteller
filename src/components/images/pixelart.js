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


        let pixelRow = (index,type,className,top,left,width,height,id)=>(
            <div 
            data-id={id}
            data-pixel 
            data-index={index} 
            data-symbol={type} 
            className={className} 
            style={`top:${top}px;left:${left}px;width:${width}px;height:${height}px;`}
            data-top={top}
            data-left={left}
        />)


        let rows =[];

        var i=0,j=0;

        for(i in state.coords){

            let y = i;
            let top,left;


            for(j in state.coords[i]){
                let x = state.coords[i][j];

                 if(x.length==2){

                    let min = x[0];
                    let max = x[1];
                    let index = min;
                    while(index<=max){
                        top = y*state.size;
                        left = index*state.size;
                        rows.push(pixelRow(state.index++,state.type,styles.pixel,top,left,state.size,state.size,props.id));
                        index++;
                    }
                    
                } else{
                    top = y*state.size;
                    left = x*state.size;
                    rows.push(pixelRow(state.index++,state.type,styles.pixel,top,left,state.size,state.size,props.id));
                }
            
            }
        }  

        return (

            <div style={`width:${state.width}px;height:${state.height}px;`} onClick={props.onClick} className={`${styles.holder} ${props.className}`} id={props.id}>
                {props.children}

                {rows}
            </div>
        );
    }
}
module.exports = Pixels;