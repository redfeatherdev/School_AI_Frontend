import { useNavigate } from "react-router-dom";
import { useCourseStore } from "store";

const CourseItem = ({ id, prompt, data }: {
  id: number,
  prompt: string,
  data: any
}) => {
  const navigate = useNavigate();
  const { setCourse } = useCourseStore() as { setCourse: (course: any) => void }

  return (
    <div className={`edu-card card-type-2 radius-small`}>
      <div className="inner">
        <div className="thumbnail">
          <div
            className="cursor-pointer hover:scale-105 transition-transform duration-400 overflow-hidden"
            style={{ width: '100%', height: 'auto' }}
            onClick={() => {
              setCourse(JSON.parse(data));
              navigate(`/course-details/${id}`)
            }}
          >
            <img
              className="w-100 transition-transform duration-400 hover:scale-105"
              src={`/images/course/course-0${id % 9}.jpg`}
              alt="Course Thumb"
            />
          </div>
          <div className="wishlist-top-right">
            <button className="wishlist-btn"><i className="icon-Heart"></i></button>
          </div>
        </div>
        <div className="content">
          <div className="card-top">
            <div className="author-meta">
              <div className="author-thumb">
                <div className="flex items-center gap-4">
                  <img
                    src={`images/instructor/instructor-1.jpg`}
                    alt="Author Thumb"
                    className="w-14 h-14 rounded-full"
                  />
                  <span className="author-title">Instructor</span>
                </div>
              </div>
            </div>
            <div className="edu-rating rating-default">
              <div className="rating eduvibe-course-rating-stars">
                <i className="icon-Star"></i>
              </div>
              <span className="rating-count">5.0</span>
            </div>
          </div>
          <h6 className="title">
            <div className="cursor-pointer hover:text-primary" onClick={() => {
              setCourse(JSON.parse(data));
              navigate(`/course-details/${id}`);
            }}>
              {prompt}
            </div>
          </h6>
          <ul className="edu-meta meta-01">
            <li><i className="icon-group-line"></i>763 Students</li>
            <li><i className="icon-file-list-4-line"></i>29 Lessons</li>
          </ul>
          <div className="card-bottom">
            <div className="price-list price-style-01">
              <div className="price current-price">45.55 USD</div>
              <div className="price old-price">55.00 USD</div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default CourseItem;