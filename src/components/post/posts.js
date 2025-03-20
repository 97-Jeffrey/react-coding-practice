
import '../../styles/post.css'

const PostList = ({ posts }) =>{
    return (
        <>
           <div className="posts-container">
                {posts.map(post=>(
                        <div key={post.id} className="post">
                            <div className="post-title">{post.title} </div>
                            <div className="post-body">{post.body.slice(0,20)}</div>
                        </div>
                ))
                }
            </div>
        </>
    )

}

export default PostList;