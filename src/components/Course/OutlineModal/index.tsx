import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io, { Socket } from 'socket.io-client';

import { useCourseStore } from "store";

const OutlineModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const navigate = useNavigate();
  const { outline, setCourse } = useCourseStore() as { outline: any, setCourse: (course: any) => void };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);

  const generateContent = async () => {
    setIsLoading(true);
    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/course/generate-content`, {
      prompt: outline.prompt,
      outline: outline.data,
      image: outline.image,
      voice: outline.voice
    })
  }

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(`${import.meta.env.VITE_API_URL}`);
    }

    const socket = socketRef.current;

    const handleFirstSubchapterCreated = (data: any) => {
      const initialCourseData = {
        [data.chapterName]: {
          title: data.chapterName,
          subchapters: [{
            title: data.subchapterName,
            content: data.content
          }]
        }
      };

      setCourse({ ...initialCourseData });

      navigate("/course/finalview");
      setIsLoading(false);
    }

    socket.on('first_subchapter_created', handleFirstSubchapterCreated);

    return () => {
      socket.off('first_subchapter_created', handleFirstSubchapterCreated);
    };

  }, []);

  return (
    isOpen && (
      <div
        className="fixed left-0 top-0 z-[100] flex h-full min-h-screen w-full items-center justify-center px-4 py-4 bg-black/85 cursor-pointer"
        onClick={onClose}
      >
        <div
          className="w-full max-w-[650px] max-h-[700px] overflow-y-auto rounded-xl bg-white px-8 py-12 text-center md:px-12.5 md:pt-20 md:pb-14 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <span className="text-5xl text-black font-bold">Course Outline for "{outline.prompt}"</span>
          </div>
          <div className="flex flex-col items-start mt-5 px-6 space-y-8">
            {Object.entries(outline.data as Record<string, string[]>).map(([chapterName, subchapters], index: number) => {
              return (
                <div key={index} className="text-left space-y-3">
                  <span className="text-4xl text-black font-bold">
                    {chapterName}
                  </span>
                  <div className="space-y-2 ml-4">
                    {subchapters.map((subchapter: string) => {
                      return (
                        <div key={subchapter} className="flex justify-start">
                          <span className="text-[16px] font-medium text-gray-700">{subchapter}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full mt-4">
            <button
              className="w-full h-[50px] bg-[#5c5ddf] text-white px-5 rounded-lg hover:bg-[#4a4bac] active:bg-[#343577] disabled:bg-gray-300 transition ease-in-out duration-300"
              onClick={generateContent}
              disabled={isLoading}
            >
              {isLoading ? <div className="flex justify-center items-center">
                <div className="h-10 w-10 rounded-full border-3 border-solid border-[#525FE1] border-t-transparent animate-spin"></div>
              </div> : <span>View Final Course</span>}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default OutlineModal;
