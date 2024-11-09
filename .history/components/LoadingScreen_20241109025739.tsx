"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Terminal, SkipForward, Code, Laptop, Database } from "lucide-react";
import { Button } from "./ui/button";

interface LoadingScreenProps {
  onComplete: () => void;
}

// Add new loading screen designs
const TerminalDesign = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[500px] rounded-lg bg-black border border-green-500 p-4 font-mono">
    <div className="flex items-center gap-2 border-b border-green-500/50 pb-2 mb-2">
      <div className="flex gap-1.5">
        <div className="h-3 w-3 rounded-full bg-green-500/30"></div>
        <div className="h-3 w-3 rounded-full bg-green-500/50"></div>
        <div className="h-3 w-3 rounded-full bg-green-500/70"></div>
      </div>
      <span className="text-xs text-green-500/70">terminal</span>
    </div>
    <p className="text-left">
      <span className="text-green-500">$ </span>
      <span className="text-green-500">{text}</span>
      <span className="animate-pulse text-green-500">_</span>
    </p>
  </div>
);

const CodeDesign = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[500px] rounded-lg bg-zinc-900 p-6 font-mono shadow-xl">
    <div className="flex items-center gap-4 mb-4">
      <Code className="h-8 w-8 text-blue-400" />
      <div className="h-2 w-24 bg-blue-400/30 rounded-full animate-pulse"></div>
    </div>
    <p className="text-blue-400 typing-effect">
      {text}
      <span className="animate-pulse">|</span>
    </p>
  </div>
);

const MatrixDesign = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[500px] font-mono">
    <div className="grid grid-cols-12 gap-1 mb-4">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="h-2 bg-emerald-500/30 rounded-full animate-pulse"
          style={{ animationDelay: `${i * 0.1}s` }}
        ></div>
      ))}
    </div>
    <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-emerald-500/20">
      <p className="text-emerald-400 text-lg">
        {text}
        <span className="animate-pulse">⌷</span>
      </p>
    </div>
  </div>
);

const Windows95Design = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[500px] rounded-sm border-2 shadow-[2px_2px_0px_0px_#000000] bg-[#c0c0c0]">
    <div className="flex items-center justify-between bg-[#000080] px-2 py-1">
      <span className="text-white text-sm font-bold">Command Prompt</span>
      <div className="flex gap-1">
        <button className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black px-2 text-sm font-bold">_</button>
        <button className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black px-2 text-sm font-bold">□</button>
        <button className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black px-2 text-sm font-bold">×</button>
      </div>
    </div>
    <div className="p-4 bg-black font-['MS_Sans_Serif']">
      <p className="text-left">
        <span className="text-gray-200">C:\WINDOWS></span>
        <span className="text-gray-200">{text}</span>
        <span className="animate-pulse text-gray-200">_</span>
      </p>
    </div>
  </div>
);

const MacTerminalDesign = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[500px] rounded-lg bg-[#2D2D2D] overflow-hidden shadow-xl">
    <div className="bg-[#3A3A3A] px-4 py-2 flex items-center gap-2">
      <div className="flex gap-2">
        <div className="h-3 w-3 rounded-full bg-[#FF605C] border border-[#CE4A47]"></div>
        <div className="h-3 w-3 rounded-full bg-[#FFBD44] border border-[#CD9A3A]"></div>
        <div className="h-3 w-3 rounded-full bg-[#00CA4E] border border-[#0EA642]"></div>
      </div>
      <span className="text-[#ABABAB] text-sm ml-2 flex-1 text-center font-medium">
        user@macbook ~ /terminal
      </span>
    </div>
    <div className="p-6 font-mono">
      <p className="text-left">
        <span className="text-[#78D95E]">➜</span>
        <span className="text-[#7DBEFF]"> ~/desktop</span>
        <span className="text-[#E4E4E4]"> {text}</span>
        <span className="animate-pulse text-[#E4E4E4]">▋</span>
      </p>
    </div>
  </div>
);

const MainframeDesign = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[500px] font-mono">
    <div className="bg-black border-2 border-green-500 p-6 rounded">
      <div className="mb-4 flex items-center justify-between border-b border-green-500/30 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-green-500 animate-pulse"></div>
          <span className="text-green-500 text-xs">IBM 3270</span>
        </div>
        <div className="text-green-500 text-xs">READY</div>
      </div>
      <div className="space-y-1">
        <div className="grid grid-cols-8 gap-1 mb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="text-[10px] text-green-500/50"
            >{`F${i + 1}`}</div>
          ))}
        </div>
        <p className="text-green-500 uppercase tracking-wide">
          TSO/E LOGON IN PROGRESS
        </p>
        <p className="text-green-500">
          <span className="mr-2">&gt;</span>
          {text}
          <span className="animate-pulse">█</span>
        </p>
      </div>
      <div className="mt-4 pt-2 border-t border-green-500/30 flex justify-between text-[10px] text-green-500/50">
        <span>SYSTEM ONLINE</span>
        <span>3270 TERMINAL</span>
      </div>
    </div>
  </div>
);

const LinuxTerminalDesign = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[500px] rounded-lg overflow-hidden bg-[#300A24] shadow-xl">
    <div className="bg-[#3A2837] px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#FF605C]"></div>
          <div className="h-3 w-3 rounded-full bg-[#FFBD44]"></div>
          <div className="h-3 w-3 rounded-full bg-[#00CA4E]"></div>
        </div>
        <span className="text-gray-300 text-sm">bash</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>
    </div>
    <div className="p-6 font-mono bg-[#300A24]">
      <p className="text-left mb-1">
        <span className="text-green-400">user@ubuntu</span>
        <span className="text-gray-400">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-gray-400">$</span>
        <span className="text-gray-200"> neofetch</span>
      </p>
      <div className="flex gap-4 mt-2">
        <div className="text-[#E95420] whitespace-pre font-mono text-xs leading-[1.2]">
          {`SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%SS%?%##%%%?%%S####@@@@@@@@@@@@@@@@############@#@@#########@@@@@@@@@@@@########################################################@#SSS%SSSS%%%%SS%%%%%%%%%%SSS%SSSS%%SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%S%??S#S%%%%%SS###@@@@@@@@@@@@@@@##########@#@@#@########@@@@@@@@@@@@@#############################################SS#####S#@@#SSS%SS%SS%%%SS%%%%%%%%%%%%SS%%%%%%%%SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%S%S%??%SSSS%%%%S###@@@#@@#@@@@@@@@##########S#@#@@########@@@@@@@@@@@@@##################################@@@@@@@@##S###S####@#S#SSSSSSS%%%%SS%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%??%SSSS%%%S####@@#@@@@@@@@@@@@#######@S?#@@@@#######@@@@@@@@@@##@@@#####################@@#######@@@@@##@@@@@#SS####@#SS##SSSSSS%%%%SS%%%%%S%%%%%%%%%%%%%%%S%%%%%%%%%%%%%%%%%%%%%SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%???%SSSS%%SS####@@@#@@@@@@@@@#########S#############@@@@@@@@@@@@@@@@###########@@@#@@@@@@##@#@@@#########@@@@@######SS##SSS%%SS%%%%S%%%%%S%%%%%%%%%%S%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSS%%SSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%???%S##SSSSS####@@#@@@@@@@@@@#########@##S#S%S###@@@@@@@@@@###########@##S#@@@@@@@@@@@@@@@@@@######@@@@###@@@@@@@#####SS%%SSS%%%%S%%%%SS%%%%%%%%%%SS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%????%S##SSSSS####@@@@@@@@@@@@########@@@@@@@@@@###########@@#############@@@@@@@@@#@@@@@@@@@@@@@@@@@@###@@@@@@@@@@@@#@@#SSSS%%%S%%%%%SSSS%%%%SSSSSS%%S%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%??????%S###SS%S###@@##@@@@@@@######@####@@###@#####@@@@@@@@@@@########@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##@@#####SS%%%%%S%SS%%%SSSSSS%%%S%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%????????%S##SSSSS####@@@@@@@@#@#@@##@@@@#########@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#####S#@S%S%S%%%SS%%%S%%%%SSSSSSS%%%S%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%?????????%S#SSSSS#####@#@@@@@######@@#######@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#S%%@SSSSSS%SS%%S##S##SS#SSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%SS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%??????????%%S#SSSS####@@@@@@@##########@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#@@@#SS#@#SS##SSSSS@@####@###SSSSSSS#S%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%???????????%SS#SS##@@@@@@@@@@@##@###@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##SS%%%S#####@@#%%SSS@@#S###S%%SS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%SS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%???????????%%S##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#SSS#@@@@@@@@##S%SS#@#SSS##%%SS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%??????????????%S#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#@@@@@@@#@@@@@#SS%S@@S%S##S%SS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%?????%???????%%?S#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###@@@@@@@@@@@@@@@#@@@@@##@@SS%##S%SS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%???%SSSS%%%??%###@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##@@@##@@@S%SSS#S%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#%??%########@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###S#@##@##SSS#SSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#S%%SSS#@##@@@@@@@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#@##@@S###SSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%S%%%%%%%%%%%
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%SSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%##SSS##@@@#@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###############################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###SSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSS%%%%%%%%%%
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSS##@@@##@#@@@@@##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##########################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#SSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSS%%%%%%%%%%
SSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%####@@##@@@@@@@@@@@@@@##@@@@@@@@@@@@@@@@@@@######################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@####S%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSS%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#@@@@#######@@@@@@@@@@@@@@@@@@@@@@@@@@@################################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@#####S%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSS%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%S@@@@@####@@@@@@@@@@@@@@@@@@@@@@@@@@##########################################################################################@@@@@@@@@@@@@@@@@@@@@@@###@#S%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSS%%%%%%%%%%
SSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#S#@@##@@##S#@@@@@@@@@@@@@@@@@@@@@@################################################################################################@@@@@@@@@@@@@@@@@@@@@####%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SS%%%%%%%%%%
SSSSSSS%S%S%%S%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%S#SS@@#####@##@@@@@@@@@@@@@@@@@@@##########################S##################SS##S#SSS##################################################@@@@@@@@@@@@#S#S#@@@@SSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SS%%%%%%%%%%
SSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%S####@@@@#SS#@@@@@@@@@@@@@@@@@@@@##@############################SS#######S####SSSSSSSSSSSSSSSSS#############################################@@@@@@@@@@@@@@@@@#######SSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SS%%%%%%%%%%
SSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%S#S%S@@@@@@###@@@@@@@@@@@@@@@@@############################SSSSSSSSSSS###SS##SSS##SSSSSSSSSSSSSSSSSS##S#SS######################################@@@@@@@@@@@@@@##%%SSS###%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSSSS%%%%%%%%%%%
SSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SS@#S###@@@##@@@@@@@@@@@@@@@@@@@@@@########SSSS##SSS####SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###########################################@@#######@@#SS####%%S##%%%%%%%%%%%%%%%%%%%%%%%%%%SSSS%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSS%%S@#S@##@@@##@@@@@@@@@@@@@@@@@@@@@#########SSSSSS#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#####################################@@@@@#@@@##@S%%##S%%?SS?%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%S%SS%%%%S###@@@@@@@@@@@@@@@@@@@@@@@@@@@###########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##################################@@@@@@@##@@S%SSSS%SS%?%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%?%S##SSSSSS#####@@@@@@@@@@@@@@@@@@@@@@@#############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###################################S#@@@@@##@@#SSS#%?%%??%?%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%?%S#@%?######S##@@@@@@@@@@@@@@@@@@@@@@@@#############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#####################################S#@@@@@@###%%##%?%?%%?%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%???%SS#S?S##@###@@@@@@@@@@@@@@@@@@@@@@@@##@@########S#######SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##########SSSSSS#S##################S##@##SS##%?##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%S#SS##S##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#SSSSSSSSSSSSSSSSS###################S#####@#%S%%%%???%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%S%%SSS#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#####################SSSS#S##%??%????%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%S%S%%#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##SSSSSSSSSSSS################S#SS###S##S???????%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%?%%%%%S#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#######SSSSSSSS####S#########SSSS##S%%###%???%??%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%??%%?%SS@@@@@@@@@@@@@@@@@@@@@@@@@@@@##@@@##############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#######SSSSSSSS####S##########S#SSSS%?#@#S???????????????%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%??%%S#@@@@@@@@@@@@@@@@@@@@@@@@@@@@#####@#############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#######SSSSSSSS####S#########SSS#SSS%%#@@%???????????????%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%???%?????%SSS#@@@@@@@@@@@@@@@@@@@@@@@@@#@####################S##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#SSSSSSSSSSSS################SSSSSS#@@S????????????????%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%????????????????????????????????????????????%SS%S#@@@@@@@@@@@@@@@@@@@@@@@############################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##############SSSSSS#@#%????????????????????%%%%%%%%%%%%%%%%%%%%%%%%%%%
???????????????????????????????????????????????????????????????????????SSSS##@#@@@@@@@@@@@@@@@##@@#@####@########################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS############SSSSSSS%%?%%????????????????????%%%%%%%%%%%%%%%%%%%%%%%%%
??????????????????????????????????????????????????????????????????????S####@@@@@@@@@@@@@@@@@#@#####@#############################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#S######SSSSS#S%%%???????????????????????%%%%%%%%%%%%%%%%%%%%%%%%
?????????????????????????????????????????????????????????????????????%@##@@@@@@@@@@@@@@@@@@@#@@##################################SSSSSSSS##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#SSSSSSS#####SS#S????%????????????????????%%%%%%%%%%%%%%%%%%%%%%%%
?????????????????????????????????????????????????????????????????????%@##@@@@@@@@@@@@@@@###@####################################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###SSS#S%%%?%%???????????????%%%%%%%%%%%%%%%%%%%%%%%%%%%%
?????????????????????????????????????????????????????????????????????%@##@@@@@@@@@@@@@@######################################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS####SSSSS#%%%%%%%?????????%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
??????????????????????????????????????????????????????????????????????#@#@@@@@@@@@###########################################SSSSSSSSSSSSSSSSSSSSSSSSSS######################S########SS##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###SS##SSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
???????????????????????????????????????????????????????????????????%?%#@#@@#@#@@#####@####################################SSSSSSSSSSSSSSSSSSSSSSSSS##########################################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
????????????????????%???????????????%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%S%S#@#@@@@#@##########################################SSSSSSSSSSSSSSSSSSSSSSS##################################################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#S%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSSS#@#@#@############################################SSSSSSSSSSSSSSSSSSSSSS#######################################################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#S???%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS%%%%%%%%%%%%S####@@#########################################SSSSSSSSSSSSSSSSSSSSSS################S###S#######################################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##?????????????????????????%%%%%%%%%%%%%%%%%%%%%%
SS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%??????%?%#@##@@#######################################SSSSSSSSSSSSSSSSSSSSSS#########SSSSSSSSSSSSSSSSSSSSS#################################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#?*???????????????????????%%%%%%%%%%%%%%%%%%%%%%
??????????????????????????????????????????????????????????????????????S@#########################################SSSSSSS#SSSSSSSSSSSSSSS#######SSSSSSSSSSSSSSSSSSSSSSSSSSSSS############################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#?*??????????????????????%%%%%%%%%%%%%%%%%%%%%%%
?????************?????????????????????????????????????????????????????S@#######################################SSSSS#SSSSSSSSSSSSSSSSS######SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#############################SSSSSSSSSSSSSSSSSSSSSSSSSS#SS#SS#S####SSSSSSSSSSSSS#%*???????????????%??????%%%%%%%%%%%%%%%%%%%%%%%
????**************????????????????????????????????????????????***?????S#######################################SS#SSSSSSSSSSSSSSSSSSSS####SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS############################SSSSSSSSSSSSSSSSSSSSSSSSS#################SSSSSSSSSSS????????????????%??????%%%%%%%%%%%%%%%%%%%%%%%
???*******????*****??????????????????????????????????????????***??????%######################################SS##SSSSSSSSSSSSSSSS#SS###SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##SS########################SSSSSS##SSSSSSSSSSSSS#SSS#######################SSSSSSSS????????????????%%?%???%%%%%%%%%%%%%%%%%%%%%%%
???*****???????*****?????????????????????????????????????????*????????%#####################################SS##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###SS##################S####SSSSSSSS#SSSSSSSSSSS##S#######################@####SSSS#%???%????%%%%%??%%?%%??%%%%%%%%%%%%%%%%%%%%%%%
????****????????***??????????????????????????????????????????????**?*?%##########################################SS##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS####################S#####SSSSSSSSSSSSSS#####SSSSS##############################SSS%???%?%%?%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
???*****?????????***??????????????????????********?????????????*??????S##################################SS#####SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##################################SSSSSSSSSSSSSSS#S#SSSS##################################S?????%%%%%%%%%%%%%%%??%%%%%%%%%%%%%%%%%%%%%%%
????****??????????*??????????????????????************?????????????????S##################################S######SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#########################################SSSSSSSSSSSSSSSSSSSSSSSS#S###########################@#@@####%???%%%%%%%%%%%%%%%%??%%%%%SS%%%%%%%%%%%%%%%%
?????**??????????????????????????????????*****???****?????????????????S##################################S####SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS############S#################################SSSSSSSSSSSSSSSSSSSSSSSSSSS###############################@@###???%%%%%%%%%%%%%%%%%?%%%%%%SS%%%%%%%%%%%%%%%
??????***???????????????????????????????***???????***?????????????????S##############################SS##SS###SSSSSSSSSSSSSSSSSSSSSSSSSS##SSSSS###########SS#S###################################SSSSSSSSSSSSSSSSSSSSSSSSSSS##################################@@#%%%%%%%%%%%%%%%%%%%%%%%%%%%SSS%%%%SSSSS%%%%
??????***??????????????????????????????****???????***?????????????????S##############################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##SSSSS#######SS#############@@############################SSSSSSSSSSSSSSSSSSSSSSSSSSS####################################@S%%%%%%%%%%%%%%%%%??%%S%%%%%SSSS%%SSSSS%%%%
????*****???????***??????????????????******???????*****???????????????S################################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###SSSS############@@@@@@@@@@@@@@@@@@@@@@@#################SSSSSSSSSSSSSSSSSSSSSSSSSSS##########################S######S####S%%%%%%%%%%%%%%%%%%?%%%%%%%%SSSSSSSSSSSS%%%
???****?***??????**??????????****?**********??????****????????????????#############################S####SSSSSSSSSSSSSSSSSSSSSSSSSSSSS############@@@@@@@@@@@#@@@@@@@@@@######@@@@@@@###########SSSSSSSSSSSSSSSSSSSSSSSSSSSS#######################SSSSSSSSSSSSSS##S%%%%%%%%%%%%%%%%??%%%%%SSS%%SS%%%SS%%S%%%
????????******?**????????**?????**********???*????**?*????????????????S###########################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##################@@@@@@@@@@@@@@@@########@@@@@@@@@########SSSSSSSSSSSSSSSSSSSSSSSSSS###################S#######SSSSSSSSSSSS#S%%%%%%%%%%%%%%%%%?%%%%%%%%?%SSS%%%%%%S%%%
?????????????????????????***????***********?*********?????????????*???S###########################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##########################@@@@#######@@@####@@@#########SSSSSSSSSSSSSSSSSSSSSSSSS###########################SSSSSSSSSSSSS%%%%%%%%%%%%%%%%%??%%%%%%%%??%%%%SS#S%S%%%
%%??????????????????????**?*?????************?????????????????????????S##########################SSSSSSSS#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS######################################SSSSSSSSSSSSSSSSSSSSSSSSSSS########################SS##SSSSSSSSSSS%%%%%%%%%%%%%%%%%%?%%%%SS%S%??%SSS##S%%S%%
?%%??????????????????????*???????*********??????????????????%%SSSSSSSSS##########################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###S##################################SSSSSSSSSSSSSSSSSSSSSSSSSSSSS#######@####################SSSSSSSSSS%%%%%%%%%%%%%%%%%%%?%%%%%%%%??%%SSS#SSSSSSS
?????????????????????????**???????******????????????????*?%SSS##SSSSSSS##########################S#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#####################################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS####@@#######################SSSSSSSS%%%%%%%%%%%%%%%%%SS%%%%%%%%??%%S######SSSSS
????????????????????????????**????*****????????????????*?%SS#######SSSSS########################SS#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS################################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#SS##@@@@@@@@##@@@@@@@############SSSSS??%%%%%%%%%%%%%%%%SS%%%%%%%%SS##@@@@@@@@####
?????????????????????????????*????**????????????????????%SS#####SS##SSSSS########################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#S#####################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#@@@@@@@#S#@@@@@@@@@@@#########SSS??%%%%%%%%%%%%%%%%%%%%%SS#####@@@@@@@@@@@##@@
?????????????????????????????????????????????????????*?%SSS###SSSSSSSSSSSSSS###################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#######SSSSSSSSSSSS#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###@@@@@@@@@@@@@@###@@@###SS####%*?%%%%%%%%%%%%%%%%%%%%%S######@@@@@@@@@@@@@@@
******???????????????????????????????????????????????*?SS###SSSSSSSSSS#SSSSSSS#################SSSSSSSSSS#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS######@@@@@@@####S##@@@@##SS###?*?%%%%%%%%%%%%%%%%%%?%S#@@###@@@@@@@@@@@@@@@@
???****???????????????????????????????????????????????%SS##SSSSSSSSSSSS#SSSSSSSS##############SSS##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###########@@@#######@@@@##S@S???%%%%%%%%%%%%%%%%%%%S##@#S#@@@@@@@@@@@@@@@@@
?????****????????????????????????????????????????????%SSS#SSSSSSSSSSSSS#SSSSSSSSSSS###########SSS##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###############@@@@@@@@@@###????%%%%%%%%%%%%%%%%%S#@@@##########@@@@@@@@@@@
??????***????????????????????????????????????????????SSS##SSSSSSSSSSSSSSSSSSSSSSSSSS##########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#####SSSSSSS#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS######################@@@#?????%%%%%%%%%%%%%%%S##@@#@@#########@@@@@@#####
???????***??????????????????????????????????????????%SS##SSSSSSSSSSSSSSSSSSSSSSSSSSS#########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#########SS#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#######################??????%%%%%%%%%%%%%%%%S######@@@#####@@@@@@@@#@@#
???????****?????????????????????????????????????????SS##SSSSSSSSSSSSSSSSSSSSSSSSSSSS########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##################SSS%*?????%%%%%%%%%%%%%%%%S#@@@@@@@@####@@@@@@@@##@@@
???????****??????????????????????????????????*****?%SS##SS#SSSSSSSSSSSSSSSSSSSSSSSSS########SSSSSSS##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#####################%??????%%%%%%%%%%%%%%%%S#@@@@@@@########@@@@@@@@@@
???????****???????????????????????????????********?SSS####SSSSSSSSSSSSSS##SSSS#SSSSS#S######SSSSSSS###SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###############SSSS??????%%%%%%%%%%%%%%%%S###SS%SS#@@@@##@@@@@@@@@##
??????********???????**?????????????????*****???**%SSS##SSSSSSSSSSSS######SS###SSSSSSSS####SSS#######SS#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#S###############SSSSSSSSSSSSSS#########S##SSSSSSSSSSSSSSSSSSSSSSSS##SS######SSSSSSSSSS?????%%%%%%%%%%%%%%%S#@S%%%%S###@@##@@@@@@@###SS
*********???????*****????**?????????????****??????%SS##SSSSSSSSSS#######@##S###SSSSSSSS####S#########SS##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##################SSSSSSSSS####@@@@@@@@######SSSSSSSSSSSSSSSSSSSSSSSSSSS###SSSSSSSSSSSS#S?*??%%%%%%%%%%%%%%S#####SSSS#######@@@@########
????????????????***???????***??????????****???????SSS#SSSSSSSSS############SSSSSSSSSSSSS###S#########SS##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS######################SS######@@@@@@@@@@@@@@##SS##SS#SS###SSSSS##SSSSSSSSSSSSSSSSSSSSSSSS#%*??%%%%%%%%%%%%%%######SSSSSSS###@@@@@#SSS#@@@
??????????????***??????????**??????????****???????SS#SSSSSSSSS###########SSSSSSSSSSSSSSSS##S#########SS##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#SS##########################################@@######################SSSSSS#SSSSSSSSSSSSSSSSSS%*?%%%%%%?%%SS%?%######S%%?%%SS###@@#SSSSS#@@@
?????????????***???????????****????????*****????*%SS#SSSSS############SSSSSSSSSSSSSSSSSS#####SS#########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS################SSSSSSS#########################################@@######SSS###SSSSSSSSSSSSSSSSSS%??%%???%S###%%%S#@@@@###SSS#####@@#SSSSS#@@@
***?????????****??????????*****????????*****????*%#S#SSSS############SS#SSSSSSSSSSSSSSSSS#####S#########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS################SSSSSSSSSSSSS#################################@@@@@@@@#####SS###SSSSSSSSSSSSSSSSSSS%?%???%###SS###S#@@@@############@@###SS###S
??*****????******?????????**????????????****?????%SS#SSSSS#########SSS##SSSSSSSSSSSSSSSSSSSSSSS#########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS################SSSSSSSSSSSSSSSSSSSS##SS#S######################@@@@@@@####SS#####SSSSSSSSSSSSSSSSSSS%????%##S%#@@@#@@@@@#SSS################S%%
?????**************????????*?????????????*******?SS##SSSSS#######SSSSSSSSSSSSSSSSSSSSSSSS###SSS##########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##################SSSSSSSSSSSS#SSSSSSSSSSS###################################S########SSSSSSSSSSSSSSSSSS%???S#@###SSS#@@##SSS#S#########SSSS##SS%%
?????*********************???????????????*?*****?SSS##SSSS#######SSSSSSSSSSSSSSSSSSSSSSSS###SSS##########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##################SSSSSSSSSSSSSSSSSSSSSSS###############################################SSSSSSSSSSSSSSSSSS%%??%S###S???S@#%%%SS#######S####SSSSSSSSS
?????*******?????????**???????????????????????**?SSS###SSSS#######SSSSSSSSSSSSSSSSSSSSSS#SSSSSS##########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS####################SSSSSSSSSSSS#SSSS#####################################################SSSSSSSSSSSSSSSSSSS%%%??%%%%%??%S%??S######S########SSSSSSSS
?????*****????????????????????????????????????**?SSSS###SSSSS##SSSS###SSSSSSSSSSSSSSSSSSSSSS##S##########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##################SSSSSSSSSSSSS##############################################################SSSSSSSSSSSSSSSSS%%%%%%%%%%??%S%??S@@@@@##########SSS###@#
??????****?????????????????????????????????????*?%SSSS###SSSSSSSSSSSSSSSS##SSSSSSSSSSSS##SSSSSSS######SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###################SSSS########SS###########################################S#################SSS#SSSSSSSSSSSSSSS%%%%%%%%???%SS%?S#@@@@@@@@#######SS#####
????****???????????????????????????????????????**?SSSSSSS###SSSSSSSSSSSSS##SSSSSSSSSSSS##SSSSSSSSSS##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#################################S#######SSSSSSSSSSSS#########################SSSS##############S##SSSSSSSSSSSSSSSS%%%%%%??%%%SSSS%%S#@@@@@@@###SS##SSS#@@#
******???????????????????????????????????????*****?SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###############@###############S###SSSSSSSSSS########################################################SSSSSSSSSSSSSSSS%%%%%????%%SSS##SSS###@#######SS########
***??????????????????????????????????????????******?SSSSSSSSSSSSSSSSSSSSSSSSSSSS#SSS#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#S#############@@############SSSSSSSSSSSSS############################################S#################SSSSSSSSSSSSSSS%%%%%???????%%SS#SSSSS######@@##@@@@@@@@
???????????????????????????????????????????********??SSSSSSSSSSSSSSSSSSSSSSSSSS###SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##############@@##########SSSSSSSS##########################################################################SSSSSSSSSSSS%%%%?**?%%??%%%%SS%?%%S#####@@#@@@@@@@@@
??????????????????????????????????????????*******?**??SSSSSSSSSSSSSSSSSSSSSSSS#####SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS############@@#########SSSSS######################################################S#########################SSSSSSSSSSSS%%%?*???%%?%%??%SS%?%%SSSS###@@###@@####
*******************?????????????????????*******??????*?%SSSSSSSSSSSSSSSSSSS#########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#######################SSSS#############################################################S#######################S#SSSSSSSSSS%%%??*??%%%SSSSSSSSSSSSSSSS#####SSS#@@@@
???????*****************????????????????*******???????*??%S#SSSSSSSSSSS#############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS########SS####@###############@###########################################################S#########################SSSSSSSS%%%%????%%SSSSSS##SS##SS%S######SSSSS#SS
?????????******??????***???????????????*******?????????**???%SS###################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#SS######S####@##########@@@@@@@@#########SSS####SSSSSSSSSSSSSSSS###########################SS########################SSSSS#S???%%????%%%SS######@##SSSS#@##@@@#SS#SS
???????****????????????****????????????*******????????**???**????%??????%#########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###########S#############@@@@@@@@@########S%SSSS##SSS%%%SSSSSS%%%SSSSSS########################S##########################SS#S%?????????%%SS#####@@@#SSSS%SS###@@@@@###
??????****????????????????**???????????*?*****???????******??????????????S########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#S#####SSSSS###############@@@##@#SSSSSS#SS%%%%SS#SS%%%%%S#S%%%%%%%SSSSSSSSSSS#####@@###########S############################%???????????%%%SSSSS#######S##SS#######S##
??????****???????????????****??????????*?******?????*******???????????????S########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#######SSSS#######S###########S###SS%SSS#SS%%%%SSSS%%%%%SSS%%%%%%%%%SSSS%%%%%SSSSS###@@@#########S##########################S%SS%%????%%%%%%%%%SS%SSSSS#####SSS%SSSS###
??????****??????????????*****?????????????*******?*********?????????????**?S#S#####SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS######################SSSS##SS#############SSSSS##%%%%S%SSS%%%%%%S%%%SS%%%%%%SSSSSS#####@########S#@#######################S??SSSS%?%%S##SSSSSS%%%%SSS###@@#SS%SSSSS###
???????*?**?????????????****???????????????****************????????????*???%SS#S###SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#S###################S###SSSSSSSSS###########S##S####SS%%%%%SS%%%%%%%%%%S%%%%%%%%SSS%%SSSS#@@##@@@#####@#####################S??%?%%SS%%%SSSS###SS%%SS######@@#SSSS###SSSS
???????*****???????????**?????????????????????************???????*******????SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS####################SSSSSSSSSSSSSSS########S#SSS#######SSS#SS%%%%%%%%SSS%S%SS%%SSS%%SSS%S@@@@@@@@####@####################S???%%??%%%%%SS########SSSSSS###@@@@@######SSS
????????***************????????????????????????*********?????????******????*%#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###################SSSSSSSSSSSSSSSSSS######SSSSSSS##S#########SSSSSSSSSSS%%%%%SSSS%%SSS%S@@@@@@@@####@#############SS####%????%%%%SSS#############SSSSSS#@@@@@@@@@@##SSS
???????***************????????????????????????????**?????????????******??????SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#################SSSSSSSSSSSSSSSSSSSSSSS######SSSSSS################SSSSSSSSSSSSSSSSSSSS#@@@@@@@@#################SS####%*????????%SSSSSSS########@@@@@##@@@@@@@@@@###S#
?????????***********?????????????????????????????????????????????******??????%SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS################SSSSSSSSSSSSSSSSSSSSSSSSSSS#####SSSS#######S##SSS###SSSSS################@@@@@@@@@@###############S####?*???????*??S%%%SSSS####@###@@@@@@@@@@@@@@@@#####
?????????********????????????????????????????????????????????????********?**??SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##################SSSSSSSSSSSSSSSSSSSSSSSSSSSSS#####SSS####SSSS#SSS######################SSS##@@###@@#############SS###S?*?????%????%%S%S##############@@@@@@@@####@@@@@@@
??????????????*?????????????????????????????????????????????????????*****?**??SSSSSSSSSSSSSSSSSSSSSSSSSSSS##SSSSSSSSSSSSSSSSSSSSSS################SSS#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##SSS#########SSSSS#SS###############SSSS##################S###S###S?*?????????%%%%%SS########SS####@@@@@#SS%SS#@@@@@@@
**????????????????????????**????????????????*************???????????***???????%SSSSSSSSSSSSSSSSSSSSSSSSSSS####SSSSSSSSSSSSSSSSSSSS################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS################SSSSSSSSS#######SSSSSSSSSS##############SS####SS#S??????????%%%%%%%%SS##############@@@@@S%%S#@@@@@@@@
?**???????????????????**********?????????********??????*****??????????????????%SSSSSSSSSSSSSSSSSSSSSS###SS#####SSSSSSSSSSSSSSSSSSSSS############S##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS####SS###################SS##SSSSSSSSSSSSSSSSSS##############SS###SS#S?*?????????%%%%%%%%SS#SSSS%SS#######@@##S%SS##@@@@###
?***??????????????********?????****?????*******??????????***??????????????????%SSSSSSSSSSSSSSSSSSSSSSS##SS######SSSSSSSSSSSSSSSSSSS#############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#########S##########################S####SSSSSSSSSS###########S###SS#%????????????%%SSSSSSSSSSS#S%%SSSSS###@@S%%%SSS#@@@@@@#
?************************????????*****??*******??????????***??????????????????%SSSSSSSSSSSSSSSSSSS#SSSSSSS########SSSSSSSSSSSSSSSS############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS########################################SSSSSSSSSS#S############SS#S?????????????%%SSSSSS###S##SSSSSSS##@@@@#SSSS##@@@@@@@@
?*?**???*****************?????????**************?????????***??????????????????%%SSSSSSSSSSSSSSSSS##SSSSSSS##########SSSSSSSSSSSSSS###########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS########################################SSSSSSSSS##########SSS#S?*?????????????%%SSSS##SSS####SSSSS#@@@@@@###@@@@@@@@@@@
****?????****************??????????*****************?*******??????????????????%%SSSSSSSSSSSSSSSSS##SSSSSSSSSS#SS#####SSSSSSSSSSSS###########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#######################################SSSSSSSSSS#########SSSS#%*???????????????%SSSSSSSS######SS###@@@@@@@@@@@@@@@@@@@@
*???????*****?????********????????************************????????????????????%%SSSSSSSSSS##SS#######################SSSSSSSSSSSS############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS########################################SSSSSSSSSS########SSSS#%??????????????%%%SSS##SSSS######SS#####@@@###@@@@@S#@@@@@
????????****??????*************?*****????*?************???????????????????????%%SSSSSSSSSS#####################################SS##########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##########################################SSSSSSSS#######SS#S#S???????????????%S###########S####%SSSSSSSSSS###@@##SSS###@
???????****???????******************??????????????*???????????????????????????%%SSSSSSSSSSS################################################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##S##################################SSSSSSSSS########SSS#S????????????????%SSS##SSSSSSSS#@@#SS##SSSSSSS#@#SSSSS%%%SS#
??????*****???????***?***???????????????????**???****?**?*????????????????????%%SSSSSSSSSSS##################################SS#############SS#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###################################SSSSSSSSS######SS#S#S?*?????????????%%SSSS%%%%%%SS%%S####@##@@@#SSS#S%%%%%%%%%%SS
?????******??????*******??????????????????******************??????????????????%%%SSSSSSSSSSS#################################SS#################S###SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS################################SSSSSSSSSSSS#######S##S???????????????%%SSSSSSS%%%%SSSSS###@@@@@@@@####%?%%%%%%SSSSS
?????*******??*******????????????????????*********????????????????????????????%%%SSSSSSSSSSS########################################################S##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###############################SSSSSSSSSSSSSS#####SSS#S????????????????%???%SS#####S####@##@@@@@@###SS#@S%%%SSSSSSSSS
?????****************????????????????????*******???????????????*??????????????%%%SSSSSSSSSSSS########################################################SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##########################SSSSSSSSSSSSSSS##SS#SSS#S??????????????????????%%SS%SSS##@@@@@@@@@@#SSSSSS#S%%SSSSSSS#SS
%??????***********??????????????????????******?????????????????*?*????????????%%%SSSSSSSSSSSS########################################################SSSSSS###SSSSSSSSSSSSSSSSSSSSSSSSSS############################SS#SSSSSSSSSSSSS##SSSS#S?*??????????????%%%%%%??%SSSSSS############SSS#####SSS########S#
%%?????????***??????????**???*??????????*****??????????????????***????????????%%%SSSSSSSSSSSSS###########################################################SSS####SSSSSSSSSSSSSSSSSS##SSS#############################SS##SSSSSSSSSSSS##SSS#S????????????????%%%SS%??%S##########S%%S############SSS###@######
%%%???????????????????**??????***???????****??????????????????***?????????????%%%%SSSSSSSSSSSSS################################################################SSSS#SS#SSSS##SSS#S###S############################SSSSSSSSSSSSSSSSS#SSSS#S??????????????????%%%%???%%SS#########SSSS#SS#@@######S#####@@@@@@
%%%%%%%??????????????**????????***??????*********???????????****??????????????%%%%SSSSSSSSSSSSSS########################################################################SS##SSSSS#SS##S#SS#######################SSSS##SSSSSSSSSSSSSSS##%????????????????????%%SS%%%%SSSSS################SSSSSSSSSS####@@@@
%%%%%%%%%????????????**?????????**???????*********************?????????????????%%?SSSSSSSSSSSSSS##################################################################################################################SSSS#SSSSSSSSSSSSS###%*???????????????%%%%%%%SS%%%%SSS%%SS#SS#@@@@#@@@@#SSSSSSSS#####@@@@@
%%%%%%%%%%???????????***???????**?????????*******************?????????????%SS#####SSSSSSSSSSSSSSS###############################################################################S###################################SS###SSS##SSSSSS#S?*???????????????%%S#S%??????%SS###SSS%%%%%SS##@@@#@@########@@@@@@@@@
?????????????????????*****????**??????????????????******???????????????%S###@@@@@@SSSSSSSSSSSSSSSSS###############################################@@@##@##############################################################S####S####SSS#S?*???????????????%%%%SS%???%%SS%S#@@S%???%%%?%%%S#@#@@#####@@@#####@@@@
*******************************????????????????????****?????????????%S####@@@@@@@@SSSSSSSSSSSSSSSSS##################################################@@@#######################################################################SS##S??????????????????%%%%%S%??%%%SSS##@S???%%%%%%%%%%%#############SSS##@@@
??????????***??????*****?*?**?????????????????????????????????????%S####@@@@@@@@@@#SSSSSSSSSSSSSSSS#################################################@#@@@@@@###################################################################S#S%????????????????????????%%%%??%S#####???%%%%%%%%%%%%S####SSS###S#####@@@@
%%%%%%????**????????***??????????????????????????????????????*?%S#####@@@@@@@@@@@@#SSSSS#SSSSSSSS######################################################@@@@@@@@###@#@####@######################################################S?*??????????????????%??????%%??S#######%??%%%%%%%%%%%%SSSSSS%%SSSS######@@@
??????????**????????**??????????????????????????????****??*??%S######@@@@@@@@@@@@@#SSSSS##SSSSSSS######################################################@@@@#@@@@@@@@@@@@@@#####################################################S?**??????????????%%????????%%??%##@####@#%?%%%%%%%%%%%SSSSSSS%%SS######SS###
????????????*?*???**??????????????******?????????***????**?%######@@@@@@@@@@@@@@@@#SSSSSSS##SSS#########################################################@@@@@@@@@@@@@@@@@@@@@################################@############@#S##@#S??*???????????%%???%%%%?????%S#@@@#@#@@#%%%%%%%%%%%%SSS##SSSSSSSSSSSS###SS
?%%%%?%??????*****?????????????????%%%%%?????*******???*?%S######@@@@@@@@@@@@@@@@@#SS#SSSSSS#############################################################@@@@@@@@@@@@@@@@@@@@@##@@@############@#############@##@#####@@@####@@@@@#S%??**???????%%??%S###S%??%%S#@@@@@@@@@#SS%%%SSSSSSSSS#########SSS####S%%
?%%???%%????????????????%%SSS#########@#####SSS%%%?????%S######@@@@@@@@@@@@@@@@@@@#S#SSSSSSS################################################################@##@@@@@@@@@@@@@@@@@@@@@@@@@####@##@@#######@@@@@@@#@@#@@@@@##@@@@@@@@@@@#SS%?**????%??%SSS###SSSSS#S#@@@@@@@@SSSSSSS######SSS###SSSS#####@#S%%%
???????%?????????????%S#######@##@@@@@@#@@@@@#@@#####SS######@@@@@@@@@@@@@@@@@@@@@#SSSSSSSSSSSS################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###%?**???????%%%SSS##SSSSS##SS#SS#%%SSS#SS###@@S%SSSS%SSS####@@#S%%%
??????????????????%S#######@@@@@@@@@@@@@@@@@@@@@@@#########@@@@@@@@@@@@@@@@@@@@@@@SSSSSSSSSSSSSS###################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##@#%?????????%%%%%%SSSSSSSSSSSSS#S%%SSS#####@@#%SS%%SS###@@@@@#SS%%
????????????????%#######@@@@@@@@@@@@@@@@@@@@@@@@@@####@@@@@@@@@@@@@@@@@@@@@@@@@@@#S#SSSSSSSSSSSSS######################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#@@#?%%%%SSSSSSS##SS###SSS%%SSSS%%S####@@@@@@S%SSSS#@@@@@@@@@@#SSS
???????????????S######@@@@@@@@@@@@@@@@@@@@@@@@@@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###SSSSSSSSSSSSS###########################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#?%SSSSSS####SSS#@@#S%%%SS%%??%##@@##@@##SSSS#@@@#@@@@@@@@@##S
??****????????S######@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@####SSSSSSSSSSSS###################################################################################@@@@@@@@@@@@@@@@@@@@@@@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%?%%%%%%%SS%??%S#@#SSS%S%%????S###SSSSSSSSS##@@@##@@@@@#S####
???*?*?????*?S######@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#S##SSSSSSSSSSSSSS#####################################################################################@@##@@@@@@@@@@@@@####@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%??%???%%S##@@@S%%?%%???%##SS%%SS###SS#@@###@@@@#SSSS##
???????????*%######@@@@@@@@@@@@###@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#########SSSSSSSSSSS############################################################################################@###@########@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%%%??%%SSS####%???????%#####SS####@#S#@@SS#@@@@#SS####
??????????*%######@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##S#######SSSSSSSSS##S########################################################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#@@@@@@@@@#S??%SSSSSS%?%??%??%S###########@@SS##S#@@@@@####@##
???????????S####@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###########SSSSSSSSS##########################################################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#@@@@@@@@@@@#%?%SSS##S%%%SSSSSSS############SSS%S#@@@@########
??????????%#####@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#############SSSSSSSSS##SS######################################################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@SSS####S%%%S#####S###@@@@@SSS%SSSSSS##@@@@@@#####
??????????S####@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##############SSSSSSSSSSSSSSS###################################################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#S##@@@#S%%#######@@@@@@@#SSSSS##SSS##@@@@###@###
????????*?####@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###############SSSSSSSSS##SS#####################################################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#%SSS##SSSSSSS###@@@@@@##SSS##@@SS#S#SS#########
*??????%%S####@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@################SSSSSSSSSSSS####################################################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@S%%%%%%%SSSSS##@@@@@@@@@@##@@@####SSSSSS###@@##
%%SSSSS######@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@################SSSSSSSSSSSSSS#################################################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#SSS%%%SS###@@@###@@@@@#SS%S#S%%S###SS###@@@@#
###########@##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@################SSSSSSSSSSSSSS##############################################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#SS###########@@@##S%%%S%%%%%SSS##@@##SSS
######@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@################SSSSSSSSSSSSS##SSSS###SS###################################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##S####SSSS#@@@@#S%%%%%%%%%%%%SS###SSS#
######@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@######S#########SSSSSSSSSSS##SSSSSSSSSS#S#################################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#SS###SS%S##@@#%%%%%%%%%%%%%%%SSS##@##
####@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@####S#S##S######SSSSSS#SSSSSSSS#SSSSSSSSSSSS############################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#S#####SSSS###%%%%%%%%%%%%%%%%%S#@@@@@
###@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@######S##S######SSSSSSSSSSSSSSSSS#SSSSSSSSSSSS##SS#####SS#############################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#######SSSS###%%%%%%%%%%%%%%%%%S#@@@@#
#@##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#####S##S######SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS####SSSSSS#########################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@####SS%%%%%%%%%%%%%%SS##@#SS
?S#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#####SSS#####SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##SSSS###########################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###SSS%%%%%%SS#SSS%%%
SS#@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#####S########SSSSSSSSSSSS###SSSSSSSSSSSSSSSSSSSSSSSSSSSSS###########################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##SSSSSS%%%SS
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@####S########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#####S#####################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###SSS
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#######################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#####################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS####################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS###################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##SSS#####################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#############SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#S#####################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#######SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS############################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#######SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS############################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#######S##SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##########################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS############################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#######SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#########################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@######SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#######################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@########SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS####################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@####SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS################################SS#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#####SSSS#SSSSSSSSSSSSSSSSSSSSSSSSSSSS#############################S#S#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@######SSSSSSSSSSSSSSSSSSSSSSSSSSSSS####################SSSSSSSSS#@@@@@@@@@@@@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#####SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS##########SSSSSSSSSSSS##@@@@@@@@@@@@@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###SSSSSSSSSSSSSSSSSSSSSSSSSS##SSS#SS####SSSSSSSSS##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###SSSSSSSSSSSSSSS##################SSSSSS###@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@####SSSSSS###########################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###SS########################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#####################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#############@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`}`}
        </div>
        <div className="text-gray-300 space-y-0.5">
          <p className="text-left">
            <span className="text-gray-500 mr-2">OS:</span>
            Ubuntu 22.04 LTS
          </p>
          <p className="text-left">
            <span className="text-gray-500 mr-2">Terminal:</span>
            bash 5.1.16
          </p>
          <p className="text-left text-gray-200">
            <span className="text-gray-500 mr-2">&gt;</span>
            {text}
            <span className="animate-pulse">█</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

const MongoDBDesign = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[600px] rounded-lg bg-[#1B1B1B] p-6 font-mono shadow-xl">
    <div className="flex items-center gap-2 border-b border-emerald-500/20 pb-4 mb-4">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
        <span className="text-emerald-500 text-sm">mongodb://localhost:27017/portfolio</span>
      </div>
    </div>
    
    <div className="space-y-2 text-sm">
      <p className="text-gray-400">
        <span className="text-emerald-400">></span> use portfolio
      </p>
      <p className="text-gray-400">
        <span className="text-emerald-400">portfolio></span> db.antoine.findOne()
      </p>
      
      <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
        {`{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Antoine Gaton",
  "title": "Full Stack Developer",
  "location": "France",
  "skills": [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "MongoDB",
    "AWS"
  ],
  "roles": [
    "Software Engineer",
    "Entrepreneur",
    "Husband",
    "Brother",
    "Son"
  ],
  "experience": {
    "years": 5,
    "companies": [
      "Self-employed",
      "Previous ventures"
    ]
  },
  "education": {
    "degree": "Computer Science",
    "certifications": [
      "AWS Certified",
      "MongoDB Professional"
    ]
  },
  "currentStatus": "${text}",
  "lastUpdated": ISODate("${new Date().toISOString()}")
}`}
      </div>
      
      <p className="text-emerald-400 flex items-center gap-2">
        <span className="animate-pulse">●</span>
        <span>Connection is alive</span>
      </p>
    </div>
  </div>
);

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  // Use useEffect to set the random design index after initial render
  const [designIndex, setDesignIndex] = useState(0);

  useEffect(() => {
    setDesignIndex(Math.floor(Math.random() * 6));
  }, []);

  const roles = useMemo(() => [
    "a son.",
    "a brother.",
    "a husband.",
    "an entrepreneur.",
    "a software engineer!"
  ], []);

  const handleSkip = () => {
    setIsComplete(true);
    onComplete();
  };

  useEffect(() => {
    const baseText = "Antoine Gaton is ";
    let timeout: NodeJS.Timeout;

    const typeText = () => {
      if (isDeleting) {
        if (text.length > baseText.length) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => prev + 1);
        }
        timeout = setTimeout(typeText, 20);
      } else {
        const currentRole = roles[currentIndex];
        const targetText = baseText + currentRole;
        
        if (text.length < targetText.length) {
          setText(targetText.slice(0, text.length + 1));
          timeout = setTimeout(typeText, 40);
        } else {
          if (currentIndex === roles.length - 1) {
            timeout = setTimeout(() => {
              setIsComplete(true);
            }, 3000);
            return;
          }
          timeout = setTimeout(() => {
            setIsDeleting(true);
            typeText();
          }, 800);
        }
      }
    };

    if (!isComplete) {
      timeout = setTimeout(typeText, 20);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentIndex, roles, isComplete]);

  // Add a loading state to prevent initial render mismatch
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Short timeout to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  if (isComplete) return null;
  if (isLoading) return null; // Return null during initial load

  const designs = [
    {
      component: <Windows95Design text={text} />,
      icon: <Terminal className="h-20 w-20 text-[#000080]" />,
      bgColor: "bg-[#008080]",
      textColor: "text-white"
    },
    {
      component: <MacTerminalDesign text={text} />,
      icon: <Terminal className="h-20 w-20 text-[#78D95E]" />,
      bgColor: "bg-[#2D2D2D]",
      textColor: "text-[#E4E4E4]"
    },
    {
      component: <MatrixDesign text={text} />,
      icon: <Code className="h-20 w-20 text-emerald-400" />,
      bgColor: "bg-black",
      textColor: "text-emerald-400"
    },
    {
      component: <MainframeDesign text={text} />,
      icon: <Terminal className="h-20 w-20 text-green-500" />,
      bgColor: "bg-black",
      textColor: "text-green-500"
    },
    {
      component: <LinuxTerminalDesign text={text} />,
      icon: <Terminal className="h-20 w-20 text-[#E95420]" />,
      bgColor: "bg-[#300A24]",
      textColor: "text-gray-200"
    },
    {
      component: <MongoDBDesign text={text} />,
      icon: <Database className="h-20 w-20 text-emerald-400" />,
      bgColor: "bg-[#1B1B1B]",
      textColor: "text-emerald-400"
    }
  ];

  const selectedDesign = designs[designIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[100] flex items-center justify-center ${selectedDesign.bgColor} cursor-pointer`}
      onClick={handleSkip}
    >
      <div className="w-[600px] space-y-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          {selectedDesign.icon}
        </motion.div>

        <div className="space-y-6">
          {selectedDesign.component}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`${selectedDesign.textColor}/70 text-sm`}
        >
          Click anywhere to skip
        </motion.p>
      </div>
    </motion.div>
  );
}