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
    <div className="flex relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] aspect-[1/2] max-h-[60dvh]">
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-full flex-1 flex bg-white">
        <div className="w-full flex-1 overflow-y-scroll hide-scrollbar">
          <TemplateNumber />
        </div>
      </div>
    </div>
  );
};

export default PreviewMockupMobile;
