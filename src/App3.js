import { useState } from "react";

function Input({ charLimit }) {
  function handleChange(event) {
    if (event.target.value.length > charLimit) {
      alert("characters limit exceeded");
    }
  }
  return (
    <input
      className="form-control"
      onChange={handleChange}
      placeholder="enter text..."
    />
  );
}
// p
const App3 = () => {
  const [mode, setMode] = useState("dark");
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  const remainChars = 20 - value.length;
  const limitExceed = remainChars < 0;

  function handleClick() {
    setMode(mode === "dark" ? "light" : "dark");
  }

  function handleValue(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (limitExceed) {
      alert("the characters limit exceed the limit please shorten it");
    } else {
      alert("thank for the submission");
    }
  }

  return (
    <section className={mode}>
      <button className="btn btn-primary" onClick={handleClick}>
        {mode === "dark" ? "activate dark mode" : "activate light mode"}
      </button>
      <hr />
      <h3>character limit</h3>
      <Input charLimit={5} />
      <br />

      <form className="form" onSubmit={handleSubmit}>
        <div>smart limited text input</div>
        <span className={value.length > 20 ? "text-danger" : "text-primary"}>
          character remaining: {remainChars}
        </span>
        <br />
        <input
          className="form-control"
          type="text"
          placeholder="enter some text"
          value={value}
          onChange={handleValue}
        />
        <button className="btn btn-primary" type="submit">
          submit
        </button>
      </form>

      <hr />

      <form className="form" onSubmit={handleSubmit}>
        <div>password</div>
        <span className={value.length > 7 ? "text-primary" : "text-danger"}>
          characters: {value.length}
        </span>
        <br />

        <div
          style={{
            backgroundColor: "yellowgreen",
            width: "300px",
            border: "2px solid red",
          }}
        >
          <input
            style={{
              backgroundColor: "yellowgreen",
              border: "none",
            }}
            className=""
            type={visible ? "text" : "password"}
            placeholder="password"
            value={value}
            onChange={handleValue}
            id="password"
          />
          <button
            style={{
              paddingRight: "5px",
              float: "right",
            }}
            className="btn "
            type="button"
            onClick={() => setVisible(!visible)}
          >
            {visible ? "👻" : "🙈"}
          </button>
        </div>

        <button className="btn btn-primary" type="submit">
          submit
        </button>
      </form>
    </section>
  );
};

export default App3;
