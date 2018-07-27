import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {searchWord:'',countries:[]};
  }
  componentDidMount(){
    axios.get("https://restcountries.eu/rest/v2/all").then((response)=>{
      this.setState({countries:response.data});
    });
  }
  handleSearch = (event)=>{
    this.setState({searchWord:event.target.value});
  }

  render() {
    

    return (
      <div>
        <form>
          find countries:<input onChange={this.handleSearch} type="text"/>
        </form>
        <CountryList countries={this.state.countries} searchWord={this.state.searchWord}/>
      </div>
    );
  }
}
const CountryList = (props)=>{
    let filteredCountries = props.countries.filter((country)=>country.name.includes(props.searchWord));
    if(filteredCountries.length>10){
      return (<p>too many matches, specify another filter</p>)
    }
    else if(filteredCountries.length==1){
      let country = filteredCountries.map((country)=>{
                                                      <div>
                                                        <h1>{country.name} {country.nativeName}</h1>
                                                        <h2>capital {country.capital}</h2>
                                                        <h2>population {country.population}</h2>
                                                        <img src={country.flag}/>
                                                      </div>})
      return(<div>{country}</div>)
    }
    else{
      let countries = filteredCountries.map((country)=>{
                                                      <div>
                                                        <h1>{country.name}</h1>
                                                      </div>})
      return(<div>{countries}</div>)
    }

  }

export default App;
