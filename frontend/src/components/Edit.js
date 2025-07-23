import { React, useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import MyTextField from './forms/MyTextField';
import Calendar from './forms/Calendar';
import CommentBox from './forms/CommentBox';
import DropDown from './forms/DropDown';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';


const Edit = () => {
    const MyParam = useParams()
    const MyId = MyParam.id
    const [loading, setLoading] = useState(true);

    const GetData = () => {
        AxiosInstance.get(`project/${MyId}`).then((res) => {
            console.log(res.data)
            setValue('name', res.data.name)
            setValue('status', res.data.status)
            setValue('start_date', Dayjs(res.data.start_date))
            setValue('end_date', Dayjs(res.data.end_date))
            setValue('comments', res.data.comments)
            setLoading(false)
        }
        )
    }

    useEffect(() => {
        // console.log(MyId);
        GetData();
    }, [])

    const navigate = useNavigate()
    const defaultValues = {
        name: '',
        comments: '',
        status: '',
    };
    const { handleSubmit, setValue, control } = useForm({ defaultValues: defaultValues })

    const submission = (data) => {
        const StartDate = Dayjs(data.start_date).format("YYYY-MM-DD");
        const EndDate = Dayjs(data.end_date).format("YYYY-MM-DD");

        AxiosInstance.put(`project/${MyId}/`, {
            name: data.name,
            start_date: StartDate,
            end_date: EndDate,
            comments: data.comments,
            status: data.status,
        })
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
            <form onSubmit={handleSubmit(submission)}>
                <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
                    <Typography sx={{ margin: '20px', color: '#fff' }}>
                        Edit Records
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>

                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
                        <MyTextField
                            label="Name"
                            placeholder="Enter your project name"
                            control={control}
                            name="name"
                            width="30%"
                        />

                        <Calendar
                            label="Start Date"
                            control={control}
                            name="start_date"
                            width="30%"
                        />

                        <Calendar
                            label="End Date"
                            control={control}
                            name="end_date"
                            width="30%"
                        />

                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <CommentBox
                            label="Comments"
                            name="comments"
                            placeholder="Enter your comments about project"
                            control={control}
                            width="30%"
                        />

                        <DropDown
                            label="Status"
                            name="status"
                            control={control}
                            width="30%"
                        />

                        <Box sx={{ width: "30%" }}>
                            <Button variant='contained' type='submit' sx={{ width: '100%' }}>
                                Save Changes
                            </Button>
                        </Box>
                    </Box>


                </Box>
            </form>

        </div>

    )
}

export default Edit;
