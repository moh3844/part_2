import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import AddPeopleForm from './components/AddPeopleForm'
import Person from './components/Person';

import Notification from './components/Notification';

import personService from './services/persons'

const App = () => {
const [persons, setPersons] = useState([])

const [newName, setNewName]           =  useState('')
const [newNumber, setNewNumber]       =  useState('')
const [searchPerson, setSearchPerson] =  useState('')
const [message, setMessage] =  useState(null)
const [className, setClassName] = useState(null)

useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

const personsToShow = searchPerson === '' ? 
persons:
persons.filter(person=>person.name.toLowerCase().includes(searchPerson))

const addPerson = (event)=>{
   event.preventDefault();
   const obj = {name : newName, number: newNumber}
   
  if (obj.name)  //if name is not epmty
 {

    if (persons.find(element=>element.name.toLowerCase() === newName.toLowerCase())) 
    {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number
    with a new one?`)) {
    
        const person = persons.find(n => n.name.toLowerCase() === newName.toLowerCase())
        const personId = person.id
        const url = `http://localhost:3001/persons/${personId}`
        const changedPerson = { ...person, number: newNumber }

        personService
        .update(personId, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === personId ? returnedPerson : person))
         
          setMessage(`Number changed! `)

          setTimeout(() => {
           setMessage(null)      
          }, 3000);
         
         setClassName('succMessage')
         
        
      }) 

     .catch(error => {
        setMessage(
          `Information of "${changedPerson.name}" has been removed from server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)

        setClassName('errMessage')
       

    })  

   
   }

  } 
    else  
    {
      personService
          .create(obj)
          .then(returnedPerson => {
        
          setPersons(persons.concat(returnedPerson));

          setMessage(`Added "${returnedPerson.name}" `)

          setTimeout(() => {
           setMessage(null)      
          }, 3000);
         
          setClassName('succMessage')

          
      })
    } 

       setNewName('')
       setNewNumber('')
       setSearchPerson('') 

 }

}

  const handleDeletePerson = id =>{
    const pers = persons.find((person=>person.id === id))
    
    if (window.confirm(`Delete ${pers.name} ?`)) {
      setPersons(persons.filter(person => person.id !== id))
      personService
      .deletePerson(id)
     
      .catch(error => {
        setMessage(
          ` "${pers.name}" has been removed from server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)

        setClassName('errMessage')

    })  

  }  
} 
   
  
   
  const handleNewPerson = (event)=>{
  setNewName(event.target.value)
  }

  const handleNewNumber = (event)=>{
  setNewNumber(event.target.value)
  }

  const handleFilter = (event)=>{
  setSearchPerson(event.target.value.toLowerCase())
  }

 
return (
    
    <div>
        <h2>Phonebook</h2>
        <Notification message={message} className={className} />

        <Filter onChange={handleFilter} value={searchPerson} />

         <h2>add a new</h2>
        <AddPeopleForm onSubmit={addPerson} 
                      onHandleNewPerson = {handleNewPerson} valueNewName = {newName}
                      onHandleNewNumber = {handleNewNumber} valueNewNum = {newNumber}/>

         <h2>Numbers</h2>
         <div>{personsToShow.map(person =><Person key = {person.id} 
                                                  personn = {person} 
                                                  deletePerson = {() => {handleDeletePerson(person.id)}}
                                                                                    
                                                  /> )
              }
              
        </div>

    </div>
   
  )
}

export default App
