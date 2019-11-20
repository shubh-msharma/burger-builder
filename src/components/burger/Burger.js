import React from 'react'
import "./burger.css"
import BurgerIngredients from './burgerIngredients/BurgerIngredients'

export default function Burger(props) {
let  transformedIngredients = Object.keys(props.ingredients).map(igk=>{
    return [...Array(props.ingredients[igk])].map((_,index)=>{
        return <BurgerIngredients key = {index+igk} type = {igk}/>
    })
}).reduce((arr,ele)=>{
    return arr.concat(ele);
},[]);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>please start adding ingredients !</p>
    }
    return (
        <div className = "burger">
            <BurgerIngredients type = "bread-top"/>
            {
                transformedIngredients
            }
            <BurgerIngredients type = "bread-bottom"/>
        </div>
    )
}
