import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Main.css'
import { DataGrid } from '@mui/x-data-grid'
import dateFormat from 'dateformat'

const Main = () => {

    const [userData, setUserData] = useState()
    const [flag1, setFlag1] = useState(false)
    const [flag2, setFlag2] = useState(false)
    const [flag3, setFlag3] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [updateId, setUpdateId] = useState()
    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/all')
            setUserData(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const addData = async () => {
        try {
            const payload = { name, email }
            await axios.post('http://localhost:3001/api/add', payload)
            alert("Data added")
        } catch (error) {
            console.log(error)
        }
    }
    const updateData = async () => {
        try {
            const payload = { name, email }
            console.log(updateId);
            await axios.put('http://localhost:3001/api/edit/' + updateId, payload)
            alert("Data updated")
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    const editData = async (id) => {
        try {
            const res = await axios.get('http://localhost:3001/api/' + id)
            setName(res.data.name)
            setEmail(res.data.email)
            setUpdateId(res.data._id)
            setFlag3(true)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    const editButton = (params) => {
        return (
            <button
                className='ViewButton'
                onClick={() => {
                    editData(params.row.id)
                }}
            >
                View
            </button>
        )
    }
    const columns = [
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'createdAt', headerName: 'Created At', width: 300 },
        { field: 'updatedAt', headerName: 'Updated At', width: 300 },
        { field: ' ', headerName: '', renderCell: editButton, disableClickEventBubbling: true, width: 100 }
    ]
    const rows = userData?.map((data) => (
        {
            id: data._id,
            name: data.name,
            email: data.email,
            createdAt: dateFormat(data.createdAt, "mmmm dS, yyyy"),
            updatedAt: dateFormat(data.updatedAt, "mmmm dS, yyyy")
        }
    ))
    useEffect(() => {
        getData()
    }, [flag2])

    return (
        <div className='Container'>
            <div className='buttonContainer'>
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setFlag2(true)}
                >View All Data</button>
                {flag2 &&
                    <button
                        type="button"
                        className="btn btn-outline-warning"
                        onClick={() => setFlag2(false)}
                    >Close Table</button>
                }
                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => setFlag1(true)}
                >Add data</button>
                {flag1 &&
                    <button
                        type="button"
                        className="btn btn-outline-warning"
                        onClick={() => setFlag1(false)}
                    >Close</button>
                }
            </div>
            {flag1 &&
                <form className="row g-3 m-3">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Your name'
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Your email id'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <button
                            className='btn btn-outline-success'
                            onClick={addData}
                        >Submit</button>
                    </div>
                </form>
            }
            {flag3 &&
                <form className="row g-3 m-3">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <button
                            className='btn btn-outline-success'
                            onClick={updateData}
                        >Update</button>
                    </div>
                </form>
            }
            {flag2 &&
                <div className='DataGrid'>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        sx={{
                            m: 1,
                            '& .MuiDataGrid-cell:hover': {
                                color: 'teal'
                            },
                        }}
                    />
                </div>
            }
        </div>
    )
}

export default Main 