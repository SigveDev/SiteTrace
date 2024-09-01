import React, { useEffect, useRef } from "react";
import Prism from "prismjs";

// Import the JSON language for highlighting
import "prismjs/components/prism-json";
// Import the Prism theme for styling
import "prism-themes/themes/prism-atom-dark.css";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <div className="my-4 overflow-hidden bg-gray-900 rounded-lg shadow-md">
      <pre
        className="p-4 overflow-x-auto text-sm leading-normal bg-transparent"
        style={{
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <code ref={codeRef} className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
