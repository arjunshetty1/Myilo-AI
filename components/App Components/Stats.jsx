import { BarChartComponent } from "@/components/UI/shadcn-ui/BarChart";
import { LineChartComponent } from "@/components/UI/shadcn-ui/LineChartComponent";

const Stats = () => {
  return (
    <div className="lg:mx-[16%] flex flex-col gap-8 py-10 mx-[5%] pt-12">
      <BarChartComponent />
      <LineChartComponent />
    </div>
  );
};

export default Stats;
