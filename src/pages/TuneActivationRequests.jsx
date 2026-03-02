import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaSearch } from "react-icons/fa";
import ABUAnthem from '../audio/ABUAnthem.mp3';
import PageHeader from "../components/PageHeader";
import { useOutletContext } from "react-router-dom";

const mockRequests = [
  { id: 1, title: "Golden Days", user: "0802395275", contact: "08123651735", amount: "₦100", status: "pending", audio: ABUAnthem},
  { id: 2, title: "Thunder", user: "0802395275", contact: "08123651735", amount: "₦100", status: "pending", audio: ABUAnthem },
  { id: 3, title: "Who Am I", user: "0802395275", contact: "08123651735", amount: "₦100", status: "approved", audio: ABUAnthem },
  { id: 4, title: "Happiest Day", user: "0802395275", contact: "08123651735", amount: "₦100", status: "declined", audio: ABUAnthem },
];

const statusColors = {
  pending: "bg-yellow-300 text-yellow-800",
  approved: "bg-green-300 text-green-800",
  declined: "bg-red-300 text-red-800",
};

// Small audio signal animation
// const PlayingSignal = () => (
//   <div className="flex space-x-1 items-end h-6 mt-2">
//     {[...Array(5)].map((_, i) => (
//       <div
//         key={i}
//         className="w-1 bg-blue-500 animate-pulse"
//         style={{ animationDelay: `${i * 0.1}s`, height: `${Math.random() * 60 + 20}%` }}
//       />
//     ))}
//   </div>
// );

const TuneActivationRequests = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [confirmModal, setConfirmModal] = useState({ visible: false, action: null, id: null });
  const [requests, setRequests] = useState(mockRequests);
  const [filter, setFilter] = useState("all");
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  // Handle approve/decline
  const handleApprove = (id) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "approved" } : r));
  const handleDecline = (id) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "declined" } : r));

  // Handle play/pause
  const handlePlay = (id) => {
  if (playingId === id) {
    setPlayingId(null);
  } else {
    setPlayingId(id);
  }
};

    //Autoplay when popup opens
    useEffect(() => {
        if (playingId !== null && audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, [playingId]);

  // Filtered requests
  const filteredRequests = filter === "all" ? requests : requests.filter(r => r.status === filter);

  // Counts
  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    approved: requests.filter(r => r.status === "approved").length,
    declined: requests.filter(r => r.status === "declined").length,
  };

  

  return (
    <div className="main full">
      <div className="flex-1 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-pink-500 text-white rounded-full font-bold">
            {counts.pending} Pending
          </span>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {["all", "pending", "approved", "declined"].map((type) => (
            <div key={type} className="flex items-center justify-between p-4 bg-white rounded-xl shadow">
              <div>
                <p className="font-bold text-gray-600">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                <p className="text-xl font-bold">{counts[type]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl mb-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          {["all", "pending", "approved", "declined"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-full cursor-pointer font-medium ${filter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
            <div className=" flex items-center gap-3 bg-gray-200 p-4 rounded-xl w-full">
              <FaSearch className="text-gray-800"/>
              <input
              type="text"
              placeholder="Search by phone number..."
              className="anasearch"
            />
           </div> 
        </div>
        </div>

        {/* Request Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map(req => (
            <div
              key={req.id}
              className={`relative bg-white p-4 rounded-xl shadow border ${req.status === "pending" ? "border-yellow-300" : req.status === "approved" ? "border-green-300" : "border-red-300"}`}
            >
              <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full ${statusColors[req.status]}`}>
                {req.status.toUpperCase()}
              </span>

              {/* Tune title */}
              <div className="flex flex-col space-x-2 cursor-pointer" >
                <div className="flex gap-4 items-center mb-2" onClick={() => handlePlay(req.id)}> 
                  {playingId === req.id ? <FaPause className="text-red-500" /> : <FaPlay className="text-blue-500" />}
                  <h3 className="font-bold text-lg">{req.title}</h3>
                </div>
                <p className="text-md text-gray-800">User: <span className="font-bold">{req.user}</span></p>
                <p className="text-md text-gray-800 mb-2">Contact: <span className="font-bold">{req.contact}</span></p>
                <p className="text-md text-gray-800">Amount: <span className="font-bold text-blue-900">{req.amount}</span></p>
              </div>

              {/* {playingId === req.id && <PlayingSignal />}
              <p className="text-sm text-gray-600">User: {req.user}</p>
              <p className="text-sm text-gray-600">Contact: {req.contact}</p>
              <p className="text-sm text-gray-600">Amount: {req.amount}</p> */}

              {/* Approve/Decline */}
              {req.status === "pending" && (
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => setConfirmModal({ visible: true, action: "approve", id: req.id })}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setConfirmModal({ visible: true, action: "decline", id: req.id })}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
                  >
                    Decline
                  </button>
                </div>
              )}

              {/* {playingId === req.id && (
                <audio ref={audioRef} autoPlay src={req.audio} onEnded={() => setPlayingId(null)} />
              )} */}
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Combined overlay for blur */}
      {(playingId || confirmModal.visible) && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">

          {/* Audio Popup */}
          {(playingId !== null || confirmModal.visible) && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">

    {/* AUDIO POPUP */}
        {playingId !== null && (
  <div className="bg-green-600 text-white rounded-2xl w-96 p-6 flex flex-col items-center space-y-4 relative shadow-xl">

    {/* Close */}
    <button
      className="absolute top-2 right-3 text-white text-2xl"
      onClick={() => {
        audioRef.current.pause();
        setPlayingId(null);
        setIsPlaying(false);
      }}
    >
      ×
    </button>

    {/* Play / Pause Button */}
    <button
      onClick={() => {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          if (audioRef.current.currentTime >= 20) {
            audioRef.current.currentTime = 0;
          }
          audioRef.current.play();
          setIsPlaying(true);
        }
      }}
      className="text-3xl"
    >
      {isPlaying ? <FaPause /> : <FaPlay />}
    </button>

    {/* 🔥 Waveform */}
    <div className="flex items-center"> 
      <div className="flex space-x-1 items-end h-14 w-full">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded transition-all duration-150 ${
              isPlaying ? "bg-white animate-pulse" : "bg-white/40"
            }`}
            style={{
              animationDelay: `${i * 0.04}s`,
              height: `${Math.random() * 70 + 20}%`,
            }}
          />
        ))}
      </div>
    </div>

    <p className="font-bold text-lg">
      {requests.find(r => r.id === playingId)?.title}
    </p>

    {/* Audio */}
    <audio
      ref={audioRef}
      src={requests.find(r => r.id === playingId)?.audio}
      onTimeUpdate={(e) => {
        const time = e.target.currentTime;

        // 🔥 STOP AT 20 SECONDS
        if (time >= 20) {
          e.target.pause();
          setIsPlaying(false);
        }
      }}
      onEnded={() => setIsPlaying(false)}
    />
  </div>
)}

        {/* CONFIRMATION MODAL */}
        {confirmModal.visible && (
        <div className="bg-white rounded-2xl p-6 w-96 shadow-xl text-center animate-fadeIn">
            <h2 className="text-xl font-bold mb-2 capitalize">
            {confirmModal.action} Request?
            </h2>
            <p className="text-gray-600 mb-4">
            Are you sure you want to {confirmModal.action} this request?
            </p>

            <div className="flex justify-center gap-3 mt-4">
            <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                confirmModal.action === "approve"
                    ? handleApprove(confirmModal.id)
                    : handleDecline(confirmModal.id);

                setConfirmModal({ visible: false, action: null, id: null });
                }}
            >
                Confirm
            </button>

            <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={() =>
                setConfirmModal({ visible: false, action: null, id: null })
                }
            >
                Cancel
            </button>
            </div>
        </div>
        )}

    </div>
    )}

        </div>
      )}

    </div>
  );
};

export default TuneActivationRequests;