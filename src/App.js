
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Board from './components/Board';
import Notification from './components/Notification';
import Timer from './components/Timer';
import GameRules from "./components/GameRules";
import Scores from "./components/Scores";
import LandingModal from "./components/LandingModal";
import { fetchUsersData, sendUsersData} from "./store/user-actions";
import {userActions} from "./store/user-slice";

let initial = true;

function App() {
  const dispatch = useDispatch();
  const showUserForm = useSelector(state => state.user.userFormVisible);
  const user = useSelector((state) => state.user);
  const username = useSelector((state) => state.user.username);
  const userNotification = useSelector((state) => state.user.userNotification);
  const [notification, setNotification] = useState({header: 'Minesweeper', text: 'Test your luck!', type: 'default'})
  const makeNotification = (header, text, type) => {
    setNotification({header: header, text: text, type: type})
  }
  const [time, setTime] = useState(0);
  const [timeOn, setTimeOn] = useState(false);

  // -----------timer section START ---------------//
  useEffect(() => {
    const timer = setTimeout(() => {
      timeOn && setTime(prevTime=>prevTime+1);
      
    }, 1000);
    return () => clearTimeout(timer);
  });
  const toggleTimer = (bool) => {
    setTimeOn(bool);
  };
  const restartTimer = () => {
    setTimeOn(false);
    setTime(0);
  }
  // -----------timer section END ---------------//

    const saveScore = () => {
        dispatch(userActions.saveScore({
            username: username,
            time: time,
        }));
        // console.log(username, time)
        dispatch(userActions.sortUsers());
        console.log('saving time and sorting')
    }

    // --------- Fetching and sending START -----//
    useEffect (()=>{
        dispatch(fetchUsersData());
    }, [dispatch]);

    useEffect (()=> {
        if (initial) {
            initial = false;
            return;
        }
        if (user.changed) {
            dispatch(sendUsersData(user));
        }
    }, [user, dispatch]);
    // --------- Fetching and sending END -----//

    useEffect(()=> {
        const time = 2000;
        const status = userNotification.status;
        const change = setTimeout(()=>{
            if(status==='Success'){
                dispatch(userActions.hideUserForm());
            }
        }, time)
        return () => clearTimeout(change)
    }, [userNotification]);


  return (
    <div className="App">
        { showUserForm && <LandingModal /> }
      <Notification
        header={notification.header}
        text={notification.text}
        type={notification.type}
      />
        <div className='App-mid'>
            <GameRules />

            <Board
                makeNotification={makeNotification}
                toggleTimer={toggleTimer}
                restartTimer={restartTimer}
                saveScore = {saveScore}
            />
            <div className='App-scoreboard'>
                <div className='Scoreboard-username'>{username}</div>
                <Timer time={time}/>
                <Scores />
            </div>

        </div>


    </div>
  );
}

export default App;
