const { h, Component } = require('preact');
const styles = require('./scss/canvas.scss');

class aniCanvas extends Component {
    render(props) {
        return (
            <canvas className={animationCanvas}></canvas>
        );
    }
}
module.exports = aniCanvas;