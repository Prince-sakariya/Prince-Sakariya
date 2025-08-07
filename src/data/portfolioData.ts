import { TimelineEntry, Project, ContactMethod } from '../types';

export const timelineData: TimelineEntry[] = [
  {
    id: 'thws',
    date: '10.2021 - Present',
    title: 'THWS',
    role: 'Bachelor of Engineering in Mechatronics',
    tags: ['Automation', 'Robotics', 'C++'],
    type: 'education'
  },
  {
    id: 'bosch-working-student',
    date: '03.2025 - Present',
    title: 'Bosch - Working Student',
    role: 'Reliability Engineering of Brake Control System',
    tags: ['Automotive', 'Python', 'CI/CD'],
    type: 'work'
  },
  {
    id: 'bosch-internship',
    date: '09.2024 - 03.2025',
    title: 'Bosch - Internship',
    role: 'Reliability Engineering of Brake Control System',
    tags: ['Software', 'Hardware', 'OOP'],
    type: 'work'
  }
];

export const projectsData: Project[] = [
  {
    id: 'autonomous-robot',
    title: 'Autonomous Mobile Robot',
    awards: {
      title: 'Best Robotics Project, 2023',
      description: 'University Robotics Competition'
    },
    services: ['SLAM', 'Computer Vision', 'Path Planning'],
    about: 'Developed a fully autonomous mobile robot using ROS2, implementing SLAM navigation, computer vision for object detection, and advanced path planning algorithms. The robot successfully navigates complex environments while avoiding obstacles.',
    media: {
      mainImage: 'https://placehold.co/600x400?text=Robot+Image',
      mainImageCaption: 'Robot in action',
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
      videoPoster: 'https://placehold.co/600x400?text=Robot+Video',
      gridImages: [
        'https://placehold.co/300x200?text=Sensor+1',
        'https://placehold.co/300x200?text=Sensor+2',
        'https://placehold.co/300x200?text=Sensor+3'
      ]
    }
  },
  {
    id: 'control-system',
    title: 'Real-time Control System',
    awards: {
      title: 'Innovation Award, 2022',
      description: 'Industrial Automation Expo'
    },
    services: ['Embedded Systems', 'PID Control', 'CAN Bus'],
    about: 'Designed and implemented a real-time control system for industrial automation using ARM Cortex-M4 microcontroller. Features include PID control loops, CAN bus communication, and safety-critical operation with fault detection and recovery mechanisms.',
    media: {
      mainImage: 'https://placehold.co/600x400?text=Control+System',
      mainImageCaption: 'Control System Dashboard',
      video: 'https://www.w3schools.com/html/movie.mp4',
      videoPoster: 'https://placehold.co/600x400?text=Control+Video',
      gridImages: [
        'https://placehold.co/300x200?text=PID+Loop',
        'https://placehold.co/300x200?text=CAN+Bus',
        'https://placehold.co/300x200?text=RTOS'
      ]
    }
  },
  {
    id: 'plc-production',
    title: 'PLC-based Production Line',
    awards: {
      title: 'Automation Excellence, 2021',
      description: 'Smart Factory Awards'
    },
    services: ['SCADA', 'HMI', 'Automation'],
    about: 'Programmed and commissioned a complete production line automation system using Siemens S7-1200 PLCs. The system includes conveyor control, quality inspection, packaging automation, and SCADA monitoring with real-time data visualization.',
    media: {
      mainImage: 'https://placehold.co/600x400?text=Production+Line',
      mainImageCaption: 'Production Line Overview',
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
      videoPoster: 'https://placehold.co/600x400?text=PLC+Video',
      gridImages: [
        'https://placehold.co/300x200?text=SCADA',
        'https://placehold.co/300x200?text=HMI',
        'https://placehold.co/300x200?text=Automation'
      ]
    }
  }
];

export const contactData: ContactMethod[] = [
  {
    id: 'email',
    title: 'Email',
    icon: 'fas fa-envelope',
    url: 'mailto:prince.sakariya.work@gmail.com'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    icon: 'fab fa-linkedin',
    url: 'https://www.linkedin.com/in/prince-sakariya'
  },
  {
    id: 'xing',
    title: 'XING',
    icon: 'fab fa-xing',
    url: 'https://www.xing.com/profile/Prince_Sakariya'
  },
  {
    id: 'github',
    title: 'GitHub',
    icon: 'fab fa-github',
    url: 'https://github.com/Prince-sakariya'
  }
]; 