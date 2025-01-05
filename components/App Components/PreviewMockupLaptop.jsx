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

GeneralOne
const PreviewMockupLaptop = ({ thumbnail, dataToTemplate, template }) => {
  const TemplateNumber = () => {
    switch (template) {
      case 0:
        return (
          <GeneralOne dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
        );
      case 1:
        return (
          <GeneralTwo dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
        );
      case 2:
        return (
          <GeneralThree
            dataToTemplate={dataToTemplate}
            thumbnail={thumbnail}
          />
        );
        case 3:
        return (
          <MinimalOne dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
        );
        case 4:
        return (
          <MinimalTwo dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
        );
        case 5:
        return (
          <MinimalThree dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
        );
        case 6:
        return (
          <MinimalFour dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
        );
        case 7:
        return (
          <StoryDrivenOne dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
        );
        case 8:
        return (
          <StoryDrivenTwo dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
        );
        case 9:
        return (
          <DeepDiveOne dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
        );
        case 10:
        return (
          <DeepDiveTwo dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
        );
        case 11:
        return (
          <QuickReadOne dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
        );
        case 12:
        return (
          <QuickReadTwo dataToTemplate={dataToTemplate} thumbnail={thumbnail} />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-lg aspect-video w-[90%] max-w-[1200px] max-h-[70dvh] pb-5 md:pb-10">
      <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        <div className="w-full h-full overflow-y-auto custom-scrollbar">
          <TemplateNumber />
        </div>
      </div>
      <div className="absolute z-50 -left-10 -bottom-[0.95rem] bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-lg w-[calc(100%+80px)] h-5 md:h-10">
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 rounded-b-xl w-[10%] h-[5px] bg-gray-800"></div>
      </div>
    </div>
  );
};

export default PreviewMockupLaptop;
