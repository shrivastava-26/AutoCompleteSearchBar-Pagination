import React, { useEffect, useState } from "react";
import "./Pagination.css"; 

const Pagination = () => {
  let [data, setData] = useState([]);
  let [currPage, setCurrPage] = useState(0);

  let ProductCard = ({ image, title }) => {
    return (
      <div className="product-card">
        <h2>{title}</h2>
        <img src={image} alt={title} className="product-image" />
      </div>
    );
  };

  let fetchApiHandler = async () => {
    let data = await fetch("https://dummyjson.com/products?limit=190");
    let finalData = await data.json();
    setData(finalData.products);
    console.log(finalData)
  };


  let noOfPages = 6;
  let totalPage = data.length;
  let page = Math.floor(totalPage / noOfPages);

  let st = currPage * page;
  let end = st + noOfPages;

  let paginationHandler =(n)=> {
    setCurrPage(n)
  }

  let nextPage = () => {
    setCurrPage((n)=>n+1)
  }

  let prevPage = () => {
    setCurrPage((p)=>p-1)
  }

  useEffect(() => {
    fetchApiHandler();
  }, []);

  return !data.length ? (
    <h2>No Product found</h2>
  ) : (
    <div className="container">
      <div>
        <button disabled={currPage === 0} style={{ margin: "5px", position: "relative", bottom: "20px"}} onClick={()=> prevPage()}>
          ◀️
        </button>

        {[...Array(page).keys()].map((m) => {
          return (
            <button
              onClick={() => paginationHandler(m)}
              key={m}
              className={"pageNum" + (m == currPage ? "active" : "")}
            > 
              {m}
            </button>
          );
        })}
        <button disabled={currPage === page} style={{ margin: "5px", position: "relative", bottom: "20px" }} onClick={()=>nextPage()}>
          ▶️
        </button>
      </div>

      <div className="product-container">
        {data.slice(st, end).map((m) => (
          <ProductCard key={m.id} image={m.thumbnail} title={m.title} />
        ))}
      </div>
    </div>
  );
};

export default Pagination;
