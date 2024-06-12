import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  CompanyData,
  IntervieweeData,
  InterviewerData,
} from "@/interface/userDataTypeInterface";
import Popup from "./Popup";
import { Light, MainBackGround } from "@/lib/Color";
import { Avatar, AvatarImage } from "../ui/avatar";

const UsersTable: React.FC<usersData> = ({ data, fun }) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupId, setPopupId] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const openPopup = (message: string, id: string, user: string) => {
    setIsPopupOpen(true);
    setPopupId(id);
    setUser(user);
    setMessage(message);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupId(null);
    setUser(null);
    setMessage("");
  };

  return (
    <>
      <Table style={{ backgroundColor: Light }} className="rounded-lg ">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead className="hidden md:table-cell">Actions</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        {data?.map((value) => (
          <TableBody>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <Avatar>
                  <AvatarImage
                    className="aspect-square rounded-md object-cover"
                    src={value?.profile_picture}
                    width="64"
                  />
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{value?.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className={value?.isBlocked ? 'text-red-500' : 'text-green-500'}>
                  {value?.isBlocked ? "Blocked" : "Active"}
                </Badge>
              </TableCell>
              <TableCell>{value?.email}</TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    openPopup(
                      value.isBlocked ? "unblock" : "block",
                      value._id,
                      value?.role
                    )
                  }
                  style={{ backgroundColor: MainBackGround }}
                >
                  {value?.isBlocked ? "Unblock" : "Block"}
                </Button>
                &nbsp;
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        id={popupId}
        role={user}
        message={message}
        fun={fun}
      />
    </>
  );
};

export default UsersTable;

interface usersData {
  data: CompanyData[] | InterviewerData[] | IntervieweeData[] | null;
  fun;
}
