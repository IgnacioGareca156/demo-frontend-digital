import React from 'react'
import VideoCameraFrontSharpIcon from '@mui/icons-material/VideoCameraFrontSharp';
import { IconButton } from '@mui/material';
const VerMeet = ({meet_link}) => {
    return (
        <IconButton color="" component={'a'} size='large' target="_blank" href={`${meet_link}`}>
            < VideoCameraFrontSharpIcon />
        </IconButton>
    )
}

export default VerMeet
