import React, { useState, useEffect } from 'react'
import { Container, Box, Typography }
    from '@material-ui/core'
import { Button, Loading, Modal } from "../../components/ui";
import { makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from "formik";
import { Form } from '../../components/application'
import { validationSchema } from "./schema";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Table } from "../../components/ui";
import EmployeeViewModel from "./EmployeeViewModel";
import { homeVariables } from "../../config/home";


const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20
    }
})
export default function Employees() {
    const classes = useStyles()
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState([]);
    const [status, setStatus] = useState([]);
    const [employeeStatus, setEmployeeStatus] = useState();
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState();
    const [message, setMessage] = useState()
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalChangeStatus, setOpenModalChangeStatus] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const resetMessage = () => {
        setTimeout(() => {
            setMessage(undefined)
        }, 5000);
    }
    const handleClickOpenAdd = () => {
        setOpenModalAdd(true);
    };
    const handleCloseAdd = () => {
        setOpenModalAdd(false);
    };
    const handleClickOpenEdit = (employee) => {
        setOpenModalEdit(true);
        setEmployee(employee)
    };
    const handleCloseEdit = () => {
        setOpenModalEdit(false);
    };
    const handleClickOpenChangeStatus = (e, employee) => {
        setOpenModalChangeStatus(true);
        setEmployeeStatus(e.target.value)
        console.log(e.target.value, employee);
        setEmployee(employee)

    };
    const handleCloseChangeStatus = () => {
        setOpenModalChangeStatus(false);
    };
    useEffect(() => {
        EmployeeViewModel.getEmployeeRoles()
            .then(response => {
                setRoles(response.data)
            })
            .catch(error => {
                console.log(error);
                setMessage({
                    title: homeVariables.errorMessageTitle,
                    type: "error",
                    message: homeVariables.errorMessage
                })
            })
        EmployeeViewModel.getEmployeeStatus()
            .then(response => setStatus(response.data))
            .catch(error => {
                console.log(error);
                setMessage({
                    title: homeVariables.errorMessageTitle,
                    type: "error",
                    message: homeVariables.errorMessage
                })
            }
            )
        EmployeeViewModel.getEmployees()
            .then(response => {
                setEmployees(response.data.reverse())
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setMessage({
                    title: homeVariables.errorMessageTitle,
                    type: "error",
                    message: homeVariables.errorMessage
                })
            })

    }, [])
    const formik = useFormik({
        initialValues: {
            email: "",
            name: '',
            role: '',
            status: 'Added'
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            EmployeeViewModel.addEmployee(values)
                .then((res) => {
                    console.log(res);
                    var array = [...employees]
                    array.unshift(res.data)
                    setEmployees(array)
                    setTimeout(() => setMessage({
                        title: homeVariables.successMessageTitle,
                        type: "success",
                        message: homeVariables.successMessageAddEmployee
                    }), 1500)
                })
                .catch(error => {
                    console.log(error);
                    setMessage({
                        title: homeVariables.errorMessageTitle,
                        type: "error",
                        message: homeVariables.errorMessage
                    })
                })
                .then(() => setTimeout(() => {
                    setSubmitting(false)
                    resetForm()
                    handleCloseAdd()
                    resetMessage()
                }, 1500))
        },
    });
    const formikEdit = useFormik({
        initialValues: {
            email: employee && employee.email,
            name: employee && employee.name,
            role: employee && employee.role,
            status: employee && employee.status
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            update(values)
            setTimeout(() => {
                setSubmitting(false)
                handleCloseEdit()
            }, 1500);
        },
    });
    const update = (data) => {
        EmployeeViewModel.editEmployee(employee.id, data)
            .then((res) => {
                console.log(res);
                var array = [...employees]
                let new_array = array.map(element => element.id === employee.id ? res.data : element);
                setEmployees(new_array)
                setTimeout(() => setMessage({
                    title: homeVariables.successMessageTitle,
                    type: "success",
                    message: homeVariables.successMessageEditEmployee
                }), 1500)
            })
            .catch(error => {
                setMessage({
                    title: homeVariables.errorMessageTitle,
                    type: "error",
                    message: homeVariables.errorMessage
                })
            })
            .then(setTimeout(() => {

                resetMessage()
            }, 1500))
    }
    const changeEmployeeStatus = () => {
        if (employee.status !== employeeStatus) {
            setIsSubmitting(true)
            const employeeData = { ...employee, status: employeeStatus }
            update(employeeData)
            setTimeout(() => {
                setIsSubmitting(false)
                handleCloseChangeStatus()
            }, 1500);
        }
    }

    return (
        <Container>
            {message && (
                <Alert
                    onClose={() => {
                        setMessage(undefined)
                    }}
                    className="fixed-full-width-top"
                    severity={message.type}
                >
                    <AlertTitle>{message.title}</AlertTitle>
                    {message.message}
                </Alert>
            )}
            {!loading ?
                <>
                    <Box className={classes.wrapper}>
                        <Typography
                            variant="h6"
                            color="textSecondary"
                            component="h2"
                            gutterBottom
                        > Employees Management</Typography>
                        <Button
                            title="Add New"
                            color="primary"
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleClickOpenAdd}

                        />
                    </Box>
                    {employees.length === 0 ? <h1 >Click Add New to start listing your employees</h1>
                        :
                        <Table
                            data={employees}
                            schema={["name", "email", "role"]}
                            formik={formik} options={status}
                            onClick={handleClickOpenEdit}
                            onChange={handleClickOpenChangeStatus}
                        />
                    }
                </>
                :
                <Loading />
            }
            <Modal title="Add New Employee" open={openModalAdd} handleClose={handleCloseAdd}>
                <Form formik={formik} options={roles} />
            </Modal>
            <Modal title="Edit Employee" open={openModalEdit} handleClose={handleCloseEdit}>
                <Form formik={formikEdit} options={roles} />
            </Modal>
            <Modal title="Change Employee Status" open={openModalChangeStatus} handleClose={handleCloseChangeStatus}>
                <Box >
                    <Typography
                        variant="h6"
                        color="textSecondary"
                        component="h2"
                        gutterBottom
                    > Are you sure you want to change employee status</Typography>
                    <Box className={classes.wrapper}>
                        <Button
                            title="OK"
                            color="primary"
                            variant="contained"
                            onClick={changeEmployeeStatus}
                            loading={isSubmitting}
                        />
                        <Button
                            title="Cancel"
                            variant="contained"
                            onClick={handleCloseChangeStatus}

                        />
                    </Box>
                </Box>
            </Modal>

        </Container>
    )
}
