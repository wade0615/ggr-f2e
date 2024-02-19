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
  const [pcListItems, setPcListItems] = useState([]);
  const [hasMoreCount, setHasMoreCount] = useState(true);
  const [pcPageId, setPcPageId] = useState(0);
  const pcLimit = 5;
  const pcMaxPage = Math.ceil(total / pcLimit);

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

  /** scroll 取得更多資料 */
  const handleScrollFetch = () => {
    getMoreData({ skip: listItems.length, limit: 8 });
  };

  /** pc 顯示 */
  useEffect(() => {
    const pcSkip = pcPageId * pcLimit;
    const pcShowingList = value.slice(pcSkip, pcSkip + pcLimit);
    setPcListItems(pcShowingList);
  }, [value, pcPageId]);

  /** 上一頁 */
  const prevPage = () => {
    if (pcPageId > 0) {
      setPcPageId((prev) => prev - 1);
    }
  };
  /** 下一頁 */
  const nextPage = () => {
    if (
      listItems.length < total &&
      listItems.length < (pcPageId + 1 + 1) * pcLimit
    ) {
      getMoreData({ skip: listItems.length, limit: 5 });
    }
    if (pcPageId + 1 < pcMaxPage) {
      setPcPageId((prev) => prev + 1);
    }
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
      <Media PC>
        <div className="pc-list">
          <header>
            <span onClick={prevPage}>&lt;</span>
            <span>Page</span>
            <span>{pcPageId + 1}</span>
            <span>/</span>
            <span>{pcMaxPage}</span>
            <span onClick={nextPage}>&gt;</span>
          </header>
          <main>
            {pcListItems.length > 0
              ? pcListItems.map((_item, index) => (
                  <div key={_item?.id ?? `list_${index}`} className="item">
                    {pcItemLayout(_item)}
                  </div>
                ))
              : null}
          </main>
          <footer>
            <span onClick={prevPage}>&lt;</span>
            <span>Page</span>
            <span>{pcPageId + 1}</span>
            <span>/</span>
            <span>{pcMaxPage}</span>
            <span onClick={nextPage}>&gt;</span>
          </footer>
        </div>
      </Media>
    </div>
  );
};

export default List;
