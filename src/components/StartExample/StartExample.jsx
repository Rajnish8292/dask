import "./StartExample.css";
import GlitchLoadText from "../GlitchLoadText/GlitchLoadText";
export default function StartExample({ clickHandler }) {
  return (
    <>
      <div className="example_container">
        <div className="example_wrapper">
          <div className="example">
            <GlitchLoadText
              text={
                "Tomorrow is my interview at Google, search for beginner to intermediate problems based on array"
              }
              //   onHoverAnimate
              onLoadAnimate={false}
              duration={3}
              speed={15}
              coefficient={0.9}
            />
          </div>
          <div className="example">
            <GlitchLoadText
              text={
                "find me easy to medium string manipulation problems that are commonly asked"
              }
              //   onHoverAnimate
              onLoadAnimate={false}
              duration={3}
              speed={15}
              coefficient={0.9}
            />
          </div>
          <div className="example">
            <GlitchLoadText
              text={
                " Got a Netflix interview coming up, search for entry to mid-level dynamic programming questions"
              }
              //   onHoverAnimate
              onLoadAnimate={false}
              duration={100}
              speed={10}
              coefficient={0}
            />
          </div>
          <div className="example">
            <GlitchLoadText
              text={
                "Senior developer interview, need advanced tree and graph algorithm problems"
              }
              //   onHoverAnimate
              onLoadAnimate={false}
              duration={3}
              speed={15}
              coefficient={0.9}
            />
          </div>
        </div>
        <div className="back_button" onClick={clickHandler}>
          back
        </div>
      </div>
    </>
  );
}
