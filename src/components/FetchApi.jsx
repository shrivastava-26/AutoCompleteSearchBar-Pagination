import React, { useEffect, useState } from "react";

const FetchApi = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(1);
  const fetchApiHandler = async () => {

    
      let response = await fetch(`https://dummyjson.com/products/${id}`);
      let finalData = await response.json();
      console.log(finalData)
      setData([...data,finalData]);
      if(id==1){
        setId(2)
      }else{
        setId((p) => (p < 30 ? p + 1 : 1));
      }  

    }
    useEffect(()=>{
      fetchApiHandler()
    },[])

  return (
    <div style={{display:'flex', justifyContent:'center',alignItems:'center', gap:'10px', flexDirection:'column'}}>

      <table border={2} style={{position:'relative', width:'70vw',height:'20vh', left:'20%'}}>

        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Img</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {data.map((m) => (
            <tr key={m.id} >
              <td>{m.id}</td>
              <td>{m.title}</td>
              <td>
                <img
                  src={m.images}
                  width={70}
                  height={70}
                />
              </td>
              <td>{m.price}</td>
              <td>{m.description.slice(0,30)}</td>
            </tr>
          ))}
        </tbody>

      </table>
      <button style={{position:'fixed',top:'70%',left:'50%', width:'100px', height:'40px', backgroundColor:'blueviolet'}} onClick={fetchApiHandler}>Fetch</button>
    </div>
  );
};

export default FetchApi;
