import { React, useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AxiosInstance from './Axios';
import { useNavigate, useParams } from 'react-router-dom';


const Delete = () => {
    const MyParam = useParams()
    const MyId = MyParam.id
    const [myData, setMyData] = useState();
    const [loading, setLoading] = useState(true);

    const GetData = () => {
        AxiosInstance.get(`project/${MyId}`).then((res) => {
            setMyData(res.data)
            console.log(res.data)
            setLoading(false)
        }
        )
    }

    useEffect(() => {
        // console.log(MyId);
        GetData();
    }, [])

    const navigate = useNavigate()



    const submission = (data) => {

        AxiosInstance.delete(`project/${MyId}/`)
            .then((res) => {
                navigate(`/`);
            })
            .catch((err) => {
                console.error("❌ Backend error:", err.response?.data || err.message);
                alert("Error: " + JSON.stringify(err.response?.data || err.message));
            });
    }


    return (
        <div>
            {loading ? <p>Loading Data....</p> :
                <div>
                    <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
                        <Typography sx={{ margin: '20px', color: '#fff' }}>
                            Delete Project:{myData.name}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'start', marginBottom: '40px' }}>
                            Are You Sure You Want To Delete Project? : {myData.name}
                        </Box>
                        <Box sx={{ width: "30%" }}>
                            <Button variant='contained' onClick={submission} sx={{ width: '100%' }} >
                                Delete Project
                            </Button>
                        </Box>
                    </Box>
                </div>
            }
        </div >

    )
}

export default Delete;
