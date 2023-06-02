import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? 200 : 800,
  },
}));

function LinearProgressWithLabel(props) {
  const colors = () =>
    props.value <= 30 ? "error" : props.value <= 70 ? "warning" : "success";
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <BorderLinearProgress
          color={colors()}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ data }) {
  const [progress, setProgress] = React.useState(0);
  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= %100 ? 10 : prevProgress + 10
  //     );
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  return (
    <Box
      sx={{
        width: "200",
        height: "30vh",
        overflowX: "hidden",
        overflowY: "auto",
        marginLeft: "25px",
        marginTop: "10px" 
      }}
    >
      <Typography variant="h5">Progressão do Estudante</Typography>
      {data.map((item) => {
        return (
          <div>
            <h5>{item.fullName}</h5>
            <Box sx={{ width: "97%"}}>
              <LinearProgressWithLabel value={item.progress} />
            </Box>{" "}
          </div>
        );
      })}
    </Box>
  );
}
