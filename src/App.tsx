import React, {ChangeEvent, useState} from 'react';
import icons from './icons.json';
import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import path from "path-browserify";
import classNames from "classnames";

function App() {
  const items_per_page = 20;
  const nameIcons = Object.keys(icons);
  const firstName = nameIcons[0];
  const [iconName, setIconName] = useState<string>(firstName);
  const [filter, setFilter] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setIconName(e.target.value);
  };
  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setIndex(0);
  }

  // @ts-ignore
  const filteredItems = icons[iconName].filter((v: string) => {
    for (const part of filter.split(",")) {
      const flg = new RegExp(part.trim(), 'i').test(v);
      if (!flg) return false;
    }
    return true;
  });
  const maxPage = Math.ceil(filteredItems.length / items_per_page);

  const handleClickPrev = () => {
    let nextIndex = index - 1;
    if (nextIndex < 0) {
      nextIndex = 0;
    }
    setIndex(nextIndex);
  };

  const handleClickNext = () => {
    let nextIndex = index + 1;
    if (maxPage < nextIndex) {
      nextIndex = maxPage;
    }
    setIndex(nextIndex);
  };

  const radioButtons = nameIcons.map((name, index) => {
    return (
      <label className="radio" key={name}>
        <input type="radio" name="icon" value={name} checked={name === iconName} onChange={handleChangeRadio} />
        <span style={{marginLeft: "0.2rem"}}>{name}</span>
      </label>
    );
  });

  const pagination = (
    <div style={{textAlign: "center"}}>
      <nav className="pagination is-centered" role="navigation" aria-label="pagination" style={{width: "300px", display: "inline-flex"}}>
        <button className={classNames('pagination-previous', {'is-disabled': index === 0})} style={{backgroundColor: "#FFFFFF"}} onClick={handleClickPrev}>Prev</button>
        <button className={classNames('pagination-next', {'is-disabled': index + 1 === maxPage})} style={{backgroundColor: "#FFFFFF"}} onClick={handleClickNext}>Next</button>
        <ul className="pagination-list">
          <li>
            <button className="pagination-link is-disabled">{index + 1} / {maxPage}</button>
          </li>
        </ul>
      </nav>
    </div>
  );

  // @ts-ignore
  const listCard = filteredItems.slice(items_per_page * index, items_per_page * (index + 1)).map((v: string) => {
    const basename = path.basename(v);
    const location = document.location;
    const url = `${location.protocol}//${location.host}/icons/${iconName}/${v}`;
    const listItems = v.split("/").reverse().map((x) => <li key={x}>{x}</li>);
    const handleClickCopy = () => {
      navigator.clipboard.writeText(url).then(() => {
        alert("copy url");
      }).catch(() => {
        alert("failed to copy url");
        alert("failed to copy url");
      });
    };
    return (
      <div className="card" key={v} style={{width: "150px", display: "inline-block", margin: "0.2rem"}}>
        <header className="card-header">
          <p className="card-header-title" style={{fontSize: "0.50rem", padding: "8px", wordBreak: "break-all"}}>{basename}</p>
          <button className="card-header-icon" aria-label="more options" style={{padding: "8px"}} onClick={handleClickCopy}>
            <span className="icon">
              <i className="fas fa-clipboard" aria-hidden="true" />
            </span>
          </button>
        </header>
        <div className="card-image" style={{backgroundColor: "lightgray", display: "flex", alignItems: "center", justifyContent: "center", height: "70px"}} >
          <figure style={{display: "inline-flex", alignItems: "center", justifyContent: "center", height: "64px", width: "64px"}}>
            <img src={url} alt={basename} style={{maxWidth: "64px"}} />
          </figure>
        </div>
        <div className="card-content" style={{fontSize: "0.5rem", paddingLeft: "16px", paddingRight: "16px", paddingTop: "12px", paddingBottom: "12px", wordBreak: "break-all"}}>
          <ol>{listItems}</ol>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <nav className="navbar is-link" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <h1 className="navbar-item" style={{paddingLeft: "1.5rem"}}>Search Icon My Hosting</h1>
        </div>
      </nav>
      <article>
        <div className="columns">
          <div className="column">
            <div className="card" style={{margin: "16px"}}>
              <div className="card-content">
                <h2 className="">select icon</h2>
                <div className="control">
                  {radioButtons}
                  <input className="input" type="text" onChange={handleChangeText} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="columns">
              <div className="column">
                {pagination}
              </div>
            </div>
            <div className="columns">
              <div className="column" style={{paddingLeft: "28px", paddingRight: "28px"}}>
                {listCard}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default App;
