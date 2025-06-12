import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import PostCard from "./PostCard";
import { fetchPosts } from "../../features/Post/PostSlice";
import { fetchUsers } from "../../features/user/UsersSlice";
import '../../CSS/PostsList.css'
import { Toaster } from 'react-hot-toast';
import { selectAllUsers, selectAllUsersStatus, selectAllUsersError } from "../../features/user/UsersSlice";
import { selectAllPosts, selectAllPostsStatus, selectAllPostsError } from "../../features/Post/PostSlice";
import Loading from "../UI/Loading";
import Error from "../UI/Error";


const PostsList = () => {
  
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);
  const auth = useSelector((state) => state.auth);
  const postStatus = useSelector(selectAllPostsStatus);
  const userStatus = useSelector(selectAllUsersStatus);
  const postError = useSelector(selectAllPostsError);
  const usersError = useSelector(selectAllUsersError);
  const dispatch = useDispatch();

  // Fetch users on mount
  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, userStatus]);

  // When users are fetched, pass them to fetchPosts
  useEffect(() => {
  if (userStatus === 'succeeded' && postStatus === 'idle') {
    dispatch(fetchPosts(users));
  }
}, [dispatch, userStatus, postStatus, users]);

const handleRetry = () => {
    if (userStatus === 'failed') {
      dispatch(fetchUsers());
    } else if (postStatus === 'failed') {
      dispatch(fetchPosts(users));
    }
  };

  // Determine error type for better UX
  const getErrorType = () => {
    const error = postError || usersError;
    if (error?.includes('network') || error?.includes('fetch')) {
      return 'network';
    }
    if (error?.includes('401') || error?.includes('unauthorized')) {
      return 'auth';
    }
    if (error?.includes('404') || error?.includes('not found')) {
      return '404';
    }
    return 'general';
  };


  if (userStatus === 'loading' || postStatus === 'loading') return <Loading />;
   if (userStatus === 'failed' || postStatus === 'failed') {
    return (
      <Error 
        error={postError || usersError}
        onRetry={handleRetry}
        type={getErrorType()}
        showDetails={true}
      />
    );
  }
const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  

  return (
    <div>
      <Toaster />
      <div className="posts-container">
        {sortedPosts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
