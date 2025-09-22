import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import * as tf from "@tensorflow/tfjs";
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import api from '../../api/axios';

const ScanningContent = () => {
    // Refs for DOM elements and initialization flag
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const initializationRef = useRef(false);

    // State for face recognition system
    const [isReady, setIsReady] = useState(false);
    const [statusMessage, setStatusMessage] = useState("Initializing system...");
    const faceMatcherRef = useRef(null);

    // State for UI and session management
    const [sessionStarted, setSessionStarted] = useState(false);
    const [isVideoStarted, setIsVideoStarted] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [selectedScheduleId, setSelectedScheduleId] = useState('');
    
    // State for scan results
    const [markedAttendance, setMarkedAttendance] = useState([]);
    const [unknownFaces, setUnknownFaces] = useState(0);
    const attendanceRef = useRef(new Set());

    // Main initialization effect for TensorFlow and face-api.js
    useEffect(() => {
        const loadEverything = async () => {
            if (initializationRef.current) return;
            initializationRef.current = true;

            try {
                await tf.ready();
                setStatusMessage('Loading face-api models...');
                
                await Promise.all([
                    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
                    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                ]);

                setStatusMessage("Loading labeled face data...");
                const studentRollNumbers = ["252330"]; // Example, can be fetched dynamically
                const labeledFaceDescriptors = await getLabeledFaceDescriptors(studentRollNumbers);

                if (labeledFaceDescriptors.length === 0) {
                    setStatusMessage("No student faces loaded. Check /public/labels folder.");
                    return;
                }

                faceMatcherRef.current = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.55);
                setIsReady(true);
                setStatusMessage('System ready.');
            } catch (error) {
                console.error("Initialization Error:", error);
                setStatusMessage("Initialization failed. Check console.");
            }
        };
        loadEverything();
    }, []);

    // Effect to fetch the teacher's schedule for today
    useEffect(() => {
        if (!isReady) return; // Wait for face-api to be ready
        
        const fetchSchedule = async () => {
            try {
                const response = await api.get('/schedules/mytoday');
                setSchedule(response.data.data);
                if (response.data.data.length > 0) {
                    setSelectedScheduleId(response.data.data[0]._id);
                }
            } catch (error) { 
                console.error("Failed to fetch schedule", error);
            }
        };
        fetchSchedule();
    }, [isReady]);

    // Helper function to load student face images
    const getLabeledFaceDescriptors = async (labels) => {
        return Promise.all(
            labels.map(async (label) => {
                try {
                    const res = await fetch(`/labels/${label}/manifest.json`);
                    if (!res.ok) return null;
                    const manifest = await res.json();
                    const descriptions = [];
                    for (const file of manifest.images) {
                        const img = await faceapi.fetchImage(`/labels/${label}/${file}`);
                        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                        if (detections) descriptions.push(detections.descriptor);
                    }
                    if (descriptions.length > 0) return new faceapi.LabeledFaceDescriptors(label, descriptions);
                    return null;
                } catch (err) {
                    console.error(`Could not load data for ${label}`, err);
                    return null;
                }
            })
        ).then((results) => results.filter((r) => r !== null));
    };

    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsVideoStarted(true);
                setStatusMessage('Camera active. Click "Capture & Scan".');
            }
        } catch (error) {
            setStatusMessage("Camera access denied.");
        }
    };

    const captureAndScan = async () => {
        if (!videoRef.current || !canvasRef.current || !faceMatcherRef.current || !selectedScheduleId) return;

        setStatusMessage("Scanning...");
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const detections = await faceapi.detectAllFaces(canvas).withFaceLandmarks().withFaceDescriptors();
        if (detections.length === 0) {
            setStatusMessage("No faces detected.");
            return;
        }

        const results = detections.map((d) => faceMatcherRef.current.findBestMatch(d.descriptor));
        let unknownCount = 0;
        let recognizedCount = 0;

        results.forEach(async (result) => {
            if (result.label !== "unknown" && !attendanceRef.current.has(result.label)) {
                try {
                    const response = await api.post('/attendance/markbyface', {
                        rollNumber: result.label,
                        scheduleId: selectedScheduleId
                    });
                    if (response.data.success) {
                        recognizedCount++;
                        attendanceRef.current.add(result.label);
                        setMarkedAttendance((prev) => [...prev, response.data.data.studentName]);
                    }
                } catch (error) { 
                    console.error("Failed to mark attendance for", result.label); 
                }
            } else if (result.label === "unknown") {
                unknownCount++;
            }
        });

        setUnknownFaces(unknownCount);
        setStatusMessage(`Scan complete. ${recognizedCount} student(s) marked.`);
    };
    
    // UI for selecting the class session
    if (!sessionStarted) {
        return (
            <>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Start Attendance Session</h1>
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto text-center">
                    <label htmlFor="scheduleSelect" className="block text-lg font-medium text-gray-700 mb-2">Select a Class</label>
                    <select
                        id="scheduleSelect"
                        value={selectedScheduleId}
                        onChange={(e) => setSelectedScheduleId(e.target.value)}
                        className="w-full p-3 border rounded-md mb-6"
                    >
                        {schedule.length > 0 ? (
                            schedule.map(item => (
                                <option key={item._id} value={item._id}>
                                    {item.courseId.courseName} ({item.startTime} - {item.endTime})
                                </option>
                            ))
                        ) : (
                            <option disabled>No classes scheduled for today</option>
                        )}
                    </select>
                    <button 
                        onClick={() => setSessionStarted(true)}
                        disabled={!isReady || !selectedScheduleId}
                        className="w-full p-3 bg-blue-600 text-white font-bold rounded-md disabled:bg-gray-400"
                    >
                        {isReady ? "Start Session" : "Initializing Face Models..."}
                    </button>
                </div>
            </>
        );
    }

    // UI for the main scanning interface
    return (
        <>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Live Attendance Scanning</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <p className="text-center text-gray-600 font-medium mb-4">{statusMessage}</p>
                    <div className="flex justify-center gap-4 flex-wrap mb-6">
                        <button onClick={startWebcam} disabled={!isReady || isVideoStarted} className="px-5 py-2 rounded-lg font-semibold bg-green-500 text-white disabled:bg-gray-400">Start Camera</button>
                        <button onClick={captureAndScan} disabled={!isVideoStarted} className="px-5 py-2 rounded-lg font-semibold bg-blue-500 text-white disabled:bg-gray-400">Capture & Scan</button>
                    </div>
                    <div className="relative w-full aspect-video mx-auto bg-black rounded-lg overflow-hidden">
                        <video ref={videoRef} autoPlay muted className="absolute top-0 left-0 w-full h-full" />
                        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
                        {!isVideoStarted && (
                            <div className="w-full h-full flex items-center justify-center text-white/70">Camera Preview</div>
                        )}
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-slate-800 border-b pb-4 mb-4">Scan Results</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-lg text-gray-700 mb-2">Marked Students</h4>
                            <div className="max-h-60 overflow-y-auto bg-gray-50 rounded-lg p-3 space-y-2">
                                {markedAttendance.length > 0 ? (
                                    markedAttendance.map((name, index) => (
                                        <div key={index} className="flex items-center gap-3 text-green-700">
                                            <FaCheckCircle />
                                            <span className="font-semibold">{name} - Present</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No students marked yet.</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-gray-700 mb-2">Unknown Faces</h4>
                            <div className="p-3 bg-red-50 rounded-lg flex items-center gap-3 text-red-700">
                                <FaExclamationTriangle />
                                <span className="font-mono font-semibold">{unknownFaces} face(s) not recognized.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScanningContent;