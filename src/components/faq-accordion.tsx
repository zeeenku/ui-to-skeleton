import { useState, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  <div
    className="flex justify-between items-center cursor-pointer"
    onClick={onClick}
  >
    <div className="text-lg font-semibold">{children}</div>
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
    <div className="text-slate-600 mt-2">{children}</div>
  </motion.div>
);

// AccordionItem Component
export const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-cyan-100 mb-4">
      <AccordionTitle onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        {title}
      </AccordionTitle>
      <AccordionBody isOpen={isOpen}>
        {children}
      </AccordionBody>
    </div>
  );
};


