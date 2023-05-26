import  '../css/Notification.css'
import logo from '../img/8511.jpg'

const Notification = (props) => {

    return (
        <div className={`notification ${props.type}`}>
            {/* <img src={logo} alt='LOGO'></img> */}
            <header>
                <h3>{props.header}</h3>
            </header>
            <p>{props.text}</p>
        </div>
    )
};
export default Notification;