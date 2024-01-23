import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GroupList from "../../components/homeBoxs/GroupList";
import UserList from "../../components/homeBoxs/UserList";
import "./Home.css";
import MyGroups from "../../components/homeBoxs/MyGroups";

const Home = () => {
  const logdinData = useSelector((state) => state.logdin.value);
  const navigate = useNavigate();
  useEffect(() => {
    !logdinData && navigate("/");
  }, []);
  return (
    <>
      <Grid container spacing={2}>
       
        <Grid item xs={4}>
          <GroupList />
        </Grid>
        <Grid item xs={4}>
          <MyGroups />
        </Grid>
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
