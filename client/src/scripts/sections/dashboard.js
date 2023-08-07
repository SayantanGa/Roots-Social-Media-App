import { useEffect, useState } from "react";
import { WritePost, AllPosts } from "../components/posts";
import { nanoid } from "nanoid";
import axios from "axios";

const initialPosts = [
  {
    _id: "64ce0013aca2cea3cd65dba6",
    time: "2023-08-05T07:49:47.186Z",
    fullname: "Captain Anonymous",
    userName: "Captain_Anonymous",
    imgUrl: null,
    edited: true,
    content: "ABCD",
    likings: [
      {
        user: "64c7f059f51deff88c7b4d6f",
        val: 1,
      },
    ],
    comments: 0,
    __v: 0,
  },
];

const template = (userName = "Captain_Anonymous") => {
  const postId = `post_${userName}_${nanoid()}`;
  const time = new Date();
  return {
    userName: userName,
    avatar: "user1.jpg",
    time: time,
    imgUrl: null,
    edited: false,
    postId: postId,
    key: postId,
    content: "",
    likings: [{}],
    comments: 0,
  };
};

function Feed({ Alert, isLoggedIn }) {
  /*******************        POSTS     ******************* */
  const [posts, setPosts] = useState(initialPosts);
  const [submittedData, setSubmittedData] = useState(template());
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("https://roots-social-media-app-api.onrender.com/api/v1/posts")
      .then((res) => {
        setPosts(res.data.data.posts.reverse());
      })
      .catch((err) => {
        Alert(`Error getting posts: ${err.message}`);
      });
  }, [submittedData, editMode, posts]);

  const editPost = (postId) => {
    const post = posts.find((post) => post._id === postId);
    setEditMode(true);
    setSubmittedData(post);
  };

  const sharePost = (formData) => {
    //setPosts((prevPosts) => [formData, ...prevPosts]);
    if (!editMode) {
      axios
        .get("https://roots-social-media-app-api.onrender.com/api/v1/users")
        .then(function (response) {
          axios
            .post(
              "https://roots-social-media-app-api.onrender.com/api/v1/posts",
              {
                userName: response.data.data.user.name,
                content: formData.content,
              }
            )
            .then(function (response) {
              if (response.status === 201) {
                Alert("Post Shared!");
                setSubmittedData(template());
              }
            })
            .catch(function (error) {
              Alert(`${error.message}`);
            });
        })
        .catch(function (error) {
          Alert(`${error.message}`);
        });
    } else {
      axios
        .patch(
          `https://roots-social-media-app-api.onrender.com/api/v1/posts/${formData._id}`,
          {
            content: formData.content,
            edited: true,
          }
        )
        .then(function (response) {
          if (response.status === 200) {
            Alert("Post Edited");
            setSubmittedData(template());
            setEditMode(false);
          }
        })
        .catch(function (error) {
          Alert(`${error.message}`);
        });
    }
  };

  function deletePost(postId) {
    axios
      .delete(
        `https://roots-social-media-app-api.onrender.com/api/v1/posts/${postId}`
      )
      .then(function (response) {
        console.log(response);
        if (response.status === 204) {
          Alert("Post Deleted");
        }
      })
      .catch(function (error) {
        Alert(`${error.message}`);
      });
    //const newPosts = posts.filter((post) => post.postId !== postId);
    //setPosts(newPosts);
  }

  const postModifiers = {
    delete: deletePost,
    share: sharePost,
    edit: editPost,
    setSubmittedData: setSubmittedData,
  };

  /****************************************************** */

  return (
    <div className="conainer dashboard-container page-container">
      <WritePost
        isEdit={editMode}
        formData={submittedData}
        postModifiers={postModifiers}
        template={template}
        isLoggedIn={isLoggedIn}
        Alert={Alert}
      />
      <AllPosts
        posts={posts}
        isLoggedIn={isLoggedIn}
        postModifiers={postModifiers}
      />
    </div>
  );
}

export default function Dashboard({ Alert, isLoggedIn }) {
  return <Feed Alert={Alert} isLoggedIn={isLoggedIn} />;
}
