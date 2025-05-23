import { useState, ReactNode } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

// Types for props
interface AccordionTitleProps {
  children: ReactNode;
  onClick: () => void;
  isOpen: boolean;
}

interface AccordionBodyProps {
  isOpen: boolean;
  children: ReactNode;
}

interface AccordionItemProps {
  title: ReactNode; // This allows JSX elements for the title
  children: ReactNode;
}

const AccordionTitle = ({ children, onClick, isOpen }: AccordionTitleProps) => (
        <div   className="w-full px-6  cursor-pointer py-4 text-left flex items-center justify-between hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors duration-200 group"
    onClick={onClick}
  >
                 <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center group-hover:bg-cyan-200 dark:group-hover:bg-cyan-800 transition-colors">
            <HelpCircle className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
            {children}
          </h3>
        </div>
    <motion.div
    className="text-slate-600"
      initial={{ rotate: 0 }}
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
     <ChevronDown /> 
    </motion.div>
  </div>
);

// AccordionBody Component
const AccordionBody = ({ isOpen, children }: AccordionBodyProps) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    style={{ overflow: "hidden" }}
  >
    <div className="text-slate-600 p-6 border-t border-cyan-100">{children}</div>
  </motion.div>
);

// AccordionItem Component
export const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white overflow-hidden rounded-xl shadow-md border border-cyan-100 mb-4">
      <AccordionTitle onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>
      </AccordionTitle>
      <AccordionBody isOpen={isOpen}>
        {children}
      </AccordionBody>
    </div>
  );
};


