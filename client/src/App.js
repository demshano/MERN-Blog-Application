import { Routes, Route } from 'react-router-dom';
import { PostCard, Header, Footer } from './component';
import { Home, Login, Register, CreatePost, PostPage, EditPost } from './pages';
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
                            <Footer />
                          </>

                    } 
                  />
           

                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/create' element={<CreatePost />} />
                  <Route path='/post/:id' element={<PostPage />} />
                  <Route path='/edit/:id' element={<EditPost />}/>
                
              </Routes>

          </UserContextProvider>
        
          

          

    </main>

  );
}

export default App;
