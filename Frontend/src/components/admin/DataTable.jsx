import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const DataTable = ({ data, type }) => {
  const slicedData = data.slice(0, 4);

  return (
    <>
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>{type}</CardTitle>
            <CardDescription>Recent Joins</CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
          </Button>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Email</TableHead>
                </TableRow>
              </TableHeader>
              {slicedData.map((value) => (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">{value.name}</div>
                  </TableCell>
                  <TableCell className="text-right">{value.email}</TableCell>
                </TableRow>
              </TableBody>
          ))}
            </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default DataTable;
