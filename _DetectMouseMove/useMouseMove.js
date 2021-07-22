import React, {
    useState,
    useEffect,
    useContext,
    createContext,
    useRef } from "react";
  import useAuth from "@/hooks/use-auth";
  import useAdmin from "@/api/admin-service";
  
  const ContentContext = createContext();
  
  const useMouseMove = () => useContext(ContentContext);
  
  const useInterval = (callback, delay)  =>{
    const savedCallback = useRef();
  
    // 保存新回调
    useEffect(() => {
      savedCallback.current = callback;
    });
  
    // 建立 interval
    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  
  const useContentProvider = () => {
    const { signOut, token } = useAuth()
    const { signOutCheck } = useAdmin()
    const [time, setTime] = useState(900)
  
    const logout = async () => {
      signOut()
      await signOutCheck()
    }
  
    const onMouseKeep = () => {
      setTime(900)
    }
  
    useInterval(() => {
      if (token) {
        setTime(time - 60)
      }
    }, 60000)
  
    useEffect(() => {
      if (time === 0) {
        logout()
      }
    }, [time])
  
    return { onMouseKeep };
  };
  
  const MouseMoveProvider = ({ children }) => {
    const { onMouseKeep } = useContentProvider();
    return (
      <ContentContext.Provider>
        <div onMouseMove={onMouseKeep}>
          {children}
        </div>
      </ContentContext.Provider>
    );
  };
  
  export default useMouseMove;
  export { MouseMoveProvider };
  