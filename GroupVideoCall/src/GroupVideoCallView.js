import React, { useEffect, useState, useRef } from "react";
import * as PlanetKit from "@line/planet-kit";
import { USER_ID, ACCESS_TOKEN, MEDIA_TYPE, SERVICE_ID } from "./Constant";
import "./GroupVideoCallView.css";

function GroupVideoCallView({ roomId, setIsCallStarted }) {
  /** States */
  const [planetKit] = useState(() => new PlanetKit.Conference());
  const [peerIdList, setPeerIdList] = useState([]);
  const [activePeer, setActivePeer] = useState(null);

  const roomAudioRef = useRef();
  const myVideoRef = useRef();
  const peerVideoRef = useRef();
  const hasJoined = useRef(false);

  /** WebPlanetKit Conference delegate */
  const onEvtConnected = () => {
    console.log("Conference joined successfully");
  };

  const onEvtDisconnected = (disconnectedParam) => {
    const disconnectSource = disconnectedParam?.source;
    const disconnectReason = disconnectedParam?.reason;
    console.log(
      `disconnectSource=${disconnectSource}\ndisconnectReason.code=${disconnectReason?.code}\ndisconnectReason.strCode=${disconnectReason?.strCode}`
    );
    setIsCallStarted(false);
  };

  const onEvtPeerListUpdated = (conferencePeerUpdatedParam) => {
    const { addedPeers, removedPeers, totalPeersCount } =
      conferencePeerUpdatedParam;
    // added peers
    if (addedPeers.length) {
      const addedPeerIdList = addedPeers.map((peerInfo) => peerInfo.userId);
      setPeerIdList((prevList) => [...prevList, ...addedPeerIdList]);
    }

    if (removedPeers.length) {
      const removedPeerIdList = removedPeers.map((peerInfo) => peerInfo.userId);
      setPeerIdList((prevList) =>
        prevList.filter((userId) => !removedPeerIdList.includes(userId))
      );
      if (removedPeerIdList.includes(activePeer)) {
        setActivePeer(null);
      }
    }
  };

  /** Event handlers */
  const handleClickPeerId = (peerId) => {
    if (activePeer === peerId) {
      return;
    }

    // Remove previous peer video
    if (peerId) {
      planetKit.removePeerVideo(peerId).then(() => {
        console.log("Peer video removed:", peerId);
      });
    }

    // Request new peer video
    const requestVideoParams = {
      userId: peerId,
      resolution: "vga",
      videoViewElement: peerVideoRef.current,
    };
    planetKit.requestPeerVideo(requestVideoParams).then(() => {
      console.log("Peer video requested:", peerId);
    });
    setActivePeer(peerId);
  };

  const handleClickLeaveButton = () => {
    console.log("Leaving conference");
    planetKit.leaveConference();
  };

  /** Side effects */
  useEffect(() => {
    if (hasJoined.current) return;

    const planetKitConferenceJoinParams = {
      myId: USER_ID,
      myServiceId: SERVICE_ID,
      roomId: roomId,
      roomServiceId: SERVICE_ID,
      accessToken: ACCESS_TOKEN,
      mediaType: MEDIA_TYPE,
      mediaHtmlElement: {
        myVideo: myVideoRef.current,
        roomAudio: roomAudioRef.current,
      },
      delegate: {
        evtConnected: onEvtConnected,
        evtDisconnected: onEvtDisconnected,
        evtPeerListUpdated: onEvtPeerListUpdated,
      },
    };
    try {
      planetKit.joinConference(planetKitConferenceJoinParams);
      hasJoined.current = true;
    } catch (error) {
      alert(error?.message);
    }
  }, []);

  return (
    <div className="container">
      <div className="video-container">
        <div className="video-container-div">
          <span className="video-label">{activePeer}</span>
          <video
            className="video"
            ref={peerVideoRef}
            muted
            autoPlay
            playsInline
          ></video>
        </div>
        <div className="video-container-div">
          <span className="video-label">Me</span>
          <video
            className="video"
            ref={myVideoRef}
            muted
            autoPlay
            playsInline
          ></video>
        </div>
      </div>
      <div className="sidebar">
        <div className="peer-list">
          <h3>Peer List</h3>
          {peerIdList.map((peerId, index) => (
            <div
              key={index}
              className={`peer-item ${activePeer === peerId ? "active" : ""}`}
              onClick={() => handleClickPeerId(peerId)}
            >
              {peerId}
            </div>
          ))}
        </div>
        <button className="leave-button" onClick={handleClickLeaveButton}>
          Leave
        </button>
      </div>
      <audio id="group-call-audio" ref={roomAudioRef} autoPlay />
    </div>
  );
}

export default GroupVideoCallView;
