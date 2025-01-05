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
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
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
    <div className="border-[1px] border-[#D8D8D8] rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[250px]">Subscriber</TableHead>
            <TableHead>Subscription date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <TableRow key={item.userId}>
                <TableCell>
                  <Checkbox
                    checked={selectedSubscribers.includes(item.email)}
                    onCheckedChange={() => handleSelectSubscriber(item.email)}
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
