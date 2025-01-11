import React, { useEffect, useState } from 'react';
import { Calendar, Play, Video, Eye } from 'lucide-react';
import axios from 'axios';
import Navbar from './Navbar';
import PlaylistVideos from './playlistVideo';

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type Playlist = {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      medium: Thumbnail;
    };
    channelTitle: string;
  };
  contentDetails: {
    itemCount: number;
  };
};

type Video = {
  id: string;
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  contentDetails: {
    duration: string;
  };
};

const Playlists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('token');
      if (!accessToken) {
        console.error("Access token not found in URL.");
        return;
      }
      localStorage.setItem('accessToken', accessToken);
      try {
        const response = await axios.get('http://localhost:3000/api/getPlaylist', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setPlaylists(response.data.items || []); // Ensure to set an empty array if no items
        if (response.data.items?.length > 0) {
          setSelectedPlaylistId(response.data.items[0].id);  
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  useEffect(() => {
    if (selectedPlaylistId) {
      const fetchPlaylistVideos = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/getPlaylistItem?playlistId=${selectedPlaylistId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
          });
          setVideos(response.data.items || []); // Ensure videos is set to an empty array if no items
        } catch (error) {
          console.error("Error fetching playlist videos:", error);
        }
      };
      fetchPlaylistVideos();
    }
  }, [selectedPlaylistId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-20 cursor-pointer">
        <div className="mb-12 border-r-black border-r-2 border">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Featured Playlist</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {playlists && playlists.length > 0 ? playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedPlaylistId(playlist.id)}
              >
                <div className="flex md:flex-row flex-col h-full">
                  <div className="relative md:w-2/5 w-full">
                    <img
                      src={playlist.snippet.thumbnails.medium.url}
                      alt={playlist.snippet.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">View Playlist</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                        {playlist.snippet.title}
                      </h2>

                      <div className="inline-flex items-center px-3 py-1 bg-purple-50 text-purple-600 rounded-full mb-4">
                        <Video className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          {playlist.contentDetails.itemCount} 
                          {playlist.contentDetails.itemCount === 1 ? ' video' : ' videos'}
                        </span>
                      </div>

                      {playlist.snippet.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                          {playlist.snippet.description || 'No description available'}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span>{new Date(playlist.snippet.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Play className="w-4 h-4 text-purple-400" />
                        <span className="truncate max-w-[150px]">{playlist.snippet.channelTitle}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div>No playlists available.</div>
            )}
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Playlist Videos</h2>
          {videos && videos.length > 0 ? (
            <PlaylistVideos videos={videos} />
          ) : (
            <div>No videos available in this playlist.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
