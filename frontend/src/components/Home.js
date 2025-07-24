import { React, useEffect, useMemo, useState } from 'react';
import AxiosInstance from './Axios';
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import Dayjs from 'dayjs';
import { Box, IconButton } from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom'

const Home = () => {

    const [myData, setMyData] = useState();
    const [loading, setLoading] = useState(true);

    const GetData = () => {
        AxiosInstance.get(`project/`).then((res) => {
            setMyData(res.data)
            console.log(res.data)
            setLoading(false)
        }
        )
    }

    useEffect(() => {
        GetData();
    }, [])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                size: 150,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 150,
            },
            {
                accessorKey: 'comments',
                header: 'Comments',
                size: 200,
            },
            {
                accessorFn: (row) => Dayjs(row.start_date).format('DD-MM-YYYY'),
                id: 'start_date',
                header: 'Start date',
                size: 150,
            },
            {
                accessorFn: (row) => Dayjs(row.end_date).format('DD-MM-YYYY'),
                id: 'end_date',
                header: 'End date',
                size: 150,
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: myData || [],
        //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableRowActions: true,
        renderRowActions: ({ row }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <IconButton
                    color="secondary"
                    component={Link}
                    to={`edit/${row.original.id}`}
                >
                    {/* <IconButton 
                    color="secondary" 
                    component={Link} 
                    to={`edit/${row.original.id}`}
                > */}
                    <EditIcon />
                </IconButton>
                <IconButton
                    color="error"
                    component={Link}
                    to={`delete/${row.original.id}`}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>)
    });



    return (
        <div>
            {loading ? <p>Loading Data....</p> :
                <MaterialReactTable table={table} />
            }
        </div>
    )
}

export default Home;
