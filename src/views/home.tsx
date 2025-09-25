import { useState } from "hono/jsx";
import { hc } from "hono/client";
import type { AppType } from "../routes/index.js";

const Home = () => {
  return (
    <main>
      <h1>Welcome to Let's Chat!</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
        doloremque unde eum facere!
      </p>
      <form class="form">
        <div className="form-field">
          <label htmlFor="questionInput">Type your question here!</label>
          <input
            type="text"
            id="questionInput"
            placeholder="Why are the skies blue?"
          />
        </div>
        <div className="form-field">
          <label htmlFor="selectInput">Sound like a..</label>
          <select name="" id="selectInput">
            <option value="user" selected>
              A Regular Person
            </option>
            <option value="assistant">My Assistant</option>
            <option value="developer">A Tech Bro</option>
            <option value="system">A Computer</option>
          </select>
        </div>
        <button id="submitBtn">Ask Question</button>
      </form>
      <div id="response"></div>
      <div className="beware-text">
        <b>Beware:</b> This is a demo application. Please do not use any
        sensitive information. Also, AI can give false content
      </div>
    </main>
  );
};

export default Home;
