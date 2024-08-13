import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MyButton from './components/button.js';
import WorkingTile from './components/workingTile.js';
import WorkingForm from './components/workingForm.js';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
		<WorkingTile id="1"/>
      </header>	
    </div>
  );
}

export default App;
*/

// /*
function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<WorkingTile />} />
            <Route path="/working/:id" element={<WorkingTile />} />
			<Route path="/working/new" element={<WorkingForm />} />
        </Routes>
    </Router>
  );  
}

export default App;
// */
