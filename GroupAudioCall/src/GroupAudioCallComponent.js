import React, { useEffect, useRef, useState } from "react";
import * as PlanetKit from "@line/planet-kit";
import { USER_ID, ACCESS_TOKEN, MEDIA_TYPE, SERVICE_ID } from "./Constant";
import "./GroupAudioCallComponent.css";

function GroupAudioCallComponent() {
  /** States */
  const [planetKit] = useState(() => new PlanetKit.Conference());
  const [roomId, setRoomId] = useState();
  const [conferenceState, setConferenceState] = useState("init"); // init, connecting, connected
  const [participantCount, setParticipantCount] = useState(0);
  const roomAudio = useRef();

  /** WebPlanetKit Conference delegate */
  const onEvtConnected = () => {
    setConferenceState("connected");
  };

  const onEvtDisconnected = (disconnectedParam) => {
    const disconnectSource = disconnectedParam?.source;
    const disconnectReason = disconnectedParam?.reason;
    console.log(`disconnectSource=${disconnectSource}\ndisconnectReason.code=${disconnectReason?.code}\ndisconnectReason.strCode=${disconnectReason?.strCode}`);
    setConferenceState("init");
  };

  const onEvtPeerListUpdated = (conferencePeerUpdatedParam) => {
    console.log("TestApp | ConferenceComponent | onConferenceEvtPeerListUpdated callback");
    console.log(JSON.stringify(conferencePeerUpdatedParam));
    const { totalPeersCount } = conferencePeerUpdatedParam;
    setParticipantCount(totalPeersCount);
  };

  /** Event handlers */
  const handleChangeRoomId = (event) => {
    setRoomId(event.target.value);
  };

  const handleClickConnectButton = () => {
    switch (conferenceState) {
      case "init":
        setConferenceState("connecting");
        const planetKitConferenceJoinparams = {
          myId: USER_ID,
          myServiceId: SERVICE_ID,
          roomId: roomId,
          roomServiceId: SERVICE_ID,
          accessToken: ACCESS_TOKEN,
          mediaType: MEDIA_TYPE,
          mediaHtmlElement: {
            roomAudio: roomAudio.current,
          },
          delegate: {
            evtConnected: onEvtConnected,
            evtDisconnected: onEvtDisconnected,
            evtPeerListUpdated: onEvtPeerListUpdated,
          },
        };

        try {
          planetKit.joinConference(planetKitConferenceJoinparams);
        } catch (error) {
          setConferenceState("init");
          alert(error?.message);
        }
        break;
      case "connected":
        planetKit.leaveConference();
        break;
    }
  };

  /** Side effects */
  useEffect(() => {
    if (conferenceState === "init") {
      setParticipantCount(0);
    } else if (conferenceState === "connected") {
      setParticipantCount(1);
    }
  }, [conferenceState]);

  return (
    <div>
      <div className="app-bar">
        <h1>Group Audio Call</h1>
      </div>
      <div className="form-container">
        <div className="grid-container">
          <label htmlFor="myId">My ID</label>
          <input id="myId" type="text" className="input-field" placeholder={USER_ID} disabled />

          <label htmlFor="roomId">Room ID</label>
          <input id="roomId" type="text" className="input-field" placeholder="RoomID" onChange={handleChangeRoomId} />

          <label htmlFor="conferenceState">Conference state</label>
          <div id="conferenceState" className="state-display">
            {conferenceState}
          </div>

          <label htmlFor="participantCount">Participant count</label>
          <div id="participantCount" className="state-display">
            {participantCount}
          </div>
        </div>

        <button className="connect-button" onClick={handleClickConnectButton}>
          {conferenceState === "connected" ? "Leave" : "Join"}
        </button>
      </div>
      <div>
        <audio ref={roomAudio} autoPlay />
      </div>
    </div>
  );
}

export default GroupAudioCallComponent;
