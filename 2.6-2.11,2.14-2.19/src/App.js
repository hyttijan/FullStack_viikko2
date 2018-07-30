import React from 'react';
import Service from './services/persons.js'
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
    Service.getAllPersons().then((response)=>{
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
  handleDelete = (event)=>{
    let person = this.state.persons.find((person)=>{return(person.name===event.target.value)});
    if(window.confirm("Poistetaanko "+person.name+"?")){    
      Service.deletePerson(person.id).then((response)=>{
        Service.getAllPersons().then((response)=>{
          this.setState({persons:response.data});
        })
      })
    }
  }
  handleSubmit = (event)=>{
    event.preventDefault();
    let newName = this.state.newName;
    let newNumber = this.state.newNumber;
    const sameName = (element)=>newName===element.name;
    let index = this.state.persons.findIndex(sameName); 
    if(index===-1){
      Service.createPerson({name:newName,number:newNumber})
      .then(response => {
        Service.getAllPersons().then((response)=>{
          this.setState({persons:response.data});
        });
      })
    }
    else if(this.state.persons[index].number!==newNumber){
      if(window.confirm(this.state.persons[index].name+" on jo luettelossa, korvataanko vanha numero uudella?")){
        Service.updatePerson({id:this.state.persons[index].id, 
                              name:this.state.persons[index].name, 
                              number:newNumber}).then((response)=>{ 
                                Service.getAllPersons().then((response)=>{
                                this.setState({persons:response.data});
                                });
                              });
      }
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
          <FilterForm handleSearch={this.handleSearch} searchName={this.state.searchName}/>
          <AddForm handleChange={this.handleChange} 
                        newName={this.state.newName}
                        handleNumberChange={this.handleNumberChange}
                        newNumber={this.state.newNumber}
                        handleSubmit={this.handleSubmit}
          />
        </form>
        <Info persons={this.state.persons} 
                searchName={this.state.searchName}
                handleDelete={this.handleDelete}
        />
      </div>
    )
  }
}
const Info = (props)=>{
  let persons = props.persons;
  if(props.searchName!==''){
    const searchFilter = (person)=>person.name.includes(props.searchName)
    persons = persons.filter(searchFilter);
  }
  persons = persons.map((person)=>{
    return(<p key={person.name}>
      {person.name} {person.number}
      <button value={person.name} onClick={props.handleDelete}>poista</button>
    </p>)
  })
  return(
    <div>
      <h2>Numerot</h2>
      {persons} 
    </div>
  )

}
const AddForm = (props)=>{
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

const FilterForm = (props)=>(
  <div>
    rajaa näytettäviä
    <input type="text" onChange={props.handleSearch} value={props.searchName}/>
  </div>
)
export default App