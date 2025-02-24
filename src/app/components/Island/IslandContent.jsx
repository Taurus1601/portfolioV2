import React, { useEffect, useState } from "react";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import { motion, AnimatePresence } from "framer-motion";
import ShinyText from "../ShinyText/ShinyText";
import { ChevronLeft } from "lucide-react";
import AboutText, { aboutText } from "../ContentComponents/About";
import ProjectGrid from "../ContentComponents/Project";
import GradientText from "../GradientText/GradientText";
import Contact from "../ContentComponents/Contact";
import Blog from "../ContentComponents/blog";
function IslandContent({ terminal, cardData }) {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardName) => {
    setSelectedCard(cardName);
    cardData(cardName);
    console.log(cardName);
  };
  useEffect(() => {
    cardData(selectedCard);
  }, [selectedCard]);

  return (
    <div>
      {terminal && (
        <AnimatePresence mode="wait">
          {!selectedCard ? (
            <motion.div
              initial={{ opacity: 0, width: "0px", height: "0px" }}
              animate={{
                opacity: 1,
                width: "380px",
                height: "380px",
              }}
              exit={{
                opacity: 0,
                x: -100,
                transition: { duration: 0.3 },
              }}
              className="p-2 w-[380px] h-[380px] "
            >
              <div className="grid grid-cols-4 grid-rows-3 gap-2 w-full h-full p-1 ">
                {/* About Box - Northeast (Top Right) */}
                <SpotlightCard
                  className="col-start-1 col-span-2 row-span-2 rounded-[30px] bg-neutral-900/90"
                  onClick={() => handleCardClick("about")}
                  spotlightColor="rgba(147, 51, 234, 0.4)" 
                >
                  <div className="p-4 text-white ">
                    <p className="mt-2 text-xl">About Me</p>
                    <ShinyText
                      text="A Passionate Developer 🚀"
                      disabled={false}
                      speed={3}
                      className="custom-class text-sm"
                    />
                  </div>
                </SpotlightCard>

                {/* Small boxes in the middle */}

                <SpotlightCard
                  className="rounded-[30px] col-start-3  col-span-4 bg-neutral-900/90"
                  onClick={() => handleCardClick("gallery")}
                  // spotlightColor="rgba(147, 51, 234, 0.4)" 
                >
                  <div className="p-4 text-white">
                    <p className="mt-2 text-xl">Gallery</p>

                    <ShinyText
                      text="Explore my Clicks 📸"
                      disabled={false}
                      speed={3}
                      className="custom-class text-sm"
                    />
                  </div>
                </SpotlightCard>

                <SpotlightCard
                  className=" col-start-3 col-span-4 rounded-[30px] bg-neutral-900/90"
                  onClick={() => handleCardClick("contact")}
                  // spotlightColor="rgba(147, 51, 234, 0.4)" 
                >
                  <div
                    className="p-4 text-white
                
                "
                  >
                    <p className="mt-2 text-xl">Contact</p>
                    <ShinyText
                      text="Reach me out"
                      disabled={false}
                      speed={3}
                      className="custom-class text-sm"
                    />
                  </div>
                </SpotlightCard>

                {/* Projects Box - Southwest (Bottom Left) */}
                <SpotlightCard
                  className="col-span-3 row-span-2 rounded-[30px] bg-neutral-900/90"
                  onClick={() => handleCardClick("projects")}
                  // spotlightColor="rgba(147, 51, 234, 0.4)" 
                >
                  <div className="p-4 text-white">
                    <p className="mt-2 text-xl">Project</p>
                    <ShinyText
                      text="View Projects"
                      disabled={false}
                      speed={3}
                      className="custom-class text-sm"
                    />
                  </div>
                </SpotlightCard>
                <SpotlightCard
                  className="rounded-[30px] row-span-2 col-start-4 col-span-3 bg-neutral-900/90"
                  onClick={() => handleCardClick("blogs")}
                  // spotlightColor="rgba(147, 51, 234, 0.4)" 
                >
                  <div className="p-4 text-white">
                    <p className="mt-2 text-xl">Blogs</p>
                    <ShinyText
                      text="Explore  "
                      disabled={false}
                      speed={3}
                      className="custom-class text-sm"
                    />
                  </div>
                </SpotlightCard>
              </div>
            </motion.div>
          ) : (
            <IslandExtraContent
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

function IslandExtraContent({ selectedCard, setSelectedCard }) {
  function handleClick(content) {
    setSelectedCard(content);
  }
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="p-4 w-[380px] h-[380px] bg-neutral-900/90 rounded-[40px]"
      >
        <motion.button
          onClick={() => handleClick(null)}
          className="mb-4 text-white hover:text-gray-300  bg-white/30 rounded-full p-1 z-100"
          whileHover={{ scale: 1.1 }}
        >
          <ChevronLeft />
        </motion.button>

        {selectedCard === "about" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
           <AboutText/>
          </motion.div>
        )}
         {selectedCard === "blogs" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
           <Blog title={'Blog'}/>
          </motion.div>
        )}
        {selectedCard === "projects" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white "
          >
            <ProjectGrid />
          </motion.div>
        )}
        {selectedCard === "gallery" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <Blog title={'Gallery'}/>
          </motion.div>
        )}
        {selectedCard === "contact" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
           <Contact/>
          </motion.div>
        )}
        {/* Add similar sections for other cards */}
      </motion.div>
    </div>
  );
}

export default IslandContent;
