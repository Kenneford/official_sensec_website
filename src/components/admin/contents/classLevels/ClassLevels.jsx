import "./classLevels.scss";
import { useParams } from "react-router-dom";

export function ClassLevels() {
  const { adminCurrentAction, adminCurrentLink } = useParams();
  return (
    <div id="adminClassLevelsWrap">
      <div className="searchWrap">
        <div className="searchCont">
          <h1 className="dashAction">
            {adminCurrentAction} /{" "}
            <span>{adminCurrentLink?.replace(/_/g, " ")}</span>
          </h1>
          {/* <SearchForm value={searchStudent} onChange={setSearchStudent} /> */}
        </div>
      </div>
    </div>
  );
}
