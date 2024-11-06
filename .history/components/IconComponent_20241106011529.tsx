import React, { useState } from 'react';

export const IconComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Prevent event from bubbling up to parent elements
    e.stopPropagation();
    
    // Your existing click handler logic
    setIsOpen(prev => !prev);
  };

  return (
    <div 
      onClick={handleClick}
      className="..."
    >
      {/* Icon content */}
      {isOpen && (
        <div 
          onClick={e => e.stopPropagation()} // Stop propagation on the window too
          className="..."
        >
          {/* Window content */}
        </div>
      )}
    </div>
  );
}; 