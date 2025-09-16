import styled from "styled-components";
import Hero from "./components/Hero";
import Who from "./components/Who";
import Works from "./components/Works";
import Contact from "./components/Contact";
import Test from "./components/Test";
import Marquee from "./components/Marquee";
import { Loader } from "@react-three/drei";

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: #3b077bff;

  &::-webkit-scrollbar {
    display: none;
  }
`;
function App() {
  return (
    <Container>
      <Hero />
      <Who />
      <Works />
      <Contact />
      <Marquee />
      <Loader
        containerStyles={{
          background: "rgba(10, 10, 10, 0.95)",
          padding: "30px 40px",
        }}
        innerStyles={{
          width: "300px",
          height: "6px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "3px",
        }}
        barStyles={{
          height: "100%",
          background: "linear-gradient(90deg, #667eea, #764ba2)",
          borderRadius: "3px",
        }}
        dataStyles={{
          color: "#e2e8f0",
          fontSize: "24px",
          fontWeight: "300",
          marginTop: "15px",
        }}
        dataInterpolation={(p) => `Загружаем сцену  ${p.toFixed(0)}%`}
      />
    </Container>
  );
}

export default App;
