import classes from '../css/Board.module.css'
import Cell from '../components/Cell'
import { useEffect, useState } from 'react';

const Board = (props) => {
    const width = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,];
    const height = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let state = [];

    const createBoard = (width, height) => {
        for (let y of height) {
            for (let x of width) {
                state = [...state, {
                    id: `cell ${x}-${y}`,
                    coords: [x,y],
                    isOpen: false,
                    isMarked: false,
                    value: '',
                    }];
            }
        }
        return state
    }
    const [board, setBoard] = useState(createBoard(width, height));

    const spawnBombs = (quant) => {
        let bombsIndexes = new Set();
        const copyBoard = [...board].map((cell)=>{
            return {...cell, value: '', isOpen: false, isMarked: false}
        })

        const randomizer = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        while (bombsIndexes.size < quant) {
            bombsIndexes.add(randomizer(0, 99));
        }
        for (let index of bombsIndexes) {
            copyBoard[index].value = 'X';
            const [x, y] = copyBoard[index].coords; // [1, 2]
            const surrCoords = [
                [x -1, y -1],
                [x, y -1],
                [x +1, y - 1],
                [x - 1, y],
                [x + 1, y],
                [x - 1, y + 1],
                [x, y + 1],
                [x + 1, y + 1]
            ];
            for (let sC of surrCoords) {
                for (let cell of copyBoard) {
                    (JSON.stringify(sC) === JSON.stringify(cell.coords) && cell.value !== 'X') && cell.value++;
                }
            }
        };
        setBoard(copyBoard);
    };
    
     useEffect(()=>{
        spawnBombs(15);
        // console.log('spawning bombs');
    }, []);

   
    
    const openCell = (coords) => {
        const newBoard = [...board].map((cell) => 
            cell.coords === coords ? {...cell, isOpen: true} : {...cell}
        );
        setBoard(newBoard);
    }

    const openAllCells = () => {
        setBoard([...board].map((cell)=>{
            return {...cell, isOpen: true}
        }));
    }
    
    const openEmptyCells = (coords) => {
        const copyBoard = [...board].map(cell => JSON.stringify(cell.coords) === JSON.stringify(coords) ? {...cell, isOpen: true} : {...cell});
        const cellObj = copyBoard.filter(cell => JSON.stringify(cell.coords) === JSON.stringify(coords));
        const cellValue = cellObj[0].value;
        
        const emptyCells = copyBoard.filter(cell => cell.value === '');

        const openSurr = (coords) => {
            const [x, y] = coords;
            let surrCoords = [
                [x, y],
                [x - 1, y - 1],
                [x, y - 1],
                [x + 1, y - 1],
                [x - 1, y],
                [x + 1, y],
                [x - 1, y + 1],
                [x, y + 1],
                [x + 1, y + 1]
            ];
            for (let coords of surrCoords) {
                if (cellValue === ''){
                    for (let cell of copyBoard) {
                        if (JSON.stringify(cell.coords) === JSON.stringify(coords) && cell.value !== 'X') {
                            cell.isOpen = true;
                        }
                    }
                }
            }
        }
        for (let cell of emptyCells) {
            openSurr(cell.coords);
        }
        setBoard(copyBoard);
    }

    const [win, setWin] = useState(false);
    const checkWin = () => {
        const copyBoard = [...board];
        const markedCells = copyBoard.filter((cell)=>cell.isMarked === true);
        const minedCells = copyBoard.filter((cell)=>cell.value === 'X');
        if(JSON.stringify(markedCells) === JSON.stringify(minedCells) && markers === 0){
            props.makeNotification('YOU WON', 'Congratulations!!!', 'win');
            props.toggleTimer(false);
            props.saveScore();

        }
    };
    useEffect(()=>{
        checkWin();
    }, [board]);



    
    const [markers, setMarkers] = useState(15);
    const increment = () => {
        setMarkers(prevMarkers => prevMarkers + 1);
    };
    const decrement = () => {
        setMarkers(prevMarkers => prevMarkers - 1);
    };
    
    const markCell = (coords, str) => {
        let val = str === 'mark' ? true : false;
        const newBoard = [...board].map((cell) => 
            JSON.stringify(cell.coords) === JSON.stringify(coords) ? {...cell, isMarked: val} : {...cell}
        );
        setBoard(newBoard);
    }

    const restartGame = () => {
        props.makeNotification('Minesweeper', 'Test your luck!', 'default');
        props.restartTimer();
        setMarkers(15)
        spawnBombs(15);
    };
    


    return (
        <div  className={classes.board}>
            <div className={classes.markers}>Unmarked bombs - {markers}</div>
           {
               board.map((cell) =>
                <Cell
                    key={cell.id}
                    id={cell.id}
                    coords={cell.coords}
                    isOpen={cell.isOpen}
                    isMarked={cell.isMarked}
                    value={cell.value}
                    openCell={openCell}
                    openAllCells={openAllCells}
                    openEmptyCells={openEmptyCells}
                    increment={increment}
                    decrement={decrement}
                    markers={markers}
                    markCell={markCell}
                    makeNotification={props.makeNotification}
                    win={win}
                    checkWin={checkWin}
                    toggleTimer={props.toggleTimer}
                />
               )
           }
            {/*<button onClick={openAllCells}>*/}
            {/*    show all*/}
            {/*</button>*/}
            <button onClick={restartGame}>
                PLAY AGAIN
            </button>
        </div>
    )
};
export default Board;