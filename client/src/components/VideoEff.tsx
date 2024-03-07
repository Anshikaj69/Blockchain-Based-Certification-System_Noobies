import React, { useEffect } from 'react';
import styles from "../styles/Home.module.css";

const VideoEff = () => {
  useEffect(() => {
    const bgVideo = document.getElementById('bg-video') as HTMLVideoElement | null;

    if (bgVideo) {
      const handleMouseMove = (event: MouseEvent) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Calculate new background position based on mouse coordinates
        const bgPositionX = (mouseX / window.innerWidth) * 100;
        const bgPositionY = (mouseY / window.innerHeight) * 100;

        // Update background position
        bgVideo.style.backgroundPosition = `${bgPositionX}% ${bgPositionY}%`;
      };

      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <video autoPlay muted loop id="bg-video" className={styles.bgVideo}>
      <source src="background-video.mp4" type="video/mp4"/>
    </video>
  );
};

export default VideoEff;
