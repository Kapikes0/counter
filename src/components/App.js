import { useState, useEffect } from "react";
import Counter from "./Counter";
import JsonServer from "../services/JsonServer";

function App() {
  const [counters, setCounters] = useState([]);
  // Le useEffect utilisé avec un tableau de dépendances vide correspond à l'ancienne méthode componentDidMount.
  // Cela veut dire que cette fonction sera appellée après le premier render de ce composant  2 facons de l'ecrire

  useEffect(() => {
    console.log(`Dans useEffect`);
    async function startFetching() {
      const counters_loaded = await JsonServer.loadCounters();
      console.log(`counters_loaded`, counters_loaded);
      setCounters(counters_loaded);
    }
    setTimeout(() => {startFetching(); }, 500);
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     const counters_loaded = await JsonServer.loadCounters();
  //     console.log(`counters_loaded : `, counters_loaded);
  //     setCounters(counters_loaded);
  //   })();
  // }, []);

  function handleClickDecrementAll() {
    console.log(`Dans handleClickDecrementAll`);
    let counters_copy = counters.map((counter) => {
      counter.value--;
      return counter;
    });
    setCounters((counters) => counters_copy);
  }
  function handleClickDecrement(counter_id) {
    console.log(`Dans handleClickDecrement`, counter_id);
    let counters_copy = counters.map((counter) => {
      if (counter.id === counter_id) counter.value--;
      return counter;
    });
    setCounters((counters) => counters_copy);
  }

  function handleClickIncrementAll() {
    console.log(`Dans handleClickIncrementAll`);
    let counters_copy = counters.map((counter) => {
      counter.value++;
      return counter;
    });
    setCounters((counters) => counters_copy);
  }
  function handleClickIncrement(counter_id) {
    console.log(`Dans handleClickIncrement`, counter_id);
    let counters_copy = counters.map((counter) => {
      if (counter.id === counter_id) counter.value++;
      return counter;
    });
    setCounters((counters) => counters_copy);
  }

  return (
    <div className="App container">
      <div className="d-flex gap-2 align-items-center mt-5">
        <button
          onClick={() => {
            handleClickDecrementAll();
          }}
          className="btn btn-primary"
        >
          -
        </button>
        {counters.map((counter) =>
          <Counter 
            key={counter.id}
            counter={counter}
            onClickDecrement={handleClickDecrement}
            onClickIncrement={handleClickIncrement}
          />
        )}
        <button
          onClick={() => {
            handleClickIncrementAll();
          }}
          className="btn btn-primary"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default App;
