import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="mb-7 bg-gray-900 text-white">
      <header className="relative flex items-center justify-center bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
        <video
          ref={videoRef}
          src={require("./videoplayback.mp4")}
          className=" border-2 border-t-slate-100"
          style={{
            width: '50%', 
            height: '50%',
            objectFit: 'cover',
          }}
          muted
          autoPlay
          loop
        />
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full"
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </header>

      <main className="px-4 py-7 lg:px-32">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to The President's <span className="text-rose-600">Award</span> - Kenya</h1>
          <p className="text-lg md:text-xl text-gray-300">The President’s Award- Kenya (PA-K) is an Agency established by an Act of Parliament, President’s Award Act No. 30 of 2017. PA-K is an exciting self-development programme available to all young people countrywide equipping them with positive life skills to make a difference for themselves, their communities, country and the world.  </p>
          <br/>
          <p className="text-lg md:text-xl text-gray-300">PA-K, which was launched in Kenya in 1966, is a member of The Duke of Edinburgh’s International Award which oversees the Award Programme in over one hundred and fourty (140) countries. </p>
        </section>

        <section className="flex flex-col lg:flex-row items-center justify-center gap-6">
          <Link to="/signin">
            <button className="bg-rose-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-rose-700 transition">
              Get started <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </Link>
          <Link to="/signin">
            <button className="bg-rose-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-rose-700 transition">
              <i className="fa-solid fa-calendar-days mr-2"></i> See all Events <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </Link>
          <Link to="https://www.presidentsaward.or.ke/contact-us/">
            <button className="bg-rose-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-rose-700 transition">
              Contact Us
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}
