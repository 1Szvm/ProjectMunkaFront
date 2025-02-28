import React, { useState } from 'react';
import { SearchForums } from './SearchForums';
import ForumPost from './ForumPost';
import AddPost from '../components/addPost';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() === '') return;

    const post = {
      id: Date.now(),
      text: newPost,
      timestamp: new Date().toLocaleString(),
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <>
       <SearchForums/> 
      {
        // <div className="min-h-screen flex flex-col items-center">
       
        //   <header className="w-full py-5 shadow-md bg-white flex justify-center">
        //     <h1 className="text-4xl text-slate-900 font-semibold tracking-wide">📢 Forum</h1>
        //   </header>

        
        //   <motion.div
        //     className="w-full max-w-2xl p-6 mt-8 bg-white rounded-xl shadow-lg border border-gray-300"
        //     initial={{ opacity: 0, y: -20 }}
        //     animate={{ opacity: 1, y: 0 }}
        //     transition={{ duration: 0.4 }}
        //   >
        //     <form onSubmit={handlePostSubmit} className="flex flex-col space-y-4">
        //       <textarea
        //         className="w-full text-slate-50 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        //         placeholder="Write something interesting..."
        //         rows="4"
        //         value={newPost}
        //         onChange={(e) => setNewPost(e.target.value)}
        //       />
        //       <motion.button
        //         type="submit"
        //         className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all transform shadow-md"
        //         whileHover={{ scale: 1.05 }}
        //         whileTap={{ scale: 0.95 }}
        //       >
        //         Post
        //       </motion.button>
        //     </form>
        //   </motion.div>

        
        //   <div className="w-full max-w-2xl mt-6 px-4">
        //     <AnimatePresence>
        //       {posts.length > 0 ? (
        //         posts.map((post) => (
        //           <motion.div
        //             key={post.id}
        //             className="bg-white p-6 rounded-lg shadow-md mb-4 border-l-4 border-blue-500 transition-all hover:shadow-xl"
        //             initial={{ opacity: 0, y: 10 }}
        //             animate={{ opacity: 1, y: 0 }}
        //             exit={{ opacity: 0, y: -10 }}
        //             transition={{ duration: 0.3 }}
        //           >
        //             <p className="text-gray-700 text-lg">{post.text}</p>
        //             <span className="text-sm text-gray-500 block mt-2">{post.timestamp}</span>
        //           </motion.div>
        //         ))
        //       ) : (
        //         <motion.p
        //           initial={{ opacity: 0 }}
        //           animate={{ opacity: 1 }}
        //           transition={{ delay: 0.3, duration: 0.5 }}
        //           className="text-center text-gray-600 mt-4 italic"
        //         >
        //           No posts yet. Be the first to share something! 🚀
        //         </motion.p>
        //       )}
        //     </AnimatePresence>
        //   </div>

        //   {/* Footer */}
        //   <div className="mt-auto w-full">
        //     <Footer />
        //   </div>
        // </div>
      }
      <ForumPost/>
      <AddPost/>
    </>
  );
};

export default Forum;
