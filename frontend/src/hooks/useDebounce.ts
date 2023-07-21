import { useCallback, useRef } from "react";

/** Returns a fuction for debouncing inputs with the given timeout.  */
const useDebounce = (timeout = 300) => { 
    let timer = useRef();
    const debounceFunc = useCallback((func,...args) => {
        const context = this;
        timer.current && clearTimeout(timer.current);
        timer.current = setTimeout(()=>{
            timer.current = null;
            func.apply(context,args);
        }, timeout);
    },[timeout]);
    return debounceFunc;
}
export default useDebounce;