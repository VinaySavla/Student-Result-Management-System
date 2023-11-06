import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addSubject } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_SUBJECT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    subjectName: "",
    subjectCode: "",
    year: "",
    semester: "",
    totalLectures: "",
    department: "",
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
        subjectName: "",
        subjectCode: "",
        year: "",
        semester: "",
        totalLectures: "",
        department: "",
      });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addSubject(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.subjectAdded) {
      setLoading(false);
      if (store.admin.subjectAdded) {
        setValue({
          subjectName: "",
          subjectCode: "",
          year: "",
          semester: "",
          totalLectures: "",
          department: "",
        });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_SUBJECT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.subjectAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <AddIcon />
          <h1>Add Subject</h1>
        </div>
        <div className=" mr-10 bg-white flex flex-col rounded-xl ">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Subject Name :</h1>

                  <input
                    placeholder="Subject Name"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.subjectName}
                    onChange={(e) =>
                      setValue({ ...value, subjectName: e.target.value })
                    }
                  />
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
              </div>
              <div className={classes.adminForm2r}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Total Lectures :</h1>

                  <input
                    required
                    placeholder="Total Lectures"
                    className={classes.adminInput}
                    type="number"
                    value={value.totalLectures}
                    onChange={(e) =>
                      setValue({ ...value, totalLectures: e.target.value })
                    }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Department :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.department}
                    onChange={(e) =>
                      setValue({ ...value, department: e.target.value })
                    }>
                    <MenuItem value="">None</MenuItem>
                    {departments?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp.department}>
                        {dp.department}
                      </MenuItem>
                    ))}
                  </Select>
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
                    subjectName: "",
                    subjectCode: "",
                    year: "",
                    semester: "",
                    totalLectures: "",
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
                  message="Adding Subject"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.subjectError || error.backendError) && (
                <p className="text-red-500">
                  {error.subjectError || error.backendError}
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
