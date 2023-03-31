import Landing from "./components/Landing";
import Nav from "./components/Nav";
import {BrowserRouter as Router , Routes ,Route } from 'react-router-dom'
import Notes from "./components/Notes";
function App() {
  return (
    <>
    <div className="flex flex-col h-screen ">
      <Router>
        <Nav/>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/note' element={<Notes/>}></Route>
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
