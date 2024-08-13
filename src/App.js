import logo from './logo.svg';
import './App.css';
import MyButton from './components/button.js';
import WorkingTile from './components/workingTile.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
		<WorkingTile />
      </header>	
    </div>
  );
}

export default App;
