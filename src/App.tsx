import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./App.module.scss";
import TextArea from "./components/TextArea/TextArea";
import html2canvas from "html2canvas";
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
