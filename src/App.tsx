import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestmsg,setLatestmsg]=useState("")

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log('Connection established');
      socket.send('Hello Server!');
    }
    socket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setLatestmsg(message.data)
    }
    setSocket(socket);
    return () => socket.close();
  }, [])

  if(!socket){
    return (<div>
      Loading ...
    </div>)
  }

  return (
    <>
      Message received : {latestmsg}
    </>
  )
}

export default App