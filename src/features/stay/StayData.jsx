import axios from "axios";
import API_URL from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteHotel, fetchingHotels } from "../../store/stay/action";
import "./StayData.css";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";

const HOTELS_PER_PAGE = 20;

const StayData = () => {
  const navigate = useNavigate();

  const handleAddToCart = async (hotel) => {
    try {
      const { id, ...hotelData } = hotel;

      await axios.post(`${API_URL}/hotelcart`, {
        ...hotelData,
        sourceId: id,
      });

      navigate("/cart");
    } catch (error) {
      console.error("Hotel cart error:", error);
    }
  };
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.StayReducer);
  const checkInDate = useSelector((state) => state.StayReducer.checkInDate);
  const checkOutDate = useSelector((state) => state.StayReducer.checkOutDate);
  const selectedCity = useSelector((state) => state.StayReducer.selectedCity);
  console.log("city", selectedCity);
  console.log("In", checkInDate);
  console.log("out", checkOutDate);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 50000]);
  const [sortConfig, setSortConfig] = useState({ sort: "", order: "asc" });

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchingHotels());
  }, [dispatch]);

  const filteredHotels = useMemo(() => {
    const hotels = data || [];

    return hotels
      .filter((hotel) => {
        const hotelPrice = Number(hotel.price) || 0;

        const matchesPrice =
          hotelPrice >= selectedPriceRange[0] &&
          hotelPrice <= selectedPriceRange[1];

        const matchesCity =
          !selectedCity ||
          hotel.place?.toLowerCase() === selectedCity.toLowerCase();

        return matchesPrice && matchesCity;
      })
      .sort((firstHotel, secondHotel) => {
        if (!sortConfig.sort) {
          return 0;
        }

        const firstValue = Number(firstHotel[sortConfig.sort]) || 0;
        const secondValue = Number(secondHotel[sortConfig.sort]) || 0;

        return sortConfig.order === "desc"
          ? secondValue - firstValue
          : firstValue - secondValue;
      });
  }, [data, selectedCity, selectedPriceRange, sortConfig]);

  const totalNumOfPages = Math.max(
    1,
    Math.ceil(filteredHotels.length / HOTELS_PER_PAGE)
  );

  const visibleHotels = filteredHotels.slice(
    (currentPage - 1) * HOTELS_PER_PAGE,
    currentPage * HOTELS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLeft = (id) => {
    dispatch(DeleteHotel(id));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCity, selectedPriceRange, sortConfig]);

  console.log(data);
  return (
    <div className="stay-data">
      <div className="sidebar-container">
        <Sidebar
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
        />
      </div>

      {visibleHotels?.map((hotel) => (
        <div className="stay-card" key={hotel.id}>
          <img src={hotel.image} alt="hotel" />

          <div className="stay-info">
            <div className="stay-header">
              <h3 className="stay-name">{hotel.name}</h3>
              <button
                className="stay-left-btn"
                onClick={() => handleLeft(hotel.id)}
              >
                We have 5 left
              </button>
            </div>
            <p className="stay-location">{hotel.place}</p>
            <p className="stay-description">{hotel.description}</p>
            <div className="stay-details">
              <div className="stay-price">
                <span>Price:</span>
                <p>₹{hotel.price.toLocaleString()}</p>
              </div>
              <div className="stay-rating">
                <span>Rating:</span>
                <p>{hotel.rating ? hotel.rating : 1}</p>
              </div>
              <button
                onClick={() => handleAddToCart(hotel)}
                style={{
                  padding: "8px 14px",
                  backgroundColor: "teal",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
      <div>
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={totalNumOfPages}
        />
      </div>
    </div>
  );
};

export default StayData;
