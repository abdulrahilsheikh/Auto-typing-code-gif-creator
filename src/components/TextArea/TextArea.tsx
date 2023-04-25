///@ts-ignore
import { createGIF } from "gifshot";
import html2canvas from "html2canvas";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { useEffect } from "react";
import { useAutoTyping } from "../../hooks/useAutoTyping";
import styles from "./TextArea.module.scss";

type Props = { setText?: (data: any) => void; text: string; refrence: any };
let images: any = [];

function TextArea({ text, refrence }: Props) {
  const [state]: any = useAutoTyping(text, 2, refrence);

  const func = () => {
    console.log(refrence.current);
    images.push(html2canvas(refrence.current).then((a) => a.toDataURL()));
  };

  const convertToGif = async () => {
    const sequence = await Promise.all(images);
    for (let i = 0; i < 10; i++) {
      sequence.push(sequence[sequence.length - 1]);
    }
    const options = {
      images: sequence,
      gifWidth: 1000,
      gifHeight: 1000,
      numWorkers: 5,
      frameDuration: 0.1,
      sampleInterval: 10,
      progressCallback: (e: any) => console.log(e),
    };

    createGIF(options, (obj: any) => {
      if (!obj.error) {
        const a = document.createElement("a");
        a.href = obj.image;
        a.download = "a.gif";
        a.click();
      }
    });
  };

  useEffect(() => {
    func();
  }, [state]);
  useEffect(() => {
    images = [];
  }, [text]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button className={styles.downloadButton} onClick={convertToGif}>
        Download
      </button>
      <div ref={refrence} className={styles.codeConatiner}>
        <Highlight {...defaultProps} theme={theme} code={state} language="jsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{
                ...style,
                padding: "1rem",
                borderRadius: "10px",
                minHeight: "20rem",
                minWidth: "20rem",
              }}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}

export default TextArea;
