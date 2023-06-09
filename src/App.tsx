import { useEffect, useRef, useState } from "react";

import styles from "./App.module.scss";
import TextArea from "./components/TextArea/TextArea";

function App() {
  const [state, setState] = useState("const div = 10");
  const refx = useRef<any>();
  useEffect(() => {}, []);

  return (
    <>
      <div className={styles.mainPage}>
        <nav className={styles.navBar}>
          <textarea onChange={(e) => setState(e.target.value)} />
        </nav>
        <TextArea refrence={refx} text={state} />
      </div>
    </>
  );
}

export default App;
