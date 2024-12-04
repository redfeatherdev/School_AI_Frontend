import { useEffect, useState } from "react";
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as darkStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AiOutlineCheck } from 'react-icons/ai';
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from 'axios';

import SEO from "components/common/SEO";
import Breadcrumb from "components/common/Breadcrumb";

import { useCourseStore } from "store";
import { toast } from "sonner";

type ChapterData = {
  subchapters: { title: string, content: { content: string, image_urls: [] } }[];
};

const customRenderers: Components = {
  h1: ({ node, ...props }) => <h1 style={{ color: 'blue', fontSize: '3rem' }} {...props} />,
  h2: ({ node, ...props }) => <h2 style={{ fontSize: '2.5rem', paddingBottom: '0.5rem' }} {...props} />,
  h3: ({ node, ...props }) => <h3 style={{ fontSize: '2.25rem', marginBottom: 10 }} {...props} />,
  h4: ({ node, ...props }) => <h4 style={{ fontSize: '2rem', marginBottom: 10 }} {...props} />,
  p: ({ node, ...props }) => <p style={{ fontSize: '1.5rem', lineHeight: '1.8', margin: 5 }} {...props} />,

  code({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) {
    const match = /language-(\w+)/.exec(className || '');
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (code: string) => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return !inline && match ? (
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <SyntaxHighlighter
          style={darkStyle}
          language={match[1]}
          PreTag="div"
          customStyle={{
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: 'black',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
        <button
          onClick={() => copyToClipboard(String(children).replace(/\n$/, ''))}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: '#4f4f4f',
            color: '#ccc',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          {copied ? (
            <div className="flex gap-2 items-center">
              <AiOutlineCheck size={16} color="#ccc" />
              <span className="pt-1">Copied</span>
            </div>
          ) : (
            <div className="flex gap-2">
              <svg
                fill="#ccc"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 115.77 122.88"
                xmlSpace="preserve"
                width="14"
                height="14"
              >
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
                    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
                    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02
                    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86
                    c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96
                    L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02
                    c-0.91,0-1.75,0.39-2.37,1.01c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37
                    c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02
                    h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01
                    h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02
                    c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02v0.02c0.91,0,1.75-0.39,2.37-1.01
                    c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"/>
                </g>
              </svg>
              <span className="pt-1">Copy</span>
            </div>
          )}
        </button>
      </div>
    ) : (
      <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>
        {children}
      </code>
    );
  },

  a: ({ node, ...props }) => (
    <a href={props.href} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', fontSize: '1.4rem' }}>
      {props.children}
    </a>
  ),

  img: ({ src, alt }) => (
    <img src={src} alt={alt} style={{ maxWidth: '100%', borderRadius: '8px' }} />
  )
};

const CourseDetail = () => {
  const params = useParams();
  const { course, setCourse } = useCourseStore() as { course: any, courses: any, setCourse: (course: any) => void };

  const [chapterName, setChapterName] = useState<string>("");
  const [subchapterName, setSubchapterName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

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

  const getCourseById = async (id: number) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/course/get-course/${id}`);
      if (res.status === 200) {
        const decryptedCourse = await decryptData(res.data.course.course);
        setCourse(JSON.parse(decryptedCourse));
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    if (params.id) {
      const courseId = parseInt(params.id);
      getCourseById(courseId);
    }
  }, [params]);

  useEffect(() => {
    if (course) {
      Object.entries(course as Record<string, ChapterData>).map(([chapterName, chapterData], chapterIndex) => {
        {
          const subChapterLength = chapterData.subchapters.length;
          chapterData.subchapters.map((subchapter, subchapterIndex) => {
            if ((subchapterIndex + (chapterIndex) * subChapterLength + 1) === currentIndex) {
              setChapterName(chapterName);
              setSubchapterName(`Course ${subchapterIndex + 1}: ${subchapter.title}`);
              setContent(subchapter.content.content);
            }
          })
          setTotalPageCount(Object.entries(course).length * chapterData.subchapters.length);
        }
      });
    }
  }, [currentIndex, course]);

  return (
    <>
      <SEO title="Course" />
      <Breadcrumb
        title="Course Detail"
        rootUrl="/"
        parentUrl="Home"
        currentUrl="Course Detail" />
      <div className="edu-course-area edu-section-gap bg-color-white">
        <div className="px-20 grid grid-cols-12 space-x-5">
          <div className="col-span-3 bg-white shadow-lg rounded-lg px-5 py-20">
            {
              course && Object.entries(course as Record<string, ChapterData>).map(([chapterName, chapterData], chapterIndex) => {
                return (
                  <ul key={chapterIndex} className="list-none">
                    <li>
                      <h3 className="text-3xl font-semibold mb-14">{chapterName}</h3>
                      <ul className="list-none">
                        {chapterData.subchapters.map((subchapter, subchapterIndex) => {
                          const subchapterLength = chapterData.subchapters.length;
                          return (
                            <li key={subchapterIndex}>
                              <div
                                key={subchapterIndex}
                                className={`flex items-center cursor-pointer hover:bg-gray-200 px-4 py-3 rounded-md ${currentIndex === (subchapterIndex + (chapterIndex) * subchapterLength + 1) ? 'bg-gray-200' : ''}`}
                                onClick={(e) => {
                                  setCurrentIndex((subchapterIndex + (chapterIndex) * subchapterLength + 1));
                                }}
                              >
                                Course {subchapterIndex + 1}: {subchapter.title}
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  </ul>
                )
              })
            }
          </div>
          <div className="col-span-9 bg-white shadow-lg rounded-lg px-5 py-20">
            <h2 className="text-5xl font-bold mb-14 text-blue-600">{chapterName}</h2>
            <h3 className="text-4xl font-semibold mb-10">{subchapterName}</h3>

            <div className="space-y-6">
              <ReactMarkdown components={customRenderers}>
                {content}
              </ReactMarkdown>

              <div className="flex justify-between items-center mt-5">
                <button
                  onClick={() => { setCurrentIndex(currentIndex - 1) }}
                  disabled={currentIndex === 1}
                  className="h-[40px] bg-[#5c5ddf] text-white px-4 rounded-lg hover:bg-[#4a4bac] active:bg-[#343577] disabled:bg-gray-300 transition ease-in-out duration-300"
                >
                  &lt; Previous
                </button>
                <span>{currentIndex} / {totalPageCount}</span>
                <button
                  onClick={() => { setCurrentIndex(currentIndex + 1) }}
                  disabled={currentIndex === totalPageCount}
                  className="h-[40px] bg-[#5c5ddf] text-white px-4 rounded-lg hover:bg-[#4a4bac] active:bg-[#343577] disabled:bg-gray-300 transition ease-in-out duration-300"
                >
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetail;
