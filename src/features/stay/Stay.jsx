import React, { useMemo, useState } from "react";
import data from "./city";
import ShowCalender from "./ShowCalender";
import { Button,} from "@chakra-ui/react";
import styles from "./Stay.module.css";
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectCity } from "../../store/stay/action";

function Stay() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const cityOptions = useMemo(() => {
    const searchValue = searchTerm.trim().toLowerCase();

    if (!searchValue) {
      return data;
    }

    return data.filter((city) =>
      city.name.toLowerCase().includes(searchValue)
    );
  }, [searchTerm]);

  const handleCitySelect = (cityName) => {
    setSearchTerm(cityName);
    setIsDropdownOpen(false);
    dispatch(selectCity(cityName));
  };

  const handleSearch = () => {
    const searchValue = searchTerm.trim();

    if (!searchValue) {
      dispatch(selectCity(""));
      return;
    }

    const exactCity = data.find(
      (city) => city.name.toLowerCase() === searchValue.toLowerCase()
    );
    const matchingCity = exactCity || cityOptions[0];
    const cityName = matchingCity ? matchingCity.name : searchValue;

    setSearchTerm(cityName);
    dispatch(selectCity(cityName));
  };

  const handleSearchChange = (event) => {
    const nextSearchTerm = event.target.value;
    setSearchTerm(nextSearchTerm);
    setIsDropdownOpen(true);

    if (!nextSearchTerm.trim()) {
      dispatch(selectCity(""));
    }
  };

  const handleInputBlur = () => {
    window.setTimeout(() => setIsDropdownOpen(false), 150);
  };

  const inputStyles = {
    width: "100%",
    height: "44px",
    border: "1px solid #dfe1e5",
    borderRadius: "6px",
    backgroundColor: "white",
    boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
    color: "#212121",
    fontSize: "16px",
    fontFamily: "Arial",
    padding: "0 13px",
    outline: "none",
  };

  const listStyles = {
    position: "absolute",
    top: "48px",
    left: 0,
    right: 0,
    zIndex: 20,
    listStyle: "none",
    margin: 0,
    padding: "6px 0",
    backgroundColor: "white",
    border: "1px solid #dfe1e5",
    borderRadius: "6px",
    boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
  };

  const optionStyles = {
    padding: "10px 13px",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "Arial",
    fontSize: "16px",
    color: "#212121",
  };

  const noResultStyles = {
    ...optionStyles,
    cursor: "default",
    color: "#666",
  };

  const showDropdown = isDropdownOpen && cityOptions.length > 0;
  const showNoResults = isDropdownOpen && cityOptions.length === 0;

  const renderCityOptions = () => {
    if (showDropdown) {
      return (
        <ul style={listStyles}>
          {cityOptions.map((city) => (
            <li
              key={city.id}
              style={optionStyles}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => handleCitySelect(city.name)}
            >
              {city.name}
            </li>
          ))}
        </ul>
      );
    }

    if (showNoResults) {
      return (
        <ul style={listStyles}>
          <li style={noResultStyles}>No places found</li>
        </ul>
      );
    }

    return null;
  };

  const handleSearchMouseDown = () => {
    if (!searchTerm.trim()) {
      dispatch(selectCity(""));
    }
  };

  const searchLink = (
    <Link to={{ pathname: '/stay' }} onClick={handleSearch}>
      Search
    </Link>
  );

  return (
    <div className="App" style={{marginLeft:"230px",position:"relative", display:"flex"}}>
      <header style={{ backgroundColor: "white", margin: "20px" , width:"400px"}}>
        <div style={{ width: 400, position: "relative" }}>
          <input
            type="text"
            value={searchTerm}
            placeholder="Going to"
            style={inputStyles}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={handleInputBlur}
            onChange={handleSearchChange}
          />
          {renderCityOptions()}
        </div>
      </header>
      <div className={styles["calenderWrapper"]} style={{display:"flex", flexDirection:"column",gap:"20px"}}>
        <div style={{width:"400px",marginTop:"20px"}}>
        <ShowCalender />
        </div>
        
          <Button
            colorScheme="blue"
            size="lg"
            className={styles["SearchBtn1"]}
            style={{margin:"auto",}}
            onMouseDown={handleSearchMouseDown}
            
          >
            {searchLink}
          
          </Button >
       
      </div>
    </div>
  );
}

export default Stay;
