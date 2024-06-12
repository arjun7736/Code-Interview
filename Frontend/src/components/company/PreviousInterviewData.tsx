import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PreviousInterviewData = ({ data }) => {
  return (
    <div>
      <Table>
        <TableCaption>your recent Interviews.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>QuestionSet</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((result) => (
            <TableRow>
              <TableCell>{result.questionSet}</TableCell>
              {result.attentedInterviewees.map((innerValue) => (
                <>
                  <TableCell>{new Date(innerValue.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">
                    {innerValue.interviewee?.name}
                  </TableCell>
                  <TableCell className="text-right">{innerValue.result}</TableCell>
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PreviousInterviewData;
