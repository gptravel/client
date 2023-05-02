// OpenAIComponent.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const OpenAIComponent = () => {
  const { state } = useLocation();
  console.log(state);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state }),
      };

      try {
        const response = await fetch("http://127.0.0.1:8000/api/generate-answer/", requestOptions);

        if (response.body) {
          const reader = response.body.getReader();
          let result = "";

          reader.read().then(async function processText({ done, value }) {
            if (done) {
              return;
            }

            result += new TextDecoder("utf-8").decode(value);
            setAnswer(result.replace(/\n/g, "<br/>"));
            return reader.read().then(processText);
          });
        }
      } catch (error) {
        console.error("Error fetching answer:", error);
      }
    };

    fetchData();
  }, [state]);

  return (
    <div>
      <h2>Ask OpenAI</h2>
      {answer && (
        <div>
          <h3>Answer:</h3>
          <p dangerouslySetInnerHTML={{ __html: answer }}></p>
        </div>
      )}
    </div>
  );
};

export default OpenAIComponent;
