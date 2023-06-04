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

  return (
    <Box
      sx={{
        width: "200",
        overflowX: "hidden",
        overflowY: "auto"
      }}
    >
      <Typography variant="h5">Progressão do Estudante</Typography>
      {data.map((item) => {
        return (
          <div key={item.fullName}>
            <Typography variant="subtitle1">{item.fullName}</Typography>
            <Box sx={{ width: "97%"}}>
              <LinearProgressWithLabel value={item.progress} />
            </Box> 
          </div>
        );
      })}
    </Box>
  );
}
