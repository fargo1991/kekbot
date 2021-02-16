import "./style.css";
import React, { useState, useEffect } from "react";
import { connect } from  "react-redux";
import { bindActionCreators } from "redux";

import { getGlobalStatSuggestionsCates, getSuggestions} from "../../api";
import { setTopNavigationActiveLink } from "../../actions/ui.js";
import { setSuggestions, setSuggestionsLoading, resetState,
         setFiltersCounts, setPaging } from "../../actions/suggestions.js";

import { message, Spin, Empty , Pagination} from "antd";

import Sidebar from "./Sidebar.jsx";
import Search from "./Search.jsx";
import Suggestion from "./Suggestion.jsx";

export default connect(
    state => {
        return {
            suggestions: state.suggestions.suggestions,
            loading : state.suggestions.loading,
            filters : state.suggestions.filters,
            paging : state.suggestions.paging
        }
    },
    dispatch => {
        return {
            setTopNavigationActiveLink : bindActionCreators(setTopNavigationActiveLink, dispatch),
            setSuggestions : bindActionCreators(setSuggestions, dispatch),
            setSuggestionsLoading : bindActionCreators(setSuggestionsLoading, dispatch),
            resetState : bindActionCreators(resetState, dispatch),
            setFiltersCounts : bindActionCreators(setFiltersCounts, dispatch),
            setPaging : bindActionCreators(setPaging, dispatch)
        }
    }
)(props  => {

  let { suggestions, loading, filters, paging,
        setSuggestions, setSuggestionsLoading, resetState,
        setFiltersCounts, setPaging } = props;

  const loadSuggestions = (newPaging) => {

      if(!loading)
          setSuggestionsLoading(true);

      let _paging = newPaging ? newPaging : paging;

      getSuggestions({ ...{}, ...filters, ..._paging })
          .then(
              result => {
                  setSuggestions(result.data);
                  setSuggestionsLoading(false);
              },
              error => {
                  message.error("Произошла ошибка при попытке загрузить предложенные посты.");
                  setSuggestionsLoading(false);
              }
          );

      getGlobalStatSuggestionsCates()
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
    loadSuggestions({ pageNumber : pageNumber -1, pageSize });

  };

  useEffect( () => {
    loadSuggestions();
    props.setTopNavigationActiveLink("/suggestions");

    return resetState
  }, []);

  return(
    <div className="suggestions-page">

        <Sidebar/>

        <div className="list-of-suggestions">
            {/*<Search/>*/}

            <Spin spinning={loading}>
                <div className={"suggestions-list-items-wrapper"}>
                    { suggestions.length ? suggestions.map(suggestion => {
                        return (
                            <Suggestion
                                key={suggestion.id}
                                {...suggestion}
                                onAction={loadSuggestions}/>
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
