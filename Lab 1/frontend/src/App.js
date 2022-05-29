import './App.css';
import Chat from './components/Chat';
import LongChat from './components/LongChat';

function App() {
  return (
    <div className="App mt-5">
      <h3>Short Polling</h3>
      <Chat />
      <h3>Long Polling</h3>
      <LongChat />
    </div>
  );
}

export default App;
