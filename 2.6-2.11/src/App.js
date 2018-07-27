import React from 'react';
import axios from 'axios';
class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      searchName: ''
    }
  }
  componentDidMount(){
    axios.get("http://localhost:3001/persons").then((response)=>{
      this.setState({persons:response.data});
    });
  }
  handleSearch = (event)=>{
    this.setState({searchName:event.target.value});
  }
  handleChange = (event)=>{
    this.setState({newName:event.target.value});
  }
  handleNumberChange = (event)=>{
    this.setState({newNumber:event.target.value});
  }
  handleSubmit = (event)=>{
    event.preventDefault();
    let newName = this.state.newName;
    let newNumber = this.state.newNumber;
    const sameName = (element)=>newName===element.name;
    if(this.state.persons.findIndex(sameName)===-1){
      let persons = [...this.state.persons,{name:newName,number:newNumber}];
      this.setState({newName:'', newNumber:'', persons:persons})
    }
    else{
      alert("Nimi "+newName+" löytyy jo luettelosta")
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form>
          <FiltterointiLomake handleSearch={this.handleSearch} searchName={this.state.searchName}/>
          <LisaysLomake handleChange={this.handleChange} 
                        newName={this.state.newName}
                        handleNumberChange={this.handleNumberChange}
                        newNumber={this.state.newNumber}
                        handleSubmit={this.handleSubmit}
          />
        </form>
        <Tiedot henkilot={this.state.persons} 
                hakuSana={this.state.searchName}
        />
      </div>
    )
  }
}
const Tiedot = (props)=>{
  let henkilot = props.henkilot;
  if(props.hakuSana!==''){
    const hakuFiltteri = (henkilo)=>henkilo.name.includes(props.hakuSana)
    henkilot = henkilot.filter(hakuFiltteri);
  }
  henkilot = henkilot.map((henkilo)=><p key={henkilo.name}>{henkilo.name} {henkilo.number}</p>)
  return(
    <div>
      <h2>Numerot</h2>
      {henkilot}
    </div>
  )

}
const LisaysLomake = (props)=>{
  return(
    <div>
      <h2>Lisää uusi</h2>
      <div>
        nimi: <input onChange={props.handleChange} value={props.newName}/>
      </div>
      <div>
        numero: <input onChange={props.handleNumberChange} value={props.newNumber}/>
      </div>
      <div>
        <button onClick={props.handleSubmit}  type="submit">lisää</button>
      </div>
    </div>)
}

const FiltterointiLomake = (props)=>(
  <div>
    rajaa näytettäviä
    <input type="text" onChange={props.handleSearch} value={props.searchName}/>
  </div>
)
export default App