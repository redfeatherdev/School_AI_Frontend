import AboutUs from "pages/About-us";
import Course from 'pages/Course';
import CourseFinalView from "pages/CourseFinalView";
import CourseDetail from 'pages/CourseDetail';
import Contact from 'pages/Contact';

const coreRoutes = [
  {
    path: '/about-us',
    title: 'About Us',
    component: AboutUs
  },
  {
    path: '/course',
    title: 'Course',
    component: Course
  },
  {
    path: '/course/finalview',
    title: 'Course',
    component: CourseFinalView
  },
  {
    path: '/course-details/:id',
    title: 'Course',
    component: CourseDetail
  },
  {
    path: '/contact',
    title: 'Contact',
    component: Contact
  }
]

const routes = [...coreRoutes];
export default routes;