
import { useState, useEffect } from "react"
import { setTransactionMemo, setTransactionCategory } from "../../api/TransactionAPI";
import '../../styles/transactions.css'

const Transaction  =({ transaction, categories, handleDataFetch }) =>{

    // console.log(transaction)
    const [toggleDetailOpen, setToggleDetailOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({})
    const [newMemo, setNewMemo] = useState(transaction.memo ?? '')


    const handletoggleOpen =() =>{
        setToggleDetailOpen(prev=>!prev)
    }

    const handleWebsiteOpen = (url) =>{
       window.open(url)
    }

    const handleNewMemoChange =(e)=>{
        setNewMemo(e.target.value)
    }

    const handleCategorySelect = async (e) =>{
        if(!e.target.value) return;

        const { value } = e.target;
        const categoryId = categories.find(eachCat => eachCat.name ===value).id

        try{
            const result = await setTransactionCategory(transaction.id, categoryId)
            console.log('result', result)
            handleDataFetch()
            
        }
        catch(err){
            console.log('error selecting category:', err)
        }

    

    }

    const handleMemoSave = async () =>{
        if(!newMemo.trim()) return;
        try{
            const result = await setTransactionMemo(transaction.id, newMemo)
            console.log(result)
            handleDataFetch()

        }
        catch(err){
            console.log('error saving Memo: ',err)
        }

       
    }

    useEffect(()=>{
        if(categories.length){
            setSelectedCategory(categories.find(cate=>cate.id === transaction.categoryId))
        }

    }, [categories])

    return (
        <>
           <div key={transaction.id} className='transaction'>
                <div 
                    className='transaction-main'
                    onClick={handletoggleOpen}
                >
                    <div className='transaction-name'>{transaction.merchant.name}</div>
                    <div className='transaction-info'>
                        <div className='transaction-info-sub'>
                            {transaction.accrualDate} <span>{selectedCategory?.name}</span> <span>{transaction.captureMethod}</span></div>
                        <div className='transaction-amount'> ${(transaction.amountInCents /100).toFixed(2)} {transaction.memo ?<span className='transaction-memo'>M</span>:null}</div>
                    </div>

                </div>
            </div>
            {
                toggleDetailOpen 
                   &&
                <div className='transaction-details'>
                    <div className='transaction-detail'>
                        <div className='transaction-detail-title'>Details</div>
                        <div className='transaction-detail-info'>
                            <div className='transaction-detail-info-label'>Transaction Type</div>
                            <div>{transaction.captureMethod}</div>
                        </div>
                        <div className='transaction-detail-info'>
                            <div className='transaction-detail-info-label'>Merchant Address</div>
                            <div>{transaction.merchant.address}</div>
                        </div>
                        <div className='transaction-detail-info'>
                            <div className='transaction-detail-info-label'>Merchant Name</div>
                            <div>{transaction.merchant.name}</div>
                        </div>
                        <div className='transaction-detail-info'>
                            <div className='transaction-detail-info-label'>Website</div>
                            <div className='transaction-detail-info-website' onClick={()=>handleWebsiteOpen(transaction.merchant.website)}>{transaction.merchant.website}</div>
                        </div>

                        <div className='transaction-detail-info'>
                            <div className='transaction-detail-info-label'>Category</div>
                            <div>
                                <select 
                                    className='categories'
                                    onChange={handleCategorySelect}
                                    value={selectedCategory.name}
                                >
                                    {categories.map(category=>(
                                        <option key={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>


                    </div>
                    <div className='transaction-memos'>
                        
                        <div className='transaction-inpt-container'>
                            <label htmlFor='memo' className='transaction-detail-title'>Memo</label>

                            <input
                                id='memo'
                                name='memo'
                                onChange={handleNewMemoChange}
                                value={newMemo}
                                type='string'
                                multiple
                                placeholder='No memo for this Transaction'
                            />
                        </div>
                        <button 
                            className='memo-save-button'
                            onClick={handleMemoSave}
                            disabled={!newMemo}
                        >
                            Save</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Transaction