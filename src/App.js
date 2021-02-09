import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import "./css/Roberto.css"
import "./css/Hilal.css"
import "./css/Evgeni.css"
import "./App.css"
import Profile from "./components/Profile.jsx"
import OurNavBar from "./components/OurNavBar"
import { BrowserRouter as Router, Route } from "react-router-dom"
import NewsPage from "./components/NewsPage"

class App extends React.Component {
	render() {
		return (
			<>
				<OurNavBar />
				<Router>
					<Route exact path="/" component={NewsPage} />
					<Route path="/news/:page" component={NewsPage} />
					<Route
						path="/profile/:id"
						exact
						render={(props) => <Profile {...props} />}
					/>
				</Router>
			</>
		)
	}
}

export default App
