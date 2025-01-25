"use client";

import MinimalOne from "../Newsletter Templates/MinimalOne";
import MinimalTwo from "../Newsletter Templates/MiinimalTwo";
import MinimalThree from "../Newsletter Templates/MinimalThree";
import GeneralOne from "../Newsletter Templates/GeneralOne";
import GeneralTwo from "../Newsletter Templates/GeneralTwo";
import GeneralThree from "../Newsletter Templates/GeneralThree";
import MinimalFour from "../Newsletter Templates/MinimalFour";
import DeepDiveOne from "../Newsletter Templates/DeepDiveOne";
import DeepDiveTwo from "../Newsletter Templates/DeepDiveTwo";
import StoryDrivenOne from "../Newsletter Templates/StoryDrivenOne";
import StoryDrivenTwo from "../Newsletter Templates/StoryDrivenTwo";
import QuickReadOne from "../Newsletter Templates/QuickReadOne";
import QuickReadTwo from "../Newsletter Templates/QuickReadTwo";

const PreviewMockupMobile = ({ thumbnail, dataToTemplate, template }) => {
  const TemplateNumber = () => {
    switch(template) {
      case 0: return <GeneralOne dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
      case 1: return <GeneralTwo dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
      case 2: return <GeneralThree dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
      case 3: return <MinimalOne dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
      // case 4: return <MinimalTwo dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
      case 4: return <MinimalThree dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
      case 5: return <MinimalFour dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
      case 6: return <StoryDrivenOne dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
      case 7: return <StoryDrivenTwo dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
      case 8: return <DeepDiveOne dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
      case 9: return <DeepDiveTwo dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
      case 10: return <QuickReadOne dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
      case 11: return <QuickReadTwo dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
      default: return <GeneralOne dataToTemplate={dataToTemplate} thumbnail={thumbnail} />;
    }
  };

  return (
    <div className="mx-auto w-full max-w-[400px] aspect-[9/19] relative">
      {/* Device Frame */}
      <div className="absolute inset-0 bg-gray-800 rounded-[2.5rem] p-2 shadow-xl">
        <div className="relative h-full w-full rounded-[2rem] overflow-hidden bg-white">
          <div className="absolute inset-0 overflow-y-auto hide-scrollbar">
            <TemplateNumber />
          </div>
        </div>
      </div>
      {/* Side Buttons */}
      <div className="absolute left-0 top-[15%] h-[30%] w-1 bg-gray-800 rounded-r-md"></div>
      <div className="absolute left-0 top-[55%] h-[20%] w-1 bg-gray-800 rounded-r-md"></div>
    </div>
  );
};

export default PreviewMockupMobile;