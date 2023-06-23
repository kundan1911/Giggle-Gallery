import "./Error404Page.css";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
export function Error404Page() {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(10);
    useEffect(() => {
        const timer = counter > 0 && setTimeout(() =>setCounter(count=>count-1), 1000);
        if(counter===0){
            navigate("/")
        }
        return (()=>clearTimeout(timer));
      }, [counter]);

  return (
    <section className="flex error-page">
      <div className="flex flex-column error-content ">
          <h1 className="error-letter">404</h1>
        <p className="error-title">Oops! You ran out of videos.</p>
        <p className="error-desc">
          The page you're looking for is now beyond our reach. Let's get you ...     </p>
          <span className="txt-md lt-bold count-txt">Back in {counter}</span>
          <button onClick={()=>navigate("/")} className="btn btn-sm plain-btn error-route-btn ">Home</button>
      </div>
    </section>
  );
}
