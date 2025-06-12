import Counter from "./components/Counter/Counter"
import AddPostForm from "./components/Posts/AddPostForm"
import PostsList from "./components/Posts/PostsList"
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Profile from "./Pages/Profile";
import PrivateRoutes from "./Routes/PrivateRoutes";
import BlogDetails from "./Pages/BlogDetails";

function App() {

  return (
    <Router>
      <Routes>
    
    
    <Route path="/"  element={ <> {/* <Counter /> */} <AddPostForm /> <PostsList />  </> }/>

    <Route element={ <PrivateRoutes /> }>
    <Route path="/post/:postId" element={<BlogDetails />} />
    <Route path="/profile/:userId"  element={<Profile />}/>
    </Route>

      </Routes>
    </Router>
  )
}

export default App
