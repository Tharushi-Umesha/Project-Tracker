import { React, useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import MyTextField from './forms/MyTextField';
import Calendar from './forms/Calendar';
import CommentBox from './forms/CommentBox';
import DropDown from './forms/DropDown';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


const Create = () => {
    const [projectmanager, setProjectmanager] = useState();
    const [loading, setLoading] = useState(true);

    const GetData = () => {
        AxiosInstance.get(`projectmanager/`).then((res) => {
            setProjectmanager(res.data)
            console.log(res.data)
            setLoading(false)
        }
        )
    }

    useEffect(() => {
        GetData();
    }, [])

    const hardcoded_options = [
        { id: '', name: 'None' },
        { id: 'Open', name: 'Open' },
        { id: 'In progress', name: 'In Progress' },
        { id: 'Completed', name: 'Completed' },
    ]

    const navigate = useNavigate()
    const defaultValues = {
        name: '',
        comments: '',
        status: '',
    };

    const schema = yup
        .object({
            name: yup.string().required('Name is requied field.'),
            status: yup.string().required('Status is required field.'),
            comments: yup.string(),
            start_date: yup.date().required('Start date is required field.'),
            end_date: yup.date().required('End date is required field.').min(yup.ref('start_date'), 'The end date cannot be before start date.'),
            projectmanager: yup.string().required('Project Manager is Required Field.')
        })
    const { handleSubmit, control } = useForm({ defaultValues: defaultValues, resolver: yupResolver(schema) })

    const submission = (data) => {
        const StartDate = Dayjs(data.start_date).format("YYYY-MM-DD");
        const EndDate = Dayjs(data.end_date).format("YYYY-MM-DD");

        AxiosInstance.post(`project/`, {
            name: data.name,
            start_date: StartDate,
            end_date: EndDate,
            comments: data.comments,
            status: data.status,
            projectmanager: data.projectmanager,
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
            {loading ? <p>Loading Data....</p> :
                <form onSubmit={handleSubmit(submission)}>
                    <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
                        <Typography sx={{ margin: '20px', color: '#fff' }}>
                            Create Records
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
                                options={hardcoded_options}
                            />

                            <DropDown
                                label="Project Manager"
                                name="projectmanager"
                                control={control}
                                width="30%"
                                options={projectmanager}
                            />


                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'start', marginTop: '40px', padding: 4 }}>
                            <Button variant='contained' type='submit' sx={{ width: '30%' }}>
                                Submit
                            </Button>
                        </Box>


                    </Box>
                </form>
            }

        </div>

    )
}

export default Create;
