'use client';

import React, { useState, useEffect } from "react";
import { db } from "@/app/lib/firebase";
import { schoollpq } from "@/app/lilschoollpq/schoollpq";
import { useAuth } from "@/app/context/AuthContext";
import { 
    collection, 
    setDoc, 
    doc, 
    serverTimestamp, 
    onSnapshot,
    query, 
    where,
    updateDoc,
    deleteDoc 
} from "firebase/firestore";
import localforage from "localforage";
import { toast } from "react-toastify";

// ☁️ Cloudinary Credentials
const CLOUD_NAME = "dyt1xzrcv"; 
const UPLOAD_PRESET = "firstTime";  //leonardskargbo@gmail.com

// 💾 LocalForage Cache for Teacher Assignments
const assignmentStore = typeof window !== 'undefined' ? localforage.createInstance({ 
    name: "TeacherDataCache",
    storeName: "teacher_assignments",
}) : null;

const TeacherDocumentUpload = () => {
    const { user } = useAuth();
    const schoolId = user?.schoolId || "N/A";
    const teacherName = user?.data?.teacherName || "Unknown Teacher";

    const [academicYear] = useState("2025/2026");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedTest, setSelectedTest] = useState("Term 1 T1");
    const [assignments, setAssignments] = useState([]);

    const [uploading, setUploading] = useState(false);
    const [uploadedDocs, setUploadedDocs] = useState([]);
    
    // Inline editing states
    const [editingDocId, setEditingDocId] = useState(null);
    const [editFileName, setEditFileName] = useState("");
    const [editTerm, setEditTerm] = useState("");

    const tests = ["Term 1 T1", "Term 1 Exam", "Term 2 T1", "Term 2 Exam", "Term 3 T1", "Term 3 Exam"];

    // 1. 📋 LOAD TEACHER ASSIGNMENTS (Cache-First)
    useEffect(() => {
        if (!teacherName || !schoolId || !assignmentStore) return;
        const ASSIGNMENTS_CACHE_KEY = `assignments_${schoolId}_${teacherName}`;

        const loadAssignments = async () => {
            try {
                const cachedData = await assignmentStore.getItem(ASSIGNMENTS_CACHE_KEY);
                if (cachedData && cachedData.data) {
                    setAssignments(cachedData.data);
                    if (cachedData.data.length > 0 && !selectedClass) {
                        setSelectedClass(cachedData.data[0].className);
                        setSelectedSubject(cachedData.data[0].subjects[0]);
                    }
                }
            } catch (e) { console.error("Cache Error:", e); }

            const q = query(
                collection(db, "TeacherAssignments"),
                where("teacher", "==", teacherName),
                where("schoolId", "==", schoolId)
            );

            const unsub = onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
                setAssignments(data);
                if (data.length > 0 && !selectedClass) {
                    setSelectedClass(data[0].className);
                    setSelectedSubject(data[0].subjects[0]);
                }
                assignmentStore.setItem(ASSIGNMENTS_CACHE_KEY, { timestamp: Date.now(), data });
            });

            return () => unsub();
        };

        loadAssignments();
    }, [teacherName, schoolId]);

    // 2. 📂 LOAD UPLOADED DOCUMENTS FROM FIRESTORE
    useEffect(() => {
        if (!selectedClass || !selectedSubject || !selectedTest || !schoolId) {
            setUploadedDocs([]);
            return;
        }

        const q = query(
            collection(schoollpq, "TeacherUploadedDocuments"),
            where("schoolId", "==", schoolId),
            where("className", "==", selectedClass),
            where("subject", "==", selectedSubject),
            where("term", "==", selectedTest),
            where("academicYear", "==", academicYear)
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const docsList = snapshot.docs.map(docItem => ({ id: docItem.id, ...docItem.data() }));
            setUploadedDocs(docsList);
        });

        return () => unsub();
    }, [selectedClass, selectedSubject, selectedTest, schoolId, academicYear]);

    // ☁️ HANDLE CLOUDINARY UPLOAD WITH DYNAMIC FOLDERS & FIRESTORE SAVE
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!selectedClass || !selectedSubject) {
            toast.error("Please select a Class and Subject first.");
            return;
        }

        setUploading(true);
        try {
            const folderPath = `${schoolId}/${selectedClass}/${selectedSubject}`.replace(/\s+/g, '_');

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", UPLOAD_PRESET);
            formData.append("folder", folderPath);

            const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!data.secure_url) {
                throw new Error(data.error?.message || "Cloudinary upload failed");
            }

            const fileUrl = data.secure_url;
            const publicId = data.public_id;
            const fileName = file.name;
            const fileFormat = data.format || file.name.split('.').pop();

            const docRef = doc(collection(schoollpq, "TeacherUploadedDocuments"));
            await setDoc(docRef, {
                schoolId,
                className: selectedClass,
                subject: selectedSubject,
                term: selectedTest,
                academicYear,
                teacher: teacherName,
                fileName,
                fileUrl,
                publicId,
                cloudinaryFolder: folderPath,
                fileFormat,
                timestamp: serverTimestamp(),
            });

            toast.success("Document uploaded to Cloudinary folder successfully!");
        } catch (error) {
            console.error("Upload Error:", error);
            toast.error(error.message || "Failed to upload document.");
        } finally {
            setUploading(false);
            event.target.value = "";
        }
    };

    // ✏️ START EDITING
    const handleStartEdit = (docItem) => {
        setEditingDocId(docItem.id);
        setEditFileName(docItem.fileName);
        setEditTerm(docItem.term);
    };

    // 💾 SAVE EDITS
    const handleSaveEdit = async (docId) => {
        if (!editFileName.trim()) return toast.error("File name cannot be empty.");
        try {
            const docRef = doc(schoollpq, "TeacherUploadedDocuments", docId);
            await updateDoc(docRef, {
                fileName: editFileName.trim(),
                term: editTerm,
                timestamp: serverTimestamp(),
            });
            setEditingDocId(null);
            toast.success("Document details updated successfully!");
        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Failed to update document.");
        }
    };

    // 🗑️ DELETE DOCUMENT RECORD
    const handleDelete = async (docId) => {
        if (!window.confirm("Are you sure you want to delete this document record?")) return;
        try {
            await deleteDoc(doc(schoollpq, "TeacherUploadedDocuments", docId));
            if (editingDocId === docId) setEditingDocId(null);
            toast.success("Document deleted.");
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Failed to delete document.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg text-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-center text-red-700 uppercase tracking-tight">
                Teacher Document & Question Paper Upload
            </h2>

            {/* SELECTION BOX */}
            <div className="flex flex-wrap gap-4 mb-6 p-4 border rounded-2xl bg-gray-50 shadow-sm">
                <div className="flex-1 min-w-[150px]">
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Class</label>
                    <select
                        value={selectedClass}
                        onChange={(e) => { setSelectedClass(e.target.value); setSelectedSubject(""); }}
                        className="w-full border rounded-xl px-3 py-2 text-sm font-bold bg-white"
                    >
                        <option value="">Select Class</option>
                        {assignments.map((a) => <option key={a.id} value={a.className}>{a.className}</option>)}
                    </select>
                </div>

                <div className="flex-1 min-w-[150px]">
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Subject</label>
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full border rounded-xl px-3 py-2 text-sm font-bold bg-white disabled:bg-gray-100"
                        disabled={!selectedClass}
                    >
                        <option value="">Select Subject</option>
                        {assignments.find(a => a.className === selectedClass)?.subjects.map((s, i) => (
                            <option key={i} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="flex-1 min-w-[150px]">
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Term/Test</label>
                    <select
                        value={selectedTest}
                        onChange={(e) => setSelectedTest(e.target.value)}
                        className="w-full border rounded-xl px-3 py-2 text-sm font-bold bg-white"
                    >
                        {tests.map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>
                </div>
            </div>

            {/* UPLOAD ZONE */}
            <div className="p-8 border-2 border-dashed border-red-300 bg-red-50/50 rounded-3xl mb-8 text-center">
                <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                    onChange={handleFileUpload}
                    id="doc-upload-input"
                    className="hidden"
                    disabled={!selectedClass || !selectedSubject || uploading}
                />
                <label
                    htmlFor="doc-upload-input"
                    className={`cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase text-white shadow-md transition-all ${
                        !selectedClass || !selectedSubject ? "bg-gray-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                    {uploading ? "Uploading to Cloudinary..." : "📁 Choose File to Upload"}
                </label>
                <p className="text-xs text-gray-500 mt-2">
                    Upload exam papers, notes, or assignments (.pdf, .docx, .txt).
                </p>
            </div>

            {/* UPLOADED DOCUMENTS & MODIFICATION TABLE */}
            <div className="overflow-hidden border border-gray-100 rounded-3xl shadow-sm">
                <table className="w-full text-left text-xs">
                    <thead className="bg-gray-800 text-white uppercase text-[10px] tracking-widest">
                        <tr>
                            <th className="p-4">#</th>
                            <th className="p-4">File Name</th>
                            <th className="p-4">Term</th>
                            <th className="p-4">Teacher</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {uploadedDocs.map((docItem, i) => {
                            const isEditing = editingDocId === docItem.id;
                            return (
                                <tr key={docItem.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-bold text-gray-400">{i + 1}</td>
                                    
                                    {/* File Name Column (Editable) */}
                                    <td className="p-4 font-bold text-red-600 truncate max-w-xs">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editFileName}
                                                onChange={(e) => setEditFileName(e.target.value)}
                                                className="border rounded px-2 py-1 text-xs w-full bg-white font-normal text-gray-800"
                                            />
                                        ) : (
                                            docItem.fileName
                                        )}
                                    </td>

                                    {/* Term Column (Editable) */}
                                    <td className="p-4 text-gray-700">
                                        {isEditing ? (
                                            <select
                                                value={editTerm}
                                                onChange={(e) => setEditTerm(e.target.value)}
                                                className="border rounded px-2 py-1 text-xs bg-white font-normal"
                                            >
                                                {tests.map((t, idx) => (
                                                    <option key={idx} value={t}>{t}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            docItem.term
                                        )}
                                    </td>

                                    <td className="p-4 text-gray-700">{docItem.teacher}</td>

                                    {/* Action Buttons Column */}
                                    <td className="p-4">
                                        <div className="flex justify-center items-center gap-3">
                                            <a 
                                                href={docItem.fileUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-blue-600 font-bold uppercase text-[10px] hover:underline"
                                            >
                                                View
                                            </a>

                                            {isEditing ? (
                                                <>
                                                    <button 
                                                        onClick={() => handleSaveEdit(docItem.id)}
                                                        className="text-green-600 font-bold uppercase text-[10px] hover:underline"
                                                    >
                                                        Save
                                                    </button>
                                                    <button 
                                                        onClick={() => setEditingDocId(null)}
                                                        className="text-gray-500 font-bold uppercase text-[10px] hover:underline"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <button 
                                                    onClick={() => handleStartEdit(docItem)}
                                                    className="text-orange-500 font-bold uppercase text-[10px] hover:underline"
                                                >
                                                    Edit
                                                </button>
                                            )}

                                            <button 
                                                onClick={() => handleDelete(docItem.id)} 
                                                className="text-red-500 font-bold uppercase text-[10px] hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {uploadedDocs.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-10 text-center text-gray-400 font-medium italic">
                                    No documents uploaded for this selection yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherDocumentUpload;