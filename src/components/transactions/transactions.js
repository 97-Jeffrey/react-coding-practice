import { useState, useEffect} from 'react'
import { getTransactions, getCategories } from '../../api/TransactionAPI'
import '../../styles/transactions.css'

import Transaction from './transaction';

const Transactions =() =>{

    const [transactions, setTransactions] = useState([]);
    const [categories,setCategories] = useState([])
    const [trigger, setTrigger] = useState(false);

    const handleDataFetch = () =>{
        setTrigger(prev=>!prev)
    }

    useEffect(()=>{

        const handleFetchData = async()=>{
            try{
                const transactionsData = await getTransactions()
                setTransactions(Object.values(transactionsData))
          
                const categoriesData = await getCategories()
                setCategories(Object.values(categoriesData))
                
                
            }
            catch(err){
                console.log('err', err)
            }
            
        }
        handleFetchData()
 
    }, [trigger])


    return (
        <> 
           <div className='container'>
               {transactions.map(transaction=> (
                  <Transaction 
                      key={transaction.id}
                      transaction={transaction}
                      categories = {categories}
                      handleDataFetch={handleDataFetch}
                  />
                ))}

           </div>

           
        </>
    )
}

export default Transactions