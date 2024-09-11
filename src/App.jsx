import React from "react"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import HomePage from "./components/HomePage"
import PostPage from "./components/PostPage"
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" Component={HomePage}/>
          <Route path="/posts/:id" Component={PostPage}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
