import React, { useRef } from "react";

const CatFriends = () => {
  const listRef = useRef(null);

  function scrollToIndex(index) {
    const listNode = listRef.current;
    //this line assume a particular DOM structure:
    const imgNode = listNode.querySelectorAll("li > img")[index];
    imgNode.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <div>
      <nav>
        <button onClick={() => scrollToIndex(0)}>Tom</button>
        <button onClick={() => scrollToIndex(1)}>Maru</button>
        <button onClick={() => scrollToIndex(2)}>Jellylorum</button>
      </nav>
      <div>
        <ul ref={listRef}>
          <li>
            <img
              style={{ marginBottom: "500px" }}
              src="https://placekitten.com/g/200/200"
              alt="tom"
            />
          </li>
          <li>
            <img
              style={{ marginBottom: "500px" }}
              src="https://placekitten.com/g/300/200"
              alt="maru"
            />
          </li>
          <li>
            <img
              style={{ marginBottom: "500px" }}
              src="https://placekitten.com/g/250/200"
              alt="jelly"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CatFriends;
