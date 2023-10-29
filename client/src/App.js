import { Routes, Route } from 'react-router-dom';
import { PostCard, Header } from './component';
import { Home, Login, Register, CreatePost } from './pages';
import { UserContextProvider } from './UserContext';
import './App.css';

function App() {
  return (
  
    <main>
           <UserContextProvider>

              <Routes>
                
                  <Route index element={
                    
                          <>
                            <Header /> 
                            <Home />
                          </>

                    } 
                  />
           

                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/create' element={<CreatePost />} />
                
              </Routes>

          </UserContextProvider>
        
          

          

    </main>

  );
}

export default App;
