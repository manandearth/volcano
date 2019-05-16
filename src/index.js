import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Volcano from './volcano.json';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillMount(){
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
    
    render() {
        return (
            <div>
              <h1>It is {this.state.date.toLocaleTimeString()}</h1>
            </div>
        );
    }
}

class Toggle extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {isToggleOn :true};

         this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state =>({
            isToggleOn: !state.isToggleOn}));
    }

    render() {
        return (
            <div>
              <button onClick={this.handleClick}>
              {this.state.isToggleOn ? 'ON' : 'OFF'}
              </button>
             
            <div>{this.state.isToggleOn ? 'right...' : null}</div>
              <div>{this.state.isToggleOn ?  
                  <Clock /> : null }
                </div>
            </div>
        );
    }
}


// function GetData(props) {
//     const dataSet = Volcano.features;
//     // const data = JSON.parse(dataSet['type']);
//     return ) ;
// }

class App extends React.Component  {
    render() {
        return (
            <div>
              <h1>Reactive Volcanoes</h1>
              <SearchBox />
              <LocationRange />
              <VolcanoNameList />
            </div>
        );
    }
}


function VolcanoList(props) {
    
    const jsonList = Volcano.features;
    
    const jsonNames = jsonList.map((volcano) =>
        <tr>
          <td>{volcano['properties']['V_Name']}</td>
          <td>{volcano['properties']['Country']}</td>
          <td>{volcano['properties']['Latitude']}</td>
          <td>{volcano['properties']['Longitude']}</td>
          <td>{volcano['properties']['H_active']}</td>
          <td>{volcano['properties']['hazard']}</td>
          
        </tr>
    );
    return jsonNames;
}

class SearchBox extends React.Component {

    render () {
        return (
            <fieldset>
              <legend>Enter the volcano name</legend>
              <input value=""/>
            </fieldset>
        );
        }
}


class LocationRange extends React.Component {

    render () {
        return (
            <div>
              <div>
                <p>Latitude</p>
                <label>Min</label>
                <input type="range" name="Latitude" id="Latitude" min="-180" max="180" />
                <label>Max</label>
                <input type="range" name="Latitude" id="Latitude" min="-180" max="180" />
              </div>
              <div>
                <p>Longitude</p>
                <label>Min</label>
                <input type="range" name="Latitude" id="Latitude" min="-180" max="180" />
                <label>Max</label>
                <input type="range" name="Latitude" id="Latitude" min="-180" max="180" />
              </div>
            </div>
        );
    }
}

class VolcanoNameList extends React.Component {

    render() {
        return (
            <div>
              <table>
                <tr>
                  <th>name</th>
                  <th>Country</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Active?</th>
                  <th>Hazard Rate</th>
            </tr>
                <VolcanoList />
              </table>
            </div>);
    }
    
    
}



ReactDOM.render(
	<App />,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
