import { useState, useEffect } from "react";

const useFetchDocs = (url) => {
  const [docsContent, setDocsContent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDocsContent(data.basic_syntax);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setDocsContent(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);
  return { docsContent, error, loading };
};

export default useFetchDocs;
