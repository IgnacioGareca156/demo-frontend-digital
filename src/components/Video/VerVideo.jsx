import React from 'react'
import VideoCameraFrontSharpIcon from '@mui/icons-material/VideoCameraFrontSharp';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VerVideo = ({ video }) => {
    const navigate = useNavigate()
    
    return (
        <IconButton color="" component={'a'} size='large' target="_blank" onClick={() => {
            navigate(`${video?.id}`,
                {
                    state: {
                        video_link: video?.video_link,
                        video_descripcion: video?.video_descripcion
                    }
                })
        }}>
            < VideoCameraFrontSharpIcon />
        </IconButton>
    )
}

export default VerVideo
