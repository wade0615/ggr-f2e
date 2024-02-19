import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Media from "./Media.js";

import "./List.css";

const List = ({
  value = [],
  total,
  mobileItemLayout,
  pcItemLayout,
  getMoreData,
}) => {
  const [listItems, setListItems] = useState([]);
  const [hasMoreCount, setHasMoreCount] = useState(true);

  useEffect(() => {
    setListItems(value);
  }, [value]);

  /* 偵測是否全部筆數 */
  useEffect(() => {
    if (value.length >= total) {
      setHasMoreCount(false);
      return;
    }
    setHasMoreCount(true);
  }, [total, value]);

  const handleScrollFetch = () => {
    getMoreData({ skip: listItems.length, limit: 10 });
  };

  return (
    <div className="list">
      <Media MOBILE>
        <div id="scrollableDiv">
          <InfiniteScroll
            dataLength={listItems.length}
            next={() => handleScrollFetch()}
            hasMore={hasMoreCount}
            loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>已顯示全部項目</b>
              </p>
            }
            scrollableTarget="scrollableDiv" //外層div的id
          >
            {listItems.length > 0 ? (
              listItems.map((_item, index) => (
                <div key={_item?.id ?? `list_${index}`} className="item">
                  {mobileItemLayout(_item)}
                </div>
              ))
            ) : (
              <div>目前沒有任何項目</div>
            )}
          </InfiniteScroll>
        </div>
      </Media>
      <Media PC>pc</Media>
    </div>
  );
};

export default List;
