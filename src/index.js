import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Volcano from './volcano.json';

class App extends React.Component  {
    render() {
        return (
            <div>
              <h1>Reactive Volcanoes</h1>
              <VolcanoFilteredList />
            </div>
        );
    }
}

class VolcanoFilteredList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minLat: "-180", maxLat: "180",
            minLon: "-180", maxLon: "180"};
        this.handleMinLatChange = this.handleMinLatChange.bind(this);
        this.handleMaxLatChange = this.handleMaxLatChange.bind(this);
        this.handleMinLonChange = this.handleMinLonChange.bind(this);
        this.handleMaxLonChange = this.handleMaxLonChange.bind(this);
        
    }

    handleMinLatChange(event) {
        this.setState({minLat: event});
    }

    handleMaxLatChange(event) {
        this.setState({maxLat: event});
    }
    handleMinLonChange(event) {
        this.setState({minLon: event});
    }
    handleMaxLonChange(event) {
        this.setState({maxLon: event});
    }
    
    render() {
        return (
            <div>
              <LocationRange
                minLat={this.state.minLat}
                maxLat={this.state.maxLat}
                minLon={this.state.minLon}
                maxLon={this.state.maxLon}
                onMinLatChange={this.handleMinLatChange}
                onMaxLatChange={this.handleMaxLatChange}
                onMinLonChange={this.handleMinLonChange}
                onMaxLonChange={this.handleMaxLonChange} />
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
        
        this.applyFilter = this.applyFilter.bind(this);
       
    }

    applyFilter(props) {
        this.volcanoes.filter((volcano) =>
            (   volcano['properties']['Latitude'] < props.maxLat &&
                volcano['properties']['Latitude'] > props.minLat &&
                volcano['properties']['Longitude'] < props.maxLon &&
                volcano['properties']['Longitude'] > props.minLon) ? volcano : null 
        );
    }

    render () {
        return (
    this.volcanoes.map((volcano) =>
            <tr>
              <td>{volcano['properties']['V_Name']}</td>
              <td>{volcano['properties']['Country']}</td>
              <td>{volcano['properties']['Latitude']}</td>
              <td>{volcano['properties']['Longitude']}</td>
              <td>{volcano['properties']['H_active']}</td>
              <td>{volcano['properties']['hazard']}</td>
            </tr>
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
              <div>
                <p>Latitude</p>
                <label>Min</label>
                <input type="range"
                       name="Latitude"
                       id="Latitude"
                       min="-180"
                       max="180"
                       value={this.props.minLat}
                       onChange={this.handleMinLatChange} />
                <label>Max</label>
                <input type="range"
                       name="Latitude"
                       id="Latitude"
                       min="-180"
                       max="180"
                       value={this.props.maxLat}
                       onChange={this.handleMaxLatChange} />
              </div>
              <div>
                <p>Longitude</p>
                <label>Min</label>
                <input type="range"
                       name="Latitude"
                       id="Latitude"
                       min="-180"
                       max="180"
                       value={this.props.minLon}
                       onChange={this.handleMinLonChange} />
                <label>Max</label>
                <input type="range"
                       name="Latitude"
                       id="Latitude"
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
