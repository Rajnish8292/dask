"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import "./SearchBox.css";
import delay from "@/app/utils/delay.mjs";

export default function SearchBox({
  startWithExampleHandler,
  shareSearchRequestData,
}) {
  const inputRef = useRef();
  const caretRef = useRef();
  const placeholderRef = useRef();
  const [query, setQuery] = useState("");
  const activeCharacter = useRef();
  const editiableRef = useRef();
  const clearInputRef = useRef();
  const dummyInputRef = useRef();

  const dummyInputFocus = useCallback(() => {
    if (!dummyInputRef?.current) return;
    dummyInputRef.current.focus();
  }, []);
  const dummyInputBlur = useCallback(() => {
    if (!dummyInputRef?.current) return;
    dummyInputRef.current.blur();
  }, []);
  const keyDownHandlerWrapper = useCallback(
    (inputRef, caretRef, placeholderRef, editiableRef, clearInputRef) => {
      const editiableElem = inputRef.current;
      const caretElem = caretRef.current;
      const placeholderElem = placeholderRef.current;
      const parentElem = editiableRef.current;
      const clearInputElem = clearInputRef.current;

      const rightMostView = () => {
        editiableElem.scrollLeft = editiableElem.scrollWidth;
      };

      const handleCharacterClick = (characterElem) => {
        caretElem.style.width = characterElem.offsetWidth + "px";
        caretElem.style.left = characterElem.offsetLeft + "px";
        caretElem.style.top =
          characterElem.offsetTop + characterElem.offsetHeight + "px";
        caretElem.style.animation = "blink 1s infinite";
        caretElem.classList.remove("caret_vertical");
        activeCharacter.current = characterElem;
      };

      const handleCaret = (characterElem) => {
        if (characterElem) {
          caretElem.style.width = characterElem.offsetWidth + "px";
          caretElem.style.left =
            Math.min(
              editiableElem.offsetLeft +
                editiableElem.offsetWidth -
                caretElem.offsetWidth,
              characterElem.offsetLeft
            ) + "px";
          caretElem.style.top =
            characterElem.offsetTop + characterElem.offsetHeight + "px";
          caretElem.style.animation = "blink 1s infinite";
          caretElem.classList.remove("caret_vertical");
        }
      };

      const handlePlaceholder = (queryLength) => {
        if (queryLength == 0) {
          placeholderElem.style.opacity = 0.5;
          caretElem.style.top = "50%";
          caretElem.style.transform = "translate(0, -50%)";
          caretElem.style.width = "var(--caret-width)";
          caretElem.style.animation = "blink_placeholder 1s infinite";
          caretElem.classList.add("caret_vertical");
        } else {
          placeholderElem.style.opacity = 0;
        }
      };

      const handleClearInput = (queryLength) => {
        if (queryLength == 0) {
          clearInputElem.children[0].classList.remove("close_icon_container");
          clearInputElem.children[0].classList.add(
            "close_icon_container_disappear"
          );
        } else {
          clearInputElem.children[0].classList.remove(
            "close_icon_container_disappear"
          );
          clearInputElem.children[0].classList.add("close_icon_container");
        }
      };

      const createCharacter = (character) => {
        const divElem = document.createElement("div");
        divElem.className = "typed_character";
        divElem.innerText = character;
        divElem.onclick = () => {
          handleCharacterClick(divElem);
        };
        editiableElem.insertBefore(
          divElem,
          activeCharacter?.current?.nextElementSibling
        );
        handleCaret(divElem);
        setQuery(editiableElem.innerText);
        handlePlaceholder(editiableElem.innerText.length);
        handleClearInput(editiableElem.innerText.length);
        rightMostView();
        activeCharacter.current = divElem;

        return divElem;
      };

      const deleteCharacter = () => {
        const characterElem = activeCharacter?.current
          ? activeCharacter?.current
          : editiableElem.lastElementChild;
        if (!characterElem) return;
        const nextCharacterElem = characterElem.nextElementSibling;
        editiableElem.removeChild(characterElem);

        if (!nextCharacterElem) {
          handleCaret(editiableElem?.lastElementChild);
        } else {
          handleCaret(nextCharacterElem);
        }

        setQuery(editiableElem.innerText);
        handleClearInput(editiableElem.innerText.length);
        handlePlaceholder(editiableElem.innerText.length);
        activeCharacter.current = nextCharacterElem;
      };

      const clearInput = () => {
        const characterElements = editiableElem.children;

        gsap.to(characterElements, {
          y: -6,
          scale: 0.6,
          opacity: 0,
          duration: 0.09,
          stagger: {
            from: "end",
            amount: 0.1,
          },
          onComplete: () => {
            activeCharacter.current =
              characterElements[characterElements.length - 1];

            while (editiableElem.innerText.length) {
              deleteCharacter();
            }
          },
        });
      };

      const createSpace = () => {
        const divElem = document.createElement("div");
        divElem.className = "typed_character";
        divElem.innerHTML = "&nbsp;";
        divElem.onclick = () => {
          handleCharacterClick(divElem);
        };

        editiableElem.insertBefore(
          divElem,
          activeCharacter?.current?.nextElementSibling
        );
        handleCaret(divElem);
        setQuery(editiableElem.innerText);
        handlePlaceholder(editiableElem.innerText.length);

        activeCharacter.current = divElem;

        return divElem;
      };

      const moveRight = () => {
        const nextElem = activeCharacter?.current?.nextElementSibling;
        if (!nextElem) return;

        handleCaret(nextElem);
        activeCharacter.current = nextElem;
      };
      const moveLeft = () => {
        console.log("left");
        const prevElem = activeCharacter?.current?.previousElementSibling;
        if (!prevElem) return;

        handleCaret(prevElem);
        activeCharacter.current = prevElem;
      };
      const sendSearchRequest = async (query) => {
        /*
          1 -> currently sending the request and waitng for response
          2 -> got the response with status 200
          3 -> got the error
        */
        if (!query || !query.length) {
          shareSearchRequestData({
            loading: false,
            result: null,
            error: true,
          });

          return;
        }
        dummyInputBlur();
        shareSearchRequestData({
          loading: true,
          result: null,
          error: false,
        });
        try {
          const request = await fetch("/api/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: query }),
          });

          const result = await request.json();

          // const result = {
          //   facets: {
          //     companies: ["google", "amazon", "uber", "zomato", "Paypal"],
          //     topics: [
          //       "dynamic programming",
          //       "Binary tree",
          //       "graph",
          //       "Linked List",
          //       "array",
          //     ],
          //     difficulty: ["medium"],
          //   },
          //   result: [
          //     {
          //       title: "Two Sum",
          //       difficulty: "Easy",
          //       companies: ["Amazon", "Microsoft", "Google"],
          //       topics: ["Array", "Hash Table"],
          //     },
          //     {
          //       title: "Longest Substring Without Repeating Characters",
          //       difficulty: "Medium",
          //       companies: ["Adobe", "Facebook", "Netflix"],
          //       topics: ["String", "Sliding Window"],
          //     },
          //     {
          //       title: "Merge k Sorted Lists",
          //       difficulty: "Hard",
          //       companies: ["Amazon", "Uber", "LinkedIn"],
          //       topics: ["Linked List", "Heap", "Divide and Conquer"],
          //     },
          //     {
          //       title: "Binary Tree Level Order Traversal",
          //       difficulty: "Medium",
          //       companies: ["Google", "Apple", "Microsoft"],
          //       topics: ["Tree", "Breadth-First Search"],
          //     },
          //     {
          //       title: "Valid Parentheses",
          //       difficulty: "Easy",
          //       companies: ["Amazon", "Facebook"],
          //       topics: ["String", "Stack"],
          //     },
          //   ],
          // };
          await delay(500);
          shareSearchRequestData({
            loading: false,
            result: result,
            error: false,
          });

          const recentSearchData =
            JSON.parse(localStorage.getItem("recent_searches")) || [];
          if (recentSearchData.indexOf(editiableElem.innerText) === -1) {
            recentSearchData.unshift(editiableElem.innerText);
            localStorage.setItem(
              "recent_searches",
              JSON.stringify(recentSearchData)
            );
          }
        } catch (err) {
          await delay(500);
          shareSearchRequestData({
            loading: false,
            result: null,
            error: true,
          });
        }
      };

      const pasteText = (text) => {
        if (!text || !text.length) return;

        inputRef.current.innerHTML = "";
        dummyInputFocus();

        let character_array = [];
        for (let i = 0; i < text.length; i++) {
          if (text[i] == " ") {
            createSpace();
          } else {
            character_array.push(createCharacter(text[i]));
          }
        }
        gsap.from(character_array, {
          y: -6,
          scale: 0.6,
          opacity: 0,
          stagger: 0.01,
          duration: 0.08,
        });
      };

      return {
        pasteText,
        clearInput,
        moveRight,
        moveLeft,
        keyDownHandler: (e) => {
          e.preventDefault();
          console.log({ data: e.data, key: e.key });
          switch (e.inputType) {
            case "insertLineBreak":
              sendSearchRequest(editiableElem.innerText.trim());
              break;
            case "deleteContentBackward":
              deleteCharacter();
              break;
            case "deleteContentBackward":
              deleteCharacter();
              break;
            default:
              if (e.data == " ") {
                e.preventDefault;
                createSpace();
              } else {
                createCharacter(e.data);
              }

              break;
          }
        },
      };
    },
    []
  );

  useEffect(() => {
    if (
      !inputRef?.current ||
      !caretRef?.current ||
      !placeholderRef?.current ||
      !clearInputRef?.current ||
      !dummyInputRef?.current
    )
      return;
    const { keyDownHandler, pasteText, clearInput, moveLeft, moveRight } =
      keyDownHandlerWrapper(
        inputRef,
        caretRef,
        placeholderRef,
        editiableRef,
        clearInputRef
      );

    const clearButtonClickhandler = (e) => {
      e.preventDefault();
      clearInput();
    };

    const windowKeydownHandler = (e) => {
      if (e.key == "ArrowLeft") {
        moveLeft();
      } else if (e.key == "ArrowRight") {
        moveRight();
      }
    };
    startWithExampleHandler({ pasteText });

    window.addEventListener("keydown", windowKeydownHandler);
    clearInputRef.current.addEventListener("click", clearButtonClickhandler);
    dummyInputRef.current.addEventListener("beforeinput", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", windowKeydownHandler);
      dummyInputRef.current.removeEventListener("beforeinput", keyDownHandler);
      clearInputRef.current.removeEventListener(
        "click",
        clearButtonClickhandler
      );
    };
  }, [
    inputRef?.current,
    caretRef?.current,
    placeholderRef?.current,
    editiableRef?.current,
    clearInputRef?.current,
    dummyInputRef?.current,
  ]);

  return (
    <>
      <div
        className="editiable_content_div"
        ref={editiableRef}
        tabIndex={0}
        onClick={() => {
          dummyInputFocus();
        }}
      >
        <input
          type="text"
          style={{
            opacity: 0,
            position: "fixed",
            top: "-100px",
            left: "-100px",
          }}
          ref={dummyInputRef}
        />
        <div className="div_placeholder" ref={placeholderRef}>
          Search the way you like!
        </div>
        <div
          className="caret caret_vertical"
          ref={caretRef}
          data-caret={true}
        ></div>
        <div className="clear_input" ref={clearInputRef}>
          <div className="close_icon_container_disappear">
            <div className="close_bar_1 close_bar"></div>
            <div className="close_bar_2 close_bar"></div>
          </div>
        </div>
        <div className="input_text" ref={inputRef}></div>
      </div>
    </>
  );
}
