import "./style.css";
import React, { useState, useEffect } from "react";
import { connect } from  "react-redux";
import { bindActionCreators } from "redux";

// import { getGlobalStatSuggestionsCates, getSuggestions} from "../../api";
import { getPosts, getGlobalStatPostsCates } from "../../api";
import { setTopNavigationActiveLink } from "../../actions/ui.js";
import { setLoading, setPosts, resetState,
         setFiltersCounts, setPaging } from "../../actions/posts.js";

import { message, Spin, Empty , Pagination} from "antd";

import Sidebar from "./Sidebar.jsx";
import Search from "./Search.jsx";
import Post from "./Post.jsx";

export default connect(
    state => {
        return {
            posts: state.posts.posts,
            loading : state.posts.loading,
            filters : state.posts.filters,
            paging : state.posts.paging
        }
    },
    dispatch => {
        return {
            setTopNavigationActiveLink : bindActionCreators(setTopNavigationActiveLink, dispatch),
            setPosts : bindActionCreators(setPosts, dispatch),
            setLoading : bindActionCreators(setLoading, dispatch),
            resetState : bindActionCreators(resetState, dispatch),
            setFiltersCounts : bindActionCreators(setFiltersCounts, dispatch),
            setPaging : bindActionCreators(setPaging, dispatch)
        }
    }
)(props  => {

    let { posts, loading, filters, paging,
        setPosts, setLoading, resetState,
        setTopNavigationActiveLink, setFiltersCounts, setPaging
    } = props;

    const loadPosts = (newPaging) => {

        if(!loading)
            setLoading(true);

        let _paging = newPaging ? newPaging : paging;

        getPosts({ ...{}, ...filters, ..._paging })
            .then(
                result => {
                    setLoading(false);
                    setPosts(result.data);
                },
                error => {
                    setLoading(false);
                    message.error('Произошла ошибка при загрузке списка постов.')
                }
            );

        getGlobalStatPostsCates()
            .then(
                result => {
                    setFiltersCounts(result.data)
                },
                error => {
                    message.error("Произошла ошибка при попытке загрузить информацию о предложенных постах.")
                }
            );

    };

    const onPaging = (pageNumber, pageSize) => {
        setPaging({
            pageNumber : pageNumber -1,
            pageSize
        });
        loadPosts({ pageNumber : pageNumber -1, pageSize });

    };

    useEffect( () => {
        loadPosts();
        setTopNavigationActiveLink('/posts');

        return resetState;
    }, []);

    const onPostAction = () =>{
        loadPosts();
    };

    return(
        <div className="suggestions-page">

            <Sidebar/>

            <div className="list-of-posts">
                {/*<Search/>*/}

                <Spin spinning={loading}>
                    <div className={"posts-list-items-wrapper"}>
                        { posts.length ? posts.map(post => {
                            return (
                                <Post
                                    key={post.id}
                                    {...post}
                                    onAction={onPostAction}
                            />
                            )
                        }) : <Empty/>}
                        <Pagination
                            total={paging.total}
                            showTotal={total => `Всего ${total}`}
                            defaultPageSize={paging.pageSize}
                            current={paging.pageNumber + 1}
                            onChange={onPaging}
                        />
                    </div>
                </Spin>

            </div>
        </div>
    )

});
