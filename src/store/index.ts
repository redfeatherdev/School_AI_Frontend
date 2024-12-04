import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(persist(
    (set) => ({
        isAuthenticated: false,
        token: null,
        user: null,

        setAuthenticated: (state: boolean) => set({ isAuthenticated: state }),
        logIn: (token: string) => set({ isAuthenticated: true, token: token }),
        logOut: () => set({ isAuthenticated: false, token: null }),
        setUser: (user: any) => set({ user: user })
    }),
    {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage)
    }
));

const useCourseStore = create(
    (set) => ({
        isLoading: false,
        isGeneratedCourse: false,
        courses: [],
        course: null,
        outline: null,

        setIsLoading: (state: boolean) => set({ isLoading: state }),
        setIsGeneratedCourse: (state: boolean) => set({ isGeneratedCourse: state }),
        setCourses: (courses: any) => set({ courses: courses }),
        setCourse: (course: any) => set({ course: course }),
        setOutline: (outline: any) => set({ outline: outline })
    })
);

export { useAuthStore, useCourseStore }