import {  useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { FaLocationArrow } from "react-icons/fa";
import { setQuestion } from "@/redux/slices/tempSlice";
import { io } from 'socket.io-client';

const socket = io('');


const VideoCall = () => {

  const dispatch =useDispatch()
  useEffect(() => {
    socket.on('receive_message', (message) => {
      dispatch(setQuestion(message));
    });

    return () => {
      socket.off('receive_message');
    };
  }, [dispatch]);

  const sendMessage = (message:string) => {
    socket.emit('send_message', message);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    sendMessage(inputValue)
    dispatch(setQuestion(inputValue))
    setIsModalOpen(false);
  };

  const [containsText, setContainsText] = useState(false);
  useEffect(() => {
    const checkForText = () => {
      const bodyText = document.body.innerText || document.body.textContent;
      if (bodyText?.includes("(You)")) {
        setContainsText(true);
      } else {
        setContainsText(false);
      }
    };
    checkForText();
    const intervalId = setInterval(checkForText, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const navigate = useNavigate();
  const { intervieweeData } = useSelector(
    (state: RootState) => state.interviewee
  );
  const { interviewerData } = useSelector(
    (state: RootState) => state.interviewer
  );
  useEffect(() => {
    if (!intervieweeData && !interviewerData) {
      toast("Login Into Your Account")
      navigate("/");
    }
  }, [])
  const name = interviewerData?.name || intervieweeData?.name

  const { roomId } = useParams<{ roomId?: string }>();
  const room = roomId || "123";
  const myMeeting = async (element: HTMLDivElement): Promise<void> => {
    const appID: number = 383066241;
    const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      room,
      Date.now().toString(),
      name
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp?.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };
  return (

    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
      <div ref={myMeeting} style={{ width: '100%', height: '100%' }}></div>


    {containsText&&(
      <>
       <Button
        onClick={() => window.open("/compiler", "_blank")}
        style={{
          backgroundColor: "#313443",
          position: 'absolute',
          zIndex: 1000,
          bottom: "16px",
          left: "170px"
        }}><Code />
        </Button>
      {interviewerData?(<Button
        onClick={toggleModal}
        style={{
          backgroundColor: "#313443",
          position: 'absolute',
          zIndex: 1000,
          bottom: "16px",
          left: "250px"
        }}><FaLocationArrow /></Button>):""}
        </>
       )}


       {isModalOpen && (
      <div className="modal" style={{ position: 'absolute', top: '80%', left: '50%',width:"650px", transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', zIndex: 1001 }}>
        <form onSubmit={handleSubmit}>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type something..."
            style={{ marginBottom: '10px', width: '580px', height: 'auto' }}
          />
          <button type="submit" ><FaLocationArrow /></button>
        </form>
      </div>
    )}
    </div>
  );
};

export default VideoCall;
 