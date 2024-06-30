import "./App.css";
import React, { useState } from "react";
import { marked } from "marked";
import useLocalStorage from "./hooks/useLocalStorage";
import useFetchDocs from "./hooks/useFetchDocs";

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [storedValue, setStoredValue] = useLocalStorage(
    "marked-content",
    "## Hello"
  );
  const [code, setCode] = useState(storedValue);
  const { docsContent, error, loading } = useFetchDocs("/constants/docs.json");

  const openMD = () => {
    console.log(0);
    setActiveTab(0);
  };

  const openPreview = () => {
    console.log(0);
    setActiveTab(1);
  };

  const openDocs = () => {
    setActiveTab(2);
  };
  const handleChange = (e) => {
    setCode(e.target.value);
    setStoredValue(e.target.value);
  };

  const getMarkdownText = () => {
    const rawMarkup = marked.parse(storedValue);
    return { __html: rawMarkup };
  };

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD} className={activeTab === 0 ? "active" : ""}>
            MarkDown
          </button>
          <button
            onClick={openPreview}
            className={activeTab === 1 ? "active" : ""}
          >
            Preview
          </button>
          <button
            onClick={openDocs}
            className={activeTab === 2 ? "active" : ""}
          >
            Docs
          </button>
        </div>
        {activeTab === 0 ? (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        ) : activeTab === 1 ? (
          <div>
            <div
              dangerouslySetInnerHTML={getMarkdownText()}
              className="marker"
            ></div>
          </div>
        ) : (
          <div className="docs">
            {loading
              ? "Loading...."
              : error
              ? error
              : docsContent.map((item, index) => {
                  return (
                    <div key={index}>
                      <h2>{item.name}</h2>
                      <p>{item.description}</p>
                      {item.examples.map((example, exIndex) => {
                        return (
                          <div key={exIndex}>
                            <h3>{"Example " + exIndex}</h3>
                            <p>
                              <span>HTML: </span> {example.html}
                            </p>
                            <p>
                              <span>Markdown: </span>
                              {example.markdown}
                            </p>
                          </div>
                        );
                      })}
                      {item.additional_examples.map((example, addIndex) => {
                        return (
                          <div key={addIndex}>
                            <hr />
                            <h2>{example.name}</h2>
                            <p>{example.description}</p>
                            <p>
                              <span>HTML: </span> {example.html}
                            </p>
                            <p>
                              <span>Markdown: </span>
                              {example.markdown}
                            </p>
                          </div>
                        );
                      })}
                      {index !== docsContent.length - 1 && (
                        <hr className="separator" />
                      )}
                    </div>
                  );
                })}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
