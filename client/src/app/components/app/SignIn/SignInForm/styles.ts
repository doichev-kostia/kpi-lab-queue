import {makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "16px",
        maxWidth: "600px"
    },
    formControl: {
        marginBottom: "40px"
    },
    buttonWrapper: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    }
}))
