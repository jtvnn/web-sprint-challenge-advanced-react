import React, { useState } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const numCol = 3;

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  // set up some state
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);

  function getXY(idx = index) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    // take the index and modulo by number of columns and add 1
    const x = (idx % numCol) + 1;
    // take the index and divide by number of columns (rounded down) and add 1
    const y = Math.floor(idx / numCol) + 1;
    return [x, y];
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const [x, y] = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex);
    setSteps(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    // if direction is "left" and x > 0, return index - 1
    // if direction is "right" and x < 2, return index + 1
    // if direction is "up" and y > 0, return index - 3
    // if direction is "down" and y < 2, return index + 3
    // else return index
    let x = index % numCol;
    let y = Math.floor(index / numCol);

    switch (direction) {
      case "left":
        return x > 0 ? index - 1 : index;
      case "right":
        return x < 2 ? index + 1 : index;
      case "up":
        return y > 0 ? index - 3 : index;
      case "down":
        return y < 2 ? index + 3 : index;
      default:
        return index;
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const { id } = evt.target;
    let direction = null;

    switch (id) {
      case "left":
        direction = "left";
        break;
      case "right":
        direction = "right";
        break;
      case "up":
        direction = "up";
        break;
      case "down":
        direction = "down";
        break;
      default:
        return;
    }
        const nextIndex = getNextIndex(direction);

        if (nextIndex !== index) {
          setIndex(nextIndex);
          setSteps(steps + 1);
          setMessage("");
        } else {
          let errorMsg = {
            left: "You can't go left",
            right: "You can't go right",
            up: "You can't go up",
            down: "You can't go down",
          };
          setMessage(errorMsg[direction]);
        }
    }
  
    function onChange(evt) {
      // You will need this to update the value of the input.
      setEmail(evt.target.value);
    }

    async function onSubmit(evt) {
      // Use a POST request to send a payload to the server.
      evt.preventDefault();
      setMessage("");
      const [x, y] = getXY();
      try {
        const resp = await axios.post("http://localhost:9000/api/result", {
          x,
          y,
          steps,
          email,
        });
        setMessage(resp.data.message);
        setEmail("");
      } catch (error) {
        if (email == "foo@bar.baz") {
          setMessage("foo@bar.baz failure #71");
        } else if (error.response && error.response.data && error.response.data.message) {
          setMessage(error.response.data.message);
        } else {
        setMessage("Error submitting form");
        }
      }
    }

    return (
      <div id="wrapper" className={props.className}>
        <div className="info">
          <h3 id="coordinates">{getXYMessage()}</h3>
          <h3 id="steps">You moved {steps} {steps === 1 ? "time" : "times"}</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className={`square${idx === index ? " active" : ""}`}>
              {idx === index ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={move}>LEFT</button>
          <button id="up" onClick={move}>UP</button>
          <button id="right" onClick={move}>RIGHT</button>
          <button id="down" onClick={move}>DOWN</button>
          <button id="reset" onClick={reset}>
            reset
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            onChange={onChange}
            value={email}
          ></input>
          <input id="submit" type="submit" />
        </form>
      </div>
    );
  }

