import './App.css';
import InputTag from './components/InputTag';
import Countries from './components/Countries';
import Users from './components/users/users';
import ColorPicker from './components/ColorPicker';

 {/* <Countries data={{ china:'Beijing', Germany: 'Berlin'}} /> */}

function App() {
   return (
      <div className='App'>
         <ColorPicker />
      </div>
   )
 
}


export default App;
