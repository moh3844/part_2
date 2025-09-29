const Course = ({course}) => {

    const Header = ({name}) => <h1>{name}</h1>

    const Total  = ({total})=> <p>Total of {total.reduce((sum, val)=>sum + val) } exercises</p>

    const Content = ({parts}) => {
        return(
            <div>
            {parts.map ( item => <Part key = {item.id} part = {item} /> )}
            </div>
        )
        }

    const Part = ({part})=> {
        return(
            <p>
            {part.name} {part.exercises} 
            </p>
        )
        }
    
    return(
       <div>

          {course.map((item)=>
            { return( 
                <div key = {item.id} >
                  <Header  name    = {item.name}/>
                  <Content parts   = {item.parts} /> 
                  <Total   total   = {item.parts.map(part => part.exercises)} />
                </div> 
               )
            }
         )
         }
       </div>
  )
}

export default Course 
