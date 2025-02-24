import React from 'react';
import GradientText from '../GradientText/GradientText';
import SpotlightCard from '../SpotlightCard/SpotlightCard';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, FileText } from 'lucide-react';

function Contact() {
    return (
        <div className="w-[373px] h-[250px] -translate-x-3">
            <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="custom-class text-xl font-bold mb-3" // Reduced from text-2xl and mb-4
            >
                Reach Me Out?
            </GradientText>

            <div className="grid grid-cols-4 grid-rows-2 gap-2 w-full h-full p-1">
                {/* LinkedIn - Large Card */}
                <SpotlightCard className="col-span-2 row-span-2 rounded-[30px] bg-neutral-900/90"
                spotlightColor="rgba(10, 102, 230, 1)">
                    <motion.a
                        href="https://www.linkedin.com/in/sanjan-a-p-7bb043236/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-white h-full flex flex-col items-start" // Reduced padding
                        whileHover={{ scale: 0.98 }}
                    >
                        <Linkedin className="w-6 h-6 mb-1" /> {/* Reduced icon size and margin */}
                        <h3 className="text-lg font-bold">LinkedIn</h3> {/* Reduced from text-xl */}
                        <p className="text-xs text-gray-400 mt-1">Connect with me professionally</p> {/* Reduced text and margin */}
                    </motion.a>
                </SpotlightCard>

                {/* Github - Small Card */}
                <SpotlightCard className="rounded-[30px] col-start-3 col-span-2 bg-neutral-900/90"
                spotlightColor="rgba(110, 84, 148, 1)">
                    <motion.a
                        href="https://github.com/Taurus1601"
                        
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-white h-full flex flex-col items-start" // Reduced padding
                        whileHover={{ scale: 0.98 }}
                    >
                        <Github className="w-5 h-5 mb-1" /> {/* Reduced icon size */}
                        <h3 className="text-base font-bold">GitHub</h3> {/* Reduced from text-lg */}
                        <p className="text-[10px] text-gray-400">Check out my projects</p> {/* Reduced from text-xs */}
                    </motion.a>
                </SpotlightCard>

                {/* Resume - Small Card */}
                <SpotlightCard className="rounded-[30px] col-start-3 bg-neutral-900/90"
                spotlightColor="rgba(46, 230, 113, 1)">
                    <motion.a
                        href="https://drive.google.com/file/d/14C2Uaagvqk2HnVfahVBrC7ZpeIOwWR_i/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-white h-full flex flex-col items-start" // Reduced padding
                        whileHover={{ scale: 0.98 }}
                    >
                        <FileText className="w-5 h-5 mb-1" /> {/* Reduced icon size */}
                        <h3 className="text-base font-bold">Resume</h3> {/* Reduced from text-lg */}
                        <p className="text-[10px] text-gray-400">Download my CV</p> {/* Reduced from text-xs */}
                    </motion.a>
                </SpotlightCard>

                {/* Email - Small Card */}
                <SpotlightCard className="rounded-[30px] col-start-4 bg-neutral-900/90"
                spotlightColor="rgba(52, 152, 219, 1)"
                >
                    <motion.a
                        href="mailto:sanjanathyady16@gmail.com"

                        className="p-2 text-white h-full flex flex-col items-start" // Reduced padding
                        whileHover={{ scale: 0.98 }}
                    >
                        <Mail className="w-5 h-5 mb-1" /> {/* Reduced icon size */}
                        <h3 className="text-base font-bold">Email</h3> {/* Reduced from text-lg */}
                        <p className="text-[10px] text-gray-400">Let&rsquo;s talk!</p> {/* Reduced from text-xs */}
                    </motion.a>
                </SpotlightCard>
            </div>
        </div>
    );
}

export default Contact;