import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { setFilters, setSuggestions, setSuggestionsLoading,
         setFiltersCounts, resetPaging } from "../../actions/suggestions.js";
import { getSuggestions, getGlobalStatSuggestionsCates } from "../../api";

import { message } from "antd";

import { NEW, ALL, POSTED, DEFERRED, DELETED, initialState } from "../../reducers/suggestions.js";

const filtersList = [
    { key : NEW, text : 'Новые'},
    { key : ALL, text : 'Все'},
    { key : DEFERRED, text : 'Отложенные'},
    { key : POSTED, text : 'В публикациях'},
    { key : DELETED, text : '*Удаленные'},
];

export  default connect(
    state => {
        return {
            filters : state.suggestions.filters,
            filtersCounts : state.suggestions.filtersCounts,
            paging : state.suggestions.paging
        }
    },
    dispatch => {
        return {
            setFilters : bindActionCreators(setFilters, dispatch),
            setFiltersCounts  : bindActionCreators(setFiltersCounts, dispatch),
            setSuggestions : bindActionCreators(setSuggestions, dispatch),
            setSuggestionsLoading : bindActionCreators(setSuggestionsLoading, dispatch),
            resetPaging : bindActionCreators(resetPaging, dispatch)
        }
    })
(props => {

    const { filters, filtersCounts, paging,
            setFilters, setFiltersCounts, setSuggestions,
            setSuggestionsLoading, resetPaging } = props;

    const onSelect = (key) => {

      setFilters({ [key] : true });
      setSuggestionsLoading(true);
      resetPaging();

      getSuggestions( { ...initialState.paging,  [key] : true  })
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
                  setFiltersCounts(result.data);
              },
              error => {
                  message.error("Произошла ошибка при попытке загрузить информацию о предложенных постах.")
              }
          );
    };

    return  (
        <div className={"suggestions-sidebar"}>
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