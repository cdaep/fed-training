import { Outlet } from 'react-router-dom';
import Header from "../src/components/Header/Header"



function App() {
  return (
    <div>
     <Header/>
     <Outlet />
    </div>
  );
}

export default App;
