import axios from 'axios';
import { Button } from '../ui/button'; 
import { toast } from 'sonner'; 
import { logout } from '@/redux/slices/adminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MainBackGround } from '@/lib/Color';


const Popup: React.FC<PopupProps> = ({ isOpen, onClose, message, id, role,fun }) => {
    const dispatch =useDispatch()
    const navigate =useNavigate()

  const handleAction = async (message: string, id:string|null, role: string|null): Promise<void> => {
    try {
      const response = await axios.post(`http://13.201.15.170/api/admin/${message}`, { id, role });
      toast(response.data.message); 
      fun()
    } catch (error) {
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        toast('Error Occurred, try logging in again');
        dispatch(logout())
        navigate("/admin/login")
      } else {
        console.error('Unexpected error:', error); 
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">Are You Sure to {message}?</h2>
            <p className="mb-4">
              You can't undo the {message} Operation to {role}
            </p>
            <div className="">
              <Button
              style={{ backgroundColor: MainBackGround }}
                className="m-3"
                onClick={() => {
                  handleAction(message, id, role);
                  onClose();
                }}
              >
                Continue
              </Button>
              <Button onClick={onClose} style={{ backgroundColor: MainBackGround }}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;



interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    id: string |null
    role: string |null;
    fun:()=>void
  }