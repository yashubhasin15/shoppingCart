import React,{useState,useEffect} from 'react';
// import ReactDOM from 'react-dom';
import alanBtn from '@alan-ai/alan-sdk-web';

function App() {

//   const menuItems = [
//     {name: "Angus Burger", price: 8.99, category: 'burger'},
//     {name: "Tuna Steak Burger", price: 15.00, category: 'burger'},
//     {name: "Bacon Burger", price: 11.50, category: 'burger'},
//     {name: "Southwest Chicken Burger", price: 9.99, category: 'burger'},
//     {name: "Mozzarella Burger", price: 12.50, category: 'burger'},
//     {name: "Cesar Salad", price: 6.50, category: 'salad'},
//     {name: "BBQ Chicken Salad", price: 13.99, category: 'salad'},
//     {name: "Garden Salad", price: 9.99, category: 'salad'},
//     {name: "Veggie Lasagna", price: 17.99, category: 'pasta'},
//     {name: "Spaghetti & Meatballs", price: 17.99, category: 'pasta'},
//     {name: "Fettuccine Alfredo", price: 17.99, category: 'pasta'},
//  ];

 const [cart, updateCart]= useState([])
 const [menuItems, updateMenu]= useState([])

 useEffect(() => {
  alanBtn({
      key: '09efdc59ab9c31db51a30eef6896acba2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'getMenu') {
          // Call the client code that will react to the received command
          updateMenu(commandData.data)
        }
        else if(commandData.command === 'addItem'){
          addItem(commandData.data)
        }
      }
  });
}, []);

 const addItem= (menuItem)=>{
  updateCart((oldCart)=> {
    return [...oldCart,menuItem]
  })
  // if(!cart.some(item=> item.name === menuItem.name)){
  //   updateCart((oldCart)=> {
  //     return [...oldCart,menuItem]
  //   })
  // }
 }

  return (
    <div className="App">

      <h2>Menu</h2>
      {menuItems.map((menuItem)=>(
        <li key={menuItem.name}>
          {menuItem.name} - ${menuItem.price} - {menuItem.category}
          {/* <button onClick={()=>{addItem(menuItem)}}>add</button> */}
        </li>
      ))}

      <h2>Cart</h2>
      {cart.map((cartItem)=>(
        <li key={cartItem.name}>
          {cartItem.name} - ${cartItem.price} - {cartItem.category}
        </li>
      ))}

    </div>
  );
}

export default App;
