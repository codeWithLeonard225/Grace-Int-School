"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useAuth } from "@/app/context/AuthContext";

const ClassList = () => {
  const { user } = useAuth();

  // ==========================================================
  // SCHOOL
  // ==========================================================

  const currentSchoolId = user?.schoolId || "";

  // ==========================================================
  // TEACHER INFORMATION
  // ==========================================================

  const [liveTeacherInfo, setLiveTeacherInfo] = useState(null);

  const userRole = (user?.role || "").toLowerCase();
  const isTeacher = userRole === "teacher";

  const isFormTeacher =
    liveTeacherInfo?.isFormTeacher ??
    user?.data?.isFormTeacher ??
    false;

  const assignedClass =
    liveTeacherInfo?.assignClass ??
    user?.data?.assignClass ??
    "";

  // ==========================================================
  // STATE
  // ==========================================================

  const [academicYear, setAcademicYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [academicYears, setAcademicYears] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);

  const [allPupilsData, setAllPupilsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================================
  // CLASS RESTRICTION
  // ==========================================================

  const isClassRestricted =
    isTeacher && isFormTeacher && !!assignedClass;

  // ==========================================================
  // 1. GET LOGGED-IN TEACHER INFORMATION
  // ==========================================================

  useEffect(() => {
    const teacherId =
      user?.data?.teacherID ||
      user?.teacherID ||
      user?.id;

    if (!currentSchoolId || !isTeacher || !teacherId) {
      return;
    }

    const teacherQuery = query(
      collection(db, "Teachers"),
      where("schoolId", "==", currentSchoolId),
      where("teacherID", "==", teacherId)
    );

    const unsubscribe = onSnapshot(
      teacherQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          const teacherDoc = snapshot.docs[0];

          setLiveTeacherInfo({
            id: teacherDoc.id,
            ...teacherDoc.data(),
          });
        } else {
          setLiveTeacherInfo(null);
        }
      },
      (error) => {
        console.error("Error fetching teacher:", error);
        setLiveTeacherInfo(null);
      }
    );

    return () => unsubscribe();
  }, [
    currentSchoolId,
    isTeacher,
    user?.data?.teacherID,
    user?.teacherID,
    user?.id,
  ]);

  // ==========================================================
  // 2. AUTOMATICALLY SELECT TEACHER'S CLASS
  // ==========================================================

  useEffect(() => {
    if (isClassRestricted && assignedClass) {
      setSelectedClass(assignedClass);
      setAvailableClasses([assignedClass]);
    }
  }, [isClassRestricted, assignedClass]);

  // ==========================================================
  // 3. GET PUPILS
  // ==========================================================

  useEffect(() => {
    if (!currentSchoolId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    let pupilsQuery = query(
      collection(db, "PupilsReg"),
      where("schoolId", "==", currentSchoolId)
    );

    // Teacher can only see assigned class
    if (isClassRestricted && assignedClass) {
      pupilsQuery = query(
        pupilsQuery,
        where("class", "==", assignedClass)
      );
    }

    const unsubscribe = onSnapshot(
      pupilsQuery,
      (snapshot) => {
        const pupils = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            studentID: data.studentID,
            studentName: data.studentName,
            class: data.class,
            academicYear: data.academicYear,
            gender: data.gender,
            photoURL: data.photoURL,
          };
        });

        setAllPupilsData(pupils);

        // ====================================================
        // BUILD ACADEMIC YEARS
        // ====================================================

        const years = [
          ...new Set(
            pupils
              .map((pupil) => pupil.academicYear)
              .filter(Boolean)
          ),
        ].sort().reverse();

        setAcademicYears(years);

        // Automatically select academic year
        setAcademicYear((previous) => {
          if (previous && years.includes(previous)) {
            return previous;
          }

          return years[0] || "";
        });

        // ====================================================
        // BUILD CLASSES
        // ====================================================

        let classes = [];

        if (isClassRestricted && assignedClass) {
          classes = [assignedClass];
        } else {
          classes = [
            ...new Set(
              pupils
                .map((pupil) => pupil.class)
                .filter(Boolean)
            ),
          ].sort();
        }

        setAvailableClasses(classes);

        // Automatically select class
        setSelectedClass((previous) => {
          if (
            previous &&
            classes.includes(previous)
          ) {
            return previous;
          }

          return classes[0] || "";
        });

        setLoading(false);
      },
      (error) => {
        console.error("Error fetching pupils:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [
    currentSchoolId,
    isClassRestricted,
    assignedClass,
  ]);

  // ==========================================================
  // 4. FILTER PUPILS
  // ==========================================================

  const filteredPupils = useMemo(() => {
    if (!academicYear || !selectedClass) {
      return [];
    }

    return allPupilsData
      .filter(
        (pupil) =>
          pupil.academicYear === academicYear &&
          pupil.class === selectedClass
      )
      .sort((a, b) =>
        (a.studentName || "").localeCompare(
          b.studentName || ""
        )
      );
  }, [
    allPupilsData,
    academicYear,
    selectedClass,
  ]);

  // ==========================================================
  // TEACHER NAME
  // ==========================================================

  const teacherName =
    liveTeacherInfo?.teacherName ||
    user?.data?.teacherName ||
    user?.data?.name ||
    user?.name ||
    "Teacher";

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="p-4 max-w-7xl mx-auto">

      {/* HEADER */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Class List
        </h1>

        <p className="text-sm text-gray-500">
          View pupils assigned to your class.
        </p>
      </div>

      {/* TEACHER INFORMATION */}

      {isTeacher && (
        <div className="mb-5 rounded-lg border border-blue-200 bg-blue-50 p-4">

          <div className="text-sm text-blue-800">
            <strong>Teacher:</strong>{" "}
            {teacherName}
          </div>

          {assignedClass && (
            <div className="text-sm text-blue-800 mt-1">
              <strong>Assigned Class:</strong>{" "}
              {assignedClass}
            </div>
          )}

          {isFormTeacher && (
            <div className="text-xs text-blue-600 mt-1">
              Form Teacher
            </div>
          )}

        </div>
      )}

      {/* FILTERS */}

      <div className="bg-white rounded-lg shadow p-4 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* ACADEMIC YEAR */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Academic Year
            </label>

            <select
              value={academicYear}
              onChange={(e) =>
                setAcademicYear(e.target.value)
              }
              disabled={loading}
              className="w-full border border-gray-300 rounded-md shadow-sm text-sm p-2"
            >
              <option value="">
                Select Academic Year
              </option>

              {academicYears.map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* CLASS */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class
            </label>

            <select
              value={selectedClass}
              onChange={(e) =>
                setSelectedClass(e.target.value)
              }
              disabled={
                isClassRestricted || loading
              }
              className="w-full border border-gray-300 rounded-md shadow-sm text-sm p-2"
            >
              <option value="">
                Select Class
              </option>

              {availableClasses.map(
                (className) => (
                  <option
                    key={className}
                    value={className}
                  >
                    {className}
                  </option>
                )
              )}
            </select>

            {isClassRestricted && (
              <p className="text-xs text-gray-500 mt-1">
                This class is assigned to you as Form Teacher.
              </p>
            )}
          </div>

        </div>
      </div>

      {/* CLASS SUMMARY */}

      {academicYear && selectedClass && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedClass}
              </h2>

              <p className="text-sm text-gray-500">
                Academic Year:{" "}
                <strong>{academicYear}</strong>
              </p>
            </div>

            <div className="text-sm text-gray-600">
              Total Pupils:{" "}
              <span className="font-bold text-gray-900">
                {filteredPupils.length}
              </span>
            </div>

          </div>
        </div>
      )}

      {/* PUPILS TABLE */}

      <div className="bg-white rounded-lg shadow overflow-hidden">

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading pupils...
          </div>
        ) : !academicYear || !selectedClass ? (
          <div className="p-8 text-center text-gray-500">
            Please select an academic year and class.
          </div>
        ) : filteredPupils.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No pupils found for{" "}
            <strong>{selectedClass}</strong>{" "}
            in{" "}
            <strong>{academicYear}</strong>.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="min-w-full divide-y divide-gray-200">

              <thead className="bg-gray-50">
                <tr>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    #
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Student ID
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Student Name
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Class
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Academic Year
                  </th>

                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">

                {filteredPupils.map(
                  (pupil, index) => (
                    <tr
                      key={
                        pupil.id ||
                        pupil.studentID
                      }
                      className="hover:bg-gray-50"
                    >

                      <td className="px-4 py-3 text-sm text-gray-700">
                        {index + 1}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-700">
                        {pupil.studentID || "-"}
                      </td>

                      <td className="px-4 py-3 text-sm font-medium text-gray-800">
                        {pupil.studentName || "-"}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-700">
                        {pupil.class || "-"}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-700">
                        {pupil.academicYear || "-"}
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
};

export default ClassList;