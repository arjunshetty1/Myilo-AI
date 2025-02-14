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
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[250px]">Subscriber</TableHead>
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
                      className="bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </TableCell>
                <TableCell className="font-medium">{item.email}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
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
