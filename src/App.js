import './App.css';
import InputTag from './components/InputTag';
import Countries from './components/Countries';
import Users from './components/users/users';
import ColorPicker from './components/ColorPicker';
import Color from './components/color';

import colors from './data/color';

 {/* <Countries data={{ china:'Beijing', Germany: 'Berlin'}} /> */}

function App() {
   return (
      <div className='App'>
         <Color data={colors}/>
      </div>
   )
 
}


export default App;
