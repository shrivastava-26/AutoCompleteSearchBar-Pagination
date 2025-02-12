import React from "react";

let Key = (DataCompo) => {
  let DataComp = (props) => {
    let onePageItems = 4;
    let totalData = props.recipesData?.length || 0;
    let noOfPages = Math.ceil(totalData / onePageItems);

    return (
      <DataCompo
        {...props}
        totalData={totalData}
        noOfPages={noOfPages}
      />
    );
  };

  return DataComp;
};

export default Key;
