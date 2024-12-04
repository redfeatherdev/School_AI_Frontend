import { useState } from "react";

const CourseBar = () => {
  const filterKeywords = [
    {
      name: 'All',
      value: 0
    },
    {
      name: 'Popularity',
      value: 1
    },
    {
      name: 'Most Recent',
      value: 2
    }
  ];
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<number>(0);

  return (
    <div className="flex justify-between">
      <div className="edu-search-box-wrapper text-start text-md-end">
        <div className="edu-search-box">
          <form action="#">
            <input
              type='text'
              name='searchbycourse'
              id='searchbycourse'
              placeholder='Search Course...'
              className="search-input"
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
            />
            <button className="search-button">
              <i className="icon-search-line"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="button-group isotop-filter filters-button-group d-flex justify-content-start justify-content-lg-end">
        {
          filterKeywords?.map((item, index) => (
            <button
              key={index}
              className={filter === index ? 'is-checked' : ''}
              onClick={() => { setFilter(index) }}
            >
              {item.name}
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default CourseBar;