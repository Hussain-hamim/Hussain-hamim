import "./App.css";
import { RadioGroup, RadioOption } from "./Radio";
import { useState } from "react";

function App5() {
  const [selected, setSelected] = useState("");
  return (
    <div className="App">
      <h2>How did you hear about Little Lemon?</h2>

      <RadioGroup onChange={setSelected} selected={selected}>
        <RadioOption value="social_media">Social Media</RadioOption>
        <RadioOption value="friends">Friends</RadioOption>
        <RadioOption value="advertising">Advertising</RadioOption>
        <RadioOption value="other">Other</RadioOption>
      </RadioGroup>

      <button disabled={!selected}>Submit</button>
    </div>
  );
}

export default App5;

//two key feature of composition:
//1- containment:refer to the fact that some component  don't know their
//children ahead of time and
//can be describe as generic boxes like a Dialog or alert.
//2- specializaion: define component as being 'special cases' of other
//components ex, the confimationDialog is special case of Dialog.

// generic box or component
//Imperative vs. Declarative:
//react declarative model: developer focus on the describing the UI based
//one the current state the application, rather then step by step instructions
//on how to update the UI. React takes care of updating the DOM as needed.
//react imperative model: where you explicitly define each step to achieve
// a result.

//component based architecture:
//-component composition
//-reusability

//virtual DOM:
//-efficient updates
//
//state management:
