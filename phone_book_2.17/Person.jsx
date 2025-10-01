const Person = ({personn, deletePerson}) => {
  return  (
  
  <div>
      {personn.name} {' '} 
      {personn.number}   {' '} 
      <button onClick = {deletePerson}> delete </button>
  </div>)

  
}

export default Person
