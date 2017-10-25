const { h, Component } = require('preact');
const styles = require('./burst.scss');

class Burst extends Component {
    render(props) {
        return (

            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 556 556" style="enable-background:new 0 0 556 556;" id={props.id} className={styles.burst}>
            <g>
                <line className={styles.st0} x1="278.8" y1="36.9" x2="278.8" y2="516.9"/>
            </g>
            <g>
                <line className={styles.st0} x1="518.8" y1="276.9" x2="38.8" y2="276.9"/>
            </g>
            <g>
                <line className={styles.st0} x1="448.5" y1="107.2" x2="109.1" y2="446.6"/>
            </g>
            <g>
                <line className={styles.st0} x1="109.1" y1="107.2" x2="448.5" y2="446.6"/>
            </g>

            <circle className={styles.st1} cx="278.8" cy="276.9" r="84" id="circle_inner"/>
            
            <path id="circle_outer" className={styles.st1} d="M278.8,5.9c-149.7,0-271,121.3-271,271s121.3,271,271,271s271-121.3,271-271S428.5,5.9,278.8,5.9z M278.8,360.9
                c-46.4,0-84-37.6-84-84s37.6-84,84-84s84,37.6,84,84S325.2,360.9,278.8,360.9z"/>
            </svg>
        );
    }
}
module.exports = Burst;