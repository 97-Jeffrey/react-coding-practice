import './App.css';
import InputTag from './components/InputTag';
import Countries from './components/Countries';

function App() {
   return (
      <div className='App'>
       <Countries data={{ china:'Beijing', Germany: 'Berlin'}} />
      </div>
   )
 
}


export default App;
