import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons/'

const getAllPersons = () => {
  return axios.get(baseUrl)
}

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

const deletePerson = (id) => {
	return axios.delete(baseUrl+id)
}
const updatePerson = (updatedPerson)=>{
	return axios.put(baseUrl+updatedPerson.id,updatedPerson);
}



export default {getAllPersons, createPerson, deletePerson, updatePerson}