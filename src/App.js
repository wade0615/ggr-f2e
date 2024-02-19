import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import List from "./components/List.js";

function App() {
  const [userList, setUserList] = useState([]);
  const [totalNum, setTotalNum] = useState([]);

  const getList = async ({ skip = 0, limit = 10 }) => {
    const list = await axios({
      method: "get",
      url: `https://dummyjson.com/users?skip=${skip}&limit=${limit}`,
    });

    return list?.data;
  };

  useEffect(() => {
    const init = async () => {
      const list = await getList({ skip: 0, limit: 10 });

      setUserList(list?.users);
      setTotalNum(list?.total);
    };

    init();
  }, []);

  /** Mobile 版型 */
  const MobileUserLayout = ({ _user }) => {
    return (
      <div className="mobile-user-layout">
        <header>
          <span>{_user?.firstName}</span>
          <span>{_user?.lastName}</span>
        </header>
        <main>
          <span>{_user?.email}</span>
        </main>
      </div>
    );
  };

  /** PC 版型 */
  const PcUserLayout = ({ _user }) => {
    return (
      <div className="pc-user-layout">
        <header>
          <span>{_user?.firstName}</span>
          <span>{_user?.lastName}</span>
        </header>
        <main>
          <span>{_user?.email}</span>
        </main>
      </div>
    );
  };

  /** 取得更多使用者 */
  const getMoreUser = async (value) => {
    const list = await getList({ skip: value?.skip, limit: value?.limit });

    setUserList((prev) => prev.concat(list?.users));
    setTotalNum(list?.total);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gogoro Inc.</h1>
      </header>
      <main className="App-main">
        <List
          value={userList}
          total={totalNum}
          mobileItemLayout={(_item) => <MobileUserLayout _user={_item} />}
          pcItemLayout={(_item) => <PcUserLayout _user={_item} />}
          getMoreData={getMoreUser}
        />
      </main>
    </div>
  );
}

export default App;
