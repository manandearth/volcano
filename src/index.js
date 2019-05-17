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
                  <p>Update the table by sliding the range inputs for latitude and longitude.</p>
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
            minLat: "-90", maxLat: "90",
            minLon: "-180", maxLon: "180"};
        this.handleMinLatChange = this.handleMinLatChange.bind(this);
        this.handleMaxLatChange = this.handleMaxLatChange.bind(this);
        this.handleMinLonChange = this.handleMinLonChange.bind(this);
        this.handleMaxLonChange = this.handleMaxLonChange.bind(this);
        
    }

    handleMinLatChange(value) {
        this.setState({minLat: value});
    }

    handleMaxLatChange(value) {
        this.setState({maxLat: value});
    }
    handleMinLonChange(value) {
        this.setState({minLon: value});
    }
    handleMaxLonChange(value) {
        this.setState({maxLon: value});
    }
    
    render() {
        return (
            <div>
              <div class="location-range">
              <LocationRange
                minLat={this.state.minLat}
                maxLat={this.state.maxLat}
                minLon={this.state.minLon}
                maxLon={this.state.maxLon}
                onMinLatChange={this.handleMinLatChange}
                onMaxLatChange={this.handleMaxLatChange}
                onMinLonChange={this.handleMinLonChange}
                onMaxLonChange={this.handleMaxLonChange} />
              </div>
            <table>
                <tr>
                  <th>name</th>
                  <th>Country</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Active?</th>
                  <th>Hazard Rate</th>
            </tr>
                <VolcanoList
                minLat={this.state.minLat}
                maxLat={this.state.maxLat}
                minLon={this.state.minLon}
                maxLon={this.state.maxLon} />
              </table>
            </div>);
    }
    
}

class  VolcanoList extends React.Component {

    constructor(props) {
        super(props);
        this.volcanoes = Volcano.features;    
    }

    render () {
        const minLat = this.props.minLat;
        const maxLat = this.props.maxLat;
        const minLon = this.props.minLon;
        const maxLon = this.props.maxLon;
        return (
            this.volcanoes.map((volcano) =>
                (   volcano['properties']['Latitude'] < maxLat &&
                    volcano['properties']['Latitude'] > minLat &&
                    volcano['properties']['Longitude'] < maxLon &&
                    volcano['properties']['Longitude'] > minLon ) ? 
            <tr>
              <td>{volcano['properties']['V_Name']}</td>
              <td>{volcano['properties']['Country']}</td>
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
         this.handleMinLatChange = this.handleMinLatChange.bind(this);
        this.handleMaxLatChange = this.handleMaxLatChange.bind(this);
        this.handleMinLonChange = this.handleMinLonChange.bind(this);
        this.handleMaxLonChange = this.handleMaxLonChange.bind(this);
    }


    handleMinLatChange(event) {
        this.props.onMinLatChange(event.target.value);
    }

    handleMaxLatChange(event) {
        this.props.onMaxLatChange(event.target.value);
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
              <div class="slide-container">
                <p class="label">Latitude</p>
                <label>Min</label>
                <input class="slider"
                       type="range"
                       name="Latitude"
                       id="Latitude"
                       min="-90"
                       max="90"
                       value={this.props.minLat}
                       onChange={this.handleMinLatChange} />
                <label>Max</label>
                <input type="range"
                       name="Latitude"
                       id="Latitude"
                       min="-90"
                       max="90"
                       value={this.props.maxLat}
                       onChange={this.handleMaxLatChange} />
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
