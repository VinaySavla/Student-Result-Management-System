import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { connectAdvanced, useDispatch, useSelector } from "react-redux";
import { getStudent, uploadMark } from "../../../redux/actions/facultyActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { MARKS_UPLOADED, SET_ERRORS } from "../../../redux/actionTypes";
import { getTest } from "../../../redux/actions/facultyActions";
const Body = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const tests = store.faculty.tests.result;
  // const subjectCode = tests?.map((test) => test.subjectCode);
  const [marks, setMarks] = useState([]);
  var sc = [];
  var allTest = [];

  for (var i = 0; i < tests?.length; i++) {
    sc.push(tests[i].subjectCode);
    allTest.push(tests[i].test);
  }
  const subjectCode = Array.from(new Set(sc));
  const test = Array.from(new Set(allTest));

  const [value, setValue] = useState({
    department: "",
    year: "",
    semester: "",
    division: "",
    test: "",
    subjectCode: "",
  });
  const [search, setSearch] = useState(false);

  const [selectedYear, setSelectedYear] = useState('');
  const [semesters, setSemesters] = useState([]);
  const yearAvailableOptions = [1, 2, 3, 4];
  const semesterOptions = [
    { year: 1, semester: 1 },
    { year: 1, semester: 2 },
    { year: 2, semester: 3 },
    { year: 2, semester: 4 },
    { year: 3, semester: 5 },
    { year: 3, semester: 6 },
    { year: 4, semester: 7 },
    { year: 4, semester: 8 },
  ];

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    const selYear = { ...value, year: e.target.value }
    setValue(selYear)
    setSelectedYear(selectedYear);
    const filteredSemesters = semesterOptions.filter(
      (semester) => semester.year === parseInt(selectedYear)
    );
    setSemesters(filteredSemesters);
  };

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
      setValue({
        department: "",
        year: "",
        semester: "",
        division: "",
        test: "",
        subjectCode: "",
      });
    }
  }, [store.errors]);

  const handleInputChange = (value, _id) => {
    const newMarks = [...marks];
    let index = newMarks.findIndex((m) => m._id === _id);
    if (index === -1) {
      newMarks.push({ _id, value });
    } else {
      newMarks[index].value = value;
    }
    setMarks(newMarks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getStudent(value));
  };
  const students = useSelector((state) => state.admin.students.result);

  const uploadMarks = (e) => {
    setError({});
    dispatch(
      uploadMark(
        marks,
        value.department,
        value.division,
        value.year,
        value.semester,
        value.test,
        value.subjectCode
      )
    );
  };

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    setValue({ ...value, department: user.result.department });
  }, []);

  useEffect(() => {
    if (store.errors || store.faculty.marksUploaded) {
      setLoading(false);
      if (store.faculty.marksUploaded) {
        setValue({
          department: "",
          year: "",
          semester: "",
          test: "",
          division: "",
          subjectCode: "",
        });
        setSearch(false);
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: MARKS_UPLOADED, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.faculty.marksUploaded]);

  useEffect(() => {
    if (value.year !== "" && value.semester !== "" && value.division !== "") {
      dispatch(getTest(value));
    }
  }, [value.year, value.semester, value.division]);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <BoyIcon />
          <h1>All Students</h1>
        </div>
        <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
          <form
            className="flex flex-col space-y-2 col-span-1"
            onSubmit={handleSubmit}
          >
            <label htmlFor="year">Year</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.year}
              onChange={handleYearChange}>
              <MenuItem value={selectedYear}>Select Year</MenuItem>
              {yearAvailableOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  {`${year}`}
                </MenuItem>
              ))}
            </Select>
            <label htmlFor="semester">Semester</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.semester}
              onChange={(e) => setValue({ ...value, semester: e.target.value })}
            >
               <MenuItem value="">Select Semester</MenuItem>
                    {semesters.map((semester) => (
                      <MenuItem key={`${semester.year}- ${semester.semester}`} value={semester.semester}>
                        {`${semester.semester}`}
                      </MenuItem>
                    ))}
            </Select>
            <label htmlFor="division">Division</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.division}
              onChange={(e) => setValue({ ...value, division: e.target.value })}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="7">7</MenuItem>
              <MenuItem value="8">8</MenuItem>
              <MenuItem value="9">9</MenuItem>
            </Select>
            <label htmlFor="subjectcode">Subject Code</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.subjectCode}
              onChange={(e) =>
                setValue({ ...value, subjectCode: e.target.value })
              }
            >
              <MenuItem value="">None</MenuItem>
              {subjectCode?.map((subjectCode, idx) => (
                <MenuItem value={subjectCode} key={idx}>
                  {subjectCode}
                </MenuItem>
              ))}
            </Select>
            <label htmlFor="test">Test</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.test}
              onChange={(e) => setValue({ ...value, test: e.target.value })}
            >
              <MenuItem value="">None</MenuItem>
              {test?.map((test, idx) => (
                <MenuItem value={test} key={idx}>
                  {test}
                </MenuItem>
              ))}
            </Select>
            <button
              className={`${classes.adminFormSubmitButton} w-56`}
              type="submit"
            >
              Search
            </button>
          </form>
          <div className="col-span-3 mr-6">
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.noStudentError || error.backendError) && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noStudentError || error.backendError}
                </p>
              )}
            </div>
            {search &&
              !loading &&
              Object.keys(error).length === 0 &&
              students?.length !== 0 && (
                <div className={`${classes.adminData} h-[20rem]`}>
                  <div className="grid grid-cols-8">
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Sr no.
                    </h1>
                    <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                      Name
                    </h1>
                    <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                      Username
                    </h1>

                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Division
                    </h1>
                    <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                      Marks
                    </h1>
                  </div>
                  {students?.map((stu, idx) => (
                    <div
                      key={idx}
                      className={`${classes.adminDataBody} grid-cols-8`}
                    >
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}
                      >
                        {idx + 1}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}
                      >
                        {stu.name}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}
                      >
                        {stu.username}
                      </h1>

                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}
                      >
                        {stu.division}
                      </h1>
                      <input
                        onChange={(e) =>
                          handleInputChange(e.target.value, stu._id)
                        }
                        value={stu.marks}
                        className="col-span-2 border-2 w-24 px-2 h-8"
                        type="text"
                      />
                    </div>
                  ))}
                </div>
              )}
            {search && Object.keys(error).length === 0 && (
              <div className="">
                <button
                  onClick={uploadMarks}
                  className={`${classes.adminFormSubmitButton} bg-blue-500 mt-5 ml-[22rem]`}
                >
                  Upload
                </button>
              </div>
            )}
            {(error.examError || error.backendError) && (
              <p className="text-red-500 text-2xl font-bold ml-32">
                {error.examError || error.backendError}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
