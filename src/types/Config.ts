
import type { RssUrlList } from '$src/types/RssXml';
import type { Usernames } from '$src/types/Socials';

export type Theme = 'dark' | 'light' | 'system' | 'callisto';

export interface SiteConfig {
  title: string, // Website title / name
  source: string, // Link to project source (e.g. on GitHub)
  baseUrl: string, // The URL where the site is hosted
  initialFeeds: RssUrlList, // List of RSS feeds to fetch + show on load
  additionalFeeds: RssUrlList, // List of all available feeds to add to filter dropdown
  defaultTheme: Theme, // Default theme to use if 'system' is not supported
  colorSchemes?: {
    [key: string]: { // Theme name
      [key: string]: string, // Theme values
    }
  }, // Will be converted to CSS variables
  routeLinks: { // List of route links to show in the navbar
    route: string,
    label: string,
    color?: string,
    description?: string,
  }[],
  footerInfo: { // Meta and legal info to display in the footer
    author: string,
    authorSite: string,
    license: string,
    licenseLink: string,
    copyright: boolean,
  },
  githubUser: string, // GitHub username to fetch projects from
  projectComplimentaryData: {
    name: string, // GitHub repo name
    thumbnail: string, // URL to thumbnail image
    featured?: boolean, // If true, project will displayed in large size
  }[],
  postComplimentaryData: { // Optional extra data to attach to posts
    postRef: string, // Post title to attach to
    thumbnail: string, // URL to thumbnail image
  }[],
  contact: {
    name: string, // Full name associated with contact email
    email: string, // Email address to display
    socials: Usernames, // Keyed list of social media usernames
    socialButtonLimit: number, // Number of social links to show, before show-more clicked
    mailerConfig: { // Config for sending mail client-side via emailjs
      service_id: string, // The ID of the service to use
      template_id: string, // The ID of the template to use
      user_id: string, // The users ID / public key
      template_params: {
        [key: string]: string, // And additional template params
      },
    },
    pgpPublicKey: string, // PGP public key to display
  },
  about: {
    intro: string,
    bio: string[],
    picture: string,
  },
};
