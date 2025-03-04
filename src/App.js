import './App.css';
import InputTag from './components/InputTag';
import Countries from './components/Countries';
import Users from './components/users/users';
import ColorPicker from './components/ColorPicker';
import Color from './components/color';
import Todo from './components/todo';

import colors from './data/color';
import BookMark from './components/bookmark';

 {/* <Countries data={{ china:'Beijing', Germany: 'Berlin'}} /> */}
//  /  <Color data={colors}/>

function App() {
   return (
      <div className='App'>
           <BookMark />
      </div>
   )
 
}


export default App;
