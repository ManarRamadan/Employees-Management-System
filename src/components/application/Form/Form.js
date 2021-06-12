import React from 'react'
import { TextInput, Button, Select } from '../../ui'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  btnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px'

  }
})
export function Form({ formik, options }) {
  const classes = useStyles()
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        label="Full Name"
        id="name"
        name="name"
        placeholder="Full Name"
        margin="normal"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && formik.errors.name}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextInput
        label="Email"
        id="email"
        name="email"
        placeholder="Email"
        margin="normal"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && formik.errors.email}
        helperText={formik.touched.email && formik.errors.email}
      />
      <Select
        id="role"
        label="Role"
        name="role"
        value={formik.values.role}
        options={options}
        onChange={formik.handleChange}
        error={formik.touched.role && formik.errors.role}
      />
      <Box className={classes.btnWrapper}>
        <Button
          title="Save changes"
          color="primary"
          variant="contained"
          type="submit"
          loading={formik.isSubmitting}
        />
      </Box>
    </form>

  )

}
