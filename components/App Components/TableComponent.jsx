"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/UI/shadcn-ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/shadcn-ui/table";

const TableComponent = ({
  emailSearch,
  data,
  selectedSubscribers,
  setSelectedSubscribers,
}) => {
  const [filteblueData, setFilteblueData] = useState(data);

  useEffect(() => {
    setFilteblueData(
      data.filter((item) =>
        item.email.toLowerCase().includes(emailSearch.toLowerCase())
      )
    );
  }, [emailSearch, data]);

  const handleSelectSubscriber = (email) => {
    if (selectedSubscribers.includes(email)) {
      setSelectedSubscribers(selectedSubscribers.filter((e) => e !== email));
    } else {
      setSelectedSubscribers([...selectedSubscribers, email]);
    }
  };

  return (
    <div className="overflow-x-auto"> {/* Allow horizontal scrolling on mobile */}
      <Table className="min-w-full"> {/* Ensure table takes full width */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] sm:w-auto"></TableHead> {/* Adjust width for mobile */}
            <TableHead className="w-[250px] sm:w-auto">Subscriber</TableHead> {/* Adjust width for mobile */}
            <TableHead>Subscription date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteblueData.length > 0 ? (
            filteblueData.map((item) => (
              <TableRow key={item.userId}>
                <TableCell>
                  <Checkbox
                    checked={selectedSubscribers.includes(item.email)}
                    onCheckedChange={() => handleSelectSubscriber(item.email)}
                    className="border-gray-300 text-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                </TableCell>
                <TableCell className="font-medium text-sm sm:text-base"> {/* Adjust font size for mobile */}
                  {item.email}
                </TableCell>
                <TableCell className="text-sm sm:text-base"> {/* Adjust font size for mobile */}
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-sm sm:text-base"> {/* Adjust font size for mobile */}
                No subscribers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;