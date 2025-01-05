import { AreaChart } from "@tremor/react";
import { Tab, TabGroup, TabList } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    "Emails Open Rate": 2890,
  },
  {
    date: "Feb 22",
    "Emails Open Rate": 156,
  },
  {
    date: "Mar 22",
    "Emails Open Rate": 2322,
  },
  {
    date: "Apr 22",
    "Emails Open Rate": 2470,
  },
  {
    date: "May 22",
    "Emails Open Rate": 475,
  },
  {
    date: "Jun 22",
    "Emails Open Rate": 5129,
  },
  {
    date: "Jul 22",
    "Emails Open Rate": 490,
  },
  {
    date: "Aug 22",
    "Emails Open Rate": 2903,
  },
  {
    date: "Sep 22",
    "Emails Open Rate": 2643,
  },
  {
    date: "Oct 22",
    "Emails Open Rate": 2837,
  },
  {
    date: "Nov 22",
    "Emails Open Rate": 2954,
  },
  {
    date: "Dec 22",
    "Emails Open Rate": 3239,
  },
];

const valueFormatter = function (number) {
  return "" + new Intl.NumberFormat("us").format(number).toString();
};

export function SecondaryChart() {
  return (
    <>
      <div className="md:my-36 my-14">
        <TabGroup className="my-9">
          <TabList variant="solid" color="red" defaultValue="1">
            <Tab value="1">Weekly</Tab>
            <Tab value="2">Monthly</Tab>
            <Tab value="3">Individual Email</Tab>
          </TabList>
        </TabGroup>
        <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Email open rate
        </h3>

        <AreaChart
          className="mt-4 h-72"
          data={chartdata}
          index="date"
          yAxisWidth={65}
          categories={["Emails Open Rate"]}
          colors={["green", "cyan"]}
          valueFormatter={valueFormatter}
        />
      </div>
    </>
  );
}
