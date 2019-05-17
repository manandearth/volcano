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
              <div class="topbar">
                <div class="title">
                  <h1><span class="title">[</span>REACTIVE VOLCANOES<span class="title">]</span></h1>
                  <h2 class="title">The following is a <img src={logo} class="app-logo" alt="logo" /> <span class="R">R</span>eact exercise</h2>
                  <div class="explain">
                    <p>&lt;= Update the table by sliding the range inputs for latitude and longitude.</p>
                  </div>
                </div>
              </div>

              <div class="list">
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
            lat: "-90", latEpsilon: "0",
            minLon: "-180", maxLon: "180"};
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLatEpsilonChange = this.handleLatEpsilonChange.bind(this);
        this.handleMinLonChange = this.handleMinLonChange.bind(this);
        this.handleMaxLonChange = this.handleMaxLonChange.bind(this);
        
    }

    handleLatChange(value) {
        this.setState({lat: value});
    }

    handleLatEpsilonChange(value) {
        this.setState({latEpsilon: value});
    }
    handleMinLonChange(value) {
        this.setState({minLon: value});
    }
    handleMaxLonChange(value) {
        this.setState({maxLon: value});
    }
    
    render() {
        return (
            <section>
            <div class="container">
              <div class="location-range">
              <LocationRange
                lat={this.state.lat}
                latEpsilon={this.state.latEpsilon}
                minLon={this.state.minLon}
                maxLon={this.state.maxLon}
                onLatChange={this.handleLatChange}
                onLatEpsilonChange={this.handleLatEpsilonChange}
                onMinLonChange={this.handleMinLonChange}
                onMaxLonChange={this.handleMaxLonChange} />
              </div>
              <div>
            <table>
              <thead>
                <tr>
                  <th><div>name</div></th>
                  <th><div>Sub-region</div></th>
                  <th><div>Latitude</div></th>
                  <th><div>Longitude</div></th>
                  <th><div>Active?</div></th>
                  <th><div>Hazard Rate</div></th>
                </tr>
              </thead>
              <tbody>
                <VolcanoList
                lat={this.state.lat}
                latEpsilon={this.state.latEpsilon}
                minLon={this.state.minLon}
                maxLon={this.state.maxLon} />
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
        const minLon = this.props.minLon;
        const maxLon = this.props.maxLon;
        return (
            this.volcanoes.map((volcano) =>
                (   volcano['properties']['Latitude'] <= (parseFloat(lat)  + parseFloat(latEpsilon)) &&
                    volcano['properties']['Latitude'] >= (parseFloat(lat) - parseFloat(latEpsilon)) &&
                    volcano['properties']['Longitude'] < maxLon &&
                    volcano['properties']['Longitude'] > minLon ) ? 
            <tr>
              <td>{volcano['properties']['V_Name']}</td>
              <td>{volcano['properties']['Subregion']}</td>
              <td>{volcano['properties']['Latitude']}</td>
              <td>{volcano['properties']['Longitude']}</td>
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
        this.handleMinLonChange = this.handleMinLonChange.bind(this);
        this.handleMaxLonChange = this.handleMaxLonChange.bind(this);
    }


    handleLatChange(event) {
        this.props.onLatChange(event.target.value);
    }

    handleLatEpsilonChange(event) {
        this.props.onLatEpsilonChange(event.target.value);
    }

    handleMinLonChange(event) {
        this.props.onMinLonChange(event.target.value);
    }

    handleMaxLonChange(event) {
        this.props.onMaxLonChange(event.target.value);
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
                <input type="range"
                       name="latEpsilon"
                       id="latEpsilon"
                       min="0"
                       max="2"
                       value={this.props.latEpsilon}
                       onChange={this.handleLatEpsilonChange} />
              </div>
              <div>
                <p class="label">Longitude</p>
                <label>Min</label>
                <input type="range"
                       name="Longitude"
                       id="Longitude"
                       min="-180"
                       max="180"
                       value={this.props.minLon}
                       onChange={this.handleMinLonChange} />
                <label>Max</label>
                <input type="range"
                       name="Longitude"
                       id="Longitude"
                       min="-180"
                       max="180"
                       value={this.props.maxLon}
                       onChange={this.handleMaxLonChange} />
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
