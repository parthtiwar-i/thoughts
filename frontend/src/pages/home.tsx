import { Pen } from "../components/assets/pen";

const Home = () => {
  return (
    <div>
      <div className="hero w-full h-screen bg-orange-50">
        <h1>Thoughts</h1>
        <p>Your insight matters</p>
        <div className="animation">
          <Pen />
        </div>
      </div>
    </div>
  );
};

export default Home;
