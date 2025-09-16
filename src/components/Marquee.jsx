import styled from "styled-components";

export default function AdvancedMarquee({
  text = "🌟 Новинки каждый день! • Высокое качество • ",
  text2 = "Next.js • React • и тд",
  type = "horizontal", // horizontal, vertical, gradient
  speed = 40,
  color = "#ffffff",
  backgroundColor = "transparent",
  height = 120,
  fontSize = 24,
  pauseOnHover = true,
}) {
  const repeatedText = text.repeat(8);
  const repeatedText2 = text2.repeat(8);

  const Section = styled.div`
    height: 5vh;
    scroll-snap-align: center;
    display: flex;
    justify-content: center;
    position: relative;
  `;

  const styles = {
    horizontal: {
      container: {
        width: "100%",
        height: "20vh",
        backgroundColor,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
      },
      content: {
        display: "flex",
        animation: `marquee-horizontal ${speed}s linear infinite`,
        whiteSpace: "nowrap",
      },
    },
    
  
  };

  return (
    <Section>
      <div style={styles[type].container} className={pauseOnHover}>
        <div style={styles[type].content}>
          <span
            style={{
              color,
              fontSize: `${fontSize}px`,
              fontWeight: "bold",
              paddingRight: "40px",
            }}
          >
            {repeatedText}
          </span>
          <span
            style={{
              color,
              fontSize: `${fontSize}px`,
              fontWeight: "bold",
              paddingRight: "40px",
            }}
          >
            {repeatedText}
          </span>
        </div>

        <style jsx>{`
          @keyframes marquee-horizontal {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
        `}</style>
      </div>
   
    </Section>
  );
}