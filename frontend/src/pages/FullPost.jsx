import React, { useState, useEffect } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

import axios from "../axios";

import { useParams } from "react-router-dom";

export const FullPost = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((res) => {
                setIsLoading(false);
                setData(res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert("Ошибка получения статьи");
            });
    }, []);

    if (isLoading) {
        return <Post isLoading={true} isFullPost />;
    }

    return (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={data.imageUrl}
                user={data.user}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentsCount={3}
                tags={data.tags}
                isEditable
            >
                <p>{data.text}</p>
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: "Вася Пупкин",
                            avatarUrl:
                                "https://mui.com/static/images/avatar/1.jpg",
                        },
                        text: "Это тестовый комментарий 555555",
                    },
                    {
                        user: {
                            fullName: "Иван Иванов",
                            avatarUrl:
                                "https://mui.com/static/images/avatar/2.jpg",
                        },
                        text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                    },
                ]}
                isLoading={false}
            >
                <Index />
            </CommentsBlock>
        </>
    );
};
