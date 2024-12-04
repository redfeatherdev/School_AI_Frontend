import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'sonner';

const SignUp = ({ isOpen, onClose, moveToSignIn }: {
    isOpen: boolean,
    onClose: () => void,
    moveToSignIn: () => void
}) => {

    return (
        isOpen && (
            <div
                className="fixed left-0 top-0 z-[100] flex h-full min-h-screen w-full items-center justify-center px-4 py-4 bg-black/85 cursor-pointer"
                onClick={onClose}
            >
                <div
                    className={`login-register-page-wrapper bg-color-white w-full max-w-[600px] ${isOpen ? 'is-open' : ''}`}
                    onClick={(e) => { e.stopPropagation(); }}
                >
                    <div className="checkout-page-style">
                        <div className="login-form-box">
                            <div>
                                <h3 className="text-center mb--30">Register</h3>
                            </div>
                            <Formik initialValues={{
                                name: '',
                                email: '',
                                role: '',
                                password: '',
                                confirmPassword: '',
                                submit: null
                            }}
                                validationSchema={Yup.object().shape({
                                    name: Yup.string().max(255).required('Username is required'),
                                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                    role: Yup.string().max(255).required('Role is required'),
                                    password: Yup.string().min(6, 'Password must be at least 6 characters').max(255).required('Password is required'),
                                    confirmPassword: Yup.string()
                                        .oneOf([Yup.ref('password'), undefined], 'Password must match')
                                        .required('Confirm password is required')
                                })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    const formData = new FormData();
                                    formData.append('name', values.name);
                                    formData.append('email', values.email);
                                    formData.append('role', values.role);
                                    formData.append('password', values.password);
                                    formData.append('confirmPassword', values.confirmPassword);
                                    await axios({
                                        method: 'post',
                                        url: `${import.meta.env.VITE_API_URL}/api/v1/auth/signup`,
                                        data: formData,
                                        headers: { 'Content-Type': 'multipart/form-data' }
                                    }).then((res) => {
                                        if (res?.status === 200) {
                                            setSubmitting(false);
                                            onClose();
                                            toast.success(res.data.msg);
                                        }
                                    }).catch((err) => {
                                        setSubmitting(false);
                                        toast.error(err.response.data.error);
                                    })
                                }}>
                                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <form noValidate className="login-form" onSubmit={handleSubmit}>
                                        <div className="input-box mb--20">
                                            <label className="mb-2 block font-medium text-black dark:text-white">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name='name'
                                                placeholder="Enter your username"
                                                value={values.name}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.name && errors.name && (
                                                <div className='text-warning text-[13px] mt-2'>{errors.name}</div>
                                            )}
                                        </div>
                                        <div className="input-box mb--20">
                                            <label className="mb-2 block font-medium text-black dark:text-white">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                name='email'
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
                                                Role
                                            </label>
                                            <select
                                                name='role'
                                                value={values.role}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            >
                                                <option label="Select your role" />
                                                <option value="teacher" label="Teacher" />
                                                <option value="student" label="Student" />
                                            </select>
                                            {touched.role && errors.role && (
                                                <div className='text-warning text-[13px] mt-2'>{errors.role}</div>
                                            )}
                                        </div>
                                        <div className="input-box mb--20">
                                            <label className="mb-2 block font-medium text-black dark:text-white">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name='password'
                                                placeholder="Enter Password"
                                                value={values.password}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.password && errors.password && (
                                                <div className='text-warning text-[13px] mt-2'>{errors.password}</div>
                                            )}
                                        </div>
                                        <div className="input-box mb--30">
                                            <label className="mb-2 block font-medium text-black dark:text-white">
                                                Confirm Password
                                            </label>
                                            <input
                                                name='confirmPassword'
                                                type="password"
                                                placeholder="Confirm your Password"
                                                value={values.confirmPassword}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.confirmPassword && errors.confirmPassword && (
                                                <div className='text-warning text-[13px] mt-2'>{errors.confirmPassword}</div>
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
                                                : <span>Register</span>
                                            }
                                        </button>
                                    </form>
                                )}
                            </Formik>
                            <div className='flex justify-center'>
                                If you have already account, please sign in&nbsp;
                                <div
                                    className='text-primary cursor-pointer underline'
                                    onClick={moveToSignIn}
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

export default SignUp;