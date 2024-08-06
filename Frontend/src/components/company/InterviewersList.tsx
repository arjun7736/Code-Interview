import { MainBackGround } from "@/lib/Color";
import { Button } from "../ui/button";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axiosInstance from "../../intersepters/axiosBackendIntersepter";

const InterviewersList = ({
  interviewers,
  handleInterviewerClick,
  openPopup,
}: any) => {
  const [data, setData] = useState([]);
  const { companyData } = useSelector((state: RootState) => state.company);
  const getMeetingLinks = async () => {
    const links = await axiosInstance.get(
      `/api/company/getMeetingLink/${companyData?._id}`
    );
    setData(links.data);
  };
  useEffect(() => {
    getMeetingLinks();
  }, []);
  return (
    <>
      <Tabs defaultValue="Interviewers" className="flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Interviewers" className="bg-gray-300">
            Interviewers
          </TabsTrigger>
          <TabsTrigger value="Meeting List" className="bg-gray-300">
            Meeting List
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Interviewers">
          <TableBody className="bg-gray-300">
            {interviewers?.map((interviewer: any) => (
              <TableRow
                key={interviewer?._id}
                onClick={() => handleInterviewerClick(interviewer)}
              >
                <TableCell className="rounded-l-xl w-full">
                  <div className="font-medium">{interviewer?.name}</div>
                </TableCell>
                <TableCell className="rounded-r-xl">
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {interviewer?.email}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Button
            onClick={openPopup}
            className="ml-28 mt-16"
            style={{ backgroundColor: MainBackGround }}
          >
            Add Interviewer
          </Button>
        </TabsContent>
        <TabsContent value="Meeting List">
        {data?.map((link: any) => (
    <div key={link?.meetingLink} className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
        <div className="mb-2 md:mb-0">
          <p className="text-gray-800 font-semibold text-lg">{link?.meetingLink}</p>
          <p className="text-gray-600">Interviewer: {link?.Interviewer}</p>
          <p className="text-gray-600">Interviewee: {link?.Interviewee}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">{new Date(link.expiresAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  ))}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default InterviewersList;
