import React, { useState, useEffect } from "react";
import "./RandomQuote.css";
import { Bird, RefreshCcw } from "lucide-react";

const RandomQuote = () => {
  const [quote, setQuote] = useState({
    text: "loading... ",
    author: "",
  });

  const random = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote({
        text: data.content,
        author: data.author || "Unknown",
      });
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      alert("Failed to fetch quote. Try again later.");
    }
  };
  useEffect(() => {
    random();
  }, []);
  const twitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${quote.text}`);
  };
  return (
    <div className="container">
      <div className="quote">{quote.text}</div>
      <div>
        <div className="line"></div>
        <div className="bottom">
          <div className="author">{quote.author}</div>
          <div className="icons">
            <Bird
              size={50}
              color="#000000ff"
              className="icon"
              onClick={twitter}
            />
            <RefreshCcw size={50} className="icon" onClick={random} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
