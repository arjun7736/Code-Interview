import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const DataCard = ({data,type}) => {
  console.log(data,type);
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{type}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.length}</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default DataCard;
