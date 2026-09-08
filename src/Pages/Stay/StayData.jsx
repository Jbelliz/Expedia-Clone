import axios from "axios";
import API_URL from "../../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteHotel, fetchingHotels } from "../../Redux/StayReducer/action";
import "./StayData.css";
import PriceFilter from "./PriceFilter";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";

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
  const [filteredHotel, setFilteredHotel] = useState([]);
  const [price, setPrice] = useState(""); // Define price state variable

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalNumOfPages = Math.ceil(244 / 20);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLeft = (id) => {
    dispatch(DeleteHotel(id));
  };

  // useEffect(() => {
  //   dispatch(fetchingHotels("","",""));
  // }, [dispatch]);

  // useEffect(() => {
  //   if (data) {
  //     setFilteredHotel(
  //       data.filter(
  //         (hotel) =>
  //           hotel.price >= selectedPriceRange[0] &&
  //           hotel.price <= selectedPriceRange[1]
  //       )
  //     );
  //     console.log(filteredHotel);
  //   }
  // }, [data, selectedPriceRange]);
  useEffect(() => {
    if (data) {
      const filtered = data.filter((hotel) => {
        const hotelPrice = Number(hotel.price) || 0;

        const matchesPrice =
          hotelPrice >= selectedPriceRange[0] &&
          hotelPrice <= selectedPriceRange[1];

        const matchesCity =
          !selectedCity ||
          hotel.place?.toLowerCase() === selectedCity.toLowerCase();
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
        return matchesPrice && matchesCity;
      });

      setFilteredHotel(filtered);
    }
  }, [data, selectedPriceRange, selectedCity]);

  console.log(data);
  return (
    <div className="stay-data">
      <div className="sidebar-container">
        <Sidebar
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
        />
      </div>

      {filteredHotel?.map((hotel) => (
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
