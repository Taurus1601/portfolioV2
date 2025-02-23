import { motion } from 'framer-motion';
import SpotlightCard from '../SpotlightCard/SpotlightCard';
import ShinyText from '../ShinyText/ShinyText';

function ProjectGrid() {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-2 w-full h-[300px]  -translate-y-3">
      {/* Large Project 1 - Top Left */}
      <SpotlightCard className="col-start-1 col-span-2 row-span-2 rounded-[30px] bg-neutral-900/90">
        <motion.div 
          className="p-4 text-white h-full"
          whileHover={{ scale: 0.98 }}
        >
          <h3 className=" text-xl">Agnihotri Aerospace LLP</h3>
          <ShinyText
            text="Next.js · Tailwind · Framer"
            disabled={false}
            speed={3}
            className="custom-class text-sm"
          />
        </motion.div>
      </SpotlightCard>

      {/* Small Project 2 - Top Right */}
      <SpotlightCard className="rounded-[30px] col-start-3 col-span-2 bg-neutral-900/90">
        <motion.div 
          className="p-2 text-white"
          whileHover={{ scale: 0.98 }}
        >
          <h3 className=" text-xl">Attack-GAN</h3>
          <ShinyText
            text="React · TensorFlow · Flask"
            disabled={false}
            speed={3}
            className="custom-class text-sm"
          />
        </motion.div>
        
      </SpotlightCard>

      {/* Small Project 3 - Middle Right */}
      <SpotlightCard className="rounded-[30px] col-start-3 col-span-2 bg-neutral-900/90">
        <motion.div 
          className="p-2 text-white"
          whileHover={{ scale: 0.98 }}
        >
          <h3 className=" text-xl">CMS FAQ</h3>
          <ShinyText
            text="Next.js · mongoDB · Redis"
            disabled={false}
            speed={3}
            className="custom-class text-sm"
          />
        </motion.div>
      </SpotlightCard>

      {/* Large Project 4 - Bottom Left */}
      <SpotlightCard className="col-span-2 row-span-1 rounded-[30px] bg-neutral-900/90">
        <motion.div 
          className="p-2 text-white"
          whileHover={{ scale: 0.98 }}
        >
          <h3 className=" text-xl">EducAIte</h3>
          <ShinyText
            text="Next.js · LLM · MongoDB"
            disabled={false}
            speed={3}
            className="custom-class text-sm"
          />
        </motion.div>
      </SpotlightCard>

      {/* Small Project 5 - Bottom Right */}
      <SpotlightCard className="rounded-[30px] col-span-2 bg-neutral-900/90">
        <motion.div 
          className="p-2 text-white"
          whileHover={{ scale: 0.98 }}
        >
          <h3 className=" text-xl">BookSage</h3>
          <ShinyText
            text="React ·MySQL · Express"
            disabled={false}
            speed={3}
            className="custom-class text-sm"
          />
        </motion.div>
      </SpotlightCard>
    </div>
  );
}

export default ProjectGrid;