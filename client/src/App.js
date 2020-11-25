import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './home'
import About from './about'
import Layout from './components/layout'

function App() {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Layout>
    </Router>
  )
}

export default App
