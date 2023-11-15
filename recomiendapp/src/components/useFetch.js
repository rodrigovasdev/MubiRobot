import { useState, useEffect } from "react";

export function useFetch(url) {
  // Basic
    const [data, setData] = useState(url);
    useEffect(() => {
      fetch(url)
         .then((response) => response.json())
         .then((json) => setData(json));
    }, []);
    return { data }}