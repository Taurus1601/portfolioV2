import React from "react";
import { motion, AnimatePresence, delay } from "framer-motion";
import { useState, useEffect } from "react";
import ShinyText from "../ShinyText/ShinyText";
import { SquareTerminal } from "lucide-react";
import IslandExpland from "./IslandExpland";
import IslandContent from "./IslandContent";

function Island() {
  const [terminal, setTerminal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // Add this state


  useEffect(() => {
    console.log(terminal);
  }, [terminal]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white ">
      <DynamicIsland
        SetTerminal={setTerminal}
        isExpandedData={setIsExpanded}
        currentExpanded={isExpanded}
        currentTerminal={terminal}

      >
        <IslandExpland Terminal={terminal} IsExpanded={isExpanded} TerminalData={setTerminal}
       cardData={selectedCard}
         >
          <IslandContent terminal={terminal} cardData={setSelectedCard}/>
        </IslandExpland>
      </DynamicIsland>
    </div>
  );
}

export default Island;

function DynamicIsland({ SetTerminal,currentTerminal, isExpandedData , currentExpanded, children }) {
  const [isExpanded, setIsExpanded] = useState(currentExpanded);
  const [terminal, setTerminal] = useState(currentTerminal);

  useEffect(() => {
    setIsExpanded(currentExpanded);
    setTerminal(currentTerminal);
  }, [currentExpanded ,currentTerminal]);

  const imgVariants = {
    expanded: {
      x: -69, // Move 20px to the right when expanded
      opacity: 1,
      width: "40px",
      height: "40px",
      transition: {
        duration: 0.8,
        delay: 0.1,
        type: "spring",
        stiffness: 150,
        damping: 25,
        mass: 0.5,
      },
    },
    collapsed: {
      x: 6, // Move 10px to the left when collapsed
      opacity: 1,
      width: "32px",
      height: "32px",
    },
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === "e") {
        setIsExpanded((prev) => !prev);
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
 

  function handleTerminalClick(e) {
    e.stopPropagation();
    SetTerminal(prev => !prev); // Update parent state
    setTerminal(prev => !prev);
  }
  function handleIsExpanded() {
    const newState = !isExpanded;
    setIsExpanded(newState);
    isExpandedData(newState); // Update parent state
  }
  return (
    <motion.div
      layout
      initial={{ borderRadius: 100, width: "80px", height: "45px" }}
      animate={{
        width: isExpanded ? "300px" : "80px",
        height: isExpanded ? "65px" : "45px",
        backgroundColor: "#000",
      }}
      transition={{
        duration: 0.8, // Synchronized with other animations
        type: "spring",
        stiffness: 150, // Matched with imgVariants
        damping: 25, // Matched with imgVariants
        mass: 0.5, // Added mass
        layout: {
          // Specific layout transition
          duration: 0.8,
          type: "spring",
          stiffness: 150,
          damping: 25,
        },
      }}
      className="relative flex flex-row items-center justify-center z-50 bg-[#000] "
    >
      <motion.img
        className={`${isExpanded ? "h-12 w-12" : "h-8 w-8"} rounded-full`}
        variants={imgVariants}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        transition={{
          duration: 1.3,
          delay: isExpanded ? 0.05 : -0.03,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        src="images/1.jpeg"
        alt="#"
      />
      <motion.button
        animate={{
          opacity: 1,
          x: isExpanded ? 109 : -6,
          width: isExpanded ? "40px" : "32px",
          height: isExpanded ? "40px" : "32px",
          rotate: isExpanded ? 45 : 0,
          transition: { duration: 0.3 },
        }}
        whileHover={{
          rotate: 360,
          backgroundColor: isExpanded ? "#DC143C" : "#008000",
          transition: { duration: 0.5 },
        }}
        transition={{ duration: 0.3 }}
        className={`ml-4 text-white font-black rounded-full bg-neutral-300 h-[32px] w-[32px] flex justify-center items-center`}
        onClick={handleIsExpanded}
      >
        +
      </motion.button>
      {children}
      <AnimatePresence>
        {isExpanded && (
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              exit={{ opacity: !terminal? 0:1, transition: { duration: 0.01 } }}
              transition={{ duration: 0.25, ease: "easeIn" }}
              className="absolute top-0 left-14 "
            >
             <AnimatePresence mode="wait">
              {!terminal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4"
                >
                  <p className="text-neutral-100 text-xs z-0">
                    <ShinyText
                      text="Hello ,I'm"
                      disabled={false}
                      speed={3}
                      className="custom-class"
                    />
                  </p>
                  <p className="text-neutral-100 text-sm">Sanjan Athyady</p>
                </motion.div>
              )}
            </AnimatePresence>
            </motion.div>
            <motion.button
              className={`h-10 w-10 text-white rounded-full border-slate-100 border-5 flex justify-center items-center`}
              initial={{
                opacity: 0,
                x: 15,
              }}
              animate={{
                opacity: 1,
                width: isExpanded && !terminal  ? "40px" : "0",
                height: isExpanded && !terminal? "40px" : "0",
                transition: { delay: 0 },
               
              }}
              exit={{
                opacity: 0,
                x: -6,
                width: "0",
                height: "0",
              }}
              
            >
              <SquareTerminal
                className="hover:bg-black"
                onClick={handleTerminalClick}
              />
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
