import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LikeState = {
  likedProjects: number[]
  toggleLike: (projectId: number) => void
}

export const useLikeStore = create<LikeState>()(
  persist(
    (set) => ({
      likedProjects: [],
      toggleLike: (projectId) =>
        set((state) => ({
          likedProjects: state.likedProjects.includes(projectId)
            ? state.likedProjects.filter((id) => id !== projectId)
            : [...state.likedProjects, projectId],
        })),
    }),
    {
      name: 'like-storage', // local storage'daki key
    }
  )
)