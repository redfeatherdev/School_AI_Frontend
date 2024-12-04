import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { useCourseStore } from "store";
import Switcher from '../../../components/common/Switcher';

const OutlineGenerationModal = ({ isOpen, onClose, moveToOutlineModal }: { isOpen: boolean, onClose: () => void, moveToOutlineModal: () => void }) => {
  const { setOutline } = useCourseStore() as { setOutline: (outline: any) => void };
  const [isLoading, setLoading] = useState<boolean>(false);
  const [outlineInput, setOutlineInput] = useState({
    prompt: "",
    chapterCount: 1,
    subchapterCount: 1,
    isImageChecked: false,
    isVoiceChecked: false,
    isVideoChecked: false,
  });

  const updateOutline = (field: string, value: any) => {
    setOutlineInput(prevOutline => ({
      ...prevOutline,
      [field]: value,
    }));
  };

  const generateOutline = async () => {
    if (outlineInput.prompt === '') {
      toast.warning("Please input prompt!");
    } else {
      setLoading(true);
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/course/generate-outline`, {
          prompt: outlineInput.prompt,
          chapterCount: outlineInput.chapterCount,
          subchapterCount: outlineInput.subchapterCount,
          image: outlineInput.isImageChecked,
          voice: outlineInput.isVoiceChecked,
          video: outlineInput.isVideoChecked
        });

        if (res.status === 200) {
          setOutline({
            prompt: outlineInput.prompt,
            image: outlineInput.isImageChecked,
            voice: outlineInput.isVoiceChecked,
            video: outlineInput.isVideoChecked,
            data: res.data
          });
          setLoading(false);
          moveToOutlineModal();
        }
      } catch (err) {
        setLoading(false);
        onClose();
        toast.error("Outline generation is failed");
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <div
        className="fixed left-0 top-0 z-[100] flex h-full min-h-screen w-full items-center justify-center px-4 py-4 bg-black/85 cursor-pointer"
        onClick={onClose}
      >
        <div
          className="w-full max-w-[600px] rounded-xl bg-white px-8 py-12 text-center md:px-12.5 md:py-20 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-5xl text-black font-bold">Course Outline Generation</span>

          <textarea
            placeholder="Describe what you want to learn..."
            className="mt-5 py-3"
            rows={5}
            value={outlineInput.prompt}
            onChange={(e) => updateOutline('prompt', e.target.value)}
          />

          <div className="flex flex-col mt-5 items-start px-4">
            <div className="w-full grid grid-cols-7 sm:grid-cols-5 gap-3 items-center">
              <div className="font-medium col-span-2 sm:col-span-1 flex justify-start">
                <span>Chapters:</span>
              </div>
              <input
                type="number"
                className="col-span-5 xs:col-span-4 sm:col-span-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-300"
                value={outlineInput.chapterCount}
                onChange={(e) => updateOutline('chapterCount', Number(e.target.value))}
                min="1"
              />
            </div>

            <div className="w-full grid grid-cols-7 sm:grid-cols-5 gap-3 items-center mt-3">
              <div className="font-medium col-span-2 sm:col-span-1 flex justify-start">
                <span>Subchapters:</span>
              </div>
              <input
                type="number"
                className="col-span-5 xs:col-span-4 sm:col-span-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-300"
                value={outlineInput.subchapterCount}
                onChange={(e) => updateOutline('subchapterCount', Number(e.target.value))}
                min="1"
              />
            </div>

            <div className="mt-5 flex gap-5">
              <div className="flex items-center gap-3">
                <span>Image</span>
                <Switcher
                  enabled={outlineInput.isImageChecked}
                  setEnabled={(state) => updateOutline('isImageChecked', state)}
                />
              </div>
              <div className="flex items-center gap-3">
                <span>Voice</span>
                <Switcher
                  enabled={outlineInput.isVoiceChecked}
                  setEnabled={(state) => updateOutline('isVoiceChecked', state)}
                />
              </div>
              <div className="flex items-center gap-3">
                <span>Video</span>
                <Switcher
                  enabled={outlineInput.isVideoChecked}
                  setEnabled={(state) => updateOutline('isVideoChecked', state)}
                />
              </div>
            </div>

            <div className="w-full mt-5">
              <button
                className="w-full h-[50px] bg-[#5c5ddf] text-white px-5 rounded-lg hover:bg-[#4a4bac] active:bg-[#343577] disabled:bg-gray-300 transition ease-in-out duration-300"
                onClick={generateOutline}
                disabled={isLoading}
              >
                {isLoading ? <div className="flex justify-center items-center">
                  <div className="h-10 w-10 rounded-full border-3 border-solid border-[#525FE1] border-t-transparent animate-spin"></div>
                </div> : <span>Generate</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default OutlineGenerationModal;
