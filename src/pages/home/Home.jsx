import React, { useEffect } from "react";
import "./Home.css";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserList from "../../components/homeBoxs/UserList";

const Home = () => {
  const logdinData = useSelector((state) => state.logdin.value);
  const navigate = useNavigate();
  useEffect(() => {
    !logdinData && navigate("/");
  }, []);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <UserList />
        </Grid>
      </Grid>
      {/* <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button> */}
    </>
  );
};

export default Home;
