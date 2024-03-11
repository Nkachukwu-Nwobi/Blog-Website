import DeleteBtn from "../../components/DeleteBtn";
import EditBtn from "../../components/EditBtn";
import Link from "next/link";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface FeaturedPosts {
  _id: string;
  title: string;
  image: { data: Buffer; contentType: string };
  content: string;
  date: string;
}

interface Images {
  [key: string]: string;
}

export default function FeaturedPosts({ posts }: { posts: FeaturedPosts[] }) {
  //   const [imageSources, setImageSources] = useState<{ [key: string]: string }>({});
  const [imageSources, setImageSources] = useState<Images>({});

  useEffect(() => {
    const loadImageSources = async () => {
      const sources: { [key: string]: string } = {};
      await Promise.all(
        posts.map(async (post) => {
          if (post.image) {
            const base64Image = `data:${
              post.image.contentType
            };base64,${Buffer.from(post.image.data).toString("base64")}`;
            sources[post._id] = base64Image;
          }
        })
      );
      setImageSources(sources);
      console.log("posts", posts);
      console.log("sources", sources);
      console.log("imageSources", imageSources);
    };
    loadImageSources();
  }, [posts]);

  function CustomNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className}`}
        style={{ ...style, display: "block", background: "gray"}}
        onClick={onClick}
      />
    );
  }

  function CustomPrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const styles = {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
  };

  return (
    <div className=" py-8 px-20 ">
      <Slider {...settings}>
        {posts.slice(0, 3).map((post: FeaturedPosts) => (
          <div
            key={post._id}
           
            className="px-10 py-10 border border-black-900 rounded-lg shadow-lg hover:shadow-2xl flex flex-col gap-5"   
          >
            <div 
            // className=" bg-green-500"
            style={ post.image ? { backgroundImage: `url(${imageSources[post._id]})`, backgroundSize: "cover", backgroundPosition: "center", height: "100px" } : { backgroundColor: "red" }}


            >
              <h2 className="font-bold text-2xl ">
                <Link
                  className="text-bold text-black-900 hover:text-black-900/50"
                  href={`/articles/${post._id}`}
                >
                  {post.title}
                </Link>
              </h2>

              <h5 className="mb-5 text-slate-600">
                {new Intl.DateTimeFormat("en-NG", {
                  dateStyle: "long",
                  timeStyle: "short",
                  timeZone: "Africa/Lagos",
                }).format(new Date(post.date))}
              </h5>

              <div className="flex gap-5 ">
                {/* <div className="w-1/2 ">
                <Image src={imageSources[post._id]} alt="Blogpost image" width={270} height={270} priority={true} />
              </div> */}

                <div className="w-1/2">
                  <p>
                    {post.content.slice(0, 330)}...
                    <Link
                      className="text-bold text-black-900 hover:text-black-900/50 text-left"
                      href={`/articles/${post._id}`}
                    >
                      Read More
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pb-0 mb-0">
              <div>
                <EditBtn id={post._id} />
              </div>
              <div>
                <DeleteBtn id={post._id} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
