const { h, Component } = require('preact');

class AniButton extends Component {

    constructor(){
        super();
    }
    render(props,state) {
        return (
            <div onClick={props.onClick} className={props.className}>{props.label}</div>
        );
    }
}
module.exports = AniButton;