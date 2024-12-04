import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuthStore } from 'store';

const SignIn = ({ isOpen, onClose, moveToSignUp }: {
  isOpen: boolean,
  onClose: () => void,
  moveToSignUp: () => void
}) => {

  const { logIn, setUser } = useAuthStore() as { logIn: (token: string) => void, setUser: (user: any) => void };

  return (
    isOpen && (
      <div
        className="fixed left-0 top-0 z-[100] flex h-full min-h-screen w-full items-center justify-center px-4 py-4 bg-black/85 cursor-pointer"
        onClick={onClose}
      >
        <div className="login-register-page-wrapper bg-color-white w-full max-w-[600px] cursor-default" onClick={(e) => { e.stopPropagation() }}>
          <div className="checkout-page-style">
            <div className="login-form-box">
              <div>
                <h3 className="text-center mb--30">Login</h3>
              </div>
              <Formik initialValues={{
                email: '',
                password: '',
                submit: null
              }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  password: Yup.string().min(6, 'Password must be at least 6 characters').max(255).required('Password is required')
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  const formData = new FormData();
                  formData.append('email', values.email);
                  formData.append('password', values.password);
                  await axios({
                    method: 'post',
                    url: `${import.meta.env.VITE_API_URL}/api/v1/auth/signin`,
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                  })
                    .then((res) => {
                      if (res.status === 200) {
                        setSubmitting(false);
                        logIn(res.data.token);
                        setUser(res.data.user);
                        onClose();
                        toast.success(res.data.msg);
                      }
                    })
                    .catch((err) => {
                      setSubmitting(false);
                      toast.error(err.response.data.msg);
                    })
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-box mb--20">
                      <label className="mb-2 block font-medium text-black dark:text-white">
                        Email
                      </label>
                      <input
                        name='email'
                        type="text"
                        placeholder="Enter your email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.email && errors.email && (
                        <div className='text-warning text-[13px] mt-2'>{errors.email}</div>
                      )}
                    </div>
                    <div className="input-box mb--20">
                      <label className="mb-2 block font-medium text-black dark:text-white">
                        Password
                      </label>
                      <input
                        name='password'
                        type="password"
                        placeholder="Enter Password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.password && errors.password && (
                        <div className='text-warning text-[13px] mt-2'>{errors.password}</div>
                      )}
                    </div>
                    <button
                      className="rn-btn btn w-100 mb--30"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? <div className='flex justify-center items-center'>
                        <div className="h-12 w-12 rounded-full border-4 border-solid border-[#525FE1] border-t-transparent animate-spin"></div>
                      </div>
                        : <span>Login</span>
                      }
                    </button>
                  </form>
                )}
              </Formik>
              <div className='flex justify-center'>
                Don't you have account yet? Please sign up&nbsp;
                <div
                  className='text-primary cursor-pointer underline'
                  onClick={moveToSignUp}
                >
                  here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default SignIn;