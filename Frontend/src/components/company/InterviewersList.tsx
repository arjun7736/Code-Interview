import { MainBackGround } from "@/lib/Color";
import { Button } from "../ui/button";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const InterviewersList = ({
  interviewers,
  handleInterviewerClick,
  openPopup,
}: any) => {
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
            className="ml-28 mt-5"
            style={{ backgroundColor: MainBackGround }}
          >
            Add Interviewer
          </Button>
        </TabsContent>
        <TabsContent value="Meeting List">
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
        </TabsContent>
      </Tabs>
    </>
  );
};

export default InterviewersList;
