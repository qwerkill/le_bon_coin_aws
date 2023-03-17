

import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PostService from "../../src/services/post.service";

const SearchBar = () => {
    const [credential, setCredential] = useState({});
    const [locationData, setLocationData] = useState({});
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyADYGV5pj9wsxWKV0PMMzhbHJh3W9IOy_c&libraries=places";
      document.body.appendChild(script);
  
      const handleLoad = () => {
        const autocomplete = new window.google.maps.places.Autocomplete(
          document.getElementById("outlined-basic"),
    
        );
        autocomplete.setFields(["formatted_address", "address_components", "geometry"]);
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const formatted_address = place.formatted_address;
          const addressComponents = place.address_components.reduce((obj, item) => {
            const types = item.types;
            if (types.includes("locality")) obj.city = item.long_name;
            if (types.includes("country")) obj.country = item.long_name;
            return obj;
          }, {});
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setLocationData({ formatted_address, ...addressComponents, lat, lng });
  
          const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyADYGV5pj9wsxWKV0PMMzhbHJh3W9IOy_c`;
          axios.get(geocodeUrl).then((response) => {
            const addressComponents = response.data.results[0].address_components;
            const postalCodeComponent = addressComponents.find((component) =>
              component.types.includes("postal_code")
            );
            const postal_code = postalCodeComponent ? postalCodeComponent.long_name : "";
            setLocationData((prevData) => ({ ...prevData, postal_code }));
          });
        });
      };
      script.addEventListener("load", handleLoad);
  
      return () => {
        script.removeEventListener("load", handleLoad);
      };
    }, []);
  
    useEffect(() => {
      if (locationData) {
        setCredential({
          ...credential,
          ...locationData,
        });
      }
    }, [locationData]);

    const handleSearchChange = async (e) => {
        const searchTerm = e.target.value;
        const { city, country, postal_code } = credential;
        const location = `${postal_code} ${city} ${country}`;
        const results = await PostService.searchPosts(searchTerm, location);
        setPosts(results);
    };
    

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ".MuiInputBase-root,.MuiButton-root": {
          mb: 2,
        },
      }}
    >
      <TextField
        id="outlined-basic"
        label="Localisation"
        variant="outlined"
        name="localisation"
        onChange={handleSearchChange}
        />
    </Box>
  );
};

export default SearchBar;
