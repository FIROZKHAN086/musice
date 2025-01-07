import React ,{useState , useRef, useEffect} from 'react'


const App = () => {
  const [isLoding, setIsLoding] = useState(true)
  const [search, setSearch] = useState('')
  const [track, setTrack] = useState([]);
  const audioRef = useRef(null);

    const getTrack = async () => {
        alert("NOW API DOES NOT WORK I Fix It")
        setIsLoding(true)
        const data = await fetch(`https://v1.nocodeapi.com/firozkhan/spotify/qWRohdTKlJPOMwps/search?q=${search === ""?"Trending":search }&type=track`);
        const convert = await data.json();
        console.log(convert.tracks.items);
        setTrack(convert.tracks.items);
        setIsLoding(false)
      };
      const handlePlay = (audioElement) => {
        if (audioRef.current && audioRef.current !== audioElement) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        audioRef.current = audioElement;
    };
    useEffect(() => {
      getTrack()
    }, [])
    
      return (
    <div>
      <nav className="bg-white shadow-md w-screen">
            <div className="container mx-auto px-4 py-2 flex justify-between gap-x-3  items-center">
                <a href="#" className="text-xl font-bold text-gray-800">
                    F-MUSIC
                </a>
                <div className=" flex space-x-4">
                    <input
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        className="border-2 rounded-lg p-2 w-[50%]"
                        type="search"
                        placeholder="Enter Song Name"
                    />
                    <button onClick={getTrack} className='bg-gray-900 text-white px-2 font-semibold py-0 rounded-xl' >Search</button>

                </div>
                
            </div>
        </nav>

        <div className="p-4">
        <div className={`flex items-center justify-center ${isLoding?'':'hidden'}`}>
  <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
  <p className='capitalize'> Search The Song </p>
  <span className="sr-only">Loading...</span>
</div>
            
            <div className="mt-4 grid gap-6  md:grid-cols-2 lg:grid-cols-3">
                {track.map((elem, index) => {
                    return (
                        <div key={index} className="bg-white  rounded shadow-xl shadow-black overflow-hidden">
                            <img 
                                src={elem.album.images[0].url} 
                                alt={elem.album.name} 
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h1 className="text-lg font-bold mb-2">{elem.album.name}</h1>
                                <p className="text-gray-600 mb-4">Artist: {elem.artists[0].name}</p>
                                <audio
                                    useRef={audioRef} 
                                    src={elem.preview_url} 
                                    onPlay={(e) => handlePlay(e.target)}
                                    controls 
                                    className="w-full mt-2 shadow-lg shadow-black px-3 py-2 rounded-lg"
                                ></audio>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        <footer className='w-screen text-center py-3 relative bottom-0'>
          <h2 className='font-bold'>&copy;2025 || All Right Rigerved By FIROZKHAN </h2>
        </footer>
    </div>
  )
}

export default App