import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import UpdateIndividualQuestionSet from "@/components/interviewer/UpdateIndividualQuestionSet"

const IndividualQuestionTable = ({ questionsData,select }) => {

  const [editItem, setEditItem] = useState(null);
 const handleDelete=async(id:string)=>{
  try{
   const data = await axios.delete(`/api/interviewer/deleteQuestion/${id}`)
   console.log(data,"data")
    select(null)
    toast("Question Deleted")
  }catch{
    toast("Error Occured")
  }
 }



  return (
    <>
      <Card className="shadow-2xl border border-gray-300 w-[50vw] max-h-[65vh] overflow-x-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>
            Question Set {questionsData?.questionSet}
            </div>
            <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>handleDelete(questionsData?._id)}>Delete</DropdownMenuItem>
                <DropdownMenuItem>Add Questions</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
        {editItem && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-white rounded-lg shadow-2xl z-20">
              <UpdateIndividualQuestionSet onClose={setEditItem} data={editItem}/>
            </div>
          </div>
        )}
          <Accordion type="single" collapsible className="w-full">
            {questionsData?.questions?.map((questionData, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{questionData.question}</AccordionTrigger>
                <AccordionContent className="flex items-center justify-between">
                  <table className=" w-full">
                    <thead className="">
                      <tr className="">
                        <th className="">Options</th>
                        <th>Right Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {questionData?.options.map((option) => (
                            <p className="my-2 font-serif">{option}</p>
                          ))}
                        </td>
                        <td>{questionData?.rightOption}</td>
                        <td>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={()=>setEditItem(questionData)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={()=>handleDelete(questionData?._id)}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
    </>
  );
};

export default IndividualQuestionTable;
