
import  '../css/Cell.css';


const Cell = (props) => {

    let open = props.isOpen ? 'opened' : ''
    let mark = props.isMarked ? 'marked' : ''
    let styles = `cell ${open} ${mark} `
    
    const cellClickHandler = (e) => {
        !props.isOpen && props.toggleTimer(true);
        if (e.type === "click") {               // LEFT CLICK
            if(!props.isOpen){
                switch(props.value) {
                    case 'X': 
                        props.makeNotification('GAMEOVER', 'You lost', 'lose');
                        props.openAllCells();
                        props.toggleTimer(false);
                        break;
                    case '':
                        props.makeNotification('GOOD LUCK', 'The the game has begun.', 'start');
                        props.openEmptyCells(props.coords);
                        break;
                    default:
                        props.makeNotification('GOOD LUCK', 'The the game has begun.', 'start');
                        props.openCell(props.coords);
                        break;
                }
                
            }
        } 
        else if (e.type === "contextmenu") {     // RIGHT CLICK
            e.preventDefault();
            if (!props.isOpen) {
                if (props.isMarked) {
                    props.markCell(props.coords, 'unmark')
                    props.increment();
                }else if (!props.isMarked && props.markers > 0){
                    props.markCell(props.coords, 'mark')
                    props.decrement();
                }
            }
        }
        props.checkWin();
    }

    return (
        <div 
            className={styles}
            onClick={cellClickHandler}
            onContextMenu={cellClickHandler}
        >
            {props.isOpen && props.value}
        </div>
    );
};
export default Cell;