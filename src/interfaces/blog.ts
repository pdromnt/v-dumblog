export interface IPost {
  postTitle: string;
  timestamp: string;
  editedTimestamp: string;
  postContent: string;
  filename: string;
  draft: boolean;
}

export interface IArchive {
  postTitle: string;
  timestamp: string;
  filename: string;
}

export interface ISettings {
  blogTitle: string;
  yourAvatar: string;
  yourName: string;
  yourBio: string;
  yourEmail: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  enableMailMeAt: boolean;
  maxPosts: number;
  showPoweredBy: boolean;
}
