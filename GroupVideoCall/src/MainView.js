import React, { useEffect, useRef, useState } from "react";
import { USER_ID } from "./Constant";
import "./MainView.css";

function MainView({ roomId, setRoomId, setIsCallStarted }) {
  /** Event handlers */
  const handleChangeRoomId = (event) => {
    setRoomId(event.target.value);
  };

  const handleClickConnectButton = () => {
    if (roomId) setIsCallStarted(true);
  };

  return (
    <div>
      <>
        <div className="app-bar">
          <h1>Group Video Call</h1>
        </div>
        <div className="form-container">
          <div className="grid-container">
            <label htmlFor="myId">My ID</label>
            <input
              id="myId"
              type="text"
              className="input-field"
              placeholder={USER_ID}
              disabled
            />

            <label htmlFor="roomId">Room ID</label>
            <input
              id="roomId"
              type="text"
              className="input-field"
              placeholder="RoomID"
              onChange={handleChangeRoomId}
            />
          </div>

          <button className="connect-button" onClick={handleClickConnectButton}>
            Join
          </button>
        </div>
      </>
    </div>
  );
}

export default MainView;
