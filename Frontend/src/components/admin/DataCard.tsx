import { CompanyData, IntervieweeData, InterviewerData } from '@/interface/userDataTypeInterface';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { DollarSign } from 'lucide-react'
import { Light } from '@/lib/Color';

const DataCard: React.FC<DataCardProps>  = ({data,type}) => {
  return (
    <Card x-chunk="dashboard-01-chunk-0" style={{backgroundColor:Light}}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
       {type}
      </CardTitle>
      <DollarSign className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{data?.length}</div>
      <p className="text-xs text-muted-foreground">
        +20.1% from last month
      </p>
    </CardContent>
  </Card>
  )
}

export default DataCard



interface DataCardProps {
  data: CompanyData[]|InterviewerData[]|IntervieweeData[]|null;
  type: string;
}
