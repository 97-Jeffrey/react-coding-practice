

import { useState } from 'react';
import '../../styles/expense.css'

const Expense = () =>{

    const [expense, setExpense] = useState({
        description:'',
        amount:'',
        participants:''
    })

    const [expenses, setExpenses] = useState([])


    const handleExpenseField = (e) =>{
        const { name, value } = e.target;
        setExpense(prev=> ({...prev, [name]: value }))

    }

    const handleExpenseAdd =() =>{
        const { description,amount, participants} = expense;

        if( !description || !amount ||  !participants) return ;
        setExpenses(prev=> [...prev, 
            {...expense, 
              id: Date.now(),
              participants: participants.trim().split(',')
            }
        ])

        setExpense({
            description: '',
            amount:'',
            participants:''
        })
    }


  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

    const calculateExpense  = () =>{
        const exp = {};
        expenses.forEach(expense=> {
            const amountForEach = expense.amount / expense.participants.length;
            expense.participants.forEach(member=> {
                exp[member] = exp[member]|| 0 + amountForEach;
            })
        })
        return exp
    }

    const balances = calculateExpense();


    return (
        <>
            <div className='container'>
                <div className='input-container'>
                    <div>
                        <label htmlFor='description'>Description</label>
                        <input 
                            id='description' 
                            name='description'
                            value={expense.description}
                            placeholder='Description'
                            onChange={handleExpenseField}
                        />
                    </div>

                    <div>
                        <label htmlFor='amount'>Amount</label>
                        <input 
                            id='amount' 
                            name='amount'
                            type='number'
                            value={expense.amount}
                            placeholder='Amount'
                            onChange={handleExpenseField}
                        />
                    </div>

                    <div>
                        <label htmlFor='participants'>participants</label>
                        <input 
                            id='participants' 
                            name='participants'
                            value={expense.participants}
                            placeholder='Participants'
                            onChange={handleExpenseField}
                        />
                    </div>
                    <button onClick={handleExpenseAdd}>Add Expense</button>

                </div>

                <div className='expenses'>
                    {expenses.map(expense=> (
                        <div key={expense.id} className='expense'>
                            <div>{expense.description}</div>
                            <div>${expense.amount}</div>
                            <div className='expense-participants'>{expense.participants.map(person=> (
                                <div className='expense-participant' key={person}>{person}</div>))}
                            </div>
                            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                        </div>
                    ))}
                </div>

                <div>
                    <h2>Balances</h2>
                    <ul>
                    {Object.entries(balances).map(([participant, balance]) => (
                        <li key={participant}>
                        {participant} {balance >= 0 ? 'owes' : 'is owed'} ${Math.abs(balance).toFixed(2)}
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </>
    )
}


export default Expense;