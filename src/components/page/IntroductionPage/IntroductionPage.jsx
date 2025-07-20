import GlitchLoadText from "@/components/GlitchLoadText/GlitchLoadText";
import StartExample from "@/components/StartExample/StartExample";
import React, { useState } from "react";

export default function IntroductionPage() {
  const description1 =
    "There are almost 3K DSA problems across multiple topics, pattern and asked frequently in interviews.";
  const description2 =
    "Search for any kind of problem however you want, just ask like a regular person, not a robot.";
  const title1 = "2943 DSA PROBLEMS";
  const title2 = "AI POWERED SEARCH ENGINE";
  const [isExampleVisible, setExampleVisible] = useState(false);
  const clickHandler = () => {
    setExampleVisible(!isExampleVisible);
  };
  return (
    <>
      {isExampleVisible && <StartExample clickHandler={clickHandler} />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <div className="question">
          <div style={{ display: "inline-block", position: "relative" }}>
            WHAT I AM ABLE TO DO ?<div className="border"></div>
          </div>
        </div>

        <div className="answer_container">
          <div className="answer_wrapper">
            <div className="shadow_background"></div>
            <div className="answer bg1">
              <div className="answer_title">
                {title1.split(" ").map((word, index) => {
                  return (
                    <React.Fragment key={index}>
                      <GlitchLoadText
                        key={index}
                        text={word}
                        // onHoverAnimate
                        onLoadAnimate
                        duration={3}
                        speed={15}
                        coefficient={0.9}
                      />
                      <span className="span_gap"></span>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="answer_description">
                {description1.split(" ").map((word, index) => {
                  return (
                    <React.Fragment key={index}>
                      <GlitchLoadText
                        key={index}
                        text={word}
                        // onHoverAnimate
                        onLoadAnimate
                        duration={3}
                        speed={15}
                        coefficient={0.9}
                      />
                      <span className="span_gap"></span>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="answer_wrapper">
            <div className="shadow_background"></div>
            <div className="answer bg2">
              <div className="answer_title">
                {title2.split(" ").map((word, index) => {
                  return (
                    <React.Fragment key={index}>
                      <GlitchLoadText
                        key={index}
                        text={word}
                        // onHoverAnimate
                        onLoadAnimate
                        duration={3}
                        speed={15}
                        coefficient={0.9}
                      />
                      <span className="span_gap"></span>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="answer_description">
                {description2.split(" ").map((word, index) => {
                  return (
                    <React.Fragment key={index}>
                      <GlitchLoadText
                        key={index}
                        text={word}
                        // onHoverAnimate
                        onLoadAnimate
                        duration={3}
                        speed={15}
                        coefficient={0.9}
                      />
                      <span className="span_gap"></span>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="button_container">
          <div className="start_button">Let's start!</div>
          <div
            className="start_eg_button"
            onClick={() => setExampleVisible(!isExampleVisible)}
          >
            Start with an example
          </div>
        </div>
      </div>
    </>
  );
}
