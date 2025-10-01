const  AddPeopleForm = ({onSubmit, onHandleNewPerson, valueNewName, 
                          onHandleNewNumber, valueNewNum  }) =>{

    return(

     <form onSubmit={onSubmit}>
            <div>
                name: <input onChange={onHandleNewPerson} value={valueNewName} />
            </div>

             <div>
                number: <input onChange={onHandleNewNumber} value={valueNewNum} />
            </div>
            <div>
                <button type='submit'> add
                </button>

            </div>
        </form>    
    )

   }
     
     export default AddPeopleForm
