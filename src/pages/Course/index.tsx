import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import CryptoJS from "crypto-js";

import SEO from "components/common/SEO";
import Breadcrumb from "components/common/Breadcrumb";
import CourseBar from "../../components/Course/CourseBar";
import OutlineGenerationModal from "components/Course/OutlineGenerationModal";
import OutlineModal from 'components/Course/OutlineModal';
import CourseItem from "components/Course/CourseItem";

import { useAuthStore, useCourseStore } from "store";

const Course = () => {
  const { isAuthenticated } = useAuthStore() as { isAuthenticated: boolean }
  const { isLoading, setIsLoading, courses, setCourses } = useCourseStore() as {
    isLoading: boolean,
    setIsLoading: (state: boolean) => void,
    courses: any,
    setCourses: (courses: any) => void
  };
  const [isOpenOutlineGenerationModal, setIsOpenGenerationModal] = useState<boolean>(false);
  const [isOpenOutlineModal, setIsOpenOutlineModal] = useState<boolean>(false);

  const decryptData = async (encryptedBase64: string) => {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedBase64, import.meta.env.VITE_ENCRYPTION_KEY);
      const str = decrypted.toString(CryptoJS.enc.Utf8);

      if (str.length > 0) {
        return str;
      } else {
        console.error('Decryption resulted in an empty string.');
        return 'Decryption error: empty result';
      }
    } catch (error) {
      console.error('Error during decryption:', error);
      return 'Decryption error: invalid data';
    }
  };

  const fetchAllCourses = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/course/get-courses`);

      const decryptedCourses = await Promise.all(
        res.data.courses.map(async (course: any) => {
          const decryptedCourse = await decryptData(course.course);
          return {
            ...course,
            decryptedCourse
          };
        })
      );

      setCourses(decryptedCourses);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to fetch courses.");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <>
      <SEO title="Course" />
      <Breadcrumb
        title="Course"
        rootUrl="/"
        parentUrl="Home"
        currentUrl="Course" />
      <div className="edu-course-area edu-section-gap bg-color-white">
        <div className="container">
          {!isLoading && <div className={`flex mb-5 ${courses.length === 0 ? "justify-center" : "justify-end"}`}>
            <button
              className="flex items-center gap-2 bg-[#5c5ddf] text-white px-5 py-4 rounded-lg shadow-md hover:bg-[#4a4bac] active:bg-[#343577] transition ease-in-out duration-300"
              onClick={() => {
                if (!isAuthenticated) {
                  toast.error("You are not logged in. Please login first!")
                } else {
                  setIsOpenGenerationModal(true)
                }
              }}
            >
              <svg
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Course Generation
            </button>
          </div>
          }
          {isLoading ? <div className="flex justify-center items-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#525FE1] border-t-transparent"></div>
          </div> : courses.length === 0 ? (
            <div className="flex justify-center">
              <span>No Courses Found</span>
            </div>
          ) : (
            <div>
              <CourseBar />
              <div className="row g-5 mt--10">
                {courses.map((course: any, index: number) => (
                  <div className="col-12 col-sm-6 col-lg-4" key={index}>
                    <CourseItem key={index} id={course.id} prompt={course.prompt} data={course.decryptedCourse} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <OutlineGenerationModal
        isOpen={isOpenOutlineGenerationModal}
        moveToOutlineModal={() => {
          setIsOpenGenerationModal(false);
          setIsOpenOutlineModal(true);
        }}
        onClose={() => { setIsOpenGenerationModal(false) }}
      />
      <OutlineModal
        isOpen={isOpenOutlineModal}
        onClose={() => { setIsOpenOutlineModal(false) }}
      />
    </>
  )
}

export default Course;
