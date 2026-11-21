import { Home, Search, Plus, User } from 'lucide-react';

export const sidebarLinks = [
    {
        icon: Home,
        route: "/",
        label: "Home",
    },
    {
        icon: Search,
        route: "/discover",
        label: "Discover",
    },
    {
        icon: Plus,
        route: "/create-podcast",
        label: "Create Podcast",
    },
    {
        icon: User,
        route: "/profile",
        label: "Profile",
    }
]

export const podcastData = [
    {
    id: 1,
    title: "The Joe Rogan Experience",
    description: "A long form, in-depth conversation",
    imgURL:
      "https://picsum.photos/seed/podcast1/400/400",
  },
  {
    id: 2,
    title: "The Futur",
    description: "This is how the news should sound",
    imgURL:
      "https://picsum.photos/seed/podcast12/400/400",
  },
  {
    id: 3,
    title: "Waveform",
    description: "Join Michelle Obama in conversation",
    imgURL:
      "https://picsum.photos/seed/podcast13/400/400",
  },
  {
    id: 4,
    title: "The Tech Talks Daily Podcast",
    description: "This is how the news should sound",
    imgURL:
      "https://picsum.photos/seed/podcast4/400/400",
  },
  {
    id: 5,
    title: "GaryVee Audio Experience",
    description: "A long form, in-depth conversation",
    imgURL:
      "https://picsum.photos/seed/podcast5/400/400",
  },
  {
    id: 6,
    title: "Syntax ",
    description: "Join Michelle Obama in conversation",
    imgURL:
      "https://picsum.photos/seed/podcast6/400/400",
  },
  {
    id: 7,
    title: "IMPAULSIVE",
    description: "A long form, in-depth conversation",
    imgURL:
      "https://picsum.photos/seed/podcast7/400/400",
  },
  {
    id: 8,
    title: "Ted Tech",
    description: "This is how the news should sound",
    imgURL:
      "https://picsum.photos/seed/podcast8/400/400",
  },
]