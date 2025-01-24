import { BarChartComponent } from "@/components/UI/shadcn-ui/BarChart";
import { LineChartComponent } from "@/components/UI/shadcn-ui/LineChartComponent";
import Account from "./Profile";

const Stats = () => {
  return (
    <>
      <div className="lg:mx-[5%] flex flex-col gap-8 py-10 mx-[5%] pt-12">
        <div className="flex md:flex-row flex-col-reverse w-full gap-4">
          <div className="flex-grow">
            <BarChartComponent />
          </div>
          <div>
            <Account />
          </div>
        </div>

        <LineChartComponent />
      </div>
    </>
  );
};

export default Stats;
