const PlaylistVideos = ({ videos }: { videos: any[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {videos.map((video) => (
        <div 
          key={video.id}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative">
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full aspect-video object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {video.contentDetails.duration}
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">
              {video.snippet.title}
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-500">
              {/* <span>{video.statistics.viewCount} views</span> */}
              <span>{new Date(video.snippet.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
  export default PlaylistVideos;
  