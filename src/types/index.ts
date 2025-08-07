export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  role: string;
  tags: string[];
  type: 'education' | 'work';
}

export interface Project {
  id: string;
  title: string;
  awards: {
    title: string;
    description: string;
  };
  services: string[];
  about: string;
  media: {
    mainImage: string;
    mainImageCaption: string;
    video: string;
    videoPoster: string;
    gridImages: string[];
  };
}

export interface ContactMethod {
  id: string;
  title: string;
  icon: string;
  url: string;
} 