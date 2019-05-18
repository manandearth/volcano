import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Volcano from './volcano.json';
import logo from './react-native-icon.svg';

class App extends React.Component  {
    render() {
        return (
            <div>
              <div className="topbar">
                <div className="title">
                  <h1><span className="title">[</span>REACTIVE VOLCANOES<span className="title">]</span></h1>
                  <h2 className="title">The following is a <img src={logo} className="app-logo" alt="logo" /> <span className="R">R</span>eact exercise</h2>
                  <div className="explain">
                    <p>&lt;= Update the table by sliding the range inputs for latitude and longitude.</p>
                  </div>
                </div>
              </div>

              <div className="list">
              <VolcanoFilteredList />
            </div>

            </div>
        );
    }
}

class VolcanoFilteredList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: "40", latEpsilon: "2",
            lon: "15", lonEpsilon: "2"};
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLatEpsilonChange = this.handleLatEpsilonChange.bind(this);
        this.handleLonChange = this.handleLonChange.bind(this);
        this.handleLonEpsilonChange = this.handleLonEpsilonChange.bind(this);
        
    }

    handleLatChange(value) {
        this.setState({lat: value});
    }

    handleLatEpsilonChange(value) {
        this.setState({latEpsilon: value});
    }
    handleLonChange(value) {
        this.setState({lon: value});
    }
    handleLonEpsilonChange(value) {
        this.setState({lonEpsilon: value});
    }
    
    render() {
        return (
            <section>
            <div className="container">
              <div className="location-range">
              <LocationRange
                lat={this.state.lat}
                latEpsilon={this.state.latEpsilon}
                lon={this.state.lon}
                lonEpsilon={this.state.lonEpsilon}
                onLatChange={this.handleLatChange}
                onLatEpsilonChange={this.handleLatEpsilonChange}
                onLonChange={this.handleLonChange}
                onLonEpsilonChange={this.handleLonEpsilonChange} />
              </div>
              <div>
            <table>
              <thead>
                <tr>
                  <th><div>name</div></th>
                  <th><div>Sub-region</div></th>
                  <th><div>Coordinates</div></th>
                  <th><div>Active?</div></th>
                  <th><div>Hazard Rate</div></th>
                </tr>
              </thead>
              <tbody>
                <VolcanoList
                lat={this.state.lat}
                latEpsilon={this.state.latEpsilon}
                lon={this.state.lon}
                lonEpsilon={this.state.lonEpsilon} />
              </tbody>
            </table>
            </div>
            </div>
        </section>);
    }
    
}

class  VolcanoList extends React.Component {

    constructor(props) {
        super(props);
        this.volcanoes = Volcano.features;    
    }

    render () {
        const lat = this.props.lat;
        const latEpsilon = this.props.latEpsilon;
        const lon = this.props.lon;
        const lonEpsilon = this.props.lonEpsilon;
        return (
            this.volcanoes.map((volcano) =>
                (   volcano['properties']['Latitude'] <= (parseFloat(lat)  + parseFloat(latEpsilon)) &&
                    volcano['properties']['Latitude'] >= (parseFloat(lat) - parseFloat(latEpsilon)) &&
                    volcano['properties']['Longitude'] <= (parseFloat(lon) + parseFloat(lonEpsilon)) &&
                    volcano['properties']['Longitude'] >= (parseFloat(lon) - parseFloat(lonEpsilon))) ? 
            <tr>
              <td>{volcano['properties']['V_Name']}</td>
              <td>{volcano['properties']['Subregion']}</td>
              <td>{
                  '(' + volcano['properties']['Latitude']
                  + ', ' + volcano['properties']['Longitude'] + ')'}</td>
              <td>{volcano['properties']['H_active']}</td>
              <td>{volcano['properties']['hazard']}</td>
            </tr> 
:
                    null
                ));
       
    }
}

class LocationRange extends React.Component {

    constructor(props) {
        super(props);
         this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLatEpsilonChange = this.handleLatEpsilonChange.bind(this);
        this.handleLonChange = this.handleLonChange.bind(this);
        this.handleLonEpsilonChange = this.handleLonEpsilonChange.bind(this);
    }


    handleLatChange(event) {
        this.props.onLatChange(event.target.value);
    }

    handleLatEpsilonChange(event) {
        this.props.onLatEpsilonChange(event.target.value);
    }

    handleLonChange(event) {
        this.props.onLonChange(event.target.value);
    }

    handleLonEpsilonChange(event) {
        this.props.onLonEpsilonChange(event.target.value);
    }

    
    render () {
        return (
            <div>
              <div className="slide-container">
                <p className="label">Latitude</p>
                <input className="slider"
                       type="range"
                       name="lat"
                       id="lat"
                       min="-90"
                       max="90"
                       value={this.props.lat}
                       onChange={this.handleLatChange} />
                <label>Epsilon</label>
                <input className="minislider"
                       type="range"
                       name="latEpsilon"
                       id="latEpsilon"
                       min="0"
                       max="10"
                       value={this.props.latEpsilon}
                       onChange={this.handleLatEpsilonChange} />
              </div>
              <div>
                <p className="label">Longitude</p>
                <input className="slider"
                  type="range"
                       name="lon"
                       id="lon"
                       min="-180"
                       max="180"
                       value={this.props.lon}
                       onChange={this.handleLonChange} />
                <label>Epsilon</label>
                <input className="minislider"
                       type="range"
                       name="lonEpsilon"
                       id="lonEpsilon"
                       min="0"
                       max="10"
                       value={this.props.lonEpsilon}
                       onChange={this.handleLonEpsilonChange} />
              </div>
            </div>
        );
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
