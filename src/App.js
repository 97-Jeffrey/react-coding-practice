import './App.css';
import InputTag from './components/InputTag';
import Countries from './components/Countries';
import Users from './components/users/users';
import ColorPicker from './components/ColorPicker';
import Color from './components/color';
import Todo from './components/todo';
import BookMark from './components/bookmark';
import UsersFetch from './components/userFetch';

import colors from './data/color';


 {/* <Countries data={{ china:'Beijing', Germany: 'Berlin'}} /> */}
//  /  <Color data={colors}/>

function App() {
   return (
      <div className='App'>
           <UsersFetch />
      </div>
   )
 
}


export default App;
