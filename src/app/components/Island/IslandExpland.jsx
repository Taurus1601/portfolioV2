import { motion, AnimatePresence, delay } from "framer-motion";
import { useState, useEffect } from "react";
import ShinyText from "../ShinyText/ShinyText";
import { ChevronLeft } from "lucide-react";
function IslandExpland({ Terminal, IsExpanded, children, TerminalData ,cardData}) {
  const [terminal, setTerminal] = useState(Terminal);
  

  function handleBackButton() {
    setTerminal(!terminal);
    TerminalData((prev) => !prev);
    
  }
  return (
    <motion.div
      // initial={{
      //     x: 0,
      //     opacity: 1,
      //     width: !IsExpanded?"300px":'80px',
      //     height: IsExpanded?"65px":'45px',
      // }}
      animate={{
        width: Terminal && IsExpanded ? "380px" : "300px",
        height: Terminal && Terminal ? "380px" : "65px",
        display: Terminal && IsExpanded ? "block" : "none",
      }}
      transition={{duration: 0.3}}
      className="absolute  z-0  bg-[#000] cursor-pointer rounded-[40px] hidden "
    >
     
      {children}
     
     {cardData==null && <motion.button 
      className={`absolute top-3 left-4 z-50 text-white bg-white/30 rounded-full p-1`}
      onClick={handleBackButton}>
<ChevronLeft/> 
      </motion.button>}
    </motion.div>
  );
}

export default IslandExpland;
