
import React from 'react';

export const BlurBackground: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background blur elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-primary/5 filter blur-[80px] animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[25%] h-[25%] rounded-full bg-primary/10 filter blur-[60px] animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute top-[40%] right-[15%] w-[15%] h-[15%] rounded-full bg-blue-300/10 filter blur-[60px] animate-[pulse_12s_ease-in-out_infinite]" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};
