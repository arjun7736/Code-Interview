import AdminNavbar from "@/components/admin/AdminNavbar";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AdminHome() {
  const navigate = useNavigate();

  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <div className="w-1/6">
          <AdminSidebar />
        </div>
        <div className="flex flex-col flex-grow">
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card> */}
          <h1 className="flex ml-96">Welcome to the Dashboard</h1>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
