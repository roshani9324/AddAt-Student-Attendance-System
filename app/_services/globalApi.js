import axios from "axios";

const GetAllBranches = async () => {
  try {
    const response = await axios.get("/api/branch");
    return response.data;
  } catch (error) {
    console.error("Error fetching branches:", error);
    return null;
  }
};

const CreateNewStudent = async (data) => {
  try {
    const response = await axios.post("/api/student", data);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    return null;
  }
};

const GetAllStudents = async () => {
  try {
    const response = await axios.get("/api/student");
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return null;
  }
};

const DeleteStudentRecord = async (id) => {
  try {
    const response = await axios.delete("/api/student?id=" + id);
    return response;
  } catch (error) {
    console.log("Error deleting student record:", error);
    return null;
  }
};

const GetAttendanceList = async (branch, month) => {
  try {
    const response = await axios.get(
      "/api/attendance?branch=" + branch + "&month=" + month
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance list:", error);
    return null;
  }
};

const MarkAttendance = async (data) => {
  try {
    const response = await axios.post("/api/attendance", data);
    return response.data;
  } catch (error) {
    console.error("Error marking attendance:", error);
    return null;
  }
};

const MarkAbsent = async (studentId, day, date) => {
  try {
    const response = await axios.delete(
      "/api/attendance?studentId=" + studentId + "&day=" + day + "&date=" + date
    );
    return response;
  } catch (error) {
    console.log("Error marking absent student:", error);
    return null;
  }
};

const TotalPresentCountByDay = async (branch, date) => {
  try {
    const response = await axios.get(
      "/api/dashboard?date=" + date + "&branch=" + branch
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching branches:", error);
    return null;
  }
};

export default {
  GetAllBranches,
  CreateNewStudent,
  GetAllStudents,
  DeleteStudentRecord,
  GetAttendanceList,
  MarkAttendance,
  MarkAbsent,
  TotalPresentCountByDay,
};
