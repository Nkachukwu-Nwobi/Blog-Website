import DeleteBtn from "../../components/DeleteBtn";
import EditBtn from "../../components/EditBtn";
import CommentBtn from "@/components/CommentBtn";
import Link from "next/link";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";

interface FeaturedPosts {
  _id: string;
  title: string;
  image: string;
  content: string;
  date: string;
  comments: { content: string; createdAt: string }[];
}

interface Images {
  [key: string]: string;
}

export default function FeaturedPosts({ posts }: { posts: FeaturedPosts[] }) {
  //   const [imageSources, setImageSources] = useState<{ [key: string]: string }>({});
  const [imageSources, setImageSources] = useState<Images>({});

  useEffect(() => {
    console.log("posts", posts)
    
    // const loadImageSources = async () => {
    //   const sources: { [key: string]: string } = {};
    //   await Promise.all(
    //     posts.map(async (post) => {
    //       if (post.image) {
    //         const base64Image = `data:${
    //           post.image.contentType
    //         };base64,${Buffer.from(post.image.data).toString("base64")}`;
    //         sources[post._id] = base64Image;
    //       }
    //     })
    //   );
    //   setImageSources(sources);
     
    // };
    

  }, [posts]);

  function CustomNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={`${className}`}
      style={{ ...style, display: "block", background: "#1e3a8a", borderRadius: "50%" }}
      onClick={onClick}>
        <FaChevronRight size={24} />
      </div>
    );
  }

  function CustomPrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
      className={className}
        style={{ ...style, display: "block", background: "#1e3a8a", borderRadius: "50%" }}
        onClick={onClick}
      >
        <FaArrowLeft size={24} />
        
    </div>
      
    );
  }

  const settings = {
    // centerMode: true,
    infinite: true,
    centerPadding: "20px",
    // slidesToShow: 3,
    speed: 1500,
    // fade: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow  />,
    nextArrow: <CustomNextArrow />,
    autoplay: true, 
    autoplaySpeed: 5000,
    swipeToSlide: true,
    

  };

  return (
    <div className=" py-8 px-8 w-11/12 mx-auto ">

        <div className=" text-3xl mb-4 font-black text-blue-900"><h1>Trending Posts</h1></div>

      <Slider {...settings}>
        {posts.slice(0, 5).map((post: FeaturedPosts) => (
          <Link href={`/articles/${post._id}`}

            key={post._id}
            className=" flex flex-col gap-5 hover:shadow-lg rounded-xl border border-black bg-zinc-400 cursor-pointer "
          > 
            <div
              // className=" bg-green-500"
              style={
                post.image
                  ? {
                      backgroundImage: `url(${post.image})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      height: "30rem",
                      color: "white",
                    }
                  : { backgroundColor: "black", height: "500px", color: "white" }
              }
              className=" rounded-t-xl relative border border-black"
            >
              {/* <div className="overlay absolute inset-0 bg-black opacity-25"></div> */}

              <div className=" bg-black opacity-85 absolute bottom-0 py-6 px-8">
              <div
              style={ { zIndex: 1000}}
               className=" z-10 text-white">

              <h2 className="font-bold text-xl ">
                <Link
                  className="text-bold text-white hover:text-blue-900"
                  href={`/articles/${post._id}`}
                >
                  {post.title}
                </Link>
              </h2>

              <h5 className="mb-5 text-white">
                {new Intl.DateTimeFormat("en-NG", {
                  dateStyle: "long",
                  timeStyle: "short",
                  timeZone: "Africa/Lagos",
                }).format(new Date(post.date))}
              </h5>

              </div>
    
              <div className="w-full text-lg">
                <p>
                  {post.content.slice(0, 330)}.......
                  <Link
                    className="text-bold text-white hover:text-blue-900 text-left"
                    href={`/articles/${post._id}`}
                  >
                    Read more
                  </Link>
                </p>
              </div>

              </div>

              

            </div>

            <div className="flex justify-end gap-3 px-8 py-2 border bg-zinc-400 border-black border-t-0 rounded-b-xl relative">
              <div>
                <EditBtn id={post._id} />
              </div>
              {/* <div>
                <DeleteBtn id={post._id} />
              </div> */}
              <div>
                <CommentBtn post={post} />
                <span className=" absolute bg-blue-900 text-white top-1 right-[2%] text-sm px-1 rounded-[50%]">{post.comments.length}</span>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}
