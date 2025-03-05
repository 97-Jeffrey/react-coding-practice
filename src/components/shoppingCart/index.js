
import { useState } from 'react';
import '../../styles/shoppingCart.css'

const ShoppingCart = () =>{
    const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
    ];
    const [cart, setCart] = useState([])
    const [toggleCartOpen, setToggleCartOpen] = useState(false)

    const handleCartToggle = ()=>
        setToggleCartOpen(prev=> !prev)

    const handleAddToCart = (product) =>{
       //if already in cart:
          if(cart.find(item=> item.id===product.id )){
            setCart(prev=> prev.map(item=> item.id===product.id? 
                {...item, quantity: item.quantity+1}: item ))
    
          }
              //not in chart
            else{
                setCart(prev=> [...prev, {...product, quantity: 1}])
            }

    }

    const increment = (product) =>{
        setCart(prev=> prev.map(item=> item.id===product.id? 
            {...item, quantity: item.quantity+1}: item ))
    }

    const decrement = (product) =>{
        if(product.quantity ===1){
            removeItem(product)
        }
        else{
            setCart(prev=> prev.map(item=> item.id===product.id? 
            {...item, quantity: item.quantity-1}: item ))
        }
    }

    const removeItem  = (product) =>{
        setCart(prev=> prev.filter(item=> item.id!==product.id ))
    }

    const totalPrice = cart.reduce((pre, cur)=> pre+ cur.price* cur.quantity, 0)

    const totalQuanlity = cart.reduce((pre, cur)=> pre+ cur.quantity, 0)


    return (
        <>
           <div className='container'>
                <div className='cart'>
                    <button className='cart-button' onClick={handleCartToggle}>
                        <span>My Cart </span> 
                        { totalQuanlity>0 &&<span className='quantity-indicator'>{totalQuanlity}</span>}
                    </button>
                    { toggleCartOpen 
                        &&
                    <div className='cart-list'>
                     
                        {cart.map(product=>(
                            <div key={product.id} className='cart-product'>
                                 <div>{product.name}</div>
                                 <div>${product.price}</div>
                                 <div className='quantity-card'>{product.quantity}</div>
                                 <button className='add-button' onClick={()=>increment(product)}>+</button>
                                 <button className='add-button' onClick={()=>decrement(product)}>-</button>
                                 <button className='remove-button' onClick={()=>removeItem(product)}>Remove</button>

                            </div>
                        ))}

                        {cart.length> 0 ?
                        <div>Total Price: {totalPrice}</div>:
                        <div>Empty Cart</div>
                        }
                
                    </div>
                    }
                </div>
               
               <div className='products'>
                  {products.map(product=>(
                    <div className='product' key={product.id}>
                        <div>Name: {product.name}</div>
                        <div>Price: {product.price}</div>
                        <button 
                            className='add-to-cart-button'
                            onClick={()=> handleAddToCart(product)}
                            aria-label={`Add ${product.name} to cart`}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}

               </div>

           </div>
        </>

    )
}


export default ShoppingCart;