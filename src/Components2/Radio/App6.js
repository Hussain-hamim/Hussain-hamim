import React, { Children, cloneElement } from "react";

const Row = ({ children, spacing }) => {
  const childStyle = {
    marginLeft: `${spacing}px`,
  };

  return (
    <div className="Row">
      {Children.map(children, (child, index) => {
        return cloneElement(child, {
          style: {
            ...child.props.style,
            ...(index > 0 ? childStyle : {}),
          },
        });
      })}
    </div>
  );
};

const App6 = () => {
  return (
    <div className="App">
      <Row spacing={32}>
        <p>pizza margirita</p>
        <p>2</p>
        <p>30$</p>
        <p>18:30</p>
        <p>Hussain</p>
      </Row>
    </div>
  );
};

export default App6;
