import { BarChartComponent } from "@/components/UI/shadcn-ui/BarChart";
import { LineChartComponent } from "@/components/UI/shadcn-ui/LineChartComponent";
import Account from "./Profile";

const Stats = () => {
  return (
    <>
      <div className="lg:mx-[2%] flex flex-col gap-0 py-10 mx-[5%] pt-0 md:pt-12 mt-2 md:mt-0">
        {/* Bar Chart and Account Section */}
        <div className="flex md:flex-row flex-col-reverse w-full gap-4">
          {/* Bar Chart */}
          <div className="flex-grow md:h-[450px]">
            <BarChartComponent />
          </div>
          {/* Account Card */}
          <div className="md:w-[450px] md:h-[450px] flex-shrink-0">
            <Account />
          </div>
        </div>

        {/* Line Chart Section */}
        <div className="flex w-full mt-6 md:mt-0">
          {/* Ensure the LineChart has the same width as BarChart */}
          <div className="flex-grow">
            <LineChartComponent />
          </div>
          {/* Add whitespace under the Account card */}
          <div className="md:w-[460px]"></div>
        </div>
      </div>
    </>
  );
};

export default Stats;
