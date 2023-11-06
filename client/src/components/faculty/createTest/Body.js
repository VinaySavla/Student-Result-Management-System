import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createTest } from "../../../redux/actions/facultyActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_TEST, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    subjectCode: "",
    division: "",
    year: "",
    semester: "",
    test: "",
    totalMarks: "",
    date: "",
    department: user.result.department,
  });

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
      setValue({
        subjectCode: "",
        division: "",
        year: "",
        semester: "",
        test: "",
        totalMarks: "",
        date: "",
        department: user.result.department,
      });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(createTest(value));
  };

  useEffect(() => {
    if (store.errors || store.faculty.testAdded) {
      setLoading(false);
      if (store.faculty.testAdded) {
        setValue({
          subjectCode: "",
          division: "",
          year: "",
          semester: "",
          test: "",
          totalMarks: "",
          date: "",
          department: user.result.department,
        });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_TEST, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.faculty.testAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <AddIcon />
          <h1>Create Test</h1>
        </div>
        <div className=" mr-10 bg-white flex flex-col rounded-xl ">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Test Name :</h1>

                  
                  <Select
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.test}
                    onChange={(e) =>
                      setValue({ ...value, test: e.target.value })
                    }
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="IA-1">IA-1</MenuItem>
                    <MenuItem value="IA-2">IA-2</MenuItem>
                    <MenuItem value="EndSemesterExam">End Semester Exam</MenuItem>
                    <MenuItem value="TermWork">Term Work</MenuItem>
                    <MenuItem value="PracticalExamination">Practical Examination</MenuItem>
                    <MenuItem value="OralExamination">Oral Examination</MenuItem>
                  </Select>
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Subject Code :</h1>

                  <input
                    required
                    placeholder="Subject Code"
                    className={classes.adminInput}
                    type="text"
                    value={value.subjectCode}
                    onChange={(e) =>
                      setValue({ ...value, subjectCode: e.target.value })
                    }
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Department :</h1>

                  <input
                    required
                    placeholder={user.result.department}
                    disabled
                    className={classes.adminInput}
                    type="text"
                    value={user.result.department}
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Date :</h1>

                  <input
                    required
                    className={classes.adminInput}
                    type="date"
                    value={value.date}
                    onChange={(e) =>
                      setValue({ ...value, date: e.target.value })
                    }
                  />
                </div>
                
              </div>
              <div className={classes.adminForm2r}>
              <div className={classes.adminForm3}>
                <h1 className={classes.adminLabel}>Year :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
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
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Semester :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.semester}
                    onChange={(e) =>
                      setValue({ ...value, semester: e.target.value })
                    }>
                    <MenuItem value="">Select Semester</MenuItem>
                    {semesters.map((semester) => (
                      <MenuItem key={`${semester.year}- ${semester.semester}`} value={semester.semester}>
                        {`${semester.semester}`}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Division :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.division}
                    onChange={(e) =>
                      setValue({ ...value, division: e.target.value })
                    }>
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
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Total Marks :</h1>

                  <input
                    required
                    placeholder="Total Marks"
                    className={classes.adminInput}
                    type="number"
                    value={value.totalMarks}
                    onChange={(e) =>
                      setValue({ ...value, totalMarks: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={() => {
                  setValue({
                    subjectCode: "",
                    division: "",
                    year: "",
                    semester: "",
                    test: "",
                    totalMarks: "",
                    date: "",
                    department: "",
                  });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button">
                Clear
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Creating Test"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.testError || error.backendError) && (
                <p className="text-red-500">
                  {error.testError || error.backendError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
