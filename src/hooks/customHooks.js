import { useState ,useRef,useEffect} from "react";

const useLocalStorageSetItem= (itemName,itemValue) => localStorage.setItem(itemName,itemValue);
const useLocalStorageGetItem= (itemName)=>localStorage.getItem(itemName);

const useScrollToTop = ({dependency}=[]) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },dependency);
};


const useClickOutside=(handler)=>{
  const elementRef = useRef();
  useEffect(() => {
    const mouseHandler = (e) => {
      if (elementRef.current===e.target) {
        handler()
      }
    };
    document.addEventListener("click", mouseHandler);

    return () => {
      document.removeEventListener("click",mouseHandler);
    };
  },[elementRef]);
  return elementRef;
}

const useInputHandler = state => {
  const [inputState, setInputState] = useState(state);
  const inputUpdate = (e) => {
    const inpValue = e.target.value;
    setInputState({
      ...inputState,
      [e.target.name]: inpValue,
    });
  };
  return { inputState, inputUpdate ,setInputState };
};


export {useLocalStorageSetItem,useLocalStorageGetItem,useScrollToTop,useClickOutside,useInputHandler}