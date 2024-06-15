import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from 'react';

const PreviousInterviewData = ({
  data,
}: {
  data: {
    questionSet: string;
    attentedInterviewees: {
      date: string;
      interviewee?: { name: string };
      result: string;
    }[];
  }[];
}) => {
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
            <TableRow key={result.questionSet}>
              <TableCell>{result.questionSet}</TableCell>
              {result.attentedInterviewees.map((innerValue) => (
                <React.Fragment
                  key={`${innerValue.date}-${innerValue.interviewee?.name}`}
                >
                  <TableCell>
                    {new Date(innerValue.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    {innerValue.interviewee?.name}
                  </TableCell>
                  <TableCell className="text-right">
                    {innerValue.result}
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PreviousInterviewData;
