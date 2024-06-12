import { CompanyData, IntervieweeData, InterviewerData } from "@/interface/userDataTypeInterface";
import { Avatar,  AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Light } from "@/lib/Color";


const DataTable: React.FC<DataCardProps> = ({data,type}) => {
  const slicedData = data?.slice(0, 4);
  return (
    <Card x-chunk="dashboard-01-chunk-5" style={{backgroundColor:Light}}>
      <CardHeader>
        <CardTitle>{type}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {slicedData?.map((value)=>(
          <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src={value?.profile_picture} alt="Avatar" />
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">{value?.name}</p>
            <p className="text-sm text-muted-foreground">
              {value?.email}
            </p>
          </div>
          <div className="ml-auto font-medium">{value?.isBlocked ? "Blocked":"Not Blocked"}</div>
        </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DataTable;



interface DataCardProps {
  data: CompanyData[]|InterviewerData[]|IntervieweeData[]|null;
  type: string;
}
