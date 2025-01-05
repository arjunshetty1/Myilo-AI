import { AreaChart } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    "Free Subscribers": 2890,
    "Paid Subscribers": 2338,
  },
  {
    date: "Feb 22",
    "Free Subscribers": 2756,
    "Paid Subscribers": 2103,
  },
  {
    date: "Mar 22",
    "Free Subscribers": 3322,
    "Paid Subscribers": 2194,
  },
  {
    date: "Apr 22",
    "Free Subscribers": 3470,
    "Paid Subscribers": 2108,
  },
  {
    date: "May 22",
    "Free Subscribers": 3475,
    "Paid Subscribers": 1812,
  },
  {
    date: "Jun 22",
    "Free Subscribers": 3129,
    "Paid Subscribers": 1726,
  },
  {
    date: "Jul 22",
    "Free Subscribers": 3490,
    "Paid Subscribers": 1982,
  },
  {
    date: "Aug 22",
    "Free Subscribers": 2903,
    "Paid Subscribers": 2012,
  },
  {
    date: "Sep 22",
    "Free Subscribers": 2643,
    "Paid Subscribers": 2342,
  },
  {
    date: "Oct 22",
    "Free Subscribers": 2837,
    "Paid Subscribers": 2473,
  },
  {
    date: "Nov 22",
    "Free Subscribers": 2954,
    "Paid Subscribers": 3848,
  },
  {
    date: "Dec 22",
    "Free Subscribers": 3239,
    "Paid Subscribers": 3736,
  },
];

const valueFormatter = function (number) {
  return "" + new Intl.NumberFormat("us").format(number).toString();
};

export function MainChart() {
  return (
    <>
      <div className="my-9">
        <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Subscribers
        </h3>

        <AreaChart
          className="mt-4 h-72"
          data={chartdata}
          index="date"
          yAxisWidth={65}
          categories={["Free Subscribers", "Paid Subscribers"]}
          colors={["green", "blue"]}
          valueFormatter={valueFormatter}
        />
      </div>
    </>
  );
}




