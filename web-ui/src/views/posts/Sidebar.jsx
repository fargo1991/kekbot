import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { setFilters, setPosts, setLoading,
    setFiltersCounts, resetPaging } from "../../actions/posts.js";
import { getPosts, getGlobalStatPostsCates } from "../../api";

import { message } from "antd";

import { NEW, ALL, POSTED, SCHEDULED, DEFERRED, DELETED, initialState } from "../../reducers/posts.js";

const filtersList = [
    { key : NEW, text : 'Новые'},
    { key : ALL, text : 'Все'},
    { key : SCHEDULED, text : 'Запланированные'},
    { key : DEFERRED, text : 'Отложенные'},
    { key : POSTED, text : 'Опубликованные'},
    { key : DELETED, text : '*Удаленные'},
];

export  default connect(
    state => {
        return {
            filters : state.posts.filters,
            filtersCounts : state.posts.filtersCounts,
            paging : state.posts.paging
        }
    },
    dispatch => {
        return {
            setFilters : bindActionCreators(setFilters, dispatch),
            setFiltersCounts  : bindActionCreators(setFiltersCounts, dispatch),
            setPosts : bindActionCreators(setPosts, dispatch),
            setLoading : bindActionCreators(setLoading, dispatch),
            resetPaging : bindActionCreators(resetPaging, dispatch)
        }
    })
(props => {

    const { filters, filtersCounts, paging,
        setFilters, setFiltersCounts, setPosts,
        setLoading, resetPaging } = props;

    const onSelect = (key) => {

        setFilters({ [key] : true });
        setLoading(true);
        resetPaging();

        getPosts( { ...initialState.paging,  [key] : true  })
            .then(
                result => {
                    setPosts(result.data);
                    setLoading(false);
                },
                error => {
                    message.error("Произошла ошибка при попытке загрузить посты.");
                    setLoading(false);
                }
            );

        getGlobalStatPostsCates()
            .then(
                result => {
                    setFiltersCounts(result.data);
                },
                error => {
                    message.error("Произошла ошибка при попытке загрузить информацию о постах.")
                }
            );
    };

    return  (
        <div className={"posts-sidebar"}>
            <ul>
                {
                    filtersList.map(
                        f => <li key={f.key}
                                 className={filters[f.key] ? "active" : ''}
                                 onClick={ () => { onSelect(f.key) }}>
                            {f.text} ({filtersCounts[f.key.toLowerCase()]})
                        </li>
                    )
                }
            </ul>
        </div>
    )
})