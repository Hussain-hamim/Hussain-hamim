import React, { useEffect, useState } from "react";

//render props:
// <MealProvider render={(data) =>
// <p>Ingredients: {data.incredients}</p>} />;
//the new props are injected dynamically as parameter the funtion

const DataFetcher = ({ render, url }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (url.includes("dessert")) {
      setData(["cake", "ice cream", "pie", "browie"]);
    } else {
      setData(["water", "soda", "juice"]);
    }
  }, []);

  return render(data);
};

const DessertsCount = () => {
  return (
    <DataFetcher
      url="https://littlelemon/dessert"
      render={(data) => <p>{data.length} desserts</p>}
    />
  );
};

const DrinkCount = () => {
  return (
    <DataFetcher
      url="https://littlelemon/drink"
      render={(data) => <h3>{data.length} drinks</h3>}
    />
  );
};

const App11 = () => {
  return (
    <div>
      <header>little lemons resturant</header>
      <DessertsCount />
      <DrinkCount />
    </div>
  );
};

export default App11;
