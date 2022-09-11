import {
  Box,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Grid,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Form as FormikForm, Formik } from "formik";
import { formValidationLogin } from "../../schemas/formValidation";
import { loginUser } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/auth.slice";

const initialValues = { mail: "", password: "", remember: false };

const LoginForm = () => {
  const dispatcher = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formValidationLogin}
      onSubmit={async (values, actions) => {
        console.log(values);
        try {
          const { token, user } = await loginUser(values);
          dispatcher(setLogin({ token, user }));
          if (values.remember) {
            window.localStorage.setItem("token", token);
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {(formik) => {
        return (
          <Box
            component={FormikForm}
            noValidate
            sx={{ mt: 1 }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="mail"
              label="Email Address"
              name="mail"
              autoComplete="email"
              value={formik.values.mail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mail && Boolean(formik.errors.mail)}
              helperText={formik.touched.mail && formik.errors.mail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onBlur={formik.handleBlur}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  id="remember"
                  name="remember"
                  onChange={formik.handleChange}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={"/register"} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
