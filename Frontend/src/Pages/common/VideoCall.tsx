import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { useEffect } from "react";

const VideoCall = () => {
  const navigate = useNavigate();
  const { intervieweeData } = useSelector(
    (state: RootState) => state.interviewee
  );
  const { interviewerData } = useSelector(
    (state: RootState) => state.interviewer
  );
 useEffect(()=>{
  if (!intervieweeData && !interviewerData) {
    toast("Login Into Your Account")
    navigate("/");
  }
 },[])
  const name =interviewerData?.name || intervieweeData?.name
  console.log(intervieweeData,interviewerData)

  const { roomId } = useParams<{ roomId?: string }>();
  const room = roomId || "123";
  const myMeeting = async (element) => {
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
    <div>
      <div ref={myMeeting} />
    </div>
  );
};

export default VideoCall;
