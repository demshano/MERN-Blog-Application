import { Routes, Route } from 'react-router-dom';
import { PostCard, Header } from './component';
import { Home, Login, Register } from './pages';
import './App.css';

function App() {
  return (
  
    <main>
           
              <Routes>
                
                  <Route index element={

                  <>
                  <Header /> 
                  <Home />
                  </>

                  } />
           

                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                
              </Routes>
        
          

          

    </main>

  );
}

export default App;
