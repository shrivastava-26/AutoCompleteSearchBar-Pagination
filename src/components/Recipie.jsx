import axios from "axios";
import React, { useEffect, useState } from "react";
// import key from "../assets/key";
import "./Recipie.css";

const Recipie = () => {
  let [recipesData, setRecipesData] = useState([]);
  let [currId, setCurrId] = useState(0);
  let [inputData, setInputData] = useState("");
  let [show, setShow] = useState(false)
  //! caching
  let [cache, setCache] = useState({})

  let RecipieCard = ({ cuisine, name, image }) => {
    return (
      <div className="recipe-card">
        <img
          src={image}
          alt={name}
          width={200}
          height={200}
          className="recipe-image"
        />
        <h3>{cuisine}</h3>
        <p>{name}</p>
      </div>
    );
  };

  let fetchApiHandler = async () => {

    if(cache[inputData]){
      console.log("cache return",inputData)
      setRecipesData(cache[inputData])
      return;
    }

    let res = await axios.get("https://dummyjson.com/recipes?limit=1000");
    setRecipesData([...res?.data?.recipes]);
    console.log("api call")
    setCache((prev) => ({...prev, [inputData]:res?.data?.recipes}))
    console.log(inputData)

    setCache(()=> localStorage.setItem([inputData],res.data.recipes))
    
  }

  useEffect(() => {
    //!debouncing
  let timer = setTimeout(() => {
    fetchApiHandler();
  }, 1000);

  return () => clearTimeout(timer);
}, [inputData]);



  //!pagination functionality

  let onePageItems = 4;
  let totalData = recipesData.length;
  let noOfPages = Math.floor(totalData / onePageItems);
  let st = currId * onePageItems;
  let end = st + onePageItems;

  let pageHandler = (m) => setCurrId(m);

  let prevClick = () => setCurrId((p) => p - 1);

  let nextClick = () => setCurrId((n) => n + 1);

  let changeHandler = (e) => {
    setInputData(() => e.target.value);
  };

  // console.log(inputData)

  return !recipesData ? (
    <h1>Product not found</h1>
  ) : (
    <div className="recipe-container">
      <div className="search">
        <input
          placeholder="Atuto Complete search bar"
          onChange={changeHandler}
          value={inputData}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
        />

        <div className="suggestion">
          {show &&
            recipesData
              .filter((f) =>
                f.name.toLowerCase().includes(inputData.toLowerCase())
              )
              .map((m) => (
                <div className="showHide" key={m.id}>
                  <span key={m.id}>{m.name}</span>
                </div>
              ))}
        </div>
      </div>

      <div className="btn">
        <button
          disabled={currId === 0}
          style={{ width: "25px", height: "25px" }}
          onClick={() => prevClick()}
        >
          ◀️
        </button>

        {[...Array(noOfPages).keys()].map((m) => {
          return (
            <button
              key={m}
              style={{
                width: "25px",
                height: "25px",
                backgroundColor: currId === m ? "red" : "white",
              }}
              onClick={() => pageHandler(m)}
            >
              {m + 1}
            </button>
          );
        })}

        <button
          disabled={currId === noOfPages - 1}
          style={{ width: "25px", height: "25px" }}
          onClick={() => nextClick()}
        >
          ▶️
        </button>
      </div>

      <div className="card">
        {recipesData.slice(st, end).map((m) => {
          return (
            <RecipieCard
              key={m.id}
              image={m.image}
              name={m.name}
              cuisine={m.cuisine}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Recipie;
