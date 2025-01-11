import { Menu, Search, Bell, User, Youtube } from 'lucide-react';

const Navbar = () => (
  <nav className="bg-white shadow-md fixed w-full top-0 z-50">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Menu className="w-6 h-6 text-gray-600 cursor-pointer hover:text-purple-600 transition-colors" />
          <div className="flex items-center space-x-2">
            <Youtube className="w-8 h-8 text-red-600" />
            <span className="text-xl font-bold text-gray-800">YouTube PlayList</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search playlists..."
              className="w-64 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-purple-600 transition-colors" />
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
