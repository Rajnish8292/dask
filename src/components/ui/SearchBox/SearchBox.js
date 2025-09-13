"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import "./SearchBox.css";

export default function SearchBox({ startWithExampleHandler }) {
  const inputRef = useRef();
  const caretRef = useRef();
  const placeholderRef = useRef();
  const [query, setQuery] = useState("");
  const activeCharacter = useRef();
  const editiableRef = useRef();

  const keyDownHandlerWrapper = useCallback(
    (inputRef, caretRef, placeholderRef, editiableRef) => {
      const editiableElem = inputRef.current;
      const caretElem = caretRef.current;
      const placeholderElem = placeholderRef.current;
      const parentElem = editiableRef.current;

      const rightMostView = () => {
        parentElem.scrollLeft = parentElem.scrollWidth;
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
          caretElem.style.left = characterElem.offsetLeft + "px";
          caretElem.style.top =
            characterElem.offsetTop + characterElem.offsetHeight + "px";
          caretElem.style.animation = "blink 1s infinite";
          caretElem.classList.remove("caret_vertical");
        }
      };

      const handlePlaceholder = (queryLength) => {
        console.log(queryLength);
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
      const createCharacter = (character) => {
        const divElem = document.createElement("div");
        divElem.className = "typed_character";
        divElem.innerText = character;
        divElem.onclick = () => {
          handleCharacterClick(divElem);
        };
        // editiableElem.appendChild(divElem);
        editiableElem.insertBefore(
          divElem,
          activeCharacter?.current?.nextElementSibling
        );
        handleCaret(divElem);
        setQuery(editiableElem.innerText);
        handlePlaceholder(editiableElem.innerText.length);
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
        handlePlaceholder(editiableElem.innerText.length);
        activeCharacter.current = nextCharacterElem;
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

      const pasteText = (text) => {
        if (!text || !text.length) return;

        inputRef.current.innerHTML = "";

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
        keyDownHandler: (e) => {
          switch (e.key) {
            case "Enter":
              break;
            case "Backspace":
              deleteCharacter();
              break;
            case "Escape":
              deleteCharacter();
              break;
            case "Tab":
              break;
            case "Shift":
              break;
            case "Control":
              break;
            case "CapsLock":
              break;
            case "AltGraph":
              break;
            case "Insert":
              break;
            case "ArrowDown":
              break;
            case "ArrowUp":
              break;
            case "ArrowRight":
              moveRight();
              break;
            case "ArrowLeft":
              moveLeft();
              break;
            case " ":
              e.preventDefault;
              createSpace();
              break;
            default:
              createCharacter(e.key);
              break;
          }
        },
      };
    },
    []
  );

  useEffect(() => {
    if (!inputRef?.current || !caretRef?.current || !placeholderRef?.current)
      return;
    const { keyDownHandler, pasteText } = keyDownHandlerWrapper(
      inputRef,
      caretRef,
      placeholderRef,
      editiableRef
    );

    startWithExampleHandler({ pasteText });

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [
    inputRef?.current,
    caretRef?.current,
    placeholderRef?.current,
    editiableRef?.current,
  ]);

  return (
    <>
      <div className="editiable_content_div" ref={editiableRef} tabIndex={0}>
        <div className="div_placeholder" ref={placeholderRef}>
          Search the way you like!
        </div>
        <div
          className="caret caret_vertical"
          ref={caretRef}
          data-caret={true}
        ></div>
        <div className="input_text" ref={inputRef}></div>
      </div>
    </>
  );
}
