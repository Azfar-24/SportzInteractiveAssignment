import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Players.css";

export const Player = () => {
  const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState([]);
  const FetchApi = async () => {
    const { data } = await axios.get(
      "https://api.npoint.io/20c1afef1661881ddc9c"
    );
    const playerData = data.playerList.sort((a, b) => a.Value - b.Value);
    setData(playerData);
    setFilterData(playerData);
  };

  useEffect(() => {
    FetchApi();
  }, []);

  const searchHandlert = (e) => {
    let filterData = data.filter(
      (data) =>
        data.TName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        data.PFName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterData(filterData);
    console.log(filterData);
  };

  return (
    <>
      <section>
        <div className="input">
          <input
            type="text"
            placeholder="Search player"
            onChange={searchHandlert}
          />
        </div>
        <div className="container">
          {filterData?.map((data) => {
            return (
              <div className="card" key={data.Id}>
                <img src={`./player-images/${data.Id}.jpg`} alt={data.PFName} />
                <h1 className="name">
                  {data.PFName} <span>({data.SkillDesc})</span>
                </h1>
                <div className="detail value">
                  Value: <span className="other-details">$ {data.Value}</span>{" "}
                </div>
                <div className="detail upcoming-match">
                  Upcoming Match :{" "}
                  <span className="other-details">
                    {data.UpComingMatchesList[0].CCode
                      ? data.UpComingMatchesList[0].CCode
                      : "TBC"}{" "}
                    VS{" "}
                    {data.UpComingMatchesList[0].VsCCode
                      ? data.UpComingMatchesList[0].VsCCode
                      : "TBC"}
                  </span>
                </div>
                <div className="detail time">
                  Next Match:{" "}
                  <span className="other-details">
                    {data.UpComingMatchesList[0].MDate
                      ? new Date(
                          data.UpComingMatchesList[0].MDate + " UTC"
                        ).toLocaleString()
                      : new Date().toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
