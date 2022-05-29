import {useEffect} from 'react';
import io from 'socket.io-client';
import {Widget,addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
const Base_Url='http://localhost:5000';

const socket=io(Base_Url);



const Ws=()=>{

    const handleNewUserMessage=(message)=>{
        console.log(message);
        socket.emit('message',{message:message});
    };
    useEffect(()=>{
        socket.on('message',(message)=>{
            addResponseMessage(message.message);
        });
    },[]);

    return(
        <div className="WS">
     
           
      
    <Widget 
        handleNewUserMessage={handleNewUserMessage}
    />
    </div>
    );
};
export default Ws;