
import Button from "./Button"
const Header = ({title,onAdd,showAdd}) => {
  return (
    <header className='header'>
        <h1>
            {title}
        </h1>
        <Button color={showAdd ? 'Red' : 'Green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
        
    </header>
  )
}

// const headingStyle={
//     color:'red',
//     backgroundColor:'black',
//   }
  

export default Header