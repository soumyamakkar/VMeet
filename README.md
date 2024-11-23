# 📹 Video Calling Application with Face Detection

<p align="center">
  <img src="/images/banner.png" />
</p>

![GitHub Repo stars](https://img.shields.io/github/stars/sleepy-coder-101/video-call?logo=Apache%20Spark&style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/sleepy-coder-101/video-call?logo=Files&style=for-the-badge) ![GitHub issues](https://img.shields.io/github/issues/sleepy-coder-101/video-call?logo=github&style=for-the-badge) ![GitHub forks](https://img.shields.io/github/forks/sleepy-coder-101/video-call?logo=forgejo&style=for-the-badge) ![GitHub last commit](https://img.shields.io/github/last-commit/sleepy-coder-101/video-call?logo=GitHub&style=for-the-badge)

This is a video calling application specifically designed for educational institutions. It provides a platform for conducting online classes with features like face detection-based attendance tracking, user authentication, and role-based access control.

## Features

- User authentication: Users can sign up and log in to the application using their credentials.
- Role-based access control: Users can have either a "Teacher" or "Student" role, which determines their permissions within the application.
- Video calling: Users can join or create video meetings based on their role. Teachers can create and manage meetings, while students can join existing meetings.
- Face detection-based attendance tracking: The application uses the TinyYOLOv2 face detection model to track the presence of participants during the meeting. It calculates the attendance score based on the duration of face detection and the total meeting duration.
- Attendance monitoring: The application provides an attendance monitoring system that grants attendance to students if their attendance score exceeds a predefined threshold (e.g., 50%).
- Meeting summary: After leaving the meeting, users can view their attendance status, attendance score, and other relevant meeting details.

## Technologies Used

- Frontend: ReactJS, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Video SDK: VideoSDK
- Face Detection: TinyYOLOv2
- WebSocket: Socket.IO

## Screenshots

![Homescreen](images/Homescreen.png)
_Homescreen_

![Sign In Screen](images/Sign%20In%20Filled.png)
_Sign In Screen_

![Sign Up Screen](images/Sign%20Up%20Filled.png)
_Sign Up Screen_

![Meeting Summary Screen](images/Meeting%20Summary%20user%201.png)
_Meeting Summary Screen_

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Contact

For any inquiries or questions, please contact [monirul.work.1729@gmail.com](mailto:monirul.work.1729@gmail.com).
