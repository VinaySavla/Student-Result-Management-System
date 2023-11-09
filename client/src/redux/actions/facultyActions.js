import {
  SET_ERRORS,
  FACULTY_LOGIN,
  UPDATE_PASSWORD,
  UPDATE_FACULTY,
  ADD_TEST,
  GET_TEST,
  GET_STUDENT,
  MARKS_UPLOADED,
  ATTENDANCE_MARKED,
  GET_SUBJECT,
} from "../actionTypes";
import * as api from "../api";

export const facultySignIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.facultySignIn(formData);
    dispatch({ type: FACULTY_LOGIN, data });
    if (data.result.passwordUpdated) navigate("/faculty/home");
    else navigate("/faculty/password");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const facultyUpdatePassword =
  (formData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.facultyUpdatePassword(formData);
      dispatch({ type: UPDATE_PASSWORD, payload: true });
      alert("Password Updated");
      navigate("/faculty/home");
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const updateFaculty = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateFaculty(formData);
    dispatch({ type: UPDATE_FACULTY, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const createTest = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createTest(formData);
    alert("Test Created Successfully");

    dispatch({ type: ADD_TEST, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getTest = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getTest(formData);
    dispatch({ type: GET_TEST, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getMarksStudent(formData);
    dispatch({ type: GET_STUDENT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const uploadMark =
  (marks, department, division, year, semester, test, subjectCode) => async (dispatch) => {
    try {
      const formData = {
        marks,
        department,
        division,
        year,
        semester,
        test,
        subjectCode,
      };
      const { data } = await api.uploadMarks(formData);
      alert("Marks Uploaded Successfully");
      dispatch({ type: MARKS_UPLOADED, payload: true });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

  export const getSubjectCount = () => async (dispatch) => {
    try {
      const { data } = await api.getSubjectCount();
      dispatch({ type: GET_SUBJECT, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const markAttendance =
  (checkedValue, subjectName, department, year, division) =>
  async (dispatch) => {
    try {
      const formData = {
        selectedStudents: checkedValue,
        subjectName,
        department,
        year,
        division,
      };
      const { data } = await api.markAttendance(formData);
      alert("Attendance Marked Successfully");
      dispatch({ type: ATTENDANCE_MARKED, payload: true });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };
