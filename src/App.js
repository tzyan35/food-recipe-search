import './App.css';
import './key';
import Axios from 'axios'
import React, {useState} from "react";
import RecipeTile from './RecipeTile';


function App() {

  const [query,setquery] = useState("")
  const [recipes, setrecipes] = useState([])
  const [healthLabels, sethealthLabels] = useState("vegan")

  const YOUR_APP_ID = "49ee06a5"
  const YOUR_APP_KEY = "32b47328c84bc5c5d825f062f3e86145"

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabels}`
  
  async function getRecipes(){
    var result = await Axios.get(url);
    setrecipes(result.data.hits)
    console.log(result.data)
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  }
  
  return (
    
    <div className="app">
      
      <h1>Food Recipe Plaza</h1>
      <form className='app_searchForm' onSubmit={onSubmit}>
        <input type="text" placeholder="Enter Ingredient"
        className="app_input"
        value={query} onChange={(e) => setquery(e.target.value)} ></input>

        <input className="app_submit" type="submit" value="Search"></input>
        
        <select className='app_healthLabels'>
          <option onClick={() => sethealthLabels("vegan")}>Vegan</option>
          <option onClick={() => sethealthLabels("low-sugar")}>Low Sugar</option>
          <option onClick={() => sethealthLabels("dairy Free")}>Dairy Free</option>
          <option onClick={() => sethealthLabels("Egg Free")}>Egg Free</option>
          <option onClick={() => sethealthLabels("vegetarian")}>Vegetarian</option>
        </select>

      </form>
      <div class="app_recipes">
        {recipes.map(recipe => {
          return <RecipeTile recipe={recipe}/>
         
        })}
      </div>
    </div>
  );
}

export default App;
